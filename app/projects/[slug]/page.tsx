import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "@/components/icons";
import { asset, portfolio } from "@/lib/site";

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
    ["The project", project.purpose],
    ["Technical approach", project.approach],
    ["Design decisions", project.decision],
    ["Evidence", project.evidenceText],
    ["Current status", project.limitations],
  ];
  return (
    <main id="main" className="wrap detail-main">
      <Link className="text-sm" href="/#projects">
        ← All projects
      </Link>
      <header className="detail-head">
        <p className="mb-5 text-[13px] font-medium uppercase tracking-[1.5px]">
          {project.category}
        </p>
        <h1>{project.name}</h1>
        <p className="lead">{project.summary}</p>
        <div className="actions mt-7">
          <a
            className="button"
            href={project.repository}
            target="_blank"
            rel="noopener noreferrer"
          >
            View repository <ArrowUpRight />
          </a>
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
      <figure className={`detail-art tone-${project.tone}`}>
        <Image
          src={asset(`projects/${project.art}`)}
          alt={project.artAlt}
          width={520}
          height={360}
          priority
          className="mx-auto h-auto w-full max-w-[740px] rounded-3xl"
        />
        <figcaption>Project illustration</figcaption>
      </figure>
      <div className="detail-content">
        <div className="detail-copy">
          {sections.map(([title, text]) => (
            <section key={title}>
              <h2>{title}</h2>
              <p>{text}</p>
            </section>
          ))}
        </div>
        <aside className="detail-sidebar" aria-label="Project summary">
          <h2>Status</h2>
          <p>{project.status}</p>
          <h2>Technologies</h2>
          <div className="skill-tags mb-7">
            {project.stack.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
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
