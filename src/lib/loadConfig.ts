import { cosmiconfigSync } from "cosmiconfig";

export interface FSDConfig {
  root: string;
  layers: Record<string, string>;
}

const defaultConfig: FSDConfig = {
  root: "src",
  layers: {
    app: "app",
    pages: "pages",
    widgets: "widgets",
    features: "features",
    entities: "entities",
    shared: "shared",
  },
};

export function loadConfig(): FSDConfig {
  const explorer = cosmiconfigSync("fsdslicer");
  const result = explorer.search();

  if (result?.config) {
    return {
      ...defaultConfig,
      ...result.config,
      layers: {
        ...defaultConfig.layers,
        ...(result.config.layers || {}),
      },
    };
  }

  return defaultConfig;
}
