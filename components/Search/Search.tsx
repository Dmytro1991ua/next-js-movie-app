import clsx from "clsx";
import React, { FC } from "react";
import { AiOutlineSearch } from "react-icons/ai";

import { DEFAULT_SEARCH_INPUT_PLACEHOLDER } from "@/types/constants";
import { AppRoutes } from "@/types/enums";

import { useSearchMovieOrSerialState } from "./hooks/useSearchMovieOrSerialState";
import Button from "../Button/Button";
import Input from "../Input/Input";

interface SearchProps {
  searchPath: AppRoutes;
  placeholder?: string;
  className?: string;
  isDetailsPage?: boolean;
}

const Search: FC<SearchProps> = ({
  searchPath,
  placeholder = DEFAULT_SEARCH_INPUT_PLACEHOLDER,
  className = "",
  isDetailsPage = false,
}) => {
  const {
    isButtonDisabled,
    searchTerm,
    isLoading,
    onHandleFormSubmit,
    onSetNewSearchTerm,
  } = useSearchMovieOrSerialState({ searchPath });

  return (
    <form
      className={clsx(
        "flex justify-between items-center gap-4 pr-2",
        [isDetailsPage ? "pl-0" : "pl-[5%]"],
        className
      )}
      data-testid="search-form"
      onSubmit={onHandleFormSubmit}
    >
      <Input
        fullWidth
        hasIcon
        icon={
          <AiOutlineSearch
            className="absolute top-[23%] left-[1rem]"
            size={25}
          />
        }
        placeholder={placeholder}
        rounded="none"
        value={searchTerm ?? ""}
        onChange={onSetNewSearchTerm}
      />
      <Button
        disabled={isButtonDisabled}
        isLoading={isLoading}
        size="small"
        type="submit"
      >
        Search
      </Button>
    </form>
  );
};

export default Search;
