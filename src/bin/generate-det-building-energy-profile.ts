#!/usr/bin/env node
import { runGenerateDetBuildingEnergyProfileCli } from "../cli/generate-det-building-energy-profile.js";

await runGenerateDetBuildingEnergyProfileCli(process.argv.slice(2), process.cwd());
