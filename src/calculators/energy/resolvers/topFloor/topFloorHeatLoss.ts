import type { Resolver } from "../../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../../";

declare module "../../" {
  interface DETCalculatorRegistry {
    topFloorHeatLoss: number;
  }
}

export default {
  key: "topFloorHeatLoss",
  resolve: (ctx) =>
    ctx.get("topFloorArea") *
    ctx.get("topFloorUValue") *
    ctx.get("topFloorHeatLossFactor"),
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "topFloorHeatLoss"
>;
