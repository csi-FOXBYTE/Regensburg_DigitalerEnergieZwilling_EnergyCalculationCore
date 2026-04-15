import type { Resolver } from "../../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../../";

declare module "../../" {
  interface DETCalculatorRegistry {
    outerWallInsulationResistance: number;
  }
}

export default {
  key: "outerWallInsulationResistance",
  resolve: (ctx) => {
    if (!ctx.get("outerWallHasInsulation")) return 0;
    return (
      ctx.get("outerWallInnerSurfaceThermalResistance") +
      ctx.get("outerWallInsulationThickness") /
        ctx.get("outerWallThermalConductivity") +
      ctx.get("outerWallOuterSurfaceThermalResistance")
    );
  },
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "outerWallInsulationResistance"
>;
