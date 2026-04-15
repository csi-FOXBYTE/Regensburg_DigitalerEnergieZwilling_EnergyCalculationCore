import type { Resolver } from "../../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../../";

declare module "../../" {
  interface DETCalculatorRegistry {
    baseSlabHeatLoss: number;
  }
}

export default {
  key: "baseSlabHeatLoss",
  resolve: (ctx) =>
    ctx.get("baseSlabArea") *
    ctx.get("baseSlabUValue") *
    ctx.get("baseSlabHeatLossFactor"),
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "baseSlabHeatLoss"
>;
