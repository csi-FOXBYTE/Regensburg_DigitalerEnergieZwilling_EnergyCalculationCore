import type { Resolver } from "../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../";

declare module "../" {
  interface DETCalculatorRegistry {
    co2Factor: number;
  }
}

export default {
  key: "co2Factor",
  resolve: (ctx) => ctx.get("primaryEnergyCarrierData").co2Factor,
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "co2Factor"
>;
