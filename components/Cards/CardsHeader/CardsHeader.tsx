import React, { FC } from "react";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";

interface CardsHeaderProps {
  title: string;
  onClick: () => void;
}

const CardsHeader: FC<CardsHeaderProps> = ({ title, onClick }) => {
  return (
    <div className="flex justify-start items-center w-full mb-4">
      <BsFillArrowLeftCircleFill
        className=" h-6 w-6 lg:h-8 lg:w-8 cursor-pointer fill-powderAsh"
        onClick={onClick}
      />
      <h3 className="text-xl lg:text-3xl ml-4 text-powderAsh">{title}</h3>
    </div>
  );
};

export default CardsHeader;
