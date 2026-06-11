/**
 * The tech-stack chip row shown on project cards and case-study pages.
 * One component so the chips stay identical everywhere they appear;
 * exposed to assistive tech as a labelled list.
 */
type Props = {
  stack: string[];
  /** Layout-only utilities from the call site (e.g. margins). */
  className?: string;
};

export function StackList({ stack, className }: Props) {
  return (
    <ul
      aria-label="Tech stack"
      className={["flex flex-wrap gap-2", className].filter(Boolean).join(" ")}
    >
      {stack.map((tech) => (
        <li
          key={tech}
          className="rounded-full border border-border bg-glow-violet/10 px-3 py-0.5 text-xs text-muted"
        >
          {tech}
        </li>
      ))}
    </ul>
  );
}
