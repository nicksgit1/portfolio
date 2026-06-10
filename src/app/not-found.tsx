import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Page not found</h1>
      <p className="mt-4 max-w-prose text-muted">
        That page doesn&apos;t exist (or moved).
      </p>
      <p className="mt-6">
        <Link href="/" className="text-accent underline">
          Back to home
        </Link>
      </p>
    </div>
  );
}
