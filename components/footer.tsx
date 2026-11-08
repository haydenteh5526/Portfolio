import { contact } from "@/lib/site";
import { ArrowUpRight } from "./icons";

export function Footer() {
  return (
    <footer
      id="contact"
      className="site-footer"
      aria-labelledby="contact-heading"
    >
      <div className="wrap">
        <div className="footer-heading">
          <h2 id="contact-heading">Let’s have a chat.</h2>
          <a
            className="button button-light"
            href={contact.cv}
            target="_blank"
            rel="noopener noreferrer"
          >
            View CV <ArrowUpRight />
          </a>
        </div>
        <p className="footer-intro">
          I’m seeking a graduate software engineering role where I can
          contribute my experience in software engineering and AI automation
          while continuing to learn.
        </p>
        <div className="footer-bottom">
          <span>© Hayden Teh {new Date().getFullYear()}</span>
          <nav className="footer-links" aria-label="Contact links">
            <a href={contact.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <a href={`mailto:${contact.email}`} aria-label="Email Hayden">
              Mail
            </a>
            <a href="#top">Back to top ↑</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
