import type { Resolver } from "../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../";

declare module "../" {
  interface DETCalculatorRegistry {
    electricityCo2Emissions: number;
  }
}

export default {
  key: "electricityCo2Emissions",
  resolve: (ctx) =>
    ctx.get("electricalEnergyDemand") * ctx.get("electricityCo2Factor") * 0.000001,
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "electricityCo2Emissions"
>;
