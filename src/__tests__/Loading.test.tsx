import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";

import Loading from "../components/Loading";

describe("Loading Component", () => {
  afterEach(() => {
    cleanup();
  });
  it("renders with default message", () => {
    render(<Loading />);

    expect(screen.getByText("Loading...")).toBeDefined();

    expect(screen.getByTestId("loading-spinner")).toBeDefined();
  });

  it("renders with custom message", () => {
    const customMessage = "Please wait...";

    render(<Loading message={customMessage} />);

    expect(screen.getByText(customMessage)).toBeDefined();

    expect(screen.getByTestId("loading-spinner")).toBeDefined();
  });
});
