import Image from "next/image";
import Link from "next/link";
import { asset, type Project } from "@/lib/site";
import { ArrowUpRight } from "./icons";
import { ProjectMotion } from "./motion";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <ProjectMotion className={`project-card tone-${project.tone}`}>
      <article className="contents" aria-labelledby={`${project.slug}-title`}>
        <div className="project-copy">
          <h3 id={`${project.slug}-title`}>{project.name}</h3>
          <p>{project.summary}</p>
          <p className="project-stack">{project.stack.join(" · ")}</p>
          <p className="project-status">{project.status}</p>
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-4">
            <Link
              className="button button-small"
              href={`/projects/${project.slug}/`}
              aria-label={`View ${project.name} details`}
            >
              View Details
            </Link>
            <a
              className="inline-flex items-center gap-1 text-sm"
              href={project.repository}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.name} on GitHub`}
            >
              GitHub <ArrowUpRight className="size-3.5" />
            </a>
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
              className="h-auto w-full rounded-[22px]"
            />
          </Link>
          <figcaption>Project illustration</figcaption>
        </figure>
      </article>
    </ProjectMotion>
  );
}
