import { loadConfig } from "../../lib/loadConfig";
import { runCustomConfigPrompt, runInitPrompt } from "../prompts/init";
import { createConfigFile } from "../generators/createConfigFile";
import { createFolders } from "../generators/createFolders";
import { FSDConfig } from "../../types/common";
import { checkProjectRoot } from "../../lib/checkProjectRoot";

export const runInit = async (targetDir?: string) => {
  checkProjectRoot();

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
