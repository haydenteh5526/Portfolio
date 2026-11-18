import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "@/components/icons";
import { ProjectCover } from "@/components/project-cover";
import { ScreenshotViewer } from "@/components/screenshot-viewer";
import { asset, portfolio } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return portfolio.projects.map((project) => ({ slug: project.slug }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = portfolio.projects.find((project) => project.slug === slug);
  return project ? { title: project.name, description: project.summary } : {};
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const index = portfolio.projects.findIndex(
    (project) => project.slug === slug,
  );
  const project = portfolio.projects[index];
  if (!project) notFound();
  const next = portfolio.projects[(index + 1) % portfolio.projects.length];
  const sections = [
    ["project", "The project", project.purpose],
    ["approach", "Technical approach", project.approach],
    ["decision", "Design decisions", project.decision],
    ["evidence", "Evidence", project.evidenceText],
    ["status", "Current status", project.limitations],
  ];
  const { screenshot } = project;
  const shots = [screenshot, screenshot.secondary].map((shot) => ({
    src: asset(`projects/${shot.file}`),
    width: shot.width,
    height: shot.height,
    alt: shot.alt,
  }));
  return (
    <main id="main" className="wrap detail-main">
      <Link className="text-sm" href="/#projects">
        ← All projects
      </Link>
      <header className="detail-head">
        <p className="detail-eyebrow">
          <span>{project.category}</span>
          <span className="project-stage">
            <span className="sr-only">Status: </span>
            {project.stage}
          </span>
        </p>
        <h1>{project.name}</h1>
        <p className="lead">{project.summary}</p>
        <div className="actions mt-7">
          <Button asChild size="portfolio">
            <a
              href={project.repository}
              target="_blank"
              rel="noopener noreferrer"
            >
              View repository <ArrowUpRight />
            </a>
          </Button>
          <a
            className="text-link text-sm"
            href={project.evidence}
            target="_blank"
            rel="noopener noreferrer"
          >
            Project evidence <ArrowUpRight />
          </a>
        </div>
      </header>
      <ScreenshotViewer
        shots={shots}
        caption={`Simplified illustration of ${project.name}. The screenshots show the current build.`}
      >
        <ProjectCover screenshot={screenshot} />
      </ScreenshotViewer>
      <div className="detail-content">
        <div className="detail-copy">
          {sections.map(([id, title, text]) => (
            <section
              key={id}
              id={id}
              className={`detail-${id}`}
              aria-labelledby={`${id}-heading`}
            >
              <h2 id={`${id}-heading`}>{title}</h2>
              {id === "status" ? (
                <p className="detail-status-line">
                  <span className="project-stage">{project.stage}</span>
                  {project.status}
                </p>
              ) : null}
              <p>{text}</p>
              {id === "evidence" ? (
                <a
                  className="text-link detail-evidence-link"
                  href={project.evidence}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open the project evidence <ArrowUpRight />
                </a>
              ) : null}
            </section>
          ))}
        </div>
        <aside className="detail-sidebar" aria-label="Project summary">
          <h2>My role</h2>
          <p>{project.role}</p>
          <h2>Status</h2>
          <p>{project.status}</p>
          <h2>Technologies</h2>
          <div className="detail-skill-tags">
            {project.stack.map((item) => (
              <Badge
                key={item}
                variant="outline"
                className="rounded-md bg-white px-2.5 py-1.5 font-normal"
              >
                {item}
              </Badge>
            ))}
          </div>
          <h2>On this page</h2>
          <ul className="detail-jump">
            {sections.map(([id, title]) => (
              <li key={id}>
                <a href={`#${id}`}>{title}</a>
              </li>
            ))}
          </ul>
          <a
            href={project.repository}
            target="_blank"
            rel="noopener noreferrer"
          >
            Explore the code ↗
          </a>
          <a href={project.evidence} target="_blank" rel="noopener noreferrer">
            Read the documentation ↗
          </a>
        </aside>
      </div>
      <nav className="project-pagination" aria-label="Project navigation">
        <Link href="/#projects">← All projects</Link>
        <Link href={`/projects/${next.slug}/`}>
          Next project: {next.name} →
        </Link>
      </nav>
    </main>
  );
}
