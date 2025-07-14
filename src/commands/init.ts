import fs from "fs-extra";
import path from "path";
import chalk from "chalk";
import { loadConfig } from "../lib/loadConfig";

export function runInit(rootOverride: string) {
  const config = loadConfig();
  const root = path.resolve(process.cwd(), rootOverride || config.root);

  console.log(
    chalk.bold.cyan(`⚙️⚙️ Инициализация структуры FSD в папке ${chalk.yellow(root)}...\n`),
  );

  for (const layerKey of Object.keys(config.layers)) {
    const folderName = config.layers[layerKey];
    const fullPath = path.join(root, folderName);
    fs.ensureDirSync(fullPath);
    console.log(chalk.green(`📁 Создано: ${folderName}`));
  }

  console.log(chalk.bold.cyan("\n🚀FSD cтруктура готова!🚀"));
}
