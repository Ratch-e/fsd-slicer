import { createConfigFile } from "../../generators/createConfigFile";
import { createFolders } from "../../generators/createFolders";
import { runInitPrompt, runCustomConfigPrompt } from "../../prompts/init";
import { checkProjectRoot } from "../../../lib/checkProjectRoot";
import { loadConfig } from "../../../lib/loadConfig";
import { runInit } from "../init";

jest.mock("../../../lib/loadConfig");
jest.mock("../../prompts/init");
jest.mock("../../generators/createConfigFile");
jest.mock("../../generators/createFolders");
jest.mock("../../../lib/checkProjectRoot");

const mockLoadConfig = loadConfig as jest.MockedFunction<typeof loadConfig>;
const mockRunInitPrompt = runInitPrompt as jest.MockedFunction<typeof runInitPrompt>;
const mockRunCustomConfigPrompt = runCustomConfigPrompt as jest.MockedFunction<
  typeof runCustomConfigPrompt
>;
const mockCreateConfigFile = createConfigFile as jest.MockedFunction<typeof createConfigFile>;
const mockCreateFolders = createFolders as jest.MockedFunction<typeof createFolders>;
const mockCheckProjectRoot = checkProjectRoot as jest.MockedFunction<typeof checkProjectRoot>;

beforeEach(() => {
  jest.clearAllMocks();
});

describe("WHEN runInit is called", () => {
  it("AND mode is custom AND target provided MUST generate folders with custom root", async () => {
    mockRunInitPrompt.mockResolvedValue("custom");
    mockRunCustomConfigPrompt.mockResolvedValue({ root: "src", layers: { a: "a" } });

    await runInit("myroot");

    expect(mockCheckProjectRoot).toHaveBeenCalled();
    expect(mockRunInitPrompt).toHaveBeenCalled();
    expect(mockRunCustomConfigPrompt).toHaveBeenCalled();
    expect(mockCreateConfigFile).toHaveBeenCalledWith({ root: "myroot", layers: { a: "a" } });
    expect(mockCreateFolders).toHaveBeenCalledWith({ root: "myroot", layers: { a: "a" } });
    expect(mockLoadConfig).not.toHaveBeenCalled();
  });

  it("AND mode is default MUST load config and create folders", async () => {
    mockRunInitPrompt.mockResolvedValue("default");
    mockLoadConfig.mockReturnValue({ root: "src", layers: { b: "b" } });

    await runInit();

    expect(mockCheckProjectRoot).toHaveBeenCalled();
    expect(mockLoadConfig).toHaveBeenCalled();
    expect(mockCreateFolders).toHaveBeenCalledWith({ root: "src", layers: { b: "b" } });
    expect(mockCreateConfigFile).not.toHaveBeenCalled();
    expect(mockRunCustomConfigPrompt).not.toHaveBeenCalled();
  });
});
