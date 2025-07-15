import fs from "fs-extra";
import path from "path";
import { DEFAULT_CONFIG } from "../../constants/common";
import { runInTempDir } from "../../helpers/tests";
import { loadConfig } from "../loadConfig";

describe("WHEN loadConfig is called", () => {
  it("AND config file is absent MUST return default config", async () => {
    await runInTempDir(() => {
      const cfg = loadConfig();
      expect(cfg).toEqual(DEFAULT_CONFIG);
    });
  });

  it("AND config file exists MUST merge with defaults", async () => {
    await runInTempDir((cwd) => {
      const customConfigFile = { root: "testFolder", layers: { features: "feat" } };
      fs.writeJsonSync(path.join(cwd, ".fsdslicerrc"), customConfigFile);

      const cfg = loadConfig();
      expect(cfg).toEqual({
        ...DEFAULT_CONFIG,
        ...customConfigFile,
        layers: {
          ...DEFAULT_CONFIG.layers,
          ...customConfigFile.layers,
        },
      });
    });
  });
});
