import { NextApiRequest, NextApiResponse } from "next";

import connectMongoDb from "@/lib/connectMongoDb";
import { Rating } from "@/model/rating";
import { MediaRating } from "@/model/ratingSchema";
import { NO_DATA_IN_REQUEST_BODY_MESSAGE } from "@/modules/auth/auth.constants";
import {
  SUCCESSFULLY_ADD_RATING,
  SUCCESSFULLY_UPDATE_RATING,
  USER_IS_NOT_AUTHORIZED,
} from "@/types/constants";
import { RequestMethod } from "@/types/enums";
import { GetRatingById, UpdateRating } from "@/types/interfaces";
import { convertResponseErrorMessageToCorrectFormat } from "@/utils/utils";

export function handleCaseWithNoBodyReceived(req: NextApiRequest): void {
  if (!req.body) {
    throw new Error(NO_DATA_IN_REQUEST_BODY_MESSAGE);
  }
}

export async function getRatingBasedOnUser({
  req,
  res,
}: Pick<UpdateRating, "res" | "req">): Promise<void> {
  const {
    payload: { user },
  }: GetRatingById = req?.body;

  try {
    if (!user) {
      return res?.status(401).send({
        success: false,
        message: USER_IS_NOT_AUTHORIZED,
        data: null,
      });
    }

    const moviesOrSerialsRatingData = await MediaRating.find({ user: user.id });

    return res?.status(200).send({
      success: true,
      data: moviesOrSerialsRatingData,
    });
  } catch (e) {
    return res
      ?.status(409)
      .send({ success: false, message: (e as Error).message, data: null });
  }
}

export async function addRating(
  data: Rating,
  userId: string,
  res?: NextApiResponse
) {
  try {
    if (!userId) {
      return res?.status(401).send({
        success: false,
        message: USER_IS_NOT_AUTHORIZED,
        data: null,
      });
    }

    const newRating = await MediaRating.create({
      ...data,
      user: userId,
    });

    return res?.status(200).send({
      success: true,
      message: SUCCESSFULLY_ADD_RATING,
      data: { id: newRating.id, rating: newRating.rating },
    });
  } catch (e) {
    return res?.status(409).send({
      success: false,
      message: (e as Error).message,
      data: null,
    });
  }
}

export async function updateExistingRating(
  id: string,
  rating: number,
  res?: NextApiResponse
) {
  try {
    const updatedRating = await MediaRating.findByIdAndUpdate(
      id,
      { rating },
      { new: true }
    );

    return res?.status(200).send({
      success: true,
      message: SUCCESSFULLY_UPDATE_RATING,
      data: { id: updatedRating.id, rating: updatedRating.rating },
    });
  } catch (e) {
    return res
      ?.status(409)
      .send({ success: false, message: (e as Error).message, data: null });
  }
}

export async function addOrUpdateRating(
  existingRating: Rating | null,
  data: Rating,
  id: string,
  res?: NextApiResponse
) {
  if (existingRating) {
    return await updateExistingRating(
      existingRating._id ?? "",
      data.rating,
      res
    );
  } else {
    return await addRating(data, id, res);
  }
}

export async function addOrUpdateRatingToDb({
  req,
  res,
}: Pick<UpdateRating, "res" | "req">) {
  const {
    payload: { data, user },
  } = req?.body;

  try {
    if (!user) {
      return res?.status(401).send({
        success: false,
        message: USER_IS_NOT_AUTHORIZED,
        data: null,
      });
    }

    const existingRating = await MediaRating.findOne({
      user: user.id,
      id: data.id,
    });

    await addOrUpdateRating(existingRating, data, user.id, res);
  } catch (e) {
    return res?.status(409).send({
      success: false,
      message: (e as Error).message,
      data: null,
    });
  }
}

export async function handleRequestBasedOnMethod({
  req,
  res,
  method,
}: UpdateRating): Promise<void> {
  switch (method) {
    case RequestMethod.POST:
      await addOrUpdateRatingToDb({ req, res });
      break;
    case RequestMethod.PUT:
      await getRatingBasedOnUser({ req, res });
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
