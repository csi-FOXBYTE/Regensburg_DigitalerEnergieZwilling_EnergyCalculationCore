import type { Resolver } from "../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../";

declare module "../" {
  interface DETCalculatorRegistry {
    primaryEnergyDemandPerSquareMeter: number;
  }
}

export default {
  key: "primaryEnergyDemandPerSquareMeter",
  resolve: (ctx) =>
    ctx.get("primaryEnergyDemand") / ctx.get("usableFloorArea"),
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "primaryEnergyDemandPerSquareMeter"
>;
