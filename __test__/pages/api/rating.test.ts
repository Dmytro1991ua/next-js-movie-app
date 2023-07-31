import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

import connectMongoDb from "@/lib/connectMongoDb";
import { MediaRating } from "@/model/ratingSchema";
import handler, * as handlers from "@/pages/api/rating";
import {
  addOrUpdateRating,
  addOrUpdateRatingToDb,
  addRating,
  getRatingBasedOnUser,
  handleCaseWithNoBodyReceived,
  handleRequestBasedOnMethod,
  updateExistingRating,
} from "@/pages/api/rating";
import {
  SUCCESSFULLY_ADD_RATING,
  SUCCESSFULLY_UPDATE_RATING,
  USER_IS_NOT_AUTHORIZED,
} from "@/types/constants";
import { RequestMethod } from "@/types/enums";


jest.mock("@/lib/connectMongoDb");
jest.mock("@/utils/utils");
jest.mock("@/model/userSchema");
jest.mock("@/model/ratingSchema");

jest.mock("uuid", () => {
  return {
    v4: jest.fn(() => 1),
  };
});

describe("favorites handler", () => {
  let mockRequest: NextApiRequest;
  let mockResponse: NextApiResponse;

  const mockObjectId = new mongoose.Types.ObjectId();
  const mockUserId = mockObjectId.toString();

  const mockNewUser = {
    id: mockObjectId.toString(),
    name: "John Doe",
    email: "john@example.com",
    password: "password123",
    image: "avatar-url",
  };

  const mockRatingData = {
    id: 12345,
    name: "test_movie",
    rating: 6,
  };

  const mockNewRating = {
    ...mockRatingData,
    rating: 4,
  };

  beforeEach(() => {
    mockRequest = {
      body: {
        payload: {
          user: mockNewUser,
          id: "rating-id-1",
        },
      },
      method: "POST",
    } as NextApiRequest;

    mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as NextApiResponse;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("handleCaseWithNoBodyReceived", () => {
    it("handleCaseWithNoBodyReceived should throw an error when req.body is not present", () => {
      mockRequest.body = undefined;

      expect(() => handleCaseWithNoBodyReceived(mockRequest)).toThrowError();
    });
  });

  describe("getRatingBasedOnUser", () => {
    it("should return the user's ratings when user is authorized", async () => {
      (MediaRating.find as jest.Mock).mockResolvedValue(mockRatingData);

      await getRatingBasedOnUser({ req: mockRequest, res: mockResponse });

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.send).toHaveBeenCalledWith({
        success: true,
        data: mockRatingData,
      });
    });

    it("should return 401 status when user is not authorized", async () => {
      mockRequest.body.payload.user = null;

      await getRatingBasedOnUser({ req: mockRequest, res: mockResponse });

      expect(mockResponse.status).toHaveBeenCalledWith(401);
      expect(mockResponse.send).toHaveBeenCalledWith({
        success: false,
        message: USER_IS_NOT_AUTHORIZED,
        data: null,
      });
    });

    it("should return 409 status when an error occurs", async () => {
      (MediaRating.find as jest.Mock).mockRejectedValue(
        new Error("Database error")
      );

      await getRatingBasedOnUser({ req: mockRequest, res: mockResponse });

      expect(mockResponse.status).toHaveBeenCalledWith(409);
      expect(mockResponse.send).toHaveBeenCalledWith({
        success: false,
        message: "Database error",
        data: null,
      });
    });
  });

  describe("addRating", () => {
    it("should return a success response when adding a rating", async () => {
      (MediaRating.create as jest.Mock).mockResolvedValue(mockRatingData);

      await addRating(mockRatingData, mockUserId, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.send).toHaveBeenCalledWith({
        success: true,
        message: SUCCESSFULLY_ADD_RATING,
        data: { id: mockRatingData.id, rating: mockRatingData.rating },
      });
    });

    it("should return a 401 response when userId is not provided", async () => {
      await addRating(mockRatingData, "", mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(401);
      expect(mockResponse.send).toHaveBeenCalledWith({
        success: false,
        message: USER_IS_NOT_AUTHORIZED,
        data: null,
      });
    });

    it("should return a 409 response when an error occurs", async () => {
      const errorMessage = "Some error message";

      (MediaRating.create as jest.Mock).mockRejectedValue(
        new Error(errorMessage)
      );

      await addRating(mockRatingData, mockUserId, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(409);
      expect(mockResponse.send).toHaveBeenCalledWith({
        success: false,
        message: errorMessage,
        data: null,
      });
    });
  });

  describe("updateExistingRating", () => {
    it("should return a success response with updated rating", async () => {
      const id = "ratingId";
      const updatedRating = { ...mockRatingData, rating: 8 };

      (MediaRating.findByIdAndUpdate as jest.Mock).mockResolvedValue(
        updatedRating
      );

      await updateExistingRating(id, 8, mockResponse);

      expect(MediaRating.findByIdAndUpdate).toHaveBeenCalledWith(
        id,
        { rating: 8 },
        { new: true }
      );
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.send).toHaveBeenCalledWith({
        success: true,
        message: SUCCESSFULLY_UPDATE_RATING,
        data: { id: updatedRating.id, rating: updatedRating.rating },
      });
    });

    it("should return an error response if rating update fails", async () => {
      const id = "ratingId";
      const errorMessage = "Failed to update rating";

      (MediaRating.findByIdAndUpdate as jest.Mock).mockRejectedValue(
        new Error(errorMessage)
      );

      await updateExistingRating(id, 8, mockResponse);

      expect(MediaRating.findByIdAndUpdate).toHaveBeenCalledWith(
        id,
        { rating: 8 },
        { new: true }
      );
      expect(mockResponse.status).toHaveBeenCalledWith(409);
      expect(mockResponse.send).toHaveBeenCalledWith({
        success: false,
        message: errorMessage,
        data: null,
      });
    });
  });

  describe("addOrUpdateRating", () => {
    it("should call updateExistingRating when existingRating is provided", async () => {
      const mockUpdateExistingRating = jest.spyOn(
        handlers,
        "updateExistingRating"
      );
      mockUpdateExistingRating.mockResolvedValueOnce(undefined);

      addOrUpdateRating(null, mockNewRating, mockUserId, mockResponse)
        .then(() => {
          expect(mockUpdateExistingRating).toHaveBeenCalledTimes(1);
          expect(mockUpdateExistingRating).toHaveBeenCalledWith(
            mockRatingData.id,
            mockNewRating.rating,
            mockResponse
          );
        })
        .catch(() => {
          expect(mockResponse.status).toHaveBeenCalledWith(409);
        });
    });

    it("should call addRating when existingRating is null", async () => {
      const mockAddRating = jest.spyOn(handlers, "addRating");
      mockAddRating.mockResolvedValueOnce(undefined);

      addOrUpdateRating(mockRatingData, mockNewRating, mockUserId, mockResponse)
        .then(() => {
          expect(mockAddRating).toHaveBeenCalledTimes(1);
          expect(mockAddRating).toHaveBeenCalledWith(
            mockNewRating,
            mockUserId,
            mockResponse
          );
        })
        .catch(() => {
          expect(mockResponse.status).toHaveBeenCalledWith(409);
        });
    });
  });

  describe("addOrUpdateRatingToDb", () => {
    beforeEach(() => {
      mockRequest = {
        body: {
          payload: {
            user: mockNewUser,
            data: mockNewRating,
          },
        },
        method: "POST",
      } as NextApiRequest;
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should return a success response when adding a new rating", async () => {
      (MediaRating.findOne as jest.Mock).mockResolvedValueOnce(null);

      jest.spyOn(handlers, "addRating").mockResolvedValueOnce();

      await addOrUpdateRatingToDb({ req: mockRequest, res: mockResponse });

      addOrUpdateRatingToDb({ req: mockRequest, res: mockResponse })
        .then(() => {
          expect(mockResponse.status).toHaveBeenCalledWith(200);
          expect(mockResponse.send).toHaveBeenCalledWith({
            success: true,
            message: SUCCESSFULLY_ADD_RATING,
            data: mockNewRating,
          });
        })
        .catch(() => {
          expect(mockResponse.status).toHaveBeenCalledWith(409);
        });
    });

    it("should return a success response when updating an existing rating", async () => {
      (MediaRating.findOne as jest.Mock).mockResolvedValueOnce(mockRatingData);

      jest.spyOn(handlers, "updateExistingRating").mockResolvedValueOnce();

      addOrUpdateRatingToDb({ req: mockRequest, res: mockResponse })
        .then(() => {
          expect(mockResponse.status).toHaveBeenCalledWith(200);
          expect(mockResponse.send).toHaveBeenCalledWith({
            success: true,
            message: SUCCESSFULLY_UPDATE_RATING,
            data: mockNewRating,
          });
        })
        .catch(() => {
          expect(mockResponse.status).toHaveBeenCalledWith(409);
        });
    });

    it("should return an unauthorized response when user is not provided", async () => {
      mockRequest.body.payload.user = undefined;

      await addOrUpdateRatingToDb({ req: mockRequest, res: mockResponse });

      expect(mockResponse.status).toHaveBeenCalledWith(401);
      expect(mockResponse.send).toHaveBeenCalledWith({
        success: false,
        message: "User is not authorized",
        data: null,
      });
    });

    it("should return a conflict response when an error occurs", async () => {
      const errorMessage = "Database query error";

      (MediaRating.findOne as jest.Mock).mockRejectedValueOnce(
        new Error(errorMessage)
      );

      await addOrUpdateRatingToDb({ req: mockRequest, res: mockResponse });

      expect(mockResponse.status).toHaveBeenCalledWith(409);
      expect(mockResponse.send).toHaveBeenCalledWith({
        success: false,
        message: errorMessage,
        data: null,
      });
    });
  });

  describe("handleRequestBasedOnMethod", () => {
    it("should call addOrUpdateRatingToDb when method is POST", async () => {
      const mockAddOrUpdateRatingToDb = jest
        .spyOn(handlers, "addOrUpdateRatingToDb")
        .mockResolvedValueOnce();

      handleRequestBasedOnMethod({
        req: mockRequest,
        res: mockResponse,
        method: RequestMethod.POST,
      })
        .then(() => {
          expect(mockAddOrUpdateRatingToDb).toHaveBeenCalled();
        })
        .catch(() => {
          expect(mockResponse.status).toHaveBeenCalledWith(400);
        });
    });

    it("should call getRatingBasedOnUser when method is PUT", async () => {
      mockRequest.method = RequestMethod.PUT;

      const mockGetRatingBasedOnUser = jest
        .spyOn(handlers, "getRatingBasedOnUser")
        .mockResolvedValueOnce();

      handleRequestBasedOnMethod({
        req: mockRequest,
        res: mockResponse,
        method: RequestMethod.PUT,
      })
        .then(() => {
          expect(mockGetRatingBasedOnUser).toHaveBeenCalled();
        })
        .catch(() => {
          expect(mockResponse.status).toHaveBeenCalledWith(409);
        });
    });
  });

  describe("handler", () => {
    it("should call handleRequestBasedOnMethod with correct arguments and POST method", async () => {
      const mockHandleRequestBasedOnMethod = jest
        .spyOn(handlers, "handleRequestBasedOnMethod")
        .mockResolvedValue(undefined);

      handler(mockRequest, mockResponse)
        .then(() => {
          expect(connectMongoDb).toHaveBeenCalled();

          expect(mockHandleRequestBasedOnMethod).toHaveBeenCalledWith({
            req: mockRequest,
            res: mockResponse,
            method: RequestMethod.POST,
          });
        })
        .catch(() => {
          expect(mockResponse.status).toHaveBeenCalledWith(409);
        });
    });

    it("should call handleRequestBasedOnMethod with correct arguments and PUT method", async () => {
      mockRequest.method = RequestMethod.PUT;

      const mockHandleRequestBasedOnMethod = jest
        .spyOn(handlers, "handleRequestBasedOnMethod")
        .mockResolvedValue(undefined);

      handler(mockRequest, mockResponse)
        .then(() => {
          expect(connectMongoDb).toHaveBeenCalled();

          expect(mockHandleRequestBasedOnMethod).toHaveBeenCalledWith({
            req: mockRequest,
            res: mockResponse,
            method: RequestMethod.PUT,
          });
        })
        .catch(() => {
          expect(mockResponse.status).toHaveBeenCalledWith(409);
        });
    });
  });
});
