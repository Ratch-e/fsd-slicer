import prompts from "prompts";
import { DEFAULT_ROOT, DEFAULT_SLICES } from "../../constants/common";
import { FSDConfig } from "../../types/common";

export const runInitPrompt = async (): Promise<"default" | "custom"> => {
  const { mode } = await prompts({
    type: "select",
    name: "mode",
    message: `⚙️ Тип конфигурации:`,
    choices: [
      { title: "Стандартная", value: "default" },
      { title: "Свои настройки", value: "custom" },
    ],
    initial: 0,
  });

  return mode;
};

export const runCustomConfigPrompt = async (): Promise<FSDConfig> => {
  const { root } = await prompts({
    type: "text",
    name: "root",
    message: "🗂️  Root-папка:",
    initial: DEFAULT_ROOT,
  });

  const layers: Record<string, string> = {};

  for (const key of Object.keys(DEFAULT_SLICES)) {
    const { value } = await prompts({
      type: "text",
      name: "value",
      message: `📦 Название слоя '${key}':`,
      initial: DEFAULT_SLICES[key as keyof typeof DEFAULT_SLICES],
    });

    layers[key] = value;
  }

  return { root, layers };
};
