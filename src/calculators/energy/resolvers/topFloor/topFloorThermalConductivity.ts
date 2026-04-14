import type { Resolver } from "../../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../../";

declare module "../../" {
  interface DETCalculatorRegistry {
    topFloorThermalConductivity: number;
  }
}

export default {
  key: "topFloorThermalConductivity",
  resolve: (ctx) => ctx.input.config.topFloor.thermalConductivity,
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "topFloorThermalConductivity"
>;
