export type ContactDraft = { name: string; email: string; message: string };

export function createContactDraft(recipient: string, fields: ContactDraft) {
  const name = fields.name.trim().replace(/[\r\n]+/g, " ");
  const email = fields.email.trim().replace(/[\r\n]+/g, " ");
  const subject = `Portfolio enquiry from ${name}`;
  const body = `Hi Hayden,\r\n\r\n${fields.message.trim().replace(/\r?\n/g, "\r\n")}\r\n\r\nFrom: ${name}\r\nEmail: ${email}`;
  return `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
