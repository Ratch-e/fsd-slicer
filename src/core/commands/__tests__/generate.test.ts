import { loadConfig } from "../../../lib/loadConfig";
import { createDefaultInnerStructure } from "../../generators/slices/createDefaultInnerStructure";
import { createSharedStructure } from "../../generators/slices/createSharedStructure";
import { DEFAULT_SUBFOLDERS } from "../../../constants/common";
import chalk from "chalk";
import { runGenerate } from "../generate";
import { runGeneratePrompt } from "../../prompts/generate";

jest.mock("../../../lib/loadConfig");
jest.mock("../../prompts/generate");
jest.mock("../../generators/slices/createDefaultInnerStructure");
jest.mock("../../generators/slices/createSharedStructure");

const mockLoadConfig = loadConfig as jest.MockedFunction<typeof loadConfig>;
const mockRunGeneratePrompt = runGeneratePrompt as jest.MockedFunction<typeof runGeneratePrompt>;
const mockCreateDefault = createDefaultInnerStructure as jest.MockedFunction<
  typeof createDefaultInnerStructure
>;
const mockCreateShared = createSharedStructure as jest.MockedFunction<typeof createSharedStructure>;

describe("WHEN runGenerate is called", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockLoadConfig.mockReturnValue({
      root: "src",
      layers: { app: "app", shared: "shared" },
    });
  });

  it("AND slice unknown MUST log error", async () => {
    const logSpy = jest.spyOn(console, "log").mockImplementation();
    await runGenerate("unknown", "test");
    expect(logSpy).toHaveBeenCalledWith(
      chalk.red('❌ Unknown slice: "unknown". Avaliable ones: app, shared'),
    );
    expect(mockCreateDefault).not.toHaveBeenCalled();
    expect(mockCreateShared).not.toHaveBeenCalled();
    logSpy.mockRestore();
  });

  it("AND type shared without subtype MUST log error", async () => {
    const logSpy = jest.spyOn(console, "log").mockImplementation();
    await runGenerate("shared", "Button");
    expect(logSpy).toHaveBeenCalledWith(
      chalk.red(`❌ Provide shared slice type. Avaliable ones: ${DEFAULT_SUBFOLDERS.join(", ")}`),
    );
    expect(mockCreateShared).not.toHaveBeenCalled();
    logSpy.mockRestore();
  });

  it("AND type shared with subtype MUST create shared structure", async () => {
    await runGenerate("shared", "Button", "ui");
    expect(mockCreateShared).toHaveBeenCalledWith("Button", "ui");
  });

  it("AND valid slice provided MUST create default structure", async () => {
    await runGenerate("app", "Test");
    expect(mockCreateDefault).toHaveBeenCalledWith("Test", "app");
  });

  it("AND arguments missing MUST prompt and create", async () => {
    mockRunGeneratePrompt.mockResolvedValue({ type: "app", name: "Hello", subtype: undefined });
    await runGenerate("", "");
    expect(mockRunGeneratePrompt).toHaveBeenCalled();
    expect(mockCreateDefault).toHaveBeenCalledWith("Hello", "app");
  });
});
