import type { Resolver } from "../../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../../";

declare module "../../" {
  interface DETCalculatorRegistry {
    roofWindowsHeatLossFactor: number;
  }
}

export default {
  key: "roofWindowsHeatLossFactor",
  resolve: (ctx) => ctx.input.config.windows.roofWindowsHeatLossFactor,
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "roofWindowsHeatLossFactor"
>;
