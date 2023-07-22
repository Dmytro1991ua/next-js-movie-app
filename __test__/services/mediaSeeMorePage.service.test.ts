import { mockMovie } from "@/mocks/testMocks";
import { mediaSeeMorePageService } from "@/services/mediaSeeMorePage.service";

jest.mock("uuid", () => {
  return {
    v4: jest.fn(() => 1),
  };
});

describe("fetchSeeMorePageData", () => {
  beforeEach(() => {
    (window.fetch as jest.Mock) = jest.fn();
  });

  afterEach(() => {
    (window.fetch as jest.Mock).mockReset();
  });

  it("Should return data for See More pages", async () => {
    (window.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockMovie),
    });

    const response = await mediaSeeMorePageService.fetchSeeMorePageData("Test");

    expect(response).toEqual(mockMovie);
  });

  it("Should fail to load data for See More Page", async () => {
    const errorMessage = "Failed to fetch movies for See More page";

    jest
      .spyOn(global, "fetch")
      .mockImplementation(() => Promise.reject(new Error(errorMessage)));

    await expect(
      mediaSeeMorePageService.fetchSeeMorePageData("movie123")
    ).rejects.toThrowError(errorMessage);
  });
});
