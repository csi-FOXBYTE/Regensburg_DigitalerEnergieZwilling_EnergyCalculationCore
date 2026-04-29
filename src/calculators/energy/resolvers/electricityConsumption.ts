import type { Resolver } from "../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../";

declare module "../" {
  interface DETCalculatorRegistry {
    electricityConsumption: number;
  }
}

export default {
  key: "electricityConsumption",
  resolve: (ctx) => ctx.get("electricalEnergyDemand"),
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "electricityConsumption"
>;
