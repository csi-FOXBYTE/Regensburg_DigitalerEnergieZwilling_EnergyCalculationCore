import type { Resolver } from "../../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../../";

declare module "../../" {
  interface DETCalculatorRegistry {
    bottomFloorThermalConductivity: number;
  }
}

export default {
  key: "bottomFloorThermalConductivity",
  resolve: (ctx) => ctx.input.config.bottomFloor.thermalConductivity,
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "bottomFloorThermalConductivity"
>;
