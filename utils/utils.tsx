import { shuffle } from "lodash";
import { v4 as uuidv4 } from "uuid";

import Slider from "@/components/Slider";
import { AppRoutes, RequestMethod, SliderTitle } from "@/types/enums";
import { AppPageData, PageSlider, SliderConfig } from "@/types/interfaces";

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
      {availableSliders.map((slider) => (
        <>
          {(slider.isHomePage ||
            slider.isMoviesPage ||
            slider.isSerialsPage) && (
            <Slider
              key={uuidv4()}
              className={slider.className}
              data={shuffle(slider.data)}
              route={slider.route}
              title={slider.title}
            />
          )}
        </>
      ))}
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
