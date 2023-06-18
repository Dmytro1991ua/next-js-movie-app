import { NextApiRequest, NextApiResponse } from "next";

import connectMongoDb from "@/lib/connectMongoDb";
import { Avatar } from "@/model/avatarSchema";
import { User } from "@/model/userSchema";
import {
  NO_DATA_IN_REQUEST_BODY_MESSAGE,
  SUCCESSFULLY_CREATED_USER_MESSAGE,
  USER_ALREADY_EXIST_MESSAGE,
} from "@/modules/auth/auth.constants";
import { RequestMethod } from "@/types/enums";
import { CreateUser, UpdateExistingUser } from "@/types/interfaces";
import {
  convertResponseErrorMessageToCorrectFormat,
  handleHashPassword,
} from "@/utils/utils";

function handleCaseWithNoBodyReceived(req: NextApiRequest): void {
  if (!req.body) {
    throw new Error(NO_DATA_IN_REQUEST_BODY_MESSAGE);
  }
}

async function createNewUser({
  name,
  email,
  password,
  image,
  res,
}: CreateUser) {
  const hashedPassword = await handleHashPassword(password);

  try {
    const newUser = await User.create({
      name,
      password: hashedPassword,
      email,
    });

    const newAvatarDocument = await Avatar.create({
      user: newUser._id,
      name,
      image: image ?? "",
    });

    await newAvatarDocument.save();

    res.status(200).send({
      success: true,
      message: SUCCESSFULLY_CREATED_USER_MESSAGE,
    });
  } catch (err) {
    res.status(400).send({ success: false, message: (err as Error).message });
  }
}

async function createOrUpdateUser({
  name,
  email,
  password,
  image,
  isUserExist,
  res,
}: CreateUser) {
  if (isUserExist) {
    await updateExistingUser({ email, res });
  } else {
    await createNewUser({ name, email, password, image, res });
  }
}

async function updateExistingUser({ email, res }: UpdateExistingUser) {
  try {
    const filterUsersById = { email };
    const filterOptions = {
      upsert: true,
      new: true,
    };

    const updatedUser = await User.findOneAndUpdate(
      filterUsersById,
      filterOptions
    );
    res.status(200).send({
      success: true,
      message: USER_ALREADY_EXIST_MESSAGE,
      user: updatedUser,
    });
  } catch (err) {
    res.status(400).send({ success: false, user: null });
  }
}

async function handleRequestBasedOnMethod({
  name,
  email,
  password,
  image,
  res,
  isUserExist,
  method,
}: CreateUser): Promise<void> {
  switch (method) {
    case RequestMethod.POST:
      try {
        await createOrUpdateUser({
          name,
          email,
          password,
          image,
          isUserExist,
          res,
        });
      } catch (err) {
        res.status(400).send({
          success: false,
          message: (err as Error).message,
          user: null,
        });
      }
      break;
    default:
      res.status(400).send({
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
  const { name, email, password, image } = req.body;
  const { method } = req;

  await connectMongoDb();

  handleCaseWithNoBodyReceived(req);

  const existUser = await User.findOne({ email });

  await handleRequestBasedOnMethod({
    name,
    email,
    password,
    image,
    res,
    isUserExist: !!existUser,
    method: method as RequestMethod,
  });
}
