import { DataFetcherProps, MovieOrSerialResult } from "@/types/interfaces";
import { requestConfigForSearchPage } from "@/utils/requests";
import { fetchDataWithHandling, getResponseErrorMessage } from "@/utils/utils";

import { toastService } from "./toast.service";

class SearchService {
  async fetchDataForSearchPage({
    searchPath,
    searchParam,
    pageParam = 1,
  }: DataFetcherProps): Promise<MovieOrSerialResult | null> {
    try {
      const url = requestConfigForSearchPage({
        searchPath,
        searchParam,
        pageParam,
      }).fetchDataForSearchPage;

      return await fetchDataWithHandling<MovieOrSerialResult | null>({
        url,
        mediaType: "movies",
        action: "fetch",
        message: "Failed to fetch data based on search parameter",
      });
    } catch (error) {
      const errorMessage = getResponseErrorMessage();
      toastService.error(errorMessage);

      throw new Error((error as Error).message);
    }
  }
}

export const searchService = new SearchService();
