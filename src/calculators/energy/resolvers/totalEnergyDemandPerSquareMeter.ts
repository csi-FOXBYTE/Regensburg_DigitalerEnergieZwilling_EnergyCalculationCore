import type { Resolver } from "../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../";

declare module "../" {
  interface DETCalculatorRegistry {
    totalEnergyDemandPerSquareMeter: number;
  }
}

export default {
  key: "totalEnergyDemandPerSquareMeter",
  resolve: (ctx) =>
    ctx.get("totalEnergyDemand") / ctx.get("usableFloorArea"),
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "totalEnergyDemandPerSquareMeter"
>;
