export enum AppRoutes {
  Default = "/",
  Home = "/home",
  MovieDetails = "/home/[movieId]",
  Movies = "/movies",
  MovieByGenreDetails = "/movies/[movieByGenreId]",
  Serials = "/serials",
  SerialDetails = "/serials/[serialId]",
  SignIn = "/auth/sign-in",
  SignUp = "/auth/sign-up",
  Profile = "/profile",
  SearchMovies = "/search/movie",
  SearchSerials = "/search/tv",
}

export enum RequestMethod {
  GET = "GET",
  POST = "POST",
  DELETE = "DELETE",
  PUT = "PUT",
  PATCH = "PATCH",
}

export enum AuthProvider {
  GitHub = "github",
  Google = "google",
}

export enum QueryString {
  serials = "serials",
  serialDetails = "serialDetails",
  moviesByGenre = "moviesByGenre",
  moviesByGenreDetails = "movieByGenreDetails",
  moviesForHomePage = "moviesForHomePage",
  moviesForHomePageDetails = "moviesForHomePageDetails",
}

export enum SliderTitle {
  PopularMoviesOrSerials = "Popular",
  TopRatedMoviesOrSerials = "Top Rated",
  LatestMoviesOrSerials = "Latest",
  NowPlayingMovies = "Now Playing",
  TrendingMovies = "Trending",
  UpcomingMovies = "Upcoming",
  ActionMovies = "Action",
  ComedyMovies = "Comedy",
  HorrorMovies = "Horror",
  ThrillerMovies = "Thriller",
  HistoryMovies = "History",
  Documentaries = "Documentaries",
  WarMovies = "War",
  WesternMovies = "Western",
  SerialsAiringToday = "Airing Today",
  SerialsOnAir = "On The Air",
}

export enum DetailsBlockTitle {
  Genres = "Genres",
  Casts = "Casts",
  SpokenLanguages = "Spoken Languages",
  ProductionCountries = "Production Countries",
  ProductionCompanies = "Production Companies",
  ReleaseDate = "Release Date",
  FirstAirDate = "First Air Date",
  LastAirDate = "Last Air Date",
  IMDB = "IMDB",
  Revenue = "Revenue",
  NumberOfSeasons = "Number of seasons",
  NumberOfEpisodes = "Number of episodes",
  Runtime = "Runtime(min)",
  Status = "Status",
}

export enum DetailsPageActionButtons {
  HomePage = "Home Page",
  GoBack = "Go Back",
  Play = "Play Trailer",
}

export enum HeroContentActionButtons {
  ViewDetails = "View Details",
  Play = "Play Trailer",
}

export enum SeeMorePageRoutes {
  NowPlaying = "/home/now-playing",
  Popular = "/home/popular",
  TopRated = "/home/top-rated",
  Trending = "/home/trending",
  Upcoming = "/home/upcoming",
  ActionMovies = "/movies/action",
  ComedyMovies = "/movies/comedy",
  HorrorMovies = "/movies/horror",
  ThrillerMovies = "/movies/thriller",
  HistoryMovies = "/movies/history",
  Documentaries = "/movies/documentaries",
  WarMovies = "/movies/war",
  WesternMovies = "/movies/western",
  PopularSerials = "/serials/popular",
  TopRatedSerials = "/serials/top-rated",
  SerialsAiringToday = "/serials/airing-today",
  SerialsOnAir = "/serials/on-air",
}

export enum SeeMorePageQueryString {
  PopularMovies = "Popular Movies",
  TopRatedMovies = "Top Rated Movies",
  NowPlayingMovies = "Now Playing",
  TrendingMovies = "Trending",
  UpcomingMovies = "Upcoming",
  ActionMovies = "Action",
  ComedyMovies = "Comedy",
  HorrorMovies = "Horror",
  ThrillerMovies = "Thriller",
  HistoryMovies = "History",
  Documentaries = "Documentaries",
  WarMovies = "War",
  WesternMovies = "Western",
  SerialsAiringToday = "Airing Today",
  SerialsOnAir = "On The Air",
  PopularSerials = "Popular Serials",
  TopRatedSerials = "Top Rated Serials",
}
