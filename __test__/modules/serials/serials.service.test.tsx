import { waitFor } from "@testing-library/react";
import { toast } from "react-toastify";

import { mockMovie } from "@/mocks/testMocks";
import { serialsPageService } from "@/modules/serials/serials.service";
import { getResponseErrorMessage } from "@/utils/utils";
getResponseErrorMessage;

jest.mock("react-toastify", () => ({
  toast: {
    error: jest.fn(),
  },
}));

jest.mock("@/utils/utils", () => ({
  getResponseErrorMessage: () => "Test Error Message",
}));

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        ...mockMovie,
      }),
  })
);

describe("SerialsPageService", () => {
  it("Should return movies by genre for Movies Page", async () => {
    const response = await serialsPageService.fetchSerialsData();

    expect(response.latestSerials).toEqual(mockMovie);
    expect(response.topRatedSerials).toEqual(mockMovie);
  });

  it("should failed to load movies by genre and call toast with error message", async () => {
    try {
      (window.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
      });
      await expect(serialsPageService.fetchSerialsData()).rejects.toEqual(
        "Test Error Message"
      );
    } catch {
      await waitFor(() =>
        expect(toast.error).toHaveBeenCalledWith("Test Error Message")
      );
    }
  });
});
