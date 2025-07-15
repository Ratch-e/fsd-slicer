import { FSDConfig } from "../types/common";

export const DEFAULT_SLICES = {
  app: "app",
  pages: "pages",
  widgets: "widgets",
  features: "features",
  entities: "entities",
  shared: "shared",
} as const;

export const DEFAULT_SUBFOLDERS = ["ui", "lib", "model", "config", "api"];

export const DEFAULT_ROOT = "src";

export const DEFAULT_CONFIG: FSDConfig = {
  root: DEFAULT_ROOT,
  layers: DEFAULT_SLICES,
};
