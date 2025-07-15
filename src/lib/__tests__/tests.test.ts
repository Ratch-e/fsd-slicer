import fs from "fs-extra";
import path from "path";
import { runInTempDir } from "../tests";

describe("WHEN runInTempDir is called", () => {
  const originalCwd = process.cwd();

  it("MUST run the callback inside a temp dir and cleanup after", async () => {
    let tempPathFromInside: string = "";
    let filePath = "";

    await runInTempDir(async (cwd) => {
      tempPathFromInside = cwd;
      filePath = path.join(cwd, "test.txt");

      fs.writeFileSync(filePath, "hello");

      expect(process.cwd()).toBe(cwd);
      expect(fs.existsSync(filePath)).toBe(true);
    });

    expect(process.cwd()).toBe(originalCwd);

    expect(fs.existsSync(tempPathFromInside)).toBe(false);
  });

  it("MUST cleanup even if fn throws", async () => {
    let tempDir = "";

    await expect(
      runInTempDir(async (cwd) => {
        tempDir = cwd;
        throw new Error("Test error");
      }),
    ).rejects.toThrow("Test error");

    expect(process.cwd()).toBe(originalCwd);
    expect(fs.existsSync(tempDir)).toBe(false);
  });
});
