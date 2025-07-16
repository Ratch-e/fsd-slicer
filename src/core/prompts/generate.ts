import prompts from "prompts";
import { loadConfig } from "../../lib/loadConfig";
import { DEFAULT_SUBFOLDERS } from "../../constants/common";

export const runGeneratePrompt = async () => {
  const config = loadConfig();
  const availableLayers = Object.keys(config.layers);

  const responses = await prompts([
    {
      type: "select",
      name: "type",
      message: "What slice do you want to generate?",
      choices: availableLayers.map((l) => ({ title: l, value: l })),
      initial: 0,
    },
    {
      type: "text",
      name: "name",
      message: "Enter name:",
      validate: (v) => (!!v ? true : "Name is required"),
    },
    {
      type: (_, values) => (values.type === "shared" ? "select" : null),
      name: "subtype",
      message: "Which shared category?",
      choices: DEFAULT_SUBFOLDERS.map((s) => ({ title: s, value: s })),
      initial: 0,
    },
  ]);

  return responses;
};
