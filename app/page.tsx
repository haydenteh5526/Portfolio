import Image from "next/image";
import { ArrowUpRight, GitHubIcon, LinkedInIcon } from "@/components/icons";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/motion";
import { ProjectStack } from "@/components/project-stack";
import { TechnologyMarquee } from "@/components/technology-marquee";
import { asset, contact, media, portfolio, skills } from "@/lib/site";

export default function Home() {
  const videoUrl = /^https:\/\//.test(media.video)
    ? media.video
    : asset(media.video);
  return (
    <main id="main" className="wrap">
      <section className="hero" aria-labelledby="intro-title">
        <Reveal className="hero-copy">
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
              <LinkedInIcon /> LinkedIn
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
        <ProjectStack>
          {portfolio.projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </ProjectStack>
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

      <TechnologyMarquee />

      <section
        id="experience"
        className="section"
        aria-labelledby="experience-heading"
      >
        <h2 id="experience-heading" className="section-title">
          Professional Experience
        </h2>
        <div className="resume-list">
          {portfolio.experience.map((item) => (
            <Reveal key={item.company}>
              <article className="experience-card">
                <div className="resume-heading">
                  <div>
                    <h3>{item.company}</h3>
                    <p className="resume-role">{item.role}</p>
                  </div>
                  <div className="resume-meta">
                    <p className="resume-location">{item.location}</p>
                    <p>{item.dates}</p>
                  </div>
                </div>
                <div className="experience-body">
                  <ul>
                    <li>{item.intro}</li>
                    <li>
                      {item.metrics.map(([value, label]) => (
                        <span className="experience-result" key={value}>
                          <strong>{value}</strong> — {label.toLowerCase()}.
                        </span>
                      ))}
                    </li>
                    <li>{item.details}</li>
                  </ul>
                  <p className="learning">
                    <strong>What I learned</strong>
                    {": "}
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
        <div className="resume-list">
          {portfolio.education.map((item) => (
            <Reveal key={item.institution}>
              <article className="education-card">
                <div className="resume-heading">
                  <div>
                    <h3>{item.institution}</h3>
                    <p className="resume-role">{item.qualification}</p>
                  </div>
                  <div className="resume-meta">
                    <p className="resume-location">{item.location}</p>
                    <p>{item.dates}</p>
                  </div>
                </div>
                <div>
                  <p className="font-bold">{item.result}</p>
                  {item.note ? <p>{item.note}</p> : null}
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
          Skills
        </h2>
        <Reveal>
          <ul className="skill-tags" aria-label="Technical skills">
            {skills
              .flatMap((group) => group.items)
              .map((item) => (
                <li key={item}>{item}</li>
              ))}
          </ul>
        </Reveal>
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
    </main>
  );
}
