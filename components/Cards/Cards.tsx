import { useRouter } from "next/router";
import React, { FC, useCallback } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { FetchNextPageOptions, InfiniteQueryObserverResult } from "react-query";

import { AppRoutes } from "@/types/enums";
import { MovieOrSerialResult, MovieOrSerialResults } from "@/types/interfaces";

import CardsHeader from "./CardsHeader";
import Card from "../Card";

interface CardsProps {
  cards?: (MovieOrSerialResults | undefined)[];
  route: AppRoutes;
  title: string;
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<InfiniteQueryObserverResult<MovieOrSerialResult | null, Error>>;
  dataLength: number;
  hasNextPage: boolean;
  isLoading: boolean;
}

const Cards: FC<CardsProps> = ({
  cards,
  route,
  title,
  dataLength,
  hasNextPage,
  fetchNextPage,
  isLoading,
}) => {
  const router = useRouter();

  const handleGoBackRedirect = useCallback(() => router.back(), [router]);

  return (
    <section className="card-wrapper" data-testid="cards">
      <CardsHeader title={title} onClick={handleGoBackRedirect} />
      <InfiniteScroll
        className="!overflow-hidden"
        dataLength={dataLength}
        hasMore={hasNextPage}
        loader={isLoading && <h4>Loading...</h4>}
        next={fetchNextPage}
      >
        <div className="card-layout">
          {cards?.map((card) => (
            <Card key={card?.id} movieOrSerialData={card} route={route} />
          ))}
        </div>
      </InfiniteScroll>
    </section>
  );
};

export default Cards;
