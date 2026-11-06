import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, GitHubIcon } from "@/components/icons";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/motion";
import { asset, contact, media, portfolio, skills } from "@/lib/site";

export default function Home() {
  const videoUrl = /^https:\/\//.test(media.video)
    ? media.video
    : asset(media.video);
  return (
    <main id="main" className="wrap">
      <section className="hero" aria-labelledby="intro-title">
        <Reveal>
          <p className="hero-role">{portfolio.role}</p>
          <h1 id="intro-title">{portfolio.name}</h1>
          <p className="hero-intro">{portfolio.intro}</p>
          <div className="actions">
            <a
              className="button"
              href={contact.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHubIcon />
              GitHub
            </a>
            <a
              className="button button-blue"
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn <ArrowUpRight />
            </a>
            <Link className="button button-blue" href="/#projects">
              View Projects
            </Link>
            <a
              className="text-link text-sm"
              href={contact.cv}
              target="_blank"
              rel="noopener noreferrer"
            >
              View CV <ArrowUpRight className="size-3.5" />
            </a>
          </div>
        </Reveal>
        <Reveal className="portrait">
          {media.portrait ? (
            <Image
              src={asset(media.portrait)}
              alt="Hayden Teh"
              width={300}
              height={320}
              priority
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="monogram" aria-label="Hayden Teh initials">
              <span>HT</span>
              <small>Hayden Teh</small>
            </div>
          )}
        </Reveal>
      </section>

      <section
        id="projects"
        className="section"
        aria-labelledby="projects-heading"
      >
        <h2 id="projects-heading" className="section-title">
          Projects
        </h2>
        <div className="grid gap-[38px] max-[520px]:gap-6">
          {portfolio.projects.map((project) => (
            <Reveal key={project.slug}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
        <p className="mt-9 text-center text-base">
          More Projects on{" "}
          <a
            className="text-link font-bold"
            href={`${contact.github}?tab=repositories`}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub <ArrowUpRight />
          </a>
        </p>
      </section>

      <section
        id="experience"
        className="section"
        aria-labelledby="experience-heading"
      >
        <h2 id="experience-heading" className="section-title">
          Professional Experience
        </h2>
        <div className="grid gap-7">
          {portfolio.experience.map((item) => (
            <Reveal key={item.company}>
              <article className="experience-card">
                <div>
                  <h3 className="text-[28px] font-medium tracking-tight">
                    {item.company}
                  </h3>
                  <p className="mt-1 text-sm">{item.role}</p>
                  <p className="mt-2 text-sm">{item.location}</p>
                  <p className="mt-5 text-[13px]">{item.dates}</p>
                </div>
                <div className="experience-body">
                  <p>{item.intro}</p>
                  <div className="metrics">
                    {item.metrics.map(([value, label]) => (
                      <div key={value}>
                        <strong>{value}</strong>
                        <span>{label}</span>
                      </div>
                    ))}
                  </div>
                  <p>{item.details}</p>
                  <p className="learning">
                    <strong>What I learned</strong>
                    <br />
                    {item.learning}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section
        id="education"
        className="section"
        aria-labelledby="education-heading"
      >
        <h2 id="education-heading" className="section-title">
          Education
        </h2>
        <div>
          {portfolio.education.map((item) => (
            <Reveal key={item.institution}>
              <article className="education-card">
                <div>
                  <h3>{item.institution}</h3>
                  <p className="text-[15px]">{item.location}</p>
                </div>
                <div>
                  <p>{item.qualification}</p>
                  <p className="text-[15px]">{item.dates}</p>
                  <p className="text-base font-bold text-ink">{item.result}</p>
                  {item.note ? (
                    <p className="text-[15px]">{item.note}</p>
                  ) : null}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="awards" className="section" aria-labelledby="awards-heading">
        <h2 id="awards-heading" className="section-title">
          Awards &amp; Achievements
        </h2>
        {portfolio.awards.map((item) => (
          <Reveal key={item.title}>
            <article className="award-card">
              <p className="text-sm font-bold uppercase tracking-widest text-ink">
                {item.result}
              </p>
              <h3>{item.title}</h3>
              <p>{item.details}</p>
              <p className="mt-5 text-sm">{item.dates}</p>
            </article>
          </Reveal>
        ))}
      </section>

      <section id="skills" className="section" aria-labelledby="skills-heading">
        <h2 id="skills-heading" className="section-title">
          Skills &amp; Technologies
        </h2>
        <div className="grid grid-cols-2 gap-x-[60px] gap-y-7 max-[520px]:grid-cols-1">
          {skills.map((group) => (
            <Reveal key={group.title}>
              <div className="h-full border-b border-line pb-7">
                <h3 className="mb-5 text-lg font-medium text-ink">
                  {group.title}
                </h3>
                <div className="skill-tags">
                  {group.items.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {media.video ? (
        <section id="pitch" className="section" aria-labelledby="pitch-heading">
          <h2 id="pitch-heading" className="section-title">
            My Elevator Pitch
          </h2>
          {/\.mp4(?:[?#].*)?$/i.test(media.video) ? (
            <video
              className="w-full rounded-3xl"
              controls
              preload="metadata"
              poster={media.poster ? asset(media.poster) : undefined}
              aria-label="Hayden Teh elevator pitch"
            >
              <source src={videoUrl} type="video/mp4" />
              {media.captions ? (
                <track
                  kind="captions"
                  src={asset(media.captions)}
                  srcLang="en"
                  label="English"
                  default
                />
              ) : null}
            </video>
          ) : null}
          <a
            className="button mt-5"
            href={videoUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Watch my elevator pitch <ArrowUpRight />
          </a>
        </section>
      ) : null}

      <section
        id="contact"
        className="contact"
        aria-labelledby="contact-heading"
      >
        <div>
          <h2 id="contact-heading">Let’s connect</h2>
          <p>
            I’m seeking a graduate software engineering role where I can
            contribute my experience in software engineering and AI automation
            while continuing to learn.
          </p>
        </div>
        <div className="actions">
          <a className="button" href={`mailto:${contact.email}`}>
            Email Hayden <ArrowUpRight />
          </a>
          <a
            className="button"
            href={contact.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub <ArrowUpRight />
          </a>
          <a
            className="button button-blue"
            href={contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn <ArrowUpRight />
          </a>
        </div>
      </section>
    </main>
  );
}
