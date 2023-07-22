import { mediaDetailsService } from "@/services/mediaDetails.service";

jest.mock("uuid", () => {
  return {
    v4: jest.fn(() => 1),
  };
});

describe("fetchMediaDetailsData", () => {
  beforeEach(() => {
    (window.fetch as jest.Mock) = jest.fn();
  });

  afterEach(() => {
    (window.fetch as jest.Mock).mockReset();
  });

  it("Should return movies or serials details by their ID", async () => {
    const movieDetailResponse = { id: "movie123", title: "Movie Title" };
    const movieCastResponse = { cast: [{ id: "actor1", name: "Actor 1" }] };

    (window.fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(movieDetailResponse),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(movieCastResponse),
      });

    const result = await mediaDetailsService.fetchMediaDetailsData({
      id: "movie123",
    });

    expect(result.movieOrSerialDetails).toEqual(movieDetailResponse);
    expect(result.movieOrSerialActors).toEqual(movieCastResponse);
  });

  it("should failed to load movies or serials details and call toast with error message", async () => {
    const errorMessage = "Failed to fetch serial details";

    jest
      .spyOn(global, "fetch")
      .mockImplementation(() => Promise.reject(new Error(errorMessage)));

    await expect(
      mediaDetailsService.fetchMediaDetailsData({ id: "movie123" })
    ).rejects.toThrowError(errorMessage);
  });
});
