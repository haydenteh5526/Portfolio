import { spawnSync } from "node:child_process";
import { cp, realpath, stat, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = await realpath(fileURLToPath(new URL("../", import.meta.url)));
function git(args) {
  const result = spawnSync("git", args, {
    cwd: root,
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
if (git(["branch", "--show-current"]) !== "main")
  throw new Error("Publish from main");
if (git(["status", "--porcelain"]))
  throw new Error("Commit source changes before publishing");

const docs = resolve(root, "docs");
const output = resolve(root, "out");
if (
  (await realpath(docs)) !== docs ||
  !(await stat(resolve(docs, ".nojekyll"))).isFile()
)
  throw new Error("Expected the generated Pages directory at docs/");
if (!(await stat(resolve(output, "index.html"))).isFile())
  throw new Error("Build the portfolio before publishing");

// Replace tracked export files, including any old hashed assets.
git(["rm", "-r", "--", "docs"]);
await cp(output, docs, { recursive: true });
await writeFile(resolve(docs, ".nojekyll"), "");
git(["add", "--", "docs"]);

if (git(["diff", "--cached", "--name-only", "--", "docs"])) {
  git(["commit", "-m", "deploy: update portfolio export"]);
}
git(["push", "origin", "main"]);
console.log("Published the export from main/docs.");
