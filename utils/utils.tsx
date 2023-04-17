import clsx from "clsx";
import { shuffle } from "lodash";
import movieTrailer from "movie-trailer";
import Link from "next/link";
import { NextRouter } from "next/router";
import { AiFillPlayCircle, AiTwotoneHome } from "react-icons/ai";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { InfiniteData, QueryClient, dehydrate } from "react-query";
import { v4 as uuidv4 } from "uuid";

import Button from "@/components/Button";
import DetailsBlock from "@/components/DetailsPage/DetailsBlock";
import Slider from "@/components/Slider";
import { Cast, MovieOrSerialDetail } from "@/model/common";
import { toastService } from "@/services/toast.service";
import {
  AppRoutes,
  DetailsBlockTitle,
  DetailsPageActionButtons,
  HeroContentActionButtons,
  QueryString,
  RequestMethod,
  SeeMorePageRoutes,
  SliderTitle,
} from "@/types/enums";
import {
  AppPageData,
  DetailsBlockWithPillsConfig,
  DetailsPageActionButton,
  HeroContentActionButton,
  HeroContentActionButtonConfig,
  HomePageData,
  MovieOrSerialDetailsData,
  MovieOrSerialResult,
  MovieOrSerialWithRegularSubtitle,
  MoviesPageData,
  PageSlider,
  SerialsPageData,
  SliderConfig,
} from "@/types/interfaces";

export const convertResponseErrorMessageToCorrectFormat = (
  method: RequestMethod
): string =>
  `The request method is not valid. Only the ${method} method is accepted`;

export const getResponseErrorMessage = (isSerials = false): string => {
  return `Failed to load ${isSerials ? "Serials" : "Movies"}`;
};

export const getResponseErrorMessageForDetailsPage = (
  isSerial = false
): string => {
  return `Failed to load ${isSerial ? "Serial" : "Movie"} details`;
};

const sliderConfig = <T extends AppPageData>({
  data,
  isHomePage,
  isMoviesPage,
  isSerialsPage,
  route,
}: PageSlider<T>): SliderConfig[] => {
  const commonClassName = "mb-4";

  return [
    {
      id: uuidv4(),
      data: data?.actionMovies?.results ?? [],
      title: SliderTitle.ActionMovies,
      className: commonClassName,
      isMoviesPage,
      seeMoreRoute: SeeMorePageRoutes.ActionMovies,
      route,
    },
    {
      id: uuidv4(),
      data: data?.comedyMovies?.results ?? [],
      title: SliderTitle.ComedyMovies,
      className: commonClassName,
      isMoviesPage,
      seeMoreRoute: SeeMorePageRoutes.ComedyMovies,
      route,
    },
    {
      id: uuidv4(),
      data: data?.documentariesMovies?.results ?? [],
      title: SliderTitle.Documentaries,
      className: commonClassName,
      isMoviesPage,
      seeMoreRoute: SeeMorePageRoutes.Documentaries,
      route,
    },
    {
      id: uuidv4(),
      data: data?.historyMovies?.results ?? [],
      title: SliderTitle.HistoryMovies,
      className: commonClassName,
      isMoviesPage,
      seeMoreRoute: SeeMorePageRoutes.HistoryMovies,
      route,
    },
    {
      id: uuidv4(),
      data: data?.horrorMovies?.results ?? [],
      title: SliderTitle.HorrorMovies,
      className: commonClassName,
      isMoviesPage,
      seeMoreRoute: SeeMorePageRoutes.HorrorMovies,
      route,
    },
    {
      id: uuidv4(),
      data: data?.nowPlayingMovies?.results ?? [],
      title: SliderTitle.NowPlayingMovies,
      className: commonClassName,
      isHomePage,
      seeMoreRoute: SeeMorePageRoutes.NowPlaying,
      route,
    },
    {
      id: uuidv4(),
      data: data?.popularMovies?.results ?? [],
      title: SliderTitle.PopularMoviesOrSerials,
      className: commonClassName,
      isHomePage,
      seeMoreRoute: SeeMorePageRoutes.Popular,
      route,
    },
    {
      id: uuidv4(),
      data: data?.popularSerials?.results ?? [],
      title: SliderTitle.PopularMoviesOrSerials,
      className: commonClassName,
      isSerialsPage,
      seeMoreRoute: SeeMorePageRoutes.PopularSerials,
      route,
    },
    {
      id: uuidv4(),
      data: data?.serialsAiringToday?.results ?? [],
      title: SliderTitle.SerialsAiringToday,
      className: commonClassName,
      isSerialsPage,
      seeMoreRoute: SeeMorePageRoutes.SerialsAiringToday,
      route,
    },
    {
      id: uuidv4(),
      data: data?.serialsOnAir?.results ?? [],
      title: SliderTitle.SerialsOnAir,
      className: commonClassName,
      isSerialsPage,
      seeMoreRoute: SeeMorePageRoutes.SerialsOnAir,
      route,
    },
    {
      id: uuidv4(),
      data: data?.thrillerMovies?.results ?? [],
      title: SliderTitle.ThrillerMovies,
      className: commonClassName,
      isMoviesPage,
      seeMoreRoute: SeeMorePageRoutes.ThrillerMovies,
      route,
    },
    {
      id: uuidv4(),
      data: data?.topRatedMovies?.results ?? [],
      title: SliderTitle.TopRatedMoviesOrSerials,
      className: commonClassName,
      isHomePage,
      seeMoreRoute: SeeMorePageRoutes.TopRated,
      route,
    },
    {
      id: uuidv4(),
      data: data?.topRatedSerials?.results ?? [],
      title: SliderTitle.TopRatedMoviesOrSerials,
      className: commonClassName,
      isSerialsPage,
      seeMoreRoute: SeeMorePageRoutes.TopRatedSerials,
      route,
    },
    {
      id: uuidv4(),
      data: data?.trendingMovies?.results ?? [],
      title: SliderTitle.TrendingMovies,
      className: commonClassName,
      isHomePage,
      seeMoreRoute: SeeMorePageRoutes.Trending,
      route,
    },
    {
      id: uuidv4(),
      data: data?.upcomingMovies?.results ?? [],
      title: SliderTitle.UpcomingMovies,
      className: commonClassName,
      isHomePage,
      seeMoreRoute: SeeMorePageRoutes.Upcoming,
      route,
    },
    {
      id: uuidv4(),
      data: data?.warMovies?.results ?? [],
      title: SliderTitle.WarMovies,
      className: commonClassName,
      isMoviesPage,
      seeMoreRoute: SeeMorePageRoutes.WarMovies,
      route,
    },
    {
      id: uuidv4(),
      data: data?.westernMovies?.results ?? [],
      title: SliderTitle.WesternMovies,
      className: commonClassName,
      isMoviesPage,
      seeMoreRoute: SeeMorePageRoutes.WesternMovies,
      route,
    },
  ];
};

