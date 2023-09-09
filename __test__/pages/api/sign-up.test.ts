import { NextApiRequest, NextApiResponse } from "next";

import connectMongoDb from "@/lib/connectMongoDb";
import { Avatar } from "@/model/avatarSchema";
import { User } from "@/model/userSchema";
import {
  SUCCESSFULLY_CREATED_USER_MESSAGE,
  USER_ALREADY_EXIST_MESSAGE,
} from "@/modules/auth/auth.constants";
import handler, {
  createNewUser,
  createOrUpdateUser,
  handleCaseWithNoBodyReceived,
  handleRequestBasedOnMethod,
  updateExistingUser,
} from "@/pages/api/auth/sign-up";
import * as handlers from "@/pages/api/auth/sign-up";
import { RequestMethod } from "@/types/enums";
import { handleHashPassword } from "@/utils/utils";

jest.mock("@/lib/connectMongoDb");
jest.mock("@/utils/utils");
jest.mock("@/model/userSchema");
jest.mock("@/model/avatarSchema");

jest.mock("uuid", () => {
  return {
    v4: jest.fn(() => 1),
  };
});

describe("sign-up handler", () => {
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
        name: "John Doe",
        email: "john@example.com",
        password: "password123",
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

  describe("createNewUser", () => {
    it("createNewUser should create a new user and avatar with correct data", async () => {
      const mockedHashedPassword = "hashedPassword123";

      const newAvatarDocument = {
        ...mockNewUser,
        save: jest.fn(),
      };

      (handleHashPassword as jest.Mock).mockResolvedValue(mockedHashedPassword);

      (User.create as jest.Mock).mockResolvedValue(mockNewUser);
      (Avatar.create as jest.Mock).mockResolvedValue(newAvatarDocument);

      await createNewUser({
        ...mockNewUser,
        res: mockResponse,
      });

      expect(handleHashPassword).toHaveBeenCalledWith(mockNewUser.password);

      expect(User.create).toHaveBeenCalledWith({
        name: mockNewUser.name,
        password: mockedHashedPassword,
        email: mockNewUser.email,
        isCredentialsProvider: true,
      });

      expect(Avatar.create).toHaveBeenCalledWith({
        user: mockNewUser._id,
        name: mockNewUser.name,
        image: mockNewUser.image,
      });
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.send).toHaveBeenCalledWith({
        success: true,
        message: SUCCESSFULLY_CREATED_USER_MESSAGE,
      });
    });

    it("should handle errors and send 400 status code", async () => {
      const errorMessage = "Error while creating user";

      (handleHashPassword as jest.Mock).mockResolvedValue("hashedPassword123");

      (User.create as jest.Mock).mockRejectedValue(new Error(errorMessage));

      await createNewUser({
        ...mockNewUser,
        res: mockResponse,
      });

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.send).toHaveBeenCalledWith({
        success: false,
        message: errorMessage,
      });
    });
  });

  describe("updateExistingUser", () => {
    it("should update the existing user and return a success response", async () => {
      (User.findOneAndUpdate as jest.Mock).mockResolvedValue(mockNewUser);

      await updateExistingUser({
        email: "john@example.com",
        res: mockResponse,
      });

      expect(User.findOneAndUpdate).toHaveBeenCalledWith(
        { email: "john@example.com" },
        { upsert: true, new: true }
      );
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.send).toHaveBeenCalledWith({
        success: true,
        message: USER_ALREADY_EXIST_MESSAGE,
      });
    });

    it("should handle the error and return a failure response", async () => {
      const errorMessage = "User not found";

      (User.findOneAndUpdate as jest.Mock).mockRejectedValue(
        new Error(errorMessage)
      );

      await updateExistingUser({
        email: "john@example.com",
        res: mockResponse,
      });

      expect(User.findOneAndUpdate).toHaveBeenCalledWith(
        { email: "john@example.com" },
        { upsert: true, new: true }
      );
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.send).toHaveBeenCalledWith({
        success: false,
        user: null,
      });
    });
  });

  describe("createOrUpdateUser", () => {
    it("should call updateExistingUser if user already exists", async () => {
      const mockUpdateExistingUser = jest
        .spyOn(handlers, "updateExistingUser")
        .mockResolvedValue();
      const mockCreateNewUser = jest.spyOn(handlers, "createNewUser");

      const isUserExist = true;

      createOrUpdateUser({
        ...mockRequest.body,
        isUserExist,
        res: mockResponse,
      })
        .then(() => {
          expect(mockUpdateExistingUser).toHaveBeenCalledWith({
            email: mockRequest.body.email,
            res: mockResponse,
          });
          expect(mockCreateNewUser).not.toHaveBeenCalled();
        })
        .catch(() => {
          expect(mockResponse.status).toHaveBeenCalledWith(400);
        });
    });

    it("should call createNewUser if user is not existed", async () => {
      const mockUpdateExistingUser = jest.spyOn(handlers, "updateExistingUser");
      const mockCreateNewUser = jest
        .spyOn(handlers, "createNewUser")
        .mockResolvedValue();

      const isUserExist = false;

      createOrUpdateUser({
        ...mockRequest.body,
        isUserExist,
        res: mockResponse,
      })
        .then(() => {
          expect(mockCreateNewUser).toHaveBeenCalled();
          expect(mockUpdateExistingUser).not.toHaveBeenCalled();
        })
        .catch(() => {
          expect(mockResponse.status).toHaveBeenCalledWith(400);
        });
    });
  });

  describe("handleRequestBasedOnMethod", () => {
    it("should call createOrUpdateUser function and handle success", async () => {
      const mockCreateOrUpdateUser = jest
        .spyOn(handlers, "createOrUpdateUser")
        .mockResolvedValue();

      handleRequestBasedOnMethod({
        ...mockRequest.body,
        method: RequestMethod.POST,
        res: mockResponse,
      })
        .then(() => {
          expect(mockCreateOrUpdateUser).toHaveBeenCalledWith({
            name: mockRequest.body.name,
            email: mockRequest.body.email,
            password: mockRequest.body.password,
            image: undefined,
            isUserExist: undefined,
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

    it("should call createOrUpdateUser function and handle failure", async () => {
      const errorMessage = "User creation failed";

      const mockCreateOrUpdateUser = jest
        .spyOn(handlers, "createOrUpdateUser")
        .mockRejectedValue(new Error(errorMessage));

      handleRequestBasedOnMethod({
        ...mockRequest.body,
        method: RequestMethod.POST,
        res: mockResponse,
      })
        .then(() => {
          expect(mockCreateOrUpdateUser).toHaveBeenCalledWith({
            name: mockRequest.body.name,
            email: mockRequest.body.email,
            password: mockRequest.body.password,
            image: undefined,
            isUserExist: undefined,
            res: mockResponse,
          });
          expect(mockResponse.status).toHaveBeenCalledWith(400);
          expect(mockResponse.send).toHaveBeenCalledWith({
            success: false,
            message: errorMessage,
            user: null,
          });
        })
        .catch(() => {
          expect(mockResponse.status).toHaveBeenCalledWith(400);
        });
    });
  });

  describe("handler", () => {
    it("should connect to MongoDB and call handleRequestBasedOnMethod for an existing user", async () => {
      (User.findOne as jest.Mock).mockResolvedValueOnce({
        email: "john@example.com",
      });
      const mockHandleRequestBasedOnMethod = jest
        .spyOn(handlers, "createOrUpdateUser")
        .mockResolvedValue(undefined);

      handler(mockRequest, mockResponse)
        .then(() => {
          expect(connectMongoDb).toHaveBeenCalled();

          expect(mockHandleRequestBasedOnMethod).toHaveBeenCalledWith({
            ...mockNewUser,
            res: mockResponse,
            isUserExist: true,
            method: RequestMethod.POST,
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
