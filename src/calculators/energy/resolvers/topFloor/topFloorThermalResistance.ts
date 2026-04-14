import type { Resolver } from "../../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../../";

declare module "../../" {
  interface DETCalculatorRegistry {
    topFloorThermalResistance: number;
  }
}

export default {
  key: "topFloorThermalResistance",
  resolve: (ctx) => {
    const construction = ctx.get("topFloorConstructionResistance");
    if (!ctx.get("topFloorHasInsulation")) return construction;
    return construction + ctx.get("topFloorInsulationResistance");
  },
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "topFloorThermalResistance"
>;
