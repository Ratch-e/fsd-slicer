import fs from "fs-extra";
import path from "path";
import chalk from "chalk";
import { loadConfig } from "../../../lib/loadConfig";
import { DEFAULT_SUBFOLDERS } from "../../../constants/common";

export const createSharedStructure = (name: string, slice: string) => {
  const config = loadConfig();

  if (!DEFAULT_SUBFOLDERS.includes(slice)) {
    console.log(chalk.red(`❌ Unknown shared-slice folder type: "${slice}"`));
    return;
  }

  const basePath = path.join(process.cwd(), config.root, config.layers.shared, slice, name);
  fs.ensureDirSync(basePath);

  const indexPath = path.join(basePath, "index.ts");
  fs.writeFileSync(indexPath, `export * from './${name}';\n`);

  const fileExt = slice === "ui" ? "tsx" : "ts";
  const fileContent =
    slice === "ui"
      ? `export const ${name} = () => <div>${name}</div>;`
      : `export const ${name} = () => {\n  // TODO: Add code\n};`;

  const mainFilePath = path.join(basePath, `${name}.${fileExt}`);
  fs.writeFileSync(mainFilePath, fileContent);

  const sharedSliceIndex = path.join(
    process.cwd(),
    config.root,
    config.layers.shared,
    slice,
    "index.ts",
  );

  const exportLine = `export * from './${name}';`;

  if (!fs.existsSync(sharedSliceIndex)) {
    fs.writeFileSync(sharedSliceIndex, exportLine + "\n");
  } else {
    const existingContent = fs.readFileSync(sharedSliceIndex, "utf-8");
    if (!existingContent.includes(exportLine)) {
      fs.appendFileSync(sharedSliceIndex, exportLine + "\n");
    }
  }

  console.log(chalk.green(`✅ ${config.layers.shared}/${slice}/${name} created!\n`));
};
