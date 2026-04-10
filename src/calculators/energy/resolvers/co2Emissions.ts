import type { Resolver } from "../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../";

declare module "../" {
  interface DETCalculatorRegistry {
    co2Emissions: number;
  }
}

export default {
  key: "co2Emissions",
  resolve: (ctx) =>
    ctx.get("totalEnergyDemand") * ctx.get("co2Factor"),
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "co2Emissions"
>;
