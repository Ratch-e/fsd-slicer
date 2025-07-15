import fs from "fs-extra";
import path from "path";
import chalk from "chalk";
import { loadConfig } from "../lib/loadConfig";
import { runCustomConfigPrompt, runInitPrompt } from "../core/promps/init";
import { createConfigFile } from "../core/generators/createConfigFile";
import { createFolders } from "../core/generators/createFolders";
import { FSDConfig } from "../types/common";

export const runInit = async (targetDir?: string) => {
  const mode = await runInitPrompt();

  let config: FSDConfig;

  if (mode === "custom") {
    config = await runCustomConfigPrompt();
    createConfigFile(config);
  } else {
    config = loadConfig();
  }

  if (targetDir) {
    config.root = targetDir;
  }

  createFolders(config);
};
