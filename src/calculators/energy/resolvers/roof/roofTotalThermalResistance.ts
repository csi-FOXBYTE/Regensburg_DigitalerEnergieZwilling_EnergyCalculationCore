import type { Resolver } from "../../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../../";
import { RoofInsulationType } from "../../../../types/roof-insulation-type.js";

declare module "../../" {
  interface DETCalculatorRegistry {
    roofTotalThermalResistance: number;
  }
}

export default {
  key: "roofTotalThermalResistance",
  resolve: (ctx) => {
    if (ctx.get("roofInsulationType") === RoofInsulationType.BETWEEN_RAFTER) {
      return ctx.get("betweenRafterRoofResistance");
    }
    return ctx.get("roofConstructionResistance") + ctx.get("roofInsulationResistance");
  },
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "roofTotalThermalResistance"
>;
