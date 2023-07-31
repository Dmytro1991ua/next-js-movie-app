import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

import connectMongoDb from "@/lib/connectMongoDb";
import { mockMovie } from "@/mocks/testMocks";
import { Favorites } from "@/model/favoritesSchema";
import handler, {
  addToFavorites,
  getAvailableFavoritesMoviesOrSerials,
  handleCaseWithNoBodyReceived,
  handleRequestBasedOnMethod,
  removeFromFavorites,
} from "@/pages/api/favorites";
import * as handlers from "@/pages/api/favorites";
import {
  SUCCESSFULLY_ADD_TO_FAVORITE,
  SUCCESSFULLY_REMOVE_FROM_FAVORITE,
  USER_IS_NOT_AUTHORIZED,
} from "@/types/constants";
import { RequestMethod } from "@/types/enums";

import { FAVORITES_DATA_IS_NOT_FIND_BY_ID } from "./../../../types/constants";

jest.mock("@/lib/connectMongoDb");
jest.mock("@/utils/utils");
jest.mock("@/model/userSchema");
jest.mock("@/model/favoritesSchema");

jest.mock("uuid", () => {
  return {
    v4: jest.fn(() => 1),
  };
});

describe("favorites handler", () => {
  let mockRequest: NextApiRequest;
  let mockResponse: NextApiResponse;

  const mockObjectId = new mongoose.Types.ObjectId();

  const mockNewUser = {
    _id: mockObjectId.toString(),
    name: "John Doe",
    email: "john@example.com",
    password: "password123",
    image: "avatar-url",
  };

  const mockFavoritesData = {
    ...mockMovie,
    user: mockNewUser._id,
    _id: mockObjectId.toString(),
    isFavorite: true,
  };

  beforeEach(() => {
    mockRequest = {
      body: {
        payload: {
          user: mockNewUser,
          id: "movie-id-1",
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

  describe("getAvailableFavoritesMoviesOrSerials", () => {
    it("should return 200 status with the favorites movie or serial data", async () => {
      const mockFavoritesData = [
        { id: "movie1", name: "Movie 1" },
        { id: "movie2", name: "Movie 2" },
      ];
      const favoritesFindSpy = jest
        .spyOn(Favorites, "find")
        .mockResolvedValue(mockFavoritesData);

      await getAvailableFavoritesMoviesOrSerials({
        req: mockRequest,
        res: mockResponse,
      });

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.send).toHaveBeenCalledWith({
        success: true,
        data: mockFavoritesData,
      });
      expect(favoritesFindSpy).toHaveBeenCalledWith({
        user: mockRequest.body.payload.user.id,
      });
    });

    it("should return 401 status with the correct error message if user is not authorized", async () => {
      mockRequest.body.payload.user = null;

      await getAvailableFavoritesMoviesOrSerials({
        req: mockRequest,
        res: mockResponse,
      });

      expect(mockResponse.status).toHaveBeenCalledWith(401);
      expect(mockResponse.send).toHaveBeenCalledWith({
        success: false,
        message: USER_IS_NOT_AUTHORIZED,
        data: null,
      });
    });

    it("should return 409 status with the error message if an error occurs during data retrieval", async () => {
      const errorMessage = "Some error occurred";
      const favoritesFindSpy = jest
        .spyOn(Favorites, "find")
        .mockRejectedValue(new Error(errorMessage));

      await getAvailableFavoritesMoviesOrSerials({
        req: mockRequest,
        res: mockResponse,
      });

      expect(mockResponse.status).toHaveBeenCalledWith(409);
      expect(mockResponse.send).toHaveBeenCalledWith({
        success: false,
        message: errorMessage,
        data: null,
      });
      expect(favoritesFindSpy).toHaveBeenCalledWith({
        user: mockRequest.body.payload.user.id,
      });
    });
  });

  describe("addToFavorites", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should add to favorites and return success response with status 200", async () => {
      jest.spyOn(Favorites, "create").mockResolvedValue(mockFavoritesData);

      await addToFavorites({ req: mockRequest, res: mockResponse });

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.send).toHaveBeenCalledWith({
        success: true,
        message: SUCCESSFULLY_ADD_TO_FAVORITE,
        data: mockFavoritesData,
      });
    });

    it("should return unauthorized response if user is not provided wit status 401", async () => {
      mockRequest.body.payload.user = undefined;

      await addToFavorites({ req: mockRequest, res: mockResponse });

      expect(mockResponse.status).toHaveBeenCalledWith(401);
      expect(mockResponse.send).toHaveBeenCalledWith({
        success: false,
        message: USER_IS_NOT_AUTHORIZED,
        data: null,
      });
    });

    it("should return error response if saving favorites fails with status 409", async () => {
      const errorMessage = "Failed to save favorites";

      jest
        .spyOn(Favorites, "create")
        .mockRejectedValue(new Error(errorMessage));

      await addToFavorites({ req: mockRequest, res: mockResponse });

      expect(mockResponse.status).toHaveBeenCalledWith(409);
      expect(mockResponse.send).toHaveBeenCalledWith({
        success: false,
        message: errorMessage,
        data: null,
      });
    });
  });

  describe("removeFromFavorites", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should remove from favorites and return success response with status 200", async () => {
      mockRequest.body.payload.id = mockObjectId.toString();

      jest
        .spyOn(Favorites, "findByIdAndDelete")
        .mockResolvedValueOnce(mockFavoritesData);

      await removeFromFavorites({ req: mockRequest, res: mockResponse });

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.send).toHaveBeenCalledWith({
        success: true,
        message: SUCCESSFULLY_REMOVE_FROM_FAVORITE,
        data: mockObjectId.toString(),
      });
    });

    it("should return a 404 error response if provided id is not a valid ObjectId", async () => {
      const invalidObjectId = "invalidId";

      mockRequest.body.payload.id = invalidObjectId;

      await removeFromFavorites({ req: mockRequest, res: mockResponse });

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.send).toHaveBeenCalledWith({
        success: false,
        message: FAVORITES_DATA_IS_NOT_FIND_BY_ID,
        data: null,
      });
    });

    it("should return a 401 error response if the user is not authorized", async () => {
      mockRequest.body.payload.user = undefined;

      await removeFromFavorites({ req: mockRequest, res: mockResponse });

      expect(mockResponse.status).toHaveBeenCalledWith(401);
      expect(mockResponse.send).toHaveBeenCalledWith({
        success: false,
        message: USER_IS_NOT_AUTHORIZED,
        data: null,
      });
    });

    it("should return 409 status if the server error occurs", async () => {
      mockRequest.body.payload.id = mockObjectId.toString();

      const errorMessage = "Some error";

      jest
        .spyOn(Favorites, "findByIdAndDelete")
        .mockRejectedValueOnce(new Error(errorMessage));

      await removeFromFavorites({ req: mockRequest, res: mockResponse });

      expect(mockResponse.status).toHaveBeenCalledWith(409);
      expect(mockResponse.send).toHaveBeenCalledWith({
        success: false,
        message: errorMessage,
        data: null,
      });
    });
  });

  describe("handleRequestBasedOnMethod", () => {
    it("should call getAvailableFavoritesMoviesOrSerials handler when method is POST", async () => {
      const mockGetAvailableFavoritesMoviesOrSerials = jest
        .spyOn(handlers, "getAvailableFavoritesMoviesOrSerials")
        .mockResolvedValue();

      handleRequestBasedOnMethod({
        req: mockRequest,
        res: mockResponse,
        method: RequestMethod.POST,
      })
        .then(() => {
          expect(mockGetAvailableFavoritesMoviesOrSerials).toHaveBeenCalled();
        })
        .catch(() => {
          expect(mockResponse.status).toHaveBeenCalledWith(400);
        });
    });

    it("should call addToFavorites handler when method is PUT", async () => {
      mockRequest.method = RequestMethod.PUT;

      const mockAddToFAvorites = jest
        .spyOn(handlers, "getAvailableFavoritesMoviesOrSerials")
        .mockResolvedValue();

      handleRequestBasedOnMethod({
        req: mockRequest,
        res: mockResponse,
        method: RequestMethod.PUT,
      })
        .then(() => {
          expect(mockAddToFAvorites).toHaveBeenCalled();
        })
        .catch(() => {
          expect(mockResponse.status).toHaveBeenCalledWith(409);
        });
    });

    it("should call addToFavorites handler when method is PUT", async () => {
      mockRequest.method = RequestMethod.DELETE;

      const mockRemoveFromFavorites = jest
        .spyOn(handlers, "getAvailableFavoritesMoviesOrSerials")
        .mockResolvedValue();

      handleRequestBasedOnMethod({
        req: mockRequest,
        res: mockResponse,
        method: RequestMethod.DELETE,
      })
        .then(() => {
          expect(mockRemoveFromFavorites).toHaveBeenCalled();
        })
        .catch(() => {
          expect(mockResponse.status).toHaveBeenCalledWith(404);
        });
    });
  });

  describe("handler", () => {
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

    it("should call handleRequestBasedOnMethod with correct arguments and DELETE method", async () => {
      mockRequest.method = RequestMethod.DELETE;

      const mockHandleRequestBasedOnMethod = jest
        .spyOn(handlers, "handleRequestBasedOnMethod")
        .mockResolvedValue(undefined);

      handler(mockRequest, mockResponse)
        .then(() => {
          expect(connectMongoDb).toHaveBeenCalled();

          expect(mockHandleRequestBasedOnMethod).toHaveBeenCalledWith({
            req: mockRequest,
            res: mockResponse,
            method: RequestMethod.DELETE,
          });
        })
        .catch(() => {
          expect(mockResponse.status).toHaveBeenCalledWith(404);
        });
    });
  });
});
