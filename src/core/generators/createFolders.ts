import fs from "fs-extra";
import path from "path";
import chalk from "chalk";

import { FSDConfig } from "../../types/common";

export const createFolders = (config: FSDConfig) => {
  const rootPath = path.resolve(process.cwd(), config.root);

  console.log(
    chalk.bold.cyan(`\n⚙️⚙️ Инициализация структуры FSD в папке ${chalk.yellow(rootPath)}...\n`),
  );

  for (const layerKey of Object.keys(config.layers)) {
    const folderName = config.layers[layerKey];
    const fullPath = path.join(rootPath, folderName);
    fs.ensureDirSync(fullPath);
    console.log(chalk.green(`📁 Создано: ${folderName}`));
  }

  console.log(chalk.bold.cyan("\n🚀FSD cтруктура готова!🚀\n\n"));
};
