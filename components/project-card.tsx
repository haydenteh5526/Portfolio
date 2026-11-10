import Image from "next/image";
import Link from "next/link";
import { asset, type Project } from "@/lib/site";
import { Button } from "@/components/ui/button";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article
      className={`project-card tone-${project.tone}`}
      aria-labelledby={`${project.slug}-title`}
    >
      <div className="project-copy">
        <h3 id={`${project.slug}-title`}>{project.name}</h3>
        <p>{project.summary}</p>
        <div className="project-actions">
          <Button asChild size="portfolio">
            <Link
              href={`/projects/${project.slug}/`}
              aria-label={`View ${project.name} details`}
            >
              View Details
            </Link>
          </Button>
        </div>
      </div>
      <figure className="project-visual">
        <Link
          href={`/projects/${project.slug}/`}
          tabIndex={-1}
          aria-hidden="true"
        >
          <Image
            src={asset(`projects/${project.screenshot.file}`)}
            width={project.screenshot.width}
            height={project.screenshot.height}
            alt={project.screenshot.alt}
            className="h-full w-full object-contain"
          />
        </Link>
        <figcaption className="sr-only">{project.screenshot.caption}</figcaption>
      </figure>
    </article>
  );
}
