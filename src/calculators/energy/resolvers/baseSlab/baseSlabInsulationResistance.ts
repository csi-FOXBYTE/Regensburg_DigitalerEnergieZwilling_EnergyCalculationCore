import type { Resolver } from "../../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../../";

declare module "../../" {
  interface DETCalculatorRegistry {
    baseSlabInsulationResistance: number;
  }
}

export default {
  key: "baseSlabInsulationResistance",
  resolve: (ctx) => {
    if (!ctx.get("baseSlabHasInsulation")) return 0;
    return (
      ctx.get("baseSlabInnerSurfaceThermalResistance") +
      ctx.get("baseSlabInsulationThickness") /
        ctx.get("baseSlabThermalConductivity") +
      ctx.get("baseSlabOuterSurfaceThermalResistance")
    );
  },
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "baseSlabInsulationResistance"
>;
