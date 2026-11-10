import Link from "next/link";
import { ProjectCover } from "@/components/project-cover";
import type { Project } from "@/lib/site";
import { Button } from "@/components/ui/button";

export function ProjectCard({ project }: { project: Project }) {
  const { screenshot } = project;

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
          className="project-preview"
          tabIndex={-1}
          aria-hidden="true"
        >
          <ProjectCover screenshot={screenshot} />
        </Link>
        <figcaption className="sr-only">{screenshot.caption}</figcaption>
      </figure>
    </article>
  );
}
