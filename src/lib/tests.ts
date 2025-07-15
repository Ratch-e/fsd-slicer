import fs from "fs-extra";
import os from "os";
import path from "path";

export const runInTempDir = async (fn: (cwd: string) => Promise<void> | void) => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "fsd-slicer-test-"));
  const previous = process.cwd();
  process.chdir(tmp);
  try {
    await fn(tmp);
  } finally {
    process.chdir(previous);
    fs.removeSync(tmp);
  }
};
