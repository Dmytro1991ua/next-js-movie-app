import { mockMovie } from "@/mocks/testMocks";
import { searchService } from "@/services/search.service";
import { AppRoutes } from "@/types/enums";

jest.mock("uuid", () => {
  return {
    v4: jest.fn(() => 1),
  };
});

describe("fetchDataForSearchPage", () => {
  beforeEach(() => {
    (window.fetch as jest.Mock) = jest.fn();
  });

  afterEach(() => {
    (window.fetch as jest.Mock).mockReset();
  });

  it("Should return searched movies or serials", async () => {
    (window.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockMovie),
    });

    const response = await searchService.fetchDataForSearchPage({
      searchPath: AppRoutes.Movies,
      searchParam: "test_search_param",
    });

    expect(response).toEqual(mockMovie);
  });

  it("should failed to load searched movies or serials", async () => {
    const errorMessage = "Failed to fetch data based on search parameter";

    jest
      .spyOn(global, "fetch")
      .mockImplementation(() => Promise.reject(new Error(errorMessage)));

    await expect(
      searchService.fetchDataForSearchPage({
        searchPath: AppRoutes.Movies,
        searchParam: "test_search_param",
      })
    ).rejects.toThrowError(errorMessage);
  });
});
