import type { Resolver } from "../../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../../";

declare module "../../" {
  interface DETCalculatorRegistry {
    exteriorWallWindowsHeatLoss: number;
  }
}

export default {
  key: "exteriorWallWindowsHeatLoss",
  resolve: (ctx) =>
    ctx.get("exteriorWallWindowsHeatLossFactor") *
    ctx.get("exteriorWallWindowsUValue") *
    ctx.get("exteriorWallWindowsArea"),
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "exteriorWallWindowsHeatLoss"
>;
