#!/usr/bin/env node

const { execSync } = require("child_process");
const degit = require("degit");
const path = require("path");

const appName = process.argv[2];

if (!appName) {
  console.error("Please provide a name for your app:");
  console.error("  npx create-dwcc-app [app-name]");
  process.exit(1);
}

const repo = "HopeTS/devs-who-cant-code-starter#main";
const emitter = degit(repo, {
  cache: false,
  force: true,
});

const targetPath = path.join(process.cwd(), appName);

console.log(`Creating a new DWCC app in ${targetPath}`);
emitter
  .clone(targetPath)
  .then(() => {
    console.log("Installing dependencies...");
    execSync(`cd ${appName} && npm install`, { stdio: "inherit" });
    console.log("Dependencies installed.");
    console.log("All done!");
  })
  .catch((err) => {
    console.error(err);
  });
