"use client";

import { useEffect, useRef } from "react";
import { ArrowUp } from "@/components/icons";
import { Button } from "@/components/ui/button";

export function BackToTop() {
  const link = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const update = () => {
      if (link.current)
        link.current.dataset.visible = String(window.scrollY > 600);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <Button
      asChild
      size="icon"
      variant="outline"
      className="back-to-top size-12 rounded-full border border-border shadow-lg transition-[opacity,transform,visibility,background-color]"
    >
      <a
        ref={link}
        href="#top"
        data-visible="false"
        aria-label="Back to top"
        title="Back to top"
      >
        <ArrowUp className="size-5" />
      </a>
    </Button>
  );
}
