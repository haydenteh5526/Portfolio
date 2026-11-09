import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main id="main" className="wrap py-28">
      <h1 className="font-serif text-5xl text-ink">Page not found</h1>
      <p className="my-6">
        Explore my projects and experience from the portfolio homepage.
      </p>
      <Button asChild size="portfolio">
        <Link href="/">Back to the portfolio</Link>
      </Button>
    </main>
  );
}
