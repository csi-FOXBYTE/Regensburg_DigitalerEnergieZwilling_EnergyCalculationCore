import type { Resolver } from "../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../";

declare module "../" {
  interface DETCalculatorRegistry {
    userThermalConsumption: number | null;
  }
}

export default {
  key: "userThermalConsumption",
  resolve: (ctx) => {
    const total = ctx.input.input.heat.userThermalTotalCost;
    if (total == null) return null;

    const carrierData = ctx.get("preRenovationCarrierData");
    const rate = ctx.input.input.heat.userThermalUnitRate ?? carrierData.unitRate;
    const base = ctx.input.input.heat.userThermalBaseRate ?? carrierData.baseRate;

    if (rate === 0) return null;
    return (total - base) / rate;
  },
} satisfies Resolver<DETCalculatorContext, DETCalculatorRegistry, "userThermalConsumption">;
