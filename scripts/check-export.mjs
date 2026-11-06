import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import { resolve, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const output = resolve(root, "out");
const content = JSON.parse(
  await readFile(resolve(root, "lib/content.json"), "utf8"),
);
const slugs = content.projects.map((p) => p.slug);
assert.equal(new Set(slugs).size, slugs.length, "Duplicate project slug");
const pages = [
  "index.html",
  "404.html",
  ...slugs.map((slug) => `projects/${slug}/index.html`),
];
const documents = new Map(
  await Promise.all(
    pages.map(async (page) => [
      page,
      await readFile(resolve(output, page), "utf8"),
    ]),
  ),
);
let references = 0;
for (const [page, html] of documents) {
  assert.equal(
    (html.match(/<h1\b/g) || []).length,
    1,
    `${page}: expected one main heading`,
  );
  assert(html.includes('<html lang="en"'), `${page}: missing language`);
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
  assert.equal(ids.length, new Set(ids).size, `${page}: duplicate IDs`);
  for (const [, raw] of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
    const value = raw.replaceAll("&amp;", "&");
    if (/^(?:https?:|mailto:|data:)/.test(value)) continue;
    const url = new URL(value, `https://example.com/Portfolio/${page}`);
    assert(
      url.pathname === "/Portfolio" || url.pathname.startsWith("/Portfolio/"),
      `${page}: URL leaves project base: ${value}`,
    );
    let path =
      decodeURIComponent(url.pathname.replace(/^\/Portfolio\/?/, "")) ||
      "index.html";
    if (path.endsWith("/")) path += "index.html";
    const target = resolve(output, path);
    assert(
      !relative(output, target).startsWith(".."),
      `${page}: invalid file path`,
    );
    assert((await stat(target)).isFile(), `${page}: missing ${path}`);
    if (url.hash) {
      const destination =
        documents.get(path) || (await readFile(target, "utf8"));
      assert(
        destination.includes(`id="${decodeURIComponent(url.hash.slice(1))}"`),
        `${page}: missing anchor ${value}`,
      );
    }
    references++;
  }
  for (const [tag] of html.matchAll(/<img\b[^>]*>/g))
    assert(/\balt="/.test(tag), `${page}: image missing alternative text`);
}
console.log(
  `Validated ${pages.length} exported pages, ${slugs.length} case studies and ${references} local links/assets.`,
);