export const getPageSlider = <T,>({
  data,
  isHomePage,
  isMoviesPage,
  isSerialsPage,
  route,
}: PageSlider<T>): JSX.Element => {
  const availableSliders = sliderConfig({
    data: data as AppPageData,
    isHomePage,
    isMoviesPage,
    isSerialsPage,
    route,
  });

  return (
    <>
      {availableSliders.map(
        ({
          data,
          title,
          className,
          isHomePage,
          isMoviesPage,
          isSerialsPage,
          route,
          seeMoreRoute,
        }) => (
          <>
            {(isHomePage || isMoviesPage || isSerialsPage) && (
              <Slider
                key={uuidv4()}
                className={className}
                data={shuffle(data)}
                route={route}
                seeMoreRoute={seeMoreRoute}
                title={title}
              />
            )}
          </>
        )
      )}
    </>
  );
};

export const isRouteActive = ({
  asPath,
  pathname,
  url,
}: {
  asPath: string;
  pathname: string;
  url: string;
}): boolean => {
  const homeDetailsPageRoute =
    url === AppRoutes.Home && pathname === AppRoutes.MovieDetails;
  const moviesDetailsPageRoute =
    url === AppRoutes.Movies && pathname === AppRoutes.MovieByGenreDetails;
  const serialsDetailsPageRoute =
    url === AppRoutes.Serials && pathname === AppRoutes.SerialDetails;

  return (
    asPath === url ||
    homeDetailsPageRoute ||
    moviesDetailsPageRoute ||
    serialsDetailsPageRoute
  );
};

export const handleRedirectToDetailsPage = ({
  router,
  route,
  id,
}: {
  router: NextRouter;
  route?: AppRoutes;
  id?: number;
}) => {
  router.push(`${route}/${id}`);
};

export const convertRevenueNumberToMoneyFormat = (revenue?: number) => {
  return revenue?.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};

export const getCorrectReleaseOrFirDateAirValue = (
  releaseDate?: string
): DetailsBlockTitle => {
  return releaseDate
    ? DetailsBlockTitle.ReleaseDate
    : DetailsBlockTitle.FirstAirDate;
};

