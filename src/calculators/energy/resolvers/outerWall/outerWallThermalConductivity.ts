import type { Resolver } from "../../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../../";

declare module "../../" {
  interface DETCalculatorRegistry {
    outerWallThermalConductivity: number;
  }
}

export default {
  key: "outerWallThermalConductivity",
  resolve: (ctx) => ctx.input.config.outerWall.thermalConductivity,
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "outerWallThermalConductivity"
>;
