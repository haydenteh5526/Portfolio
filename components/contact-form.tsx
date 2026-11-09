"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createContactDraft } from "@/lib/contact-draft";

export function ContactForm({ email }: { email: string }) {
  const [draftReady, setDraftReady] = useState(false);

  function openDraft(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const fields = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      message: String(data.get("message") ?? ""),
    };
    for (const key of ["name", "message"] as const) {
      const input = form.elements.namedItem(key) as
        | HTMLInputElement
        | HTMLTextAreaElement;
      input.setCustomValidity(
        fields[key].trim() ? "" : `Please enter your ${key}.`,
      );
    }
    if (!form.reportValidity()) return;
    setDraftReady(true);
    window.location.href = createContactDraft(email, fields);
  }

  return (
    <form
      className="contact-form"
      aria-label="Contact Hayden"
      aria-describedby="contact-form-note"
      action={`mailto:${email}`}
      method="post"
      encType="text/plain"
      onSubmit={openDraft}
      onInput={(event) => {
        const input = event.target;
        if (
          input instanceof HTMLInputElement ||
          input instanceof HTMLTextAreaElement
        ) {
          input.setCustomValidity("");
        }
        setDraftReady(false);
      }}
    >
      <div className="contact-fields">
        <div className="contact-field">
          <label htmlFor="contact-name">Your name</label>
          <Input
            id="contact-name"
            name="name"
            autoComplete="name"
            placeholder="Enter your name"
            maxLength={100}
            required
            className="h-12 rounded-lg bg-white px-4 text-base md:text-base"
          />
        </div>
        <div className="contact-field">
          <label htmlFor="contact-email">Email address</label>
          <Input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            maxLength={254}
            required
            className="h-12 rounded-lg bg-white px-4 text-base md:text-base"
          />
        </div>
      </div>
      <div className="contact-field">
        <label htmlFor="contact-message">Your message</label>
        <Textarea
          id="contact-message"
          name="message"
          placeholder="Hi Hayden, I’d love to discuss an opportunity with you…"
          rows={6}
          maxLength={1500}
          required
          className="min-h-40 resize-y rounded-lg bg-white p-4 text-base md:text-base"
        />
      </div>
      <div className="contact-submit">
        <p id="contact-form-note">
          Opens a draft in your email app for you to review and send.
        </p>
        <Button type="submit" variant="outline" size="portfolio">
          Open email draft <ArrowRight />
        </Button>
        <p className="contact-status" role="status" aria-live="polite">
          {draftReady
            ? "If your email app didn’t open, you can copy your message and use the address below."
            : ""}
        </p>
        <p className="contact-direct">
          Prefer to email directly? <a href={`mailto:${email}`}>{email}</a>
        </p>
      </div>
    </form>
  );
}
