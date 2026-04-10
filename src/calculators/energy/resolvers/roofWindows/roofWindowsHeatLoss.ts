import type { Resolver } from "../../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../../";

declare module "../../" {
  interface DETCalculatorRegistry {
    roofWindowsHeatLoss: number;
  }
}

export default {
  key: "roofWindowsHeatLoss",
  resolve: (ctx) =>
    ctx.get("roofWindowsHeatLossFactor") *
    ctx.get("roofWindowsUValue") *
    ctx.get("roofWindowsArea"),
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "roofWindowsHeatLoss"
>;
