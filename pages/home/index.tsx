import { GetServerSideProps, NextPage } from "next";
import fetch from "node-fetch";
import { QueryClient, dehydrate } from "react-query";

import Home from "@/modules/home";

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

// TODO Here we have a test api call to jsonplaceholder in order to get posts and test that react query with dehydrate feature
export const fetchPosts = async (): Promise<Post[]> => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");

    return response.json();
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery("post", fetchPosts);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

const HomePage: NextPage = () => {
  return <Home />;
};

export default HomePage;
