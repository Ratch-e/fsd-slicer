import fs from "fs-extra";
import path from "path";
import chalk from "chalk";

import { FSDConfig } from "../../types/common";
import { DEFAULT_SUBFOLDERS } from "../../constants/common";

export const createFolders = (config: FSDConfig) => {
  const rootPath = path.resolve(process.cwd(), config.root);

  console.log(chalk.bold.cyan(`\n⚙️⚙️ Creating FSD structure in ${chalk.yellow(rootPath)}...\n`));

  for (const layerKey of Object.keys(config.layers)) {
    const folderName = config.layers[layerKey];
    const fullPath = path.join(rootPath, folderName);
    fs.ensureDirSync(fullPath);
    console.log(chalk.green(`📁 Created: ${folderName}`));

    if (layerKey === "shared") {
      for (const subfolder of DEFAULT_SUBFOLDERS) {
        const subPath = path.join(fullPath, subfolder);
        fs.ensureDirSync(subPath);
        console.log(chalk.green(`   └── 📁 ${subfolder}`));
      }
    }
  }

  console.log(chalk.bold.cyan("\n🚀FSD structure is ready!🚀\n\n"));
};