export const detailsSubtitleWithPillsConfig = (
  movieOrSerialDetails?: MovieOrSerialDetail,
  movieCast?: Cast
): DetailsBlockWithPillsConfig[] => {
  const commonClassName = "mb-4";

  return [
    {
      id: uuidv4(),
      hasSubtitlePill: true,
      className: commonClassName,
      list: movieOrSerialDetails?.genres ?? [],
      position: "column",
      title: DetailsBlockTitle.Genres,
    },
    {
      id: uuidv4(),
      hasSubtitlePill: true,
      className: commonClassName,
      list: movieCast?.cast ?? [],
      position: "column",
      title: DetailsBlockTitle.Casts,
    },
    {
      id: uuidv4(),
      hasSubtitlePill: true,
      className: commonClassName,
      list: movieOrSerialDetails?.spoken_languages ?? [],
      position: "column",
      title: DetailsBlockTitle.SpokenLanguages,
    },
    {
      id: uuidv4(),
      hasSubtitlePill: true,
      className: commonClassName,
      list: movieOrSerialDetails?.production_countries ?? [],
      position: "column",
      title: DetailsBlockTitle.ProductionCountries,
    },
    {
      id: uuidv4(),
      hasSubtitlePill: true,
      list: movieOrSerialDetails?.production_companies ?? [],
      position: "column",
      title: DetailsBlockTitle.ProductionCompanies,
    },
  ];
};

export const movieOrSerialReleaseConfig = (
  movieOrSerialDetails?: MovieOrSerialDetail
): MovieOrSerialWithRegularSubtitle[] => {
  const commonClassName = "mr-8";

  return [
    {
      id: uuidv4(),
      subtitle:
        movieOrSerialDetails?.release_date ??
        movieOrSerialDetails?.first_air_date ??
        "",
      className: commonClassName,
      position: "column",
      title: getCorrectReleaseOrFirDateAirValue(
        movieOrSerialDetails?.release_date
      ),
    },
    {
      id: uuidv4(),
      subtitle: movieOrSerialDetails?.last_air_date,
      className: commonClassName,
      position: "column",
      title: DetailsBlockTitle.LastAirDate,
    },
    {
      id: uuidv4(),
      subtitle: movieOrSerialDetails?.vote_average ?? 0,
      position: "column",
      title: DetailsBlockTitle.IMDB,
    },
  ];
};

export const movieOrSerialRevenueOrSeasonsDetailsConfig = (
  movieOrSerialDetails?: MovieOrSerialDetail
): MovieOrSerialWithRegularSubtitle[] => {
  const commonClassName = "mr-8";

  return [
    {
      id: uuidv4(),
      subtitle: convertRevenueNumberToMoneyFormat(
        movieOrSerialDetails?.revenue
      ),
      className: commonClassName,
      position: "column",
      title: DetailsBlockTitle.Revenue,
    },
    {
      id: uuidv4(),
      subtitle: movieOrSerialDetails?.number_of_seasons,
      className: commonClassName,
      position: "column",
      title: DetailsBlockTitle.NumberOfSeasons,
    },
    {
      id: uuidv4(),
      subtitle: movieOrSerialDetails?.number_of_episodes,
      className: commonClassName,
      position: "column",
      title: DetailsBlockTitle.NumberOfEpisodes,
    },
    {
      id: uuidv4(),
      subtitle: `${
        movieOrSerialDetails?.runtime ??
        movieOrSerialDetails?.episode_run_time?.[0] ??
        []
      }`,
      className: commonClassName,
      position: "column",
      title: DetailsBlockTitle.Runtime,
    },
    {
      id: uuidv4(),
      subtitle: movieOrSerialDetails?.status,
      position: "column",
      title: DetailsBlockTitle.Status,
    },
  ];
};

export const getDetailsBlockByConfig = ({
  config,
  movieOrSerialDetails,
  movieOrSerialCast,
}: {
  config: (
    movieOrSerialDetails?: MovieOrSerialDetail,
    movieOrSerialCast?: Cast
  ) => (DetailsBlockWithPillsConfig & MovieOrSerialWithRegularSubtitle)[];
  movieOrSerialDetails?: MovieOrSerialDetail;
  movieOrSerialCast?: Cast;
}): JSX.Element => {
  const configList = config(movieOrSerialDetails, movieOrSerialCast);

  return (
    <>
      {configList.map(
        ({
          id,
          position,
          title,
          className,
          hasSubtitlePill,
          list,
          subtitle,
        }) => (
          <DetailsBlock
            key={id}
            className={className}
            hasSubtitlePill={hasSubtitlePill}
            list={list}
            position={position}
            subtitle={subtitle}
            title={title}
          />
        )
      )}
    </>
  );
};

