import type { Resolver } from "../../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../../";

declare module "../../" {
  interface DETCalculatorRegistry {
    roofTotalThermalResistance: number | null;
  }
}

export default {
  key: "roofTotalThermalResistance",
  resolve: (ctx) => {
    const reductionFactor = ctx.get("roofInsulationReductionFactor");
    if (reductionFactor == null) return null;
    return (
      (ctx.get("roofInnerSurfaceThermalResistance") +
        ctx.get("roofInsulationThickness") /
          ctx.get("roofThermalConductivity") +
        ctx.get("roofOuterSurfaceThermalResistance")) *
      reductionFactor
    );
  },
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "roofTotalThermalResistance"
>;
