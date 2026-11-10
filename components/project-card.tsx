import Image from "next/image";
import Link from "next/link";
import { asset, type Project } from "@/lib/site";
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
          data-layout={screenshot.height > screenshot.width ? "phone" : "web"}
          tabIndex={-1}
          aria-hidden="true"
        >
          <span className="project-preview-composition">
            <span className="project-preview-screen project-preview-secondary">
              <Image
                src={asset(`projects/${screenshot.secondary.file}`)}
                width={screenshot.secondary.width}
                height={screenshot.secondary.height}
                alt=""
              />
            </span>
            <span className="project-preview-screen project-preview-primary">
              <Image
                src={asset(`projects/${screenshot.file}`)}
                width={screenshot.width}
                height={screenshot.height}
                alt=""
              />
            </span>
          </span>
        </Link>
        <figcaption className="sr-only">{screenshot.caption}</figcaption>
      </figure>
    </article>
  );
}
