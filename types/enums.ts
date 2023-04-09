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
