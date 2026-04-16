import type { Resolver } from "../../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../../";

declare module "../../" {
  interface DETCalculatorRegistry {
    bottomFloorHeatLoss: number;
  }
}

export default {
  key: "bottomFloorHeatLoss",
  resolve: (ctx) =>
    ctx.get("bottomFloorArea") *
    ctx.get("bottomFloorUValue") *
    ctx.get("bottomFloorHeatLossFactor"),
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "bottomFloorHeatLoss"
>;
