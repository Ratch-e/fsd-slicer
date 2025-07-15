#!/usr/bin/env node

import { createCLI } from "../src/core/dispatcher/cli";

const program = createCLI();
program.parse();
