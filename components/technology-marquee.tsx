"use client";

import { useState } from "react";
import Image from "next/image";
import { asset } from "@/lib/site";
import { Button } from "@/components/ui/button";

const technologies = [
  ["python", "Python"],
  ["java", "Java"],
  ["typescript", "TypeScript"],
  ["javascript", "JavaScript"],
  ["react", "React"],
  ["tailwind", "Tailwind CSS"],
  ["docker", "Docker"],
  ["postgresql", "PostgreSQL"],
  ["mysql", "MySQL"],
  ["git", "Git"],
  ["gitlab", "GitLab"],
  ["fastapi", "FastAPI"],
];

export function TechnologyMarquee() {
  const [paused, setPaused] = useState(false);
  return (
    <section
      className="technology-section"
      aria-labelledby="technology-heading"
    >
      <div className="technology-heading">
        <h2 id="technology-heading">Technologies &amp; Tools Experience</h2>
        <Button
          type="button"
          className="marquee-toggle text-muted-foreground"
          size="icon"
          variant="ghost"
          aria-label={
            paused ? "Play technology animation" : "Pause technology animation"
          }
          aria-pressed={paused}
          onClick={() => setPaused(!paused)}
        >
          <span aria-hidden="true">{paused ? "▶" : "Ⅱ"}</span>
        </Button>
      </div>
      <div className="technology-window" data-paused={paused}>
        <div className="technology-track">
          {[0, 1].map((copy) => (
            <ul
              className="technology-group"
              key={copy}
              aria-hidden={copy === 1 ? true : undefined}
            >
              {technologies.map(([slug, name]) => (
                <li key={slug} title={name}>
                  <Image
                    src={asset(`technologies/${slug}.svg`)}
                    alt=""
                    width={28}
                    height={28}
                    loading="eager"
                  />
                  <span className="sr-only">{name}</span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
