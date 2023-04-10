import { render } from "@testing-library/react";
import { Formik } from "formik";
import { RouterContext } from "next/dist/shared/lib/router-context";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "react-query";

import { Cast } from "@/model/common";
import { IMAGE_URL } from "@/types/constants";
import { AppRoutes } from "@/types/enums";

import createMockRouter from "./createMockRouter";

export const mockSessionWithUser = {
  expires: new Date(Date.now() + 2 * 86400).toISOString(),
  user: { name: "Test user", email: "test@example.com", id: "1" },
};

export const mockSessionWithNoUser = null;

export const mockMeta = {
  touched: true,
  error: "",
  initialError: "",
  initialTouched: false,
  initialValue: "",
  value: "",
};
export const mockField = {
  value: "",
  checked: false,
  onChange: jest.fn(),
  onBlur: jest.fn(),
  multiple: undefined,
  name: "",
};

export const withFormikWrapper = (
  WrappedComponent: JSX.Element,
  initialValues: object
): JSX.Element => (
  <Formik
    initialValues={initialValues ?? {}}
    onSubmit={() => Promise.resolve()}
  >
    {WrappedComponent}
  </Formik>
);

export const MOCK_FORMIK_INSTANCE = {
  formikInstance: {
    dirty: false,
    values: jest.fn(),
    touched: jest.fn(),
    isSubmitting: false,
    isValidating: false,
    submitCount: 0,
    errors: jest.fn(),
    isValid: true,
    initialValues: jest.fn(),
    initialErrors: jest.fn(),
    initialTouched: jest.fn(),
    getFieldHelpers: jest.fn(),
    getFieldMeta: jest.fn(),
    getFieldProps: jest.fn(),
    handleBlur: jest.fn(),
    handleChange: jest.fn(),
    handleReset: jest.fn(),
    handleSubmit: jest.fn(),
    setStatus: jest.fn(),
    setErrors: jest.fn(),
    setSubmitting: jest.fn(),
    setTouched: jest.fn(),
    setValues: jest.fn(),
    setFieldValue: jest.fn(),
    setFieldError: jest.fn(),
    setFieldTouched: jest.fn(),
    validateForm: jest.fn(),
    validateField: jest.fn(),
    resetForm: jest.fn(),
    submitForm: jest.fn(),
    setFormikState: jest.fn(),
    registerField: jest.fn(),
    unregisterField: jest.fn(),
  },
};

export const mockRouter = {
  push: jest.fn(),
  pathname: "/",
  route: "",
  asPath: "",
  query: {},
  events: {
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn(),
  },
  basePath: "",
  isLocaleDomain: false,
};

export const withSessionProviderAndReactContext = ({
  path,
  session,
  component,
}: {
  path: string;
  session: Session | null;
  component: JSX.Element;
}) =>
  render(
    <SessionProvider session={session}>
      <RouterContext.Provider value={createMockRouter({ pathname: path })}>
        {component}
      </RouterContext.Provider>
    </SessionProvider>
  );

export const withSessionProvider = ({
  session,
  component,
}: {
  session: Session | null;
  component: JSX.Element;
}) => render(<SessionProvider session={session}>{component}</SessionProvider>);

export const mockMovie = {
  adult: false,
  backdrop_path: `${IMAGE_URL}/32GH8Mi4GmTPIQyd6IW1FFrHWrj.jpg`,
  genre_ids: [28],
  id: 965839,
  original_language: "en",
  original_title: "Lord of the Streets",
  overview:
    "When Jason Dyson refuses to make his prized fighter throw an MMA match, a notorious gangster collects his debt by killing the fighter and kidnapping Jason's daughter. Now he must train a prisoner to endure five consecutive underground fights to save her.",
  popularity: 729.236,
  poster_path: "/mbigXpUgVgLOacgxlyFfsLRFqxQ.jpg",
  release_date: "2022-04-22",
  title: "Lord of the Streets",
  video: false,
  vote_average: 5.3,
  vote_count: 46,
};

export const withQueryClientProvider = (component: JSX.Element) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  render(
    <QueryClientProvider client={queryClient}>{component}</QueryClientProvider>
  );
};

export const withQueryClientAndRouterProvider = (
  component: JSX.Element,
  path: AppRoutes
) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  render(
    <QueryClientProvider client={queryClient}>
      <RouterContext.Provider value={createMockRouter({ pathname: path })}>
        {component}
      </RouterContext.Provider>
    </QueryClientProvider>
  );
};

