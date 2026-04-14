import type { Resolver } from "../../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../../";

declare module "../../" {
  interface DETCalculatorRegistry {
    topFloorInsulationResistance: number;
  }
}

export default {
  key: "topFloorInsulationResistance",
  resolve: (ctx) =>
    ctx.get("topFloorInnerSurfaceThermalResistance") +
    ctx.get("topFloorInsulationThickness") /
      ctx.get("topFloorThermalConductivity") +
    ctx.get("topFloorOuterSurfaceThermalResistance"),
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "topFloorInsulationResistance"
>;
