import { mockSerialDetails } from "@/mocks/testMocks";
import { favoritesService } from "@/services/favorites.service";
import { RequestMethod } from "@/types/enums";

jest.mock("uuid", () => {
  return {
    v4: jest.fn(() => 1),
  };
});

const mockSession = {
  user: {
    id: "mockUserId",
    name: "John Doe",
    email: "johndoe@example.com",
    image: "https://example.com/avatar.jpg",
  },
  expires: "test_expiration",
};

describe("fetchFavoritesMoviesOrSerials", () => {
  beforeEach(() => {
    (window.fetch as jest.Mock) = jest.fn();
  });

  afterEach(() => {
    (window.fetch as jest.Mock).mockReset();
  });

  const mockData = {
    success: true,
    data: mockSerialDetails,
  };

  it("Should return favorites movies or serials for a specific user", async () => {
    const mockResponse = mockData;

    (window.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockResponse),
    });

    const response = await favoritesService.fetchFavoritesMoviesOrSerials(
      mockSession.user
    );

    expect(response).toEqual(mockResponse);
  });

  it("Should failed to load favorites movies or serials and call toast with error message", async () => {
    const errorMessage = "Failed to load favorites movies or serials";

    (window.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    await expect(
      favoritesService.fetchFavoritesMoviesOrSerials(mockSession.user)
    ).rejects.toThrowError(errorMessage);
  });
});

describe("updateFavoriteMovieOrSerial", () => {
  const mockPayload = {
    user: {
      id: "mockUserId",
      name: "John Doe",
      email: "johndoe@example.com",
      image: "https://example.com/avatar.jpg",
    },
    favorites: mockSerialDetails,
  };

  const mockData = {
    success: true,
    data: mockSerialDetails,
  };

  const mockMethod = RequestMethod.POST;

  beforeEach(() => {
    (window.fetch as jest.Mock) = jest.fn();
  });

  afterEach(() => {
    (window.fetch as jest.Mock).mockReset();
  });

  it("Should successfully add to or remove from favorites list", async () => {
    const mockResponse = mockData;

    (window.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockResponse),
    });

    const response = await favoritesService.updateFavoriteMovieOrSerial(
      mockPayload,
      mockMethod
    );

    expect(response).toEqual(mockResponse);
  });

  it("Should failed to update favorites movies or serials", async () => {
    const errorMessage = "Failed to add to or remove from favorites list";

    (window.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    await expect(
      favoritesService.updateFavoriteMovieOrSerial(mockPayload, mockMethod)
    ).rejects.toThrowError(errorMessage);
  });
});
