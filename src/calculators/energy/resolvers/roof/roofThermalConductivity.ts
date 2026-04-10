import type { Resolver } from "../../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../../";

declare module "../../" {
  interface DETCalculatorRegistry {
    roofThermalConductivity: number;
  }
}

export default {
  key: "roofThermalConductivity",
  resolve: (ctx) => ctx.input.config.roof.thermalConductivity,
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "roofThermalConductivity"
>;
