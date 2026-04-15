import type { Resolver } from "../../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../../";

declare module "../../" {
  interface DETCalculatorRegistry {
    topFloorInsulationResistance: number;
  }
}

export default {
  key: "topFloorInsulationResistance",
  resolve: (ctx) => {
    if (!ctx.get("topFloorHasInsulation")) return 0;
    return (
      ctx.get("topFloorInnerSurfaceThermalResistance") +
      ctx.get("topFloorInsulationThickness") /
        ctx.get("topFloorThermalConductivity") +
      ctx.get("topFloorOuterSurfaceThermalResistance")
    );
  },
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "topFloorInsulationResistance"
>;
