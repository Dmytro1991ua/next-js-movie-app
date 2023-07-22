import movieTrailer from "movie-trailer";
import { InfiniteData } from "react-query";

import { toastService } from "@/services/toast.service";
import { SliderTitle } from "@/types/enums";
import { MovieOrSerialResult } from "@/types/interfaces";

export const getWarningMessageWhenTrailerNotFound = (name?: string): string => {
  return `No trailers found for ${name}`;
};

export const getYoutubeMovieOrSerialId = (
  url: string,
  onSetTrailerUrl: (value: string | null) => void
): void => {
  const urlParams = new URLSearchParams(new URL(url).search);

  onSetTrailerUrl(urlParams.get("v"));
};

export const getTrailerUrl = async ({
  message,
  onSetTrailer,
  id,
}: {
  message: string;
  onSetTrailer: (value: string | null) => void;
  id?: string | number;
}): Promise<void> => {
  try {
    const url = await movieTrailer(null, { tmdbId: id });

    if (!url) {
      toastService.warn(message);
    }

    getYoutubeMovieOrSerialId(url, onSetTrailer);
  } catch {
    onSetTrailer(null);
  }
};

export const getMoviesOrSerialsPageData = (
  data: InfiniteData<MovieOrSerialResult | null> | undefined
) => {
  return data?.pages?.flatMap((page) => page?.results) ?? [];
};

export const getSeeMorePageTitle = ({
  title,
  isMovie = true,
}: {
  title?: SliderTitle;
  isMovie?: boolean;
}) => {
  return isMovie ? `${title} Movies` : `${title} Serials`;
};

export const getSearchPageTitle = ({
  totalSearchResults,
  searchParam,
}: {
  totalSearchResults: number;
  searchParam: string;
}) => {
  return `Found ${totalSearchResults} results for '${searchParam}'`;
};

export const getTitleForSeeMoreOrSearchPage = ({
  title,
  isMovie = true,
  totalSearchResults,
  searchParam,
  isSearchResultsPage = false,
}: {
  title?: SliderTitle;
  isMovie?: boolean;
  totalSearchResults: number;
  searchParam: string;
  isSearchResultsPage?: boolean;
}) => {
  return isSearchResultsPage
    ? getSearchPageTitle({ totalSearchResults, searchParam })
    : getSeeMorePageTitle({ title, isMovie });
};

export const getMovieOrSerialDataLength = (
  data: InfiniteData<MovieOrSerialResult | null> | undefined
) => {
  return data?.pages?.reduce((counter, page) => {
    return counter + (page?.results?.length ?? 0);
  }, 0);
};
