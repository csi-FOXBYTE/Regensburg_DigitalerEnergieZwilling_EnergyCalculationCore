import type { Resolver } from "../../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../../";

declare module "../../" {
  interface DETCalculatorRegistry {
    baseSlabThermalResistance: number;
  }
}

export default {
  key: "baseSlabThermalResistance",
  resolve: (ctx) =>
    ctx.get("baseSlabConstructionResistance") +
    ctx.get("baseSlabInsulationResistance"),
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "baseSlabThermalResistance"
>;
