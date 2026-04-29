import type { Resolver } from "../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../";

declare module "../" {
  interface DETCalculatorRegistry {
    userTotalEnergyDemand: number;
  }
}

export default {
  key: "userTotalEnergyDemand",
  resolve: (ctx) =>
    ctx.get("userThermalEnergyDemand") /
    (1 - ctx.get("preRenovationElectricalRatio")),
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "userTotalEnergyDemand"
>;
