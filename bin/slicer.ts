#!/usr/bin/env node

import { Command } from "commander";
import { runInit } from "../src//core/commands/init";

const program = new Command();
program
  .name("fsd-slicer")
  .description("CLI for generating Feature-Sliced Design structure")
  .version("0.1.0");

program
  .command("init")
  .description("Create initial FSD folder structure")
  .argument("[rootFolder]", "Target root folder")
  .action((rootFolder) => runInit(rootFolder));

program.parse();
