import { contact } from "@/lib/site";
import { ContactForm } from "./contact-form";
import { BackToTop } from "./back-to-top";

export function Footer() {
  const recipient = encodeURIComponent(contact.email);

  return (
    <>
      <section
        id="contact"
        className="contact-section"
        aria-labelledby="contact-heading"
      >
        <div className="wrap">
          <div className="contact-heading">
            <h2 id="contact-heading">Send me a message.</h2>
            <p>
              Have an opportunity, a project idea or just want to say hello? I’d
              love to hear from you.
            </p>
          </div>
          <ContactForm email={contact.email} endpoint={contact.formEndpoint} />
        </div>
      </section>
      <footer className="site-footer">
        <div className="wrap">
          <div className="footer-bottom">
            <span>© Hayden Teh {new Date().getFullYear()}</span>
            <nav className="footer-links" aria-label="Contact links">
              <a
                href={contact.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
              <a
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${recipient}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Email Hayden in Gmail"
              >
                Email
              </a>
            </nav>
          </div>
        </div>
      </footer>
      <BackToTop />
    </>
  );
}
