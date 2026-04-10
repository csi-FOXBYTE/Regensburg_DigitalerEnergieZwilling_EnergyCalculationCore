import type { Resolver } from "../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../";
import type { EnergyEfficiencyClass } from "../../../types/energy-efficiency-class";
import { resolveRangeBand } from "../../../types/range-bands.js";

declare module "../" {
  interface DETCalculatorRegistry {
    energyEfficiencyClass: EnergyEfficiencyClass;
  }
}

export default {
  key: "energyEfficiencyClass",
  resolve: (ctx) => {
    const result = resolveRangeBand(
      ctx.input.config.general.energyEfficiencyClasses,
      ctx.get("primaryEnergyDemandPerSquareMeter"),
    );
    if (result == null)
      throw new Error("Failed to resolve energyEfficiencyClass");
    return result;
  },
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "energyEfficiencyClass"
>;
