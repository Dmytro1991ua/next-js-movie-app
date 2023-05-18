import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

import connectMongoDb from "@/lib/connectMongoDb";
import { Favorites } from "@/model/favoritesSchema";
import { RequestMethod } from "@/types/enums";
import {
  AddToFavorite,
  AddToFavoritePayload,
  GetAvailableMoviesOrSerialsPayload,
  RemoveFromFavoritePayload,
} from "@/types/interfaces";
import { convertResponseErrorMessageToCorrectFormat } from "@/utils/utils";

import {
  FAVORITES_DATA_IS_NOT_FIND_BY_ID,
  SUCCESSFULLY_ADD_TO_FAVORITE,
  SUCCESSFULLY_REMOVE_FROM_FAVORITE,
  USER_IS_NOT_AUTHORIZED,
} from "./../../../types/constants";

async function getAvailableFavoritesMoviesOrSerials({
  req,
  res,
}: Pick<AddToFavorite, "res" | "req">) {
  const {
    payload: { user },
  }: GetAvailableMoviesOrSerialsPayload = req?.body;

  try {
    if (!user) {
      res?.status(401).send({
        success: false,
        message: USER_IS_NOT_AUTHORIZED,
        data: null,
      });
    }

    const favoritesMovieOrSerialData = await Favorites.find({ user: user.id });

    res?.status(200).send({
      success: true,
      data: favoritesMovieOrSerialData,
    });
  } catch (e) {
    res
      ?.status(409)
      .send({ success: false, message: (e as Error).message, data: null });
  }
}

async function addToFavorites({
  req,
  res,
}: Pick<AddToFavorite, "res" | "req">) {
  const {
    payload: { favorites, user },
  }: AddToFavoritePayload = req?.body;

  try {
    if (!user) {
      res?.status(401).send({
        success: false,
        message: USER_IS_NOT_AUTHORIZED,
        data: null,
      });
    }

    const favoritesMovieOrSerialData = new Favorites({
      ...favorites,
      user: user.id,
      isFavorite: true,
    });

    await favoritesMovieOrSerialData.save();

    res?.status(200).send({
      success: true,
      message: SUCCESSFULLY_ADD_TO_FAVORITE,
      data: favoritesMovieOrSerialData,
    });
  } catch (err) {
    res
      ?.status(409)
      .send({ success: false, message: (err as Error).message, data: null });
  }
}

async function removeFromFavorites({
  req,
  res,
}: Pick<AddToFavorite, "res" | "req">) {
  const {
    payload: { id, user },
  }: RemoveFromFavoritePayload = req?.body;

  try {
    const favoriteMovieOrSerial = await Favorites.findById(id);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res?.status(404).send({
        success: false,
        message: FAVORITES_DATA_IS_NOT_FIND_BY_ID,
        data: null,
      });
    }

    if (favoriteMovieOrSerial.user !== user.id) {
      res?.status(401).send({
        success: false,
        message: USER_IS_NOT_AUTHORIZED,
        data: null,
      });
    }

    await Favorites.findByIdAndDelete(id);

    res?.status(200).send({
      success: true,
      message: SUCCESSFULLY_REMOVE_FROM_FAVORITE,
      data: id,
    });
  } catch (e) {
    res
      ?.status(409)
      .send({ success: false, message: (e as Error).message, data: null });
  }
}

async function handleRequestBasedOnMethod({
  req,
  res,
  method,
}: AddToFavorite): Promise<void> {
  switch (method) {
    case RequestMethod.POST:
      await getAvailableFavoritesMoviesOrSerials({ req, res });
      await addToFavorites({ req, res });
      break;
    case RequestMethod.DELETE:
      await removeFromFavorites({ req, res });
      break;
    default:
      res?.status(400).send({
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

  await handleRequestBasedOnMethod({
    req,
    res,
    method: method as RequestMethod,
  });
}
