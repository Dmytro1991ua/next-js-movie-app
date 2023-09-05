# Movie Room
Welcome to the `Movie Room` project, a platform where you can explore a vast collection of movies and TV series using The Movie Database (TMDB) API. Additionally, this project features a custom backend powered by MongoDB for managing your movie preferences, such as adding to favorites or applying a custom ration to a particular movie/TV serial, updating the user's profile data, etc.

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
  
  `https://github.com/Dmytro1991ua/next-js-movie-app.git`
  > via SSH key

  `git@github.com:Dmytro1991ua/next-js-movie-app.git`
- Install needed dependencies from the `root` directory:
  
  `npm install`
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
  `npm run dev`

- Open your browser and navigate to `http://localhost:3000` to access the `Movie Room`.
  
