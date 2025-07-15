import fs from "fs-extra";
import path from "path";
import chalk from "chalk";
import { loadConfig } from "../../../lib/loadConfig";
import { DEFAULT_SUBFOLDERS } from "../../../constants/common";

export const createDefaultInnerStructure = (name: string, type: string) => {
  const config = loadConfig();
  const base = path.join(process.cwd(), config.root, config.layers[type], name);

  for (const sub of DEFAULT_SUBFOLDERS) {
    fs.ensureDirSync(path.join(base, sub));
  }

  const indexContent = "";
  fs.writeFileSync(path.join(base, "index.ts"), indexContent);

  console.log(chalk.green(`✅ ${type} "${name}" created\n`));
};
