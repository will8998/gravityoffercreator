import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { BroadcastHero } from "@/components/broadcast/hero";

vi.mock("next/dynamic", () => ({
  default: () => () => null,
}));

describe("BroadcastHero — paid-pilot reframe", () => {
  it("leads with voice-fidelity headline, not volume", () => {
    render(<BroadcastHero />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      /your voice/i
    );
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      /your takes/i
    );
  });

  it("displays $497 refundable pilot in body copy", () => {
    render(<BroadcastHero />);
    expect(screen.getByText(/\$497 refundable pilot/i)).toBeInTheDocument();
  });

  it("CTA says 'Reserve my pilot slot — $497', not 'claim free'", () => {
    render(<BroadcastHero />);
    expect(
      screen.getByRole("link", { name: /reserve my pilot slot/i })
    ).toBeInTheDocument();
    expect(screen.queryByText(/free episode/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/claim/i)).not.toBeInTheDocument();
  });

  it("stats show 5 channels (TikTok dropped) and ~15 assets (not 20)", () => {
    render(<BroadcastHero />);
    expect(screen.getByText(/~15/)).toBeInTheDocument();
    expect(screen.getAllByText(/^5$/).length).toBeGreaterThan(0);
    expect(screen.queryByText(/^20$/)).not.toBeInTheDocument();
    expect(screen.queryByText(/^6$/)).not.toBeInTheDocument();
  });

  it("trust strip mentions Cofounder Test guarantee", () => {
    const { container } = render(<BroadcastHero />);
    expect(container.textContent?.toLowerCase()).toContain("cofounder test");
  });
});
