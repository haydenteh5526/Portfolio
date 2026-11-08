"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const links = [
  ["projects", "Projects"],
  ["experience", "Experience"],
  ["education", "Education"],
  ["awards", "Awards"],
  ["skills", "Skills"],
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);
  useEffect(() => {
    const update = () => {
      if (header.current)
        header.current.dataset.scrolled = String(window.scrollY > 20);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
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
    <header ref={header} className="site-header">
      <div className="wrap header-inner">
        <Link
          className="brand"
          href="/"
          aria-label="Hayden Teh home"
          onClick={() => setOpen(false)}
        >
          Hayden.
        </Link>
        <button
          ref={button}
          className="menu-toggle"
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
        </button>
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
          <Link
            className="nav-contact"
            href="/#contact"
            onClick={() => setOpen(false)}
          >
            Get in Touch
          </Link>
        </nav>
      </div>
    </header>
  );
}
