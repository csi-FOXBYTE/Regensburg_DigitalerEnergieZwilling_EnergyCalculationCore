import type { Resolver } from "../../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../../";

declare module "../../" {
  interface DETCalculatorRegistry {
    outerWallThermalResistance: number;
  }
}

export default {
  key: "outerWallThermalResistance",
  resolve: (ctx) =>
    ctx.get("outerWallConstructionResistance") +
    ctx.get("outerWallInsulationResistance"),
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "outerWallThermalResistance"
>;
