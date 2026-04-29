import type { Resolver } from "../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../";
import type { PrimaryEnergyCarrierData } from "../../../types/config/heat.js";
import { resolveKeyedValue } from "../../../types/keyed-values.js";

declare module "../" {
  interface DETCalculatorRegistry {
    preRenovationCarrierData: PrimaryEnergyCarrierData;
  }
}

export default {
  key: "preRenovationCarrierData",
  resolve: (ctx) => {
    const carrier =
      ctx.input.input.heat.preRenovationPrimaryEnergyCarrier ??
      ctx.get("primaryEnergyCarrier");
    return resolveKeyedValue(ctx.input.config.heat.primaryEnergyCarrierData, carrier);
  },
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "preRenovationCarrierData"
>;
