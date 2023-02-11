import { render, screen } from "@testing-library/react";
import { SessionProvider } from "next-auth/react";

import AuthLayout from "@/modules/layout/AuthLayout";

export const mockSession = {
  expires: new Date(Date.now() + 2 * 86400).toISOString(),
  user: { name: "Test user", email: "test@example.com", id: "1" },
};

describe("AuthLayout", () => {
  it("Should render component without crashing", () => {
    render(
      <SessionProvider>
        <AuthLayout />
      </SessionProvider>
    );

    expect(screen.getByText(/Image Component/)).toBeInTheDocument();
  });
});
