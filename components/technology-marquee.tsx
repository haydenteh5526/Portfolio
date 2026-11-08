"use client";

import { useState } from "react";
import Image from "next/image";
import { asset } from "@/lib/site";

const technologies = [
  ["python", "Python"],
  ["react", "React"],
  ["typescript", "TypeScript"],
  ["javascript", "JavaScript"],
  ["docker", "Docker"],
  ["postgresql", "PostgreSQL"],
  ["git", "Git"],
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
        <button
          type="button"
          className="marquee-toggle"
          aria-label={
            paused ? "Play technology animation" : "Pause technology animation"
          }
          aria-pressed={paused}
          onClick={() => setPaused(!paused)}
        >
          <span aria-hidden="true">{paused ? "▶" : "Ⅱ"}</span>
        </button>
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
                <li key={slug}>
                  <Image
                    src={asset(`technologies/${slug}.svg`)}
                    alt=""
                    width={40}
                    height={40}
                  />
                  <span>{name}</span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