export const detailsPageActionButtonsConfig = ({
  movieOrSerialDetails,
  onPlayBtnClick,
}: {
  movieOrSerialDetails?: MovieOrSerialDetail;
  router: NextRouter;
  onPlayBtnClick: () => void;
}): DetailsPageActionButton[] => {
  const commonIconClassName = "ml-2";

  return [
    {
      id: uuidv4(),
      url: movieOrSerialDetails?.homepage ?? "",
      icon: <AiTwotoneHome className={commonIconClassName} />,
      rel: "noreferrer",
      target: "_blank",
      label: DetailsPageActionButtons.HomePage,
      className: "bg-lighterBlue hover:bg-blue focus:ring-lighterBlue",
      disabledClassName: !movieOrSerialDetails?.homepage
        ? "pointer-events-none opacity-50"
        : "pointer-events-auto",
    },
    {
      id: uuidv4(),
      url: "#",
      icon: <AiFillPlayCircle className={commonIconClassName} />,
      label: DetailsPageActionButtons.Play,
      className: "bg-lighterBlue hover:bg-blue focus:ring-lighterBlue",
      onClick: (e) => {
        e.preventDefault();
        onPlayBtnClick();
      },
    },
  ];
};

export const getDetailsPageActionButtons = ({
  movieOrSerialDetails,
  router,
  onPlayBtnClick,
}: {
  movieOrSerialDetails?: MovieOrSerialDetail;
  router: NextRouter;
  onPlayBtnClick: () => void;
}) => {
  const detailsPageActionButtons = detailsPageActionButtonsConfig({
    movieOrSerialDetails,
    router,
    onPlayBtnClick,
  });

  return (
    <>
      {detailsPageActionButtons.map(
        ({
          icon,
          id,
          label,
          url,
          className,
          disabledClassName,
          rel,
          target,
          onClick,
        }) => (
          <Link key={id} passHref href={url}>
            <a
              className={clsx(
                `flex items-center justify-center w-fit	focus:outline-none  focus:ring-2 focus:ring-opacity-50 transition ease-in-out duration-300 rounded-lg ${className}`,
                [!url && disabledClassName]
              )}
              rel={rel}
              style={{ padding: "0.8rem 1.2rem" }}
              target={target}
              onClick={(e) => onClick && onClick(e)}
            >
              {label} {icon}
            </a>
          </Link>
        )
      )}
    </>
  );
};

export const getTruncatedLongText = (text: string, limit: number): string => {
  return text.slice(0, limit);
};

export const heroContentActionButtonsConfig = ({
  onDetailsBtnClick,
  onPlayBtnClick,
}: HeroContentActionButtonConfig): HeroContentActionButton[] => {
  return [
    {
      id: uuidv4(),
      label: HeroContentActionButtons.ViewDetails,
      icon: <BsFillInfoCircleFill />,
      variant: "primary",
      onClick: onDetailsBtnClick,
    },
    {
      id: uuidv4(),
      label: HeroContentActionButtons.Play,
      icon: <AiFillPlayCircle />,
      variant: "secondary",
      onClick: onPlayBtnClick,
    },
  ];
};

export const getHeroContentActionButtons = ({
  onDetailsBtnClick,
  onPlayBtnClick,
}: HeroContentActionButtonConfig) => {
  const heroContentActionButtons = heroContentActionButtonsConfig({
    onDetailsBtnClick,
    onPlayBtnClick,
  });

  return (
    <div className="flex gap-2">
      {heroContentActionButtons.map(({ icon, id, label, variant, onClick }) => (
        <Button key={id} variant={variant} onClick={onClick}>
          {icon}&nbsp;{label}
        </Button>
      ))}
    </div>
  );
};

export const getWarningMessageWhenTrailerNotFound = (name?: string): string => {
  return `No trailers found for ${name}`;
};

export const getYoutubeMoveOrSerialId = (
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
}) => {
  try {
    const url = await movieTrailer(null, { tmdbId: id });

    if (!url) {
      toastService.warn(message);
    }

    getYoutubeMoveOrSerialId(url, onSetTrailer);
  } catch {
    onSetTrailer(null);
  }
};

export const prefetchMovieOrSerialData = async <
  T extends HomePageData | MoviesPageData | SerialsPageData
>(
  queryString: QueryString,
  fetcher: () => Promise<T>
) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(queryString, fetcher);

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
};

export const prefetchMovieOrSerialDetailsData = async ({
  id,
  queryString,
  fetcher,
}: {
  id: string;
  queryString: QueryString;
  fetcher: (id: string) => Promise<MovieOrSerialDetailsData>;
}) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(queryString, () => fetcher(id));

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
};

export const getMoviesOrSerialsPageData = (
  data: InfiniteData<MovieOrSerialResult | null> | undefined
) => {
  return data?.pages.flatMap((page) => page?.results) ?? [];
};

export const getSeeMorePageTitle = ({
  title,
  isMovie = true,
}: {
  title: SliderTitle;
  isMovie?: boolean;
}) => {
  return isMovie ? `${title} Movies` : `${title} Serials`;
};
