import path from "path";
import fs from "fs-extra";
import { runInTempDir } from "../tests";
import { checkProjectRoot } from "../checkProjectRoot";

describe("checkProjectRoot", () => {
  it("WHEN executed AND package.json exists MUST not exit", async () => {
    await runInTempDir((cwd) => {
      fs.writeFileSync(path.join(cwd, "package.json"), "{}");
      const exitSpy = jest
        .spyOn(process, "exit")
        .mockImplementation((() => undefined) as unknown as typeof process.exit);
      const logSpy = jest.spyOn(console, "log").mockImplementation();

      expect(() => checkProjectRoot()).not.toThrow();
      expect(exitSpy).not.toHaveBeenCalled();
      expect(logSpy).not.toHaveBeenCalled();

      exitSpy.mockRestore();
      logSpy.mockRestore();
    });
  });

  it("WHEN executed AND package.json missing MUST exit and log messages", async () => {
    await runInTempDir(() => {
      const exitSpy = jest
        .spyOn(process, "exit")
        .mockImplementation((() => undefined) as unknown as typeof process.exit);
      const logSpy = jest.spyOn(console, "log").mockImplementation();

      checkProjectRoot();

      expect(exitSpy).toHaveBeenCalledWith(1);
      expect(logSpy).toHaveBeenCalled();

      exitSpy.mockRestore();
      logSpy.mockRestore();
    });
  });
});
