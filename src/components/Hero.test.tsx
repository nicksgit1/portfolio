import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { describe, expect, it } from "vitest";
import { site } from "@/content/site";
import { Hero } from "./Hero";

describe("Hero", () => {
  it("renders the name as the section heading", () => {
    render(<Hero />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      site.name,
    );
  });

  it("renders the tagline", () => {
    render(<Hero />);
    expect(screen.getByText(site.tagline)).toBeInTheDocument();
  });

  it("gives the portrait meaningful alt text", () => {
    render(<Hero />);
    expect(
      screen.getByRole("img", { name: new RegExp(site.name, "i") }),
    ).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Hero />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
