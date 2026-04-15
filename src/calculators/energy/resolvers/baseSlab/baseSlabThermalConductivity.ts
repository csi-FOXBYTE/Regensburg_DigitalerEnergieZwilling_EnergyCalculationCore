import type { Resolver } from "../../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../../";

declare module "../../" {
  interface DETCalculatorRegistry {
    baseSlabThermalConductivity: number;
  }
}

export default {
  key: "baseSlabThermalConductivity",
  resolve: (ctx) => ctx.input.config.baseSlab.thermalConductivity,
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "baseSlabThermalConductivity"
>;
