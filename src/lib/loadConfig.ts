import { cosmiconfigSync } from "cosmiconfig";
import { FSDConfig } from "../types/common";
import { DEFAULT_CONFIG } from "../constants/common";

export function loadConfig(): FSDConfig {
  const explorer = cosmiconfigSync("fsdslicer");
  const result = explorer.search();

  if (result?.config) {
    return {
      ...DEFAULT_CONFIG,
      ...result.config,
      layers: {
        ...DEFAULT_CONFIG.layers,
        ...(result.config.layers || {}),
      },
    };
  }

  return DEFAULT_CONFIG;
}
