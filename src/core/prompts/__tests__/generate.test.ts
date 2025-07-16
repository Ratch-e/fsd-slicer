import prompts from "prompts";
import { runGeneratePrompt } from "../generate";
import { loadConfig } from "../../../lib/loadConfig";
import { DEFAULT_SUBFOLDERS } from "../../../constants/common";

jest.mock("prompts");
jest.mock("../../../lib/loadConfig");

const mockPrompts = prompts as jest.MockedFunction<typeof prompts>;
const mockLoadConfig = loadConfig as jest.MockedFunction<typeof loadConfig>;

describe("WHEN runGeneratePrompt is called", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("AND user provides answers MUST return them", async () => {
    mockLoadConfig.mockReturnValue({
      root: "src",
      layers: { app: "app", shared: "shared" },
    });

    const answers = { type: "app", name: "test", subtype: undefined };
    mockPrompts.mockResolvedValue(answers);

    await expect(runGeneratePrompt()).resolves.toEqual(answers);

    expect(mockPrompts).toHaveBeenCalledTimes(1);

    const questions = mockPrompts.mock.calls[0][0] as prompts.PromptObject<string>[];
    expect(questions[0].choices).toEqual([
      { title: "app", value: "app" },
      { title: "shared", value: "shared" },
    ]);
    expect(questions[2].choices).toEqual(DEFAULT_SUBFOLDERS.map((s) => ({ title: s, value: s })));
  });
});
