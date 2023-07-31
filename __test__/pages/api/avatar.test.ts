import { NextApiRequest, NextApiResponse } from "next";

import connectMongoDb from "@/lib/connectMongoDb";
import { Avatar } from "@/model/avatarSchema";
import handler, * as handlers from "@/pages/api/avatar";
import {
  getUserAvatar,
  handleCaseWithNoBodyReceived,
  handleRequestBasedOnMethod,
} from "@/pages/api/avatar";
import { USER_IS_NOT_AUTHORIZED } from "@/types/constants";
import { RequestMethod } from "@/types/enums";

jest.mock("@/lib/connectMongoDb");
jest.mock("@/utils/utils");
jest.mock("@/model/userSchema");
jest.mock("@/model/avatarSchema");

jest.mock("uuid", () => {
  return {
    v4: jest.fn(() => 1),
  };
});

describe("avatar handler", () => {
  let mockRequest: NextApiRequest;
  let mockResponse: NextApiResponse;

  const mockNewUser = {
    _id: "someId",
    name: "John Doe",
    email: "john@example.com",
    password: "password123",
    image: "avatar-url",
  };

  beforeEach(() => {
    mockRequest = {
      body: {
        payload: {
          user: mockNewUser,
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

  describe("getUserAvatar", () => {
    it("should return 200 status and user avatar data if user is authorized and avatar exists", async () => {
      mockRequest.body.payload = { user: mockNewUser };
      const mockAvatarData = { image: "avatar-url", name: "John Doe" };

      (Avatar.findOne as jest.Mock).mockResolvedValueOnce(mockAvatarData);

      await getUserAvatar({ req: mockRequest, res: mockResponse });

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.send).toHaveBeenCalledWith({
        success: true,
        data: mockAvatarData,
      });
    });

    it("should return 401 status if user is not authorized", async () => {
      mockRequest.body.payload = { user: null };

      await getUserAvatar({ req: mockRequest, res: mockResponse });

      expect(mockResponse.status).toHaveBeenCalledWith(401);
      expect(mockResponse.send).toHaveBeenCalledWith({
        success: false,
        message: USER_IS_NOT_AUTHORIZED,
        data: null,
      });
    });

    it("should return 409 status if an error occurs", async () => {
      mockRequest.body.payload = { user: mockNewUser };
      const errorMessage = "Some error";

      (Avatar.findOne as jest.Mock).mockRejectedValueOnce(
        new Error(errorMessage)
      );

      await getUserAvatar({ req: mockRequest, res: mockResponse });

      expect(mockResponse.status).toHaveBeenCalledWith(409);
      expect(mockResponse.send).toHaveBeenCalledWith({
        success: false,
        message: errorMessage,
        data: null,
      });
    });
  });

  describe("handleRequestBasedOnMethod", () => {
    it("should call getUserAvatar function and handle success", async () => {
      const mockGetUserAvatar = jest
        .spyOn(handlers, "getUserAvatar")
        .mockResolvedValue();

      handleRequestBasedOnMethod({
        ...mockRequest.body,
        method: RequestMethod.PUT,
        res: mockResponse,
      })
        .then(() => {
          expect(mockGetUserAvatar).toHaveBeenCalledWith({
            req: mockRequest,
            res: mockResponse,
          });
          expect(mockResponse.status).toHaveBeenCalledWith(200);
          expect(mockResponse.send).toHaveBeenCalledWith({
            success: true,
            message: "Success",
          });
        })
        .catch(() => {
          expect(mockResponse.status).toHaveBeenCalledWith(400);
        });
    });
  });

  describe("handler", () => {
    it("should call handleRequestBasedOnMethod with correct arguments for PUT method", async () => {
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
          expect(mockResponse.status).toHaveBeenCalledWith(400);
        });
    });

    it("should handle the case with no body received", async () => {
      mockRequest.body = undefined;

      handler(mockRequest, mockResponse)
        .then(() => {
          expect(mockResponse.status).toHaveBeenCalledWith(400);
          expect(mockResponse.send).toHaveBeenCalledWith({
            success: false,
            message: "No request body received",
          });
        })
        .catch(() => {
          expect(mockResponse.status).toHaveBeenCalledWith(400);
        });
    });
  });
});
