import { act, renderHook } from "@testing-library/react-hooks";
import { SessionProvider } from "next-auth/react";

import { mockSessionWithUser } from "@/mocks/testMocks";
import { useNavigationState } from "@/modules/header/hooks/useNavigationState";

jest.mock("uuid", () => {
  return {
    v4: jest.fn(() => 1),
  };
});

describe("useNavigationState.tsx", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const hook = () =>
    renderHook(() => useNavigationState(), {
      wrapper: ({ children }: { children: React.ReactNode }) => (
        <SessionProvider session={mockSessionWithUser}>
          {children}
        </SessionProvider>
      ),
    });

  it("should return isMobileMenuShown as false for initially", () => {
    const { result } = hook();

    expect(result.current.isMobileMenuShown).toEqual(false);
  });

  it("should call onToggleMobileNavigation handler", () => {
    const { result } = hook();

    act(() => result.current.onToggleMobileNavigation());

    expect(result.current.isMobileMenuShown).toEqual(true);
  });
});
