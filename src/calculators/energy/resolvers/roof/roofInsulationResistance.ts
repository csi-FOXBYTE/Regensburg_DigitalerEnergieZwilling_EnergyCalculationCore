import type { Resolver } from "../../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../../";

declare module "../../" {
  interface DETCalculatorRegistry {
    roofInsulationResistance: number;
  }
}

export default {
  key: "roofInsulationResistance",
  resolve: (ctx) => {
    if (!ctx.get("roofHasInsulation")) return 0;
    return (
      ctx.get("roofInnerSurfaceThermalResistance") +
      ctx.get("roofInsulationThickness") /
        ctx.get("roofThermalConductivity") +
      ctx.get("roofOuterSurfaceThermalResistance")
    );
  },
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "roofInsulationResistance"
>;
