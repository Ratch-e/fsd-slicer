import fs from "fs-extra";
import path from "path";
import { DEFAULT_CONFIG } from "../../../constants/common";
import { createFolders } from "../createFolders";
import { runInTempDir } from "../../../helpers/tests";

describe("createFolders", () => {
  it("WHEN called AND given config MUST create directories", async () => {
    await runInTempDir((cwd) => {
      const cfg = DEFAULT_CONFIG;
      createFolders(cfg);
      for (const dir of Object.values(cfg.layers)) {
        expect(fs.existsSync(path.join(cwd, cfg.root, dir))).toBe(true);
      }
    });
  });
});
