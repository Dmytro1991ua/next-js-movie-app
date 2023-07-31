import { compare } from "bcryptjs";
import { NextApiRequest, NextApiResponse } from "next";

import connectMongoDb from "@/lib/connectMongoDb";
import { Avatar } from "@/model/avatarSchema";
import { User } from "@/model/userSchema";
import { NO_DATA_IN_REQUEST_BODY_MESSAGE } from "@/modules/auth/auth.constants";
import {
  SUCCESSFULLY_UPDATE_USER_PROFILE_DATA,
  USER_IS_NOT_AUTHORIZED,
  USER_NOT_FOUND,
} from "@/types/constants";
import { RequestMethod } from "@/types/enums";
import { UpdateProfile, UpdateUserProfilePayload } from "@/types/interfaces";
import {
  convertResponseErrorMessageToCorrectFormat,
  handleHashPassword,
} from "@/utils/utils";

import { DefaultUserWithId } from "../auth/auth";

export function handleCaseWithNoBodyReceived(req: NextApiRequest): void {
  if (!req.body) {
    throw new Error(NO_DATA_IN_REQUEST_BODY_MESSAGE);
  }
}

export async function updatePasswordIfProvided(
  newPassword: string | undefined,
  existingHashedPassword: string
): Promise<string> {
  if (!newPassword) {
    return existingHashedPassword;
  }

  try {
    const isPasswordMatch = await compare(newPassword, existingHashedPassword);

    if (isPasswordMatch) {
      return existingHashedPassword;
    }

    return await handleHashPassword(newPassword);
  } catch (e) {
    throw new Error("Error occurred while hashing the password");
  }
}

export async function updateUserProfile(
  req?: NextApiRequest,
  res?: NextApiResponse
) {
  const {
    payload: { userInfo, user },
  }: UpdateUserProfilePayload = req?.body;

  try {
    if (!user) {
      return res?.status(401).send({
        success: false,
        message: USER_IS_NOT_AUTHORIZED,
        data: null,
      });
    }

    const { name, password, image } = userInfo;
    const { email, id } = user as DefaultUserWithId;

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res?.status(404).send({
        success: false,
        message: USER_NOT_FOUND,
        data: null,
      });
    }

    const hashedPassword = await updatePasswordIfProvided(
      password,
      existingUser.password
    );

    await User.findOneAndUpdate(
      { _id: id },
      {
        name: name ?? existingUser.name,
        password: hashedPassword,
      },
      { new: true }
    );

    await Avatar.findOneAndUpdate(
      { user: id },
      { name: name ?? existingUser.name, image: image ?? existingUser.image },
      { new: true }
    );

    return res?.status(200).send({
      message: SUCCESSFULLY_UPDATE_USER_PROFILE_DATA,
      success: true,
    });
  } catch (e) {
    return res
      ?.status(409)
      .send({ success: false, message: (e as Error).message, data: null });
  }
}

export async function handleRequestBasedOnMethod({
  req,
  res,
  method,
}: UpdateProfile): Promise<void> {
  switch (method) {
    case RequestMethod.PATCH:
      await updateUserProfile(req, res);
      break;
    default:
      return res?.status(400).send({
        success: false,
        message: convertResponseErrorMessageToCorrectFormat(
          method as RequestMethod
        ),
      });
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  await connectMongoDb();

  handleCaseWithNoBodyReceived(req);

  await handleRequestBasedOnMethod({
    req,
    res,
    method: method as RequestMethod,
  });
}
