import { spawnSync } from "node:child_process";
import { mkdtemp, cp, writeFile, rm, realpath } from "node:fs/promises";
import { tmpdir } from "node:os";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
function git(args, cwd = root) {
  const result = spawnSync("git", args, {
    cwd,
    encoding: "utf8",
    env: { ...process.env, GIT_TERMINAL_PROMPT: "0" },
  });
  if (result.status !== 0)
    throw new Error(result.stderr || `git ${args[0]} failed`);
  return result.stdout.trim();
}

const remote = git(["remote", "get-url", "origin"]);
if (remote !== "https://github.com/haydenteh5526/Portfolio.git")
  throw new Error("Unexpected publishing repository");
if (git(["status", "--porcelain"]))
  throw new Error("Commit source changes before publishing");
const revision = git(["rev-parse", "--short", "HEAD"]);
const authorName = git(["config", "user.name"]);
const authorEmail = git(["config", "user.email"]);
const temporaryRoot = await realpath(tmpdir());
const staging = await mkdtemp(
  resolve(temporaryRoot, "hayden-portfolio-pages-"),
);
if (dirname(staging) !== temporaryRoot)
  throw new Error("Invalid publishing directory");
try {
  await cp(resolve(root, "out"), staging, { recursive: true });
  await writeFile(resolve(staging, ".nojekyll"), "");
  git(["init", "--initial-branch=gh-pages"], staging);
  git(["config", "user.name", authorName], staging);
  git(["config", "user.email", authorEmail], staging);
  git(["remote", "add", "origin", remote], staging);
  const ref = git(["ls-remote", "--heads", "origin", "gh-pages"]);
  if (ref) {
    git(["fetch", "--depth=1", "origin", "gh-pages"], staging);
    git(["reset", "--soft", "FETCH_HEAD"], staging);
  }
  git(["add", "--all"], staging);
  git(
    ["commit", "--allow-empty", "-m", `deploy: publish portfolio ${revision}`],
    staging,
  );
  git(["push", "origin", "HEAD:gh-pages"], staging);
  console.log(`Published export from ${revision} to gh-pages.`);
} finally {
  // The verified, unique temporary directory is the only removal target.
  await rm(staging, { recursive: true, force: true });
}
