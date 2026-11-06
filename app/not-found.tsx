import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="wrap py-28">
      <h1 className="font-serif text-5xl text-ink">Page not found</h1>
      <p className="my-6">
        Explore my projects and experience from the portfolio homepage.
      </p>
      <Link className="button" href="/">
        Back to the portfolio
      </Link>
    </main>
  );
}
