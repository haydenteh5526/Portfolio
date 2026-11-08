import Image from "next/image";
import Link from "next/link";
import { asset, type Project } from "@/lib/site";

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
          <Link
            className="button"
            href={`/projects/${project.slug}/`}
            aria-label={`View ${project.name} details`}
          >
            View Details
          </Link>
        </div>
      </div>
      <figure className="project-visual">
        <Link
          href={`/projects/${project.slug}/`}
          tabIndex={-1}
          aria-hidden="true"
        >
          <Image
            src={asset(`projects/${project.art}`)}
            width={520}
            height={360}
            alt={project.artAlt}
            className="h-full w-full object-cover"
          />
        </Link>
        <figcaption className="sr-only">Project illustration</figcaption>
      </figure>
    </article>
  );
}
