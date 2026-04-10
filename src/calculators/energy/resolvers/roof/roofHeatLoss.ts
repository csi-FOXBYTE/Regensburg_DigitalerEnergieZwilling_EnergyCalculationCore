import type { Resolver } from "../../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../../";

declare module "../../" {
  interface DETCalculatorRegistry {
    roofHeatLoss: number;
  }
}

export default {
  key: "roofHeatLoss",
  resolve: (ctx) =>
    ctx.get("roofHeatLossFactor") * ctx.get("roofUValue") * ctx.get("roofArea"),
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "roofHeatLoss"
>;
