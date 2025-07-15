import fs from "fs";
import path from "path";
import chalk from "chalk";

export const checkProjectRoot = () => {
  const root = process.cwd();
  const pkgPath = path.join(root, "package.json");

  if (!fs.existsSync(pkgPath)) {
    console.log(chalk.red("❌ Вы не в корне проекта.❌"));
    console.log(chalk.yellow("Пожалуйста, запустите команду из корня проекта."));
    process.exit(1);
  }
};
