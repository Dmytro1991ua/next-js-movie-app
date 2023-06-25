import { NextApiRequest, NextApiResponse } from "next";

import connectMongoDb from "@/lib/connectMongoDb";
import { Avatar } from "@/model/avatarSchema";
import { NO_DATA_IN_REQUEST_BODY_MESSAGE } from "@/modules/auth/auth.constants";
import { USER_IS_NOT_AUTHORIZED } from "@/types/constants";
import { RequestMethod } from "@/types/enums";
import { GetUserAvatarPayload, UpdateRating } from "@/types/interfaces";
import { convertResponseErrorMessageToCorrectFormat } from "@/utils/utils";

function handleCaseWithNoBodyReceived(req: NextApiRequest): void {
  if (!req.body) {
    throw new Error(NO_DATA_IN_REQUEST_BODY_MESSAGE);
  }
}

async function getUserAvatar({
  req,
  res,
}: Pick<UpdateRating, "res" | "req">): Promise<void> {
  const {
    payload: { user },
  }: GetUserAvatarPayload = req?.body;

  try {
    if (!user) {
      return res?.status(401).send({
        success: false,
        message: USER_IS_NOT_AUTHORIZED,
        data: null,
      });
    }

    const userAvatar = await Avatar.findOne({ user: user.id });

    return res?.status(200).send({
      success: true,
      data: { image: userAvatar.image, name: userAvatar.name },
    });
  } catch (e) {
    return res
      ?.status(409)
      .send({ success: false, message: (e as Error).message, data: null });
  }
}

async function handleRequestBasedOnMethod({
  req,
  res,
  method,
}: UpdateRating): Promise<void> {
  switch (method) {
    case RequestMethod.PUT:
      await getUserAvatar({ req, res });
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
