import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";

import Loading from "../components/Loading";

describe("Loading Component", () => {
  afterEach(() => {
    cleanup();
  });
  it("renders with default message", () => {
    render(<Loading />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();

    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
  });

  it("renders with custom message", () => {
    const customMessage = "Please wait...";

    render(<Loading message={customMessage} />);

    // Ensure the custom loading message is present
    expect(screen.getByText(customMessage)).toBeInTheDocument();

    // Ensure the loading spinner is present
    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
  });
});
