import type { Resolver } from "../../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../../";

declare module "../../" {
  interface DETCalculatorRegistry {
    exteriorWallWindowsHeatLossFactor: number;
  }
}

export default {
  key: "exteriorWallWindowsHeatLossFactor",
  resolve: (ctx) =>
    ctx.input.config.windows.exteriorWallWindowsHeatLossFactor,
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "exteriorWallWindowsHeatLossFactor"
>;
