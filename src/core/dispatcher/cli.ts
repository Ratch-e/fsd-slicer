import { Command } from "commander";
import { runInit } from "../commands/init";
import { runGenerate } from "../commands/generate";

export const createCLI = () => {
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

  program
    .command("generate")
    .argument("<type>", "Slice type")
    .argument("<name>", "Name")
    .argument("[subtype]", "For shared: ui, lib...")
    .action((type, name, subtype) => {
      runGenerate(type, name, subtype);
    });

  return program;
};
