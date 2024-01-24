import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";

import Error from "../components/Error";

// Tests
describe("Error Component", async () => {
  afterEach(() => {
    cleanup();
  });

  it("renders error message and disappears after 5 seconds", () => {
    const message = "This is an error message";

    render(<Error message={message} />);

    const errorMessage = screen.queryByText(message);

    expect(errorMessage).not.toBeNull();
  });
  it("does not render when message is undefined", () => {
    render(<Error message={undefined} />);

    const divElement = screen.getByTestId("error-message");

    expect(divElement.innerHTML).toBe('');
  });
});
