import type { Resolver } from "../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../";

declare module "../" {
  interface DETCalculatorRegistry {
    heatingEnergyDemand: number;
  }
}

// NOTE: may be replaced with a more precise calculation method soon
export default {
  key: "heatingEnergyDemand",
  resolve: (ctx) => ctx.get("preliminaryHeatingEnergyDemand"),
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "heatingEnergyDemand"
>;
