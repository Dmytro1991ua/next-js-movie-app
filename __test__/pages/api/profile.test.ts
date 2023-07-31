import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

import connectMongoDb from "@/lib/connectMongoDb";
import { Avatar } from "@/model/avatarSchema";
import { User } from "@/model/userSchema";
import * as handlers from "@/pages/api/profile";
import handler, {
  handleCaseWithNoBodyReceived,
  handleRequestBasedOnMethod,
  updatePasswordIfProvided,
  updateUserProfile,
} from "@/pages/api/profile";
import {
  SUCCESSFULLY_UPDATE_USER_PROFILE_DATA,
  USER_IS_NOT_AUTHORIZED,
  USER_NOT_FOUND,
} from "@/types/constants";
import { RequestMethod } from "@/types/enums";
import { handleHashPassword } from "@/utils/utils";

jest.mock("@/utils/utils");
jest.mock("@/model/userSchema");
jest.mock("@/model/avatarSchema");
jest.mock("bcryptjs");

jest.mock("uuid", () => {
  return {
    v4: jest.fn(() => 1),
  };
});

describe("profile handler", () => {
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

  const mockUserInfo = {
    name: "John Doe",
    password: "password123",
    image: "avatar-url",
  };

  beforeEach(() => {
    mockRequest = {
      body: {
        payload: {
          userInfo: mockUserInfo,
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

  describe("updatePasswordIfProvided", () => {
    const mockExistingHashedPassword = "existingHashedPassword";
    const mockNewPassword = "newPassword";
    const mockedUpdatedHashedPassword = "updatedHashedPassword";

    it("should return existing password if newPassword is not provided", async () => {
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      const newPassword = undefined;

      const result = await updatePasswordIfProvided(
        newPassword,
        mockExistingHashedPassword
      );

      expect(result).toBe(mockExistingHashedPassword);
    });

    it("should return existing password if newPassword matches existing hashed password", async () => {
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await updatePasswordIfProvided(
        mockNewPassword,
        mockExistingHashedPassword
      );

      expect(result).toBe(mockExistingHashedPassword);
    });

    it("should return updated hashed password if newPassword does not match existing hashed password", async () => {
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);
      (handleHashPassword as jest.Mock).mockResolvedValue(
        mockedUpdatedHashedPassword
      );

      const result = await updatePasswordIfProvided(
        mockNewPassword,
        mockExistingHashedPassword
      );

      expect(result).toBe(mockedUpdatedHashedPassword);
      expect(handleHashPassword).toHaveBeenCalledWith(mockNewPassword);
    });

    it("should throw an error if an error occurs while hashing the password", async () => {
      (bcrypt.compare as jest.Mock).mockRejectedValue(
        new Error("Compare error")
      );

      await expect(
        updatePasswordIfProvided(mockNewPassword, mockExistingHashedPassword)
      ).rejects.toThrow("Error occurred while hashing the password");

      expect(handleHashPassword).not.toHaveBeenCalled();
    });
  });

  describe("updateUserProfile", () => {
    const expectedHashedPassword = "hashed_password123";

    it("should return a success response when updating the user profile", async () => {
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      (User.findOne as jest.Mock).mockResolvedValue(mockNewUser);
      (User.findOneAndUpdate as jest.Mock).mockResolvedValue({
        ...mockNewUser,
        password: expectedHashedPassword,
      });
      (Avatar.findOneAndUpdate as jest.Mock).mockResolvedValue({
        name: "John Doe",
        image: "avatar-url",
      });

      await updateUserProfile(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.send).toHaveBeenCalledWith({
        message: SUCCESSFULLY_UPDATE_USER_PROFILE_DATA,
        success: true,
      });
    });

    it("should return an error response when user is not authorized", async () => {
      mockRequest.body.payload.user = undefined;

      (User.findOne as jest.Mock).mockResolvedValue(mockNewUser);

      await updateUserProfile(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(401);
      expect(mockResponse.send).toHaveBeenCalledWith({
        success: false,
        message: USER_IS_NOT_AUTHORIZED,
        data: null,
      });
    });

    it("should return an error response when user is not found", async () => {
      (User.findOne as jest.Mock).mockResolvedValue(null);

      await updateUserProfile(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.send).toHaveBeenCalledWith({
        success: false,
        message: USER_NOT_FOUND,
        data: null,
      });
    });

    it("should return 409 status if the server error occurs", async () => {
      const errorMessage = "Some error";

      (User.findOne as jest.Mock).mockRejectedValueOnce(
        new Error(errorMessage)
      );

      await updateUserProfile(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(409);
      expect(mockResponse.send).toHaveBeenCalledWith({
        success: false,
        message: errorMessage,
        data: null,
      });
    });
  });

  describe("handleRequestBasedOnMethod", () => {
    it("should call updateUserProfile handler when method is PATCH", () => {
      mockRequest.method = RequestMethod.PATCH;

      const mockUpdateProfile = jest
        .spyOn(handlers, "updateUserProfile")
        .mockResolvedValue();

      handleRequestBasedOnMethod({
        req: mockRequest,
        res: mockResponse,
        method: RequestMethod.PATCH,
      })
        .then(() => {
          expect(mockUpdateProfile).toHaveBeenCalled();
          expect(mockResponse.status).toHaveBeenCalledWith(200);
        })
        .catch(() => expect(mockResponse.status).toHaveBeenCalledWith(409));
    });
  });

  describe("handler", () => {
    it("should call handleRequestBasedOnMethod with correct arguments for PATCH method", async () => {
      mockRequest.method = RequestMethod.PATCH;

      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      (User.findOne as jest.Mock).mockResolvedValue(mockNewUser);

      const mockHandleRequestBasedOnMethod = jest
        .spyOn(handlers, "handleRequestBasedOnMethod")
        .mockResolvedValue();

      handler(mockRequest, mockResponse)
        .then(() => {
          expect(connectMongoDb).toHaveBeenCalled();

          expect(mockHandleRequestBasedOnMethod).toHaveBeenCalledWith({
            req: mockRequest,
            res: mockResponse,
            method: RequestMethod.PATCH,
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
