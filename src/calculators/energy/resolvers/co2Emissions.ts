import type { Resolver } from "../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../";

declare module "../" {
  interface DETCalculatorRegistry {
    thermalCo2Emissions: number;
  }
}

export default {
  key: "thermalCo2Emissions",
  resolve: (ctx) =>
    ctx.get("thermalEnergyDemand") *
    ctx.get("primaryEnergyCarrierData").co2Factor *
    0.000001,
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "thermalCo2Emissions"
>;
