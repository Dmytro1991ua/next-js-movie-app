import { mockSerialDetails } from "@/mocks/testMocks";
import { ratingService } from "@/services/rating.service";

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

describe("fetchRatingById", () => {
  beforeEach(() => {
    (window.fetch as jest.Mock) = jest.fn();
  });

  afterEach(() => {
    (window.fetch as jest.Mock).mockReset();
  });

  const mockData = {
    success: true,
    data: {
      id: 1,
      name: "test_movie",
      rating: 4,
    },
  };

  it("Should successfully fetch rating data by id related to a specific, authenticated user", async () => {
    const mockResponse = mockData;

    (window.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockResponse),
    });

    const result = await ratingService.fetchRatingById(mockSession.user);

    expect(result).toEqual(mockResponse);
  });

  it("Should failed to load rating data and call toast with error message", async () => {
    const errorMessage = "Failed to load rating data";

    (window.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    await expect(
      ratingService.fetchRatingById(mockSession.user)
    ).rejects.toThrowError(errorMessage);
  });
});

describe("updateMovieOrSerialRating", () => {
  const mockPayload = {
    user: {
      id: "mockUserId",
      name: "John Doe",
      email: "johndoe@example.com",
      image: "https://example.com/avatar.jpg",
    },
    data: {
      id: 1,
      name: "test_movie",
      rating: 6,
    },
  };

  const mockData = {
    success: true,
    data: mockSerialDetails,
  };

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

    const response = await ratingService.updateMovieOrSerialRating(
      mockPayload.data
    );

    expect(response).toEqual(mockResponse);
  });

  it("Should failed to update favorites movies or serials", async () => {
    const errorMessage = "Failed to update rating";

    (window.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    await expect(
      ratingService.updateMovieOrSerialRating(mockPayload.data)
    ).rejects.toThrowError(errorMessage);
  });
});
