import clsx from "clsx";
import { shuffle } from "lodash";
import Link from "next/link";
import { NextRouter } from "next/router";
import { AiTwotoneHome } from "react-icons/ai";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { v4 as uuidv4 } from "uuid";

import DetailsBlock from "@/components/DetailsPage/DetailsBlock";
import Slider from "@/components/Slider";
import { Cast, MovieOrSerialDetail } from "@/model/common";
import {
  AppRoutes,
  DetailsBlockTitle,
  DetailsPageActionButtons,
  RequestMethod,
  SliderTitle,
} from "@/types/enums";
import {
  AppPageData,
  DetailsBlockWithPillsConfig,
  DetailsPageActionButton,
  MovieOrSerialWithRegularSubtitle,
  PageSlider,
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
      route,
    },
    {
      id: uuidv4(),
      data: data?.comedyMovies?.results ?? [],
      title: SliderTitle.ComedyMovies,
      className: commonClassName,
      isMoviesPage,
      route,
    },
    {
      id: uuidv4(),
      data: data?.documentariesMovies?.results ?? [],
      title: SliderTitle.Documentaries,
      className: commonClassName,
      isMoviesPage,
      route,
    },
    {
      id: uuidv4(),
      data: data?.historyMovies?.results ?? [],
      title: SliderTitle.HistoryMovies,
      className: commonClassName,
      isMoviesPage,
      route,
    },
    {
      id: uuidv4(),
      data: data?.horrorMovies?.results ?? [],
      title: SliderTitle.HorrorMovies,
      className: commonClassName,
      isMoviesPage,
      route,
    },
    {
      id: uuidv4(),
      data: data?.nowPlayingMovies?.results ?? [],
      title: SliderTitle.NowPlayingMovies,
      className: commonClassName,
      isHomePage,
      route,
    },
    {
      id: uuidv4(),
      data: data?.popularMovies?.results ?? [],
      title: SliderTitle.PopularMoviesOrSerials,
      className: commonClassName,
      isHomePage,
      route,
    },
    {
      id: uuidv4(),
      data: data?.popularSerials?.results ?? [],
      title: SliderTitle.PopularMoviesOrSerials,
      className: commonClassName,
      isSerialsPage,
      route,
    },
    {
      id: uuidv4(),
      data: data?.serialsAiringToday?.results ?? [],
      title: SliderTitle.SerialsAiringToday,
      className: commonClassName,
      isSerialsPage,
      route,
    },
    {
      id: uuidv4(),
      data: data?.serialsOnAir?.results ?? [],
      title: SliderTitle.SerialsOnAir,
      className: commonClassName,
      isSerialsPage,
      route,
    },
    {
      id: uuidv4(),
      data: data?.thrillerMovies?.results ?? [],
      title: SliderTitle.ThrillerMovies,
      className: commonClassName,
      isMoviesPage,
      route,
    },
    {
      id: uuidv4(),
      data: data?.topRatedMovies?.results ?? [],
      title: SliderTitle.TopRatedMoviesOrSerials,
      className: commonClassName,
      isHomePage,
      route,
    },
    {
      id: uuidv4(),
      data: data?.topRatedSerials?.results ?? [],
      title: SliderTitle.TopRatedMoviesOrSerials,
      className: commonClassName,
      isSerialsPage,
      route,
    },
    {
      id: uuidv4(),
      data: data?.trendingMovies?.results ?? [],
      title: SliderTitle.TrendingMovies,
      className: commonClassName,
      isHomePage,
      route,
    },
    {
      id: uuidv4(),
      data: data?.upcomingMovies?.results ?? [],
      title: SliderTitle.UpcomingMovies,
      className: commonClassName,
      isHomePage,
      route,
    },
    {
      id: uuidv4(),
      data: data?.warMovies?.results ?? [],
      title: SliderTitle.WarMovies,
      className: commonClassName,
      isMoviesPage,
      route,
    },
    {
      id: uuidv4(),
      data: data?.westernMovies?.results ?? [],
      title: SliderTitle.WesternMovies,
      className: commonClassName,
      isMoviesPage,
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
        }) => (
          <>
            {(isHomePage || isMoviesPage || isSerialsPage) && (
              <Slider
                key={uuidv4()}
                className={className}
                data={shuffle(data)}
                route={route}
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
      subtitle: movieOrSerialDetails?.vote_average,
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
  router,
}: {
  movieOrSerialDetails?: MovieOrSerialDetail;
  router: NextRouter;
}): DetailsPageActionButton[] => {
  const commonIconClassName = "ml-2";

  const lastSlashIndex = router.asPath.lastIndexOf("/");
  const previousPath = router.asPath.slice(0, lastSlashIndex);

  return [
    {
      id: uuidv4(),
      url: movieOrSerialDetails?.homepage ?? "",
      icon: <AiTwotoneHome className={commonIconClassName} />,
      rel: "noreferrer",
      target: "_blank",
      label: DetailsPageActionButtons.HomePage,
      className:
        "details-page-link bg-lighterBlue hover:bg-blue focus:ring-lighterBlue",
      disabledClassName: !movieOrSerialDetails?.homepage
        ? "pointer-events-none opacity-50"
        : "pointer-events-auto",
    },
    {
      id: uuidv4(),
      url: previousPath,
      icon: <BsFillArrowLeftCircleFill className={commonIconClassName} />,
      label: DetailsPageActionButtons.GoBack,
      className:
        "details-page-link bg-mantis hover:bg-mantisDarker focus:ring-mantis",
    },
  ];
};

export const getDetailsPageActionButtons = ({
  movieOrSerialDetails,
  router,
}: {
  movieOrSerialDetails?: MovieOrSerialDetail;
  router: NextRouter;
}) => {
  const detailsPageActionButtons = detailsPageActionButtonsConfig({
    movieOrSerialDetails,
    router,
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
        }) => (
          <Link key={id} passHref href={url}>
            <a
              className={clsx(className, [!url && disabledClassName])}
              rel={rel}
              target={target}
            >
              {label} {icon}
            </a>
          </Link>
        )
      )}
    </>
  );
};
