"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

const links = [
  ["projects", "Projects"],
  ["experience", "Experience"],
  ["education", "Education"],
  ["awards", "Awards"],
  ["skills", "Skills"],
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const button = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);
  useEffect(() => {
    const element = header.current;
    const projects = document.getElementById("projects");
    if (!element || !projects) return;
    const firstCard = projects.querySelector(".project-stack-list") ?? projects;
    const compact = window.matchMedia("(width < 1200px)");

    const update = () => {
      const trigger = compact.matches ? projects : firstCard;
      const midpoint = window.innerHeight / 2 + (compact.matches ? 20 : 0);
      const scrolled = String(
        window.scrollY > 0 && trigger.getBoundingClientRect().top <= midpoint,
      );
      if (element.dataset.scrolled !== scrolled) {
        element.dataset.scrolled = scrolled;
      }
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [pathname]);
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        button.current?.focus();
      }
    };
    const outside = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !header.current?.contains(event.target)
      )
        setOpen(false);
    };
    const desktop = window.matchMedia("(min-width: 761px)");
    const resize = () => {
      if (desktop.matches) setOpen(false);
    };
    document.addEventListener("keydown", close);
    document.addEventListener("pointerdown", outside);
    desktop.addEventListener("change", resize);
    return () => {
      document.removeEventListener("keydown", close);
      document.removeEventListener("pointerdown", outside);
      desktop.removeEventListener("change", resize);
    };
  }, [open]);
  return (
    <header ref={header} className="site-header" data-menu-open={open}>
      <div className="wrap header-inner">
        <Link
          className="brand"
          href="/"
          aria-label="Hayden Teh home"
          onClick={() => setOpen(false)}
        >
          Hayden.
        </Link>
        <Button
          ref={button}
          className="menu-toggle hidden max-[760px]:inline-flex"
          variant="ghost"
          size="icon-lg"
          type="button"
          aria-controls="site-nav"
          aria-expanded={open}
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setOpen(!open)}
        >
          <svg
            className="size-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
          >
            <path
              d={open ? "M6 6l12 12M6 18 18 6" : "M3 7h18M3 12h18M3 17h18"}
            />
          </svg>
        </Button>
        <nav
          id="site-nav"
          className="site-nav"
          data-open={open}
          aria-label="Main navigation"
        >
          {links.map(([id, label]) => (
            <Link key={id} href={`/#${id}`} onClick={() => setOpen(false)}>
              {label}
            </Link>
          ))}
          <Button
            asChild
            variant="outline"
            className="h-10 rounded-full px-5 text-base leading-6 font-normal tracking-[-0.16px] shadow-[0_1px_2px_#1e151526] hover:bg-white"
          >
            <Link
              className="nav-contact"
              href="/#contact"
              onClick={() => setOpen(false)}
            >
              Get in Touch
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
