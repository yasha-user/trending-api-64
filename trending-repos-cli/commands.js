#!/usr/bin/env node
const { program } = require("commander");
const inquirer = require("inquirer");
const prompt = inquirer.createPromptModule();
const { findRepo, listRepos, forceSyncFromCli } = require("./index.js");

// Repo questions
const questions = [
  { type: "input", name: "repo_name", message: "Name of the repo:" },
  { type: "input", name: "repo_id", message: "Repo id:" },
  { type: "input", name: "stargazers_count", message: "Count of stars:" },
  { type: "input", name: "description", message: "Repo description:" },
];

program.version("1.0.0").description("Trending Repositories CLI");

// program

// Find command
program
  .command("find <name>")
  .alias("f")
  .description("find a repo by name")
  .action((name) => findRepo(name));

// List command
program
  .command("list")
  .alias("l")
  .description("list all repos")
  .action(() => listRepos());

// SHOULD BE force sync
program
  .command("fsync")
  .alias("fs")
  .description("force syncronize")
  .action(() => forceSyncFromCli());

program.parse(process.argv);
