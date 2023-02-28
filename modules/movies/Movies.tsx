import { FC } from "react";
import { useQuery } from "react-query";

import { fetchPosts } from "@/pages/movies";

const Movies: FC = () => {
  //TODO Test posts data to check that react query works
  const { data: posts } = useQuery(["post"], fetchPosts, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return (
    <>
      {posts &&
        posts.map((post) => (
          <div key={post.id}>
            <div>{post?.id}</div>
            <div>{post?.title}</div>
            <div>{post?.body}</div>
          </div>
        ))}
    </>
  );
};

export default Movies;
