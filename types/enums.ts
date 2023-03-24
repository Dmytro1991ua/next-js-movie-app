export enum AppRoutes {
  Default = "/",
  Home = "/home",
  Movies = "/movies",
  Serials = "/serials",
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
  moviesByGenre = "moviesByGenre",
  moviesForHomePage = "moviesForHomePage",
}
