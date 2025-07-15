import fs from "fs-extra";
import path from "path";
import chalk from "chalk";
import { FSDConfig } from "../../types/common";

export const createConfigFile = (config: FSDConfig) => {
  const configPath = path.resolve(process.cwd(), ".fsdslicerrc");
  fs.writeJSONSync(configPath, config, { spaces: 2 });

  console.log(chalk.green(`✅ Конфиг создан: .fsdslicerrc`));
};
