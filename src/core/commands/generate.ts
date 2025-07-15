import { createDefaultInnerStructure } from "../generators/slices/createDefaultInnerStructure";
import chalk from "chalk";
import { createSharedStructure } from "../generators/slices/createSharedStructure";
import { loadConfig } from "../../lib/loadConfig";
import { DEFAULT_SUBFOLDERS } from "../../constants/common";

export const runGenerate = (type: string, name: string, subtype?: string) => {
  const config = loadConfig();
  const availableLayers = Object.keys(config.layers);

  if (!availableLayers.includes(type)) {
    console.log(
      chalk.red(`❌ Unknown slice: "${type}". Avaliable ones: ${availableLayers.join(", ")}`),
    );
    return;
  }

  if (type === "shared") {
    if (!subtype) {
      console.log(
        chalk.red(`❌ Provide shared slice type. Avaliable ones: ${DEFAULT_SUBFOLDERS.join(", ")}`),
      );
      return;
    }

    createSharedStructure(name, subtype);
    return;
  }

  createDefaultInnerStructure(name, type);
};
