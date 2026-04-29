import type { Resolver } from "../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../";

declare module "../" {
  interface DETCalculatorRegistry {
    totalEnergyConsumption: number;
  }
}

export default {
  key: "totalEnergyConsumption",
  resolve: (ctx) =>
    ctx.get("thermalEnergyDemand") + ctx.get("electricalEnergyDemand"),
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "totalEnergyConsumption"
>;
