import { act, renderHook } from "@testing-library/react-hooks";
import { useRouter } from "next/router";
import { QueryClient, QueryClientProvider } from "react-query";

import { useRedirectStatus } from "@/hooks/useRedirectStatus";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("useRedirectStatus", () => {
  const queryClient = new QueryClient();
  const routeChangeCallbacks: { [eventName: string]: () => void } = {};

  afterEach(() => {
    jest.resetAllMocks();
  });

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      events: {
        on: jest.fn((event, callback) => {
          routeChangeCallbacks[event] = callback;
        }),
        off: jest.fn((event, callback) => {
          if (routeChangeCallbacks[event] === callback) {
            delete routeChangeCallbacks[event];
          }
        }),
      },
    });
  });

  const hook = () =>
    renderHook(() => useRedirectStatus(), {
      wrapper: ({ children }: { children: React.ReactNode }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      ),
    });

  it("should return isRedirecting false initially", () => {
    (useRouter as jest.Mock).mockReturnValue({
      events: {
        on: jest.fn(),
        off: jest.fn(),
      },
    });

    const { result } = hook();

    expect(result.current).toBe(false);
  });

  it("should set isRedirecting to true on route change start and false on complete", () => {
    const { result } = renderHook(() => useRedirectStatus());

    act(() => {
      routeChangeCallbacks["routeChangeStart"]();
    });

    expect(result.current).toBe(true);

    act(() => {
      routeChangeCallbacks["routeChangeComplete"]();
    });

    expect(result.current).toBe(false);
  });

  it("should clean up event listeners on unmount", () => {
    const { unmount } = hook();

    unmount();

    expect(useRouter().events.off).toHaveBeenCalledTimes(2);
    expect(useRouter().events.off).toHaveBeenCalledWith(
      "routeChangeStart",
      expect.any(Function)
    );
    expect(useRouter().events.off).toHaveBeenCalledWith(
      "routeChangeComplete",
      expect.any(Function)
    );
  });
});
