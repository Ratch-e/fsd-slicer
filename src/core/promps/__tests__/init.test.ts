import prompts from "prompts";
import { runInitPrompt, runCustomConfigPrompt } from "../init";
import { DEFAULT_ROOT, DEFAULT_SLICES } from "../../../constants/common";

jest.mock("prompts");
const mockedPrompts = prompts as jest.MockedFunction<typeof prompts>;

describe("WHEN runInitPrompt is called", () => {
  beforeEach(() => {
    mockedPrompts.mockClear();
  });
  it('AND user selects default MUST return "default"', async () => {
    mockedPrompts.mockResolvedValueOnce({ mode: "default" });
    await expect(runInitPrompt()).resolves.toBe("default");
  });

  it('AND user selects custom MUST return "custom"', async () => {
    mockedPrompts.mockResolvedValueOnce({ mode: "custom" });
    await expect(runInitPrompt()).resolves.toBe("custom");
  });
});

describe("WHEN runCustomConfigPrompt is called", () => {
  beforeEach(() => {
    mockedPrompts.mockClear();
  });
  it("AND user provides values MUST return composed config", async () => {
    mockedPrompts
      .mockResolvedValueOnce({ root: DEFAULT_ROOT })
      .mockResolvedValueOnce({ value: "app" })
      .mockResolvedValueOnce({ value: "pages" })
      .mockResolvedValueOnce({ value: "widgets" })
      .mockResolvedValueOnce({ value: "features" })
      .mockResolvedValueOnce({ value: "entities" })
      .mockResolvedValueOnce({ value: "shared" });

    await expect(runCustomConfigPrompt()).resolves.toEqual({
      root: DEFAULT_ROOT,
      layers: DEFAULT_SLICES,
    });

    expect(mockedPrompts).toHaveBeenCalledTimes(1 + Object.keys(DEFAULT_SLICES).length);
  });
});
