import { contact } from "@/lib/site";
import { ArrowUpRight } from "./icons";

export function Footer() {
  return (
    <footer className="wrap flex items-center justify-between gap-5 border-t border-line py-8 text-sm max-[520px]:items-start max-[520px]:flex-col">
      <span className="font-serif text-xl font-bold text-ink">Hayden Teh</span>
      <div className="flex gap-7">
        <a
          className="inline-flex items-center gap-1"
          href={contact.github}
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub <ArrowUpRight />
        </a>
        <a href="#top">Back to top ↑</a>
      </div>
    </footer>
  );
}
