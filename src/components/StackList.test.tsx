import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { describe, expect, it } from "vitest";
import { StackList } from "./StackList";

describe("StackList", () => {
  it("renders the stack as a labelled list", () => {
    render(<StackList stack={["TypeScript", "PostgreSQL"]} />);
    const list = screen.getByRole("list", { name: "Tech stack" });
    expect(list).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
    expect(screen.getByText("PostgreSQL")).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<StackList stack={["TypeScript"]} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
