"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createContactDraft } from "@/lib/contact-draft";

const messages = {
  idle: "",
  draft:
    "If your email app didn’t open, you can copy your message and use the address below.",
  sending: "Sending your message…",
  sent: "Thanks for your message. It has been sent.",
  error:
    "I couldn’t confirm that your message was sent. Your text is still here. Please try again or email me directly.",
};

export function ContactForm({
  email,
  endpoint,
}: {
  email: string;
  endpoint?: string;
}) {
  const [status, setStatus] = useState<keyof typeof messages>("idle");

  async function submitMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;
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
    if (!endpoint) {
      setStatus("draft");
      window.location.href = createContactDraft(email, fields);
      return;
    }

    setStatus("sending");
    for (const [key, value] of Object.entries(fields)) {
      data.set(key, value.trim());
    }
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
        signal: AbortSignal.timeout(15_000),
      });
      if (!response.ok) {
        setStatus("error");
        return;
      }
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form
      className="contact-form"
      aria-label="Contact Hayden"
      aria-describedby="contact-form-note"
      action={endpoint || `mailto:${email}`}
      method="post"
      encType={endpoint ? "multipart/form-data" : "text/plain"}
      onSubmit={submitMessage}
      onInput={(event) => {
        const input = event.target;
        if (
          input instanceof HTMLInputElement ||
          input instanceof HTMLTextAreaElement
        ) {
          input.setCustomValidity("");
        }
        setStatus("idle");
      }}
    >
      <fieldset disabled={status === "sending"}>
        {endpoint ? (
          <input
            type="text"
            name="_gotcha"
            hidden
            tabIndex={-1}
            autoComplete="off"
          />
        ) : null}
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
      </fieldset>
      <div className="contact-submit">
        <p id="contact-form-note">
          {endpoint
            ? "Send a message directly from this page."
            : "Opens a draft in your email app for you to review and send."}
        </p>
        <Button type="submit" size="portfolio" disabled={status === "sending"}>
          {endpoint ? "Send message" : "Open email draft"} <ArrowRight />
        </Button>
        <p className="contact-status" role="status" data-state={status}>
          {messages[status]}
        </p>
        <p className="contact-direct">
          Prefer to email directly? <a href={`mailto:${email}`}>{email}</a>
        </p>
      </div>
    </form>
  );
}
