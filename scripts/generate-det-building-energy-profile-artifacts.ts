import { runGenerateDetBuildingEnergyProfileCli } from "../src/bin/generate-det-building-energy-profile.js";

await runGenerateDetBuildingEnergyProfileCli(process.argv.slice(2), process.cwd());
