import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { describe, expect, it, vi } from "vitest";
import { Header } from "./Header";

// Header reads the current route via usePathname; tests control it here.
const mockUsePathname = vi.fn();
vi.mock("next/navigation", () => ({
  usePathname: () => mockUsePathname(),
}));

describe("Header", () => {
  it("renders main navigation with all links", () => {
    mockUsePathname.mockReturnValue("/");
    render(<Header />);
    const nav = screen.getByRole("navigation", { name: "Main" });
    expect(nav).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute(
      "href",
      "/",
    );
    expect(screen.getByRole("link", { name: "Projects" })).toHaveAttribute(
      "href",
      "/projects",
    );
    expect(screen.getByRole("link", { name: "About" })).toHaveAttribute(
      "href",
      "/about",
    );
  });

  it("marks the current page with aria-current", () => {
    mockUsePathname.mockReturnValue("/projects/some-project");
    render(<Header />);
    expect(screen.getByRole("link", { name: "Projects" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(screen.getByRole("link", { name: "Home" })).not.toHaveAttribute(
      "aria-current",
    );
  });

  it("has no accessibility violations", async () => {
    mockUsePathname.mockReturnValue("/");
    const { container } = render(<Header />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
