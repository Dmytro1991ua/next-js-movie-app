# Movie Room
Welcome to the `Movie Room` project, a platform where you can explore a vast collection of movies and TV series using The Movie Database (TMDB) API. Additionally, this project features a custom backend powered by MongoDB for managing your movie preferences, such as adding to favorites or applying a custom ration to a particular movie/TV serial, updating the user's profile data, etc.

![hero](https://github.com/Dmytro1991ua/next-js-movie-app/assets/61331410/b6e59f32-5e07-4648-b046-4a3c4318c10d)

## Motivation

This project is a labor of love that originated from the desire to gain hands-on experience with cutting-edge web development technologies and tools. I set out with several goals in mind:

- `Learn Next.js 12`: Next.js is a powerful and popular framework for building React applications. By using Next.js 12, I aimed to explore its latest features and capabilities.

- `Implement Authentication with Next Auth`: Security and user authentication are crucial aspects of any web application. I chose Next Auth to simplify the implementation of authentication and user management.

- `Utilize The Movie Database (TMDB) API`: Leveraging external APIs, like TMDB, allowed us to work with real-world data, create engaging user experiences, and learn about API integration.

- `Practice MongoDB with Mongoose`: Building a custom backend with MongoDB and Mongoose was an opportunity to delve into database design, schema modeling, and data persistence and provide a way to handle some specific project's features in a custom way and not depend on a third parties libraries and tools implementations.

- `Explore Modern Web Development Patterns, tools, and libraries`: Throughout the project, I aimed to adhere to best practices and modern development patterns, including component-based architecture responsive design, etc. Apart from that, one of the main goal of this project was to gain hands-on experience with cutting-edge web development technologies and tools.

Whether you're a seasoned developer looking to explore new technologies or a beginner eager to get your hands dirty with web development, I genuinely hope this project serves as a valuable resource and a source of inspiration.

## Features

#### Discover and Explore

- `Search and Browse`: Easily search for movies and TV series and browse through a vast collection of titles.

- `Movies and TV serials by genre and type`: Easily browse movies and TV serials by their genre and types.
  
- `Movie and TV serial trailer`: Easily enjoy watching a trailer for a specific movie or TV serial.
  
- `Detailed Information`: Get detailed information about movies and TV series, including cast, ratings, release dates, trailers, etc.

#### Personalization

- `Favorite Collection`: Save your favorite movies and TV series to your personal collection for quick access.

- `Ratings`: Rate movies and TV series to share your opinions with the community.

- `User Profile`: Make needed updates in the Profile page, such as updating password, name, uploading avatar image, etc.

#### Backend Integration

- `Custom Backend`: Utilize a custom backend powered by MongoDB for data storage and retrieval.

- `API Integration`: Integrate seamlessly with The Movie Database (TMDB) API to access up-to-date movie and TV series information.

## Technologies, libraries and tools used:
- `Next JS 12`
- `Next Auth`
- `React`
- `React Query`
- `Typescript`
- `Tailwind Css`
- `MongoDB`
- `Mongoose`
- `Formik`
- `Yup`
- `Jest`
- `React Testing library`
- `React infinite scroll component`
- `React loading skeleton`
- `React dropzone`, etc.

## Getting Started
To get started with the `Movie Room` project, follow these steps:
- Clone the repository via `HTTPS` or `SSH` key:
  > via HTTPS
  
  ```
  https://github.com/Dmytro1991ua/next-js-movie-app.git
  ```
  > via SSH key

  ```
  git@github.com:Dmytro1991ua/next-js-movie-app.git
  ```
- Install needed dependencies from the `root` directory:
  
  ```
  npm install
  ```
- Create a `.env.local` file in the root directory and set the following environment variables:
  
  Copy the following template into your .env.local file and replace the placeholders `(e.g., your_github_client, your_mongodb_uri, etc.)` with your own credentials for services like GitHub, MongoDB, Google, NextAuth, and TMDB.
  
  <pre>
  GITHUB_CLIENT=your_github_client
  GITHUB_SECRET_KEY=your_github_secret_key

  GOOGLE_CLIENT=your_google_client
  GOOGLE_SECRET=your_google_secret

  NEXTAUTH_URL=your_nextauth_url
  NEXTAUTH_URL_INTERNAL=your_nextauth_url_internal

  NEXTAUTH_JWT_SECRET=your_nextauth_jwt_secret
  NEXTAUTH_SECRET=your_nextauth_secret

  MONGODB_URI=your_mongodb_uri

  NEXT_PUBLIC_TMDB_BASE_URL=your_tmdb_base_url
  NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key
  NEXT_PUBLIC_TMDB_IMAGE_URL=your_tmdb_image_url
  NEXT_PUBLIC_TMDB_SMALL_IMAGE_URL=your_tmdb_small_image_url
  </pre>
- In order to run the project locally, run the following command from the root directory  
  ```
  npm run dev
  ```

- Open your browser and navigate to `http://localhost:3000` to access the `Movie Room`.

## Screenshots
> Sign-in Page
> 
![screencapture-localhost-3000-auth-sign-in-2023-09-09-13_05_57](https://github.com/Dmytro1991ua/next-js-movie-app/assets/61331410/c878b2f7-063d-4c8e-9856-87bd58c0272c)

> Sign-up Page

![screencapture-localhost-3000-auth-sign-up-2023-09-09-13_06_32](https://github.com/Dmytro1991ua/next-js-movie-app/assets/61331410/4897173c-e324-42ba-889d-f7aeca942399)

> Home Page

![screencapture-localhost-3000-home-2023-09-09-12_38_47](https://github.com/Dmytro1991ua/next-js-movie-app/assets/61331410/750906c7-309c-455e-a76d-642044c9a306)

![details_3](https://github.com/Dmytro1991ua/next-js-movie-app/assets/61331410/f778705c-0fce-40f6-ac66-b88a169a9da8)

![details_4](https://github.com/Dmytro1991ua/next-js-movie-app/assets/61331410/ae753b04-a693-4fd2-aba4-14fff4ddac41)

> Movies Page

![screencapture-localhost-3000-movies-2023-09-09-12_43_07](https://github.com/Dmytro1991ua/next-js-movie-app/assets/61331410/25b89fd6-533f-4c1c-92f4-1a8f1bfe24f0)

![details_1](https://github.com/Dmytro1991ua/next-js-movie-app/assets/61331410/ff51c96d-a81e-4ce7-abdf-cb51addcae88)

![details_2](https://github.com/Dmytro1991ua/next-js-movie-app/assets/61331410/cf04ec53-f093-4c28-a3dc-93e7fa96b354)

> Serials Page

![screencapture-localhost-3000-serials-2023-09-09-12_57_06](https://github.com/Dmytro1991ua/next-js-movie-app/assets/61331410/faf5bb2f-e2d9-45f5-bac3-dc7022b79434)

![details_6](https://github.com/Dmytro1991ua/next-js-movie-app/assets/61331410/53023ac4-e832-4713-8cd6-3593b91461ec)

> See More page

![screencapture-localhost-3000-home-popular-2023-09-09-13_00_48](https://github.com/Dmytro1991ua/next-js-movie-app/assets/61331410/6276c6d4-d8d7-405a-8bb0-3309999ccc06)

> Search results Page

![screencapture-localhost-3000-search-movie-Final-destination-2023-09-09-13_02_51](https://github.com/Dmytro1991ua/next-js-movie-app/assets/61331410/38512a7a-42e8-4656-8ea3-c0ea50c3ad78)

> Profile Page

![screencapture-localhost-3000-profile-2023-09-09-13_04_03](https://github.com/Dmytro1991ua/next-js-movie-app/assets/61331410/00b237a0-0a44-4caa-9e5e-0bde763e4da6)

## API
> In order to work with real movie/TV serial data, I decided to leverage external API, like TMDB, and it allowed us to have access to a wide range of different kinds of data from TMDB API, such as movie or TV serial by their type, genre, casting, etc.

### User:
-
Endpoint
```
GET: /api/auth/session - Returns the current session (data) of the authenticated user
```

Example of returned data
```
{
    "name": "Alex Smith 2",
    "email": "alex2021new1666@gmail.com",
    "id": "649fedb32d5b50662c0203b5",
    "isCredentialsProvider": true
}
```
-
Endpoint
```
POST: /api/auth/sign-up - Creates a new user via Next Auth Credentials provider
```

Payload
```
{
    "name": "Alex",
    "password": "test-password",
    "email": "alex2021new1666@gmail.com"
}
```

Example of returned data (response) when user exists in DB
```
{
  "success": true,
  "message": "User was successfully created"
}
```
Example of returned data (response) when user does not exist in DB
```
{
    "success": true,
    "message": "User is already exist",
}
```

### Avatar:

Endpoint
```
PUT: /api/avatar - Returns the avatar data of the authenticated user
```

Payload
```
{
    "user": {
        "name": "Alex",
        "email": "alex2021new1666@gmail.com",
        "id": "64fc1b1f5aa3a15a8846ed04",
        "isCredentialsProvider": true
    }
}
```

Example of returned data
```
{
    "success": true,
    "data": {
        "image": "data:image/png;base64,test-image",
        "name": "Alex"
    }
}
```

### Favorites:

Endpoint
```
POST: /api/favorites - Returns user's favorite movies or TV serials
```

Payload
```
{
    "name": "Alex",
    "email": "alex2021new1666@gmail.com",
    "id": "64fc1b1f5aa3a15a8846ed04",
    "isCredentialsProvider": true
}
```

Example of returned data
```
{
    "success": true,
    "data": [
        {
            "genre_ids": [],
            "origin_country": [],
            "_id": "64fc29615aa3a15a8846ed07",
            "adult": false,
            "backdrop_path": "/tmU7GeKVybMWFButWEGl2M4GeiP.jpg",
            "id": 238,
            "original_language": "en",
            "original_title": "The Godfather",
            "overview": "Spanning the years 1945 to 1955, a chronicle of the fictional Italian-American Corleone crime family. When organized crime family patriarch, Vito Corleone barely survives an attempt on his life, his youngest son, Michael steps in to take care of the would-be killers, launching a campaign of bloody revenge.",
            "popularity": 129.258,
            "poster_path": "/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
            "release_date": "1972-03-14",
            "title": "The Godfather",
            "video": false,
            "vote_average": 8.706,
            "vote_count": 18590,
            "user": "64fc1b1f5aa3a15a8846ed04",
            "isFavorite": true,
            "createdAt": "2023-09-09T08:14:25.022Z",
            "updatedAt": "2023-09-09T08:14:25.022Z",
            "__v": 0
        }
    ]
}
```

### Rating:

Endpoint
```
PUT: /api/rating - Returns user's custom rating data of a particular movie or TV serials
```

Payload
```
{
    "user": {
        "name": "Alex",
        "email": "alex2021new1666@gmail.com",
        "id": "64fc1b1f5aa3a15a8846ed04",
        "isCredentialsProvider": true
    }
}
```

Example of returned data
```
{
    "success": true,
    "data": [
        {
            "_id": "64fc29415aa3a15a8846ed06",
            "id": 238,
            "name": "The Godfather",
            "rating": 10,
            "user": "64fc1b1f5aa3a15a8846ed04",
            "createdAt": "2023-09-09T08:13:53.667Z",
            "updatedAt": "2023-09-09T08:13:53.667Z",
            "__v": 0
        }
    ]
}
```

### Profile:

Endpoint
```
PATCH: /api/profile - Returns updated user's profile data, such as avatar, name, password
```

Payload
```
{
    "userInfo": {
        "name": "Alex Smith",
        "image": "data:image/png;base64,new-user-image",
        "password": ""
    },
    "user": {
        "name": "Alex",
        "email": "alex2021new1666@gmail.com",
        "id": "64fc1b1f5aa3a15a8846ed04",
        "isCredentialsProvider": true
    }
}
```
Example of returned data
```
{
    "message": "Profile data has been updated successfully",
    "success": true
}
```
 
## Tests
> In order to test the project's functionality I chose a combination of `Jest` and `React Testing Library`

##### In order to run tests, you need to proceed with the following command within the `root` directory:

```
npm run test
```

##### In order to check application's tests coverage, you need to proceed with the following command within the `root` directory:  

```
npm run test:coverage
```

##### Current application's test coverage
![screencapture-file-c-Users-dmytro-kurchenko-Desktop-pet-projects-next-js-movie-app-coverage-lcov-report-index-html-2023-09-05-17_23_15 (1)](https://github.com/Dmytro1991ua/next-js-movie-app/assets/61331410/10bb5107-f2d0-4e79-8485-9f603929bdc8)
