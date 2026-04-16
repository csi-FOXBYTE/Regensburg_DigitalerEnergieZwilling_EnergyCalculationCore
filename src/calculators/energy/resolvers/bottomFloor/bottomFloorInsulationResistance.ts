import type { Resolver } from "../../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../../";

declare module "../../" {
  interface DETCalculatorRegistry {
    bottomFloorInsulationResistance: number;
  }
}

export default {
  key: "bottomFloorInsulationResistance",
  resolve: (ctx) => {
    if (!ctx.get("bottomFloorHasInsulation")) return 0;
    return (
      ctx.get("bottomFloorInnerSurfaceThermalResistance") +
      ctx.get("bottomFloorInsulationThickness") /
        ctx.get("bottomFloorThermalConductivity") +
      ctx.get("bottomFloorOuterSurfaceThermalResistance")
    );
  },
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "bottomFloorInsulationResistance"
>;
