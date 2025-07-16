import fs from "fs";
import typescript from "@rollup/plugin-typescript";
import json from "@rollup/plugin-json";
import shebang from "rollup-plugin-preserve-shebang";

const pkg = JSON.parse(fs.readFileSync(new URL("./package.json", import.meta.url)));

export default [
  {
    input: "src/slicer.ts",
    output: {
      dir: "dist",
      format: "esm",
      sourcemap: true,
      banner: "#!/usr/bin/env node",
    },
    external: Object.keys(pkg.dependencies || {}),
    plugins: [
      shebang(),
      json(),
      typescript({
        tsconfig: "./tsconfig.json",
      }),
    ],
  },
];
