import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { HealthStatus } from "./HealthStatus";

describe("HealthStatus", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("shows connected when the API reports the database is up", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ database: "connected" }),
      }),
    );

    render(<HealthStatus />);

    expect(await screen.findByText("API: connected")).toBeInTheDocument();
  });

  it("shows error when the API is unreachable", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("down")));

    render(<HealthStatus />);

    expect(await screen.findByText("API: error")).toBeInTheDocument();
  });
});
