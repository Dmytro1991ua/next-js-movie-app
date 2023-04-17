import { useRouter } from "next/router";
import React, { FC, useCallback } from "react";

import { AppRoutes } from "@/types/enums";
import { MovieOrSerialResults } from "@/types/interfaces";

import CardsHeader from "./CardsHeader";
import Card from "../Card";

interface CardsProps {
  cards?: (MovieOrSerialResults | undefined)[];
  route: AppRoutes;
  title: string;
}

const Cards: FC<CardsProps> = ({ cards, route, title }) => {
  const router = useRouter();

  const handleGoBackRedirect = useCallback(() => router.back(), [router]);

  return (
    <section className="card-wrapper" data-testid="cards">
      <CardsHeader title={title} onClick={handleGoBackRedirect} />
      <div className="card-layout">
        {cards?.map((card) => (
          <Card key={card?.id} movieOrSerialData={card} route={route} />
        ))}
      </div>
    </section>
  );
};

export default Cards;
