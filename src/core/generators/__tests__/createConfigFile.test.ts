import fs from "fs-extra";
import path from "path";

import { createConfigFile } from "../createConfigFile";
import { DEFAULT_CONFIG, DEFAULT_ROOT } from "../../../constants/common";
import { runInTempDir } from "../../../lib/tests";

describe("WHEN createConfigFile is called", () => {
  it("AND provided config MUST create a config file", async () => {
    await runInTempDir((cwd) => {
      const cfg = { ...DEFAULT_CONFIG, root: DEFAULT_ROOT };
      createConfigFile(cfg);
      const file = path.join(cwd, ".fsdslicerrc");
      expect(fs.existsSync(file)).toBe(true);
      expect(fs.readJsonSync(file)).toEqual(cfg);
    });
  });
});