export const mockSerialDetails = {
  adult: false,
  backdrop_path: "/84XPpjGvxNyExjSuLQe0SzioErt.jpg",
  created_by: [
    {
      id: 66633,
      credit_id: "52542286760ee31328001a7b",
      name: "Vince Gilligan",
      gender: 2,
      profile_path: "/uFh3OrBvkwKSU3N5y0XnXOhqBJz.jpg",
    },
  ],
  episode_run_time: [45, 47],
  first_air_date: "2008-01-20",
  genres: [
    {
      id: 18,
      name: "Drama",
    },
  ],
  homepage: "http://www.amc.com/shows/breaking-bad",
  id: 1396,
  in_production: false,
  languages: ["en", "de", "es"],
  last_air_date: "2013-09-29",
  last_episode_to_air: {
    id: 62161,
    name: "Felina",
    overview: "All bad things must come to an end.",
    vote_average: 9.2,
    vote_count: 172,
    air_date: "2013-09-29",
    episode_number: 16,
    production_code: "",
    runtime: 56,
    season_number: 5,
    show_id: 1396,
    still_path: "/pA0YwyhvdDXP3BEGL2grrIhq8aM.jpg",
  },
  name: "Breaking Bad",
  next_episode_to_air: null,
  networks: [
    {
      id: 174,
      logo_path: "/alqLicR1ZMHMaZGP3xRQxn9sq7p.png",
      name: "AMC",
      origin_country: "US",
    },
  ],
  number_of_episodes: 62,
  number_of_seasons: 5,
  origin_country: ["US"],
  original_language: "en",
  original_name: "Breaking Bad",
  overview:
    "When Walter White, a New Mexico chemistry teacher, is diagnosed with Stage III cancer and given a prognosis of only two years left to live. He becomes filled with a sense of fearlessness and an unrelenting desire to secure his family's financial future at any cost as he enters the dangerous world of drugs and crime.",
  popularity: 391.56,
  poster_path: "/ggFHVNu6YYI5L9pCfOacjizRGt.jpg",
  production_companies: [
    {
      id: 11073,
      name: "Sony Pictures Television Studios",
    },
    {
      id: 33742,
      name: "High Bridge Entertainment",
    },
    {
      id: 2605,
      name: "Gran Via Productions",
    },
  ],
  production_countries: [
    {
      id: 1,
      name: "United States of America",
    },
  ],
  seasons: [
    {
      air_date: "2009-02-17",
      episode_count: 11,
      id: 3577,
      name: "Specials",
      overview: "",
      poster_path: "/40dT79mDEZwXkQiZNBgSaydQFDP.jpg",
      season_number: 0,
    },
    {
      air_date: "2008-01-20",
      episode_count: 7,
      id: 3572,
      name: "Season 1",
      overview:
        'High school chemistry teacher Walter White\'s life is suddenly transformed by a dire medical diagnosis. Street-savvy former student Jesse Pinkman "teaches" Walter a new trade.',
      poster_path: "/1BP4xYv9ZG4ZVHkL7ocOziBbSYH.jpg",
      season_number: 1,
    },
    {
      air_date: "2009-03-08",
      episode_count: 13,
      id: 3573,
      name: "Season 2",
      overview:
        "In the second season, Walt must deal with the chain reaction of his choice, as he and Jesse face new and severe consequences. When danger and suspicion around Walt escalate, he is pushed to new levels of desperation. Just how much higher will the stakes rise? How far is Walt willing to go to ensure his family's security? Will his grand plan spiral out of control?",
      poster_path: "/e3oGYpoTUhOFK0BJfloru5ZmGV.jpg",
      season_number: 2,
    },
    {
      air_date: "2010-03-21",
      episode_count: 13,
      id: 3575,
      name: "Season 3",
      overview:
        "In the third season, Walt continues to battle dueling identities: a desperate husband and father trying to provide for his family, and a newly appointed key player in the Albuquerque drug trade. As the danger around him escalates, Walt is now entrenched in the complex worlds of an angst-ridden family on the verge of dissolution, and the ruthless and unrelenting drug cartel.",
      poster_path: "/ffP8Q8ew048YofHRnFVM18B2fPG.jpg",
      season_number: 3,
    },
    {
      air_date: "2011-07-17",
      episode_count: 13,
      id: 3576,
      name: "Season 4",
      overview:
        "This season, Walt and Jesse must cope with the fallout of their previous actions, both personally and professionally. Tension mounts as Walt faces a true standoff with his employer, Gus, with neither side willing or able to back down. Walt must also adjust to a new relationship with Skyler, whom while still reconciling her relationship with Walt, is committed to properly laundering Walt’s money and ensuring her sister Marie and an ailing Hank are financially stable.",
      poster_path: "/5ewrnKp4TboU4hTLT5cWO350mHj.jpg",
      season_number: 4,
    },
    {
      air_date: "2012-07-15",
      episode_count: 16,
      id: 3578,
      name: "Season 5",
      overview:
        "In season five, Walt is faced with the prospect of moving on in a world without his enemy. As the pressure of a criminal life starts to build, Skyler struggles to keep Walt’s terrible secrets. Facing resistance from sometime adversary and former Fring lieutenant Mike, Walt tries to keep his world from falling apart even as his DEA Agent brother in law, Hank, finds numerous leads that could blaze a path straight to Walt. \n\nAll bad things must come to an end.",
      poster_path: "/r3z70vunihrAkjILQKWHX0G2xzO.jpg",
      season_number: 5,
    },
  ],
  spoken_languages: [
    {
      english_name: "English",
      iso_639_1: "en",
      name: "English",
    },
    {
      english_name: "German",
      iso_639_1: "de",
      name: "Deutsch",
    },
    {
      english_name: "Spanish",
      iso_639_1: "es",
      name: "Español",
    },
  ],
  status: "Ended",
  tagline: "Remember my name",
  type: "Scripted",
  vote_average: 8.876,
  revenue: 123,
  vote_count: 11386,
  videos: {
    results: [
      {
        iso_639_1: "en",
        iso_3166_1: "US",
        name: "Series Trailer",
        key: "XZ8daibM3AE",
        published_at: "2013-03-25T16:28:54.000Z",
        site: "YouTube",
        size: 480,
        type: "Trailer",
        official: true,
        id: "5759db2fc3a3683e7c003df7",
      },
    ],
  },
};

export const mockSerialCast: Cast = {
  cast: [
    { id: 1, name: "Bryan Cranston" },
    { id: 2, name: "Aaron Paul" },
  ],
};
