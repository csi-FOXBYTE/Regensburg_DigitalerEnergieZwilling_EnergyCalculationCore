import type { Resolver } from "../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../";
import type { PrimaryEnergyCarrierData } from "../../../types/config/heat.js";
import { resolveKeyedValue } from "../../../types/keyed-values.js";

declare module "../" {
  interface DETCalculatorRegistry {
    primaryEnergyCarrierData: PrimaryEnergyCarrierData;
  }
}

export default {
  key: "primaryEnergyCarrierData",
  resolve: (ctx) =>
    resolveKeyedValue(
      ctx.input.config.heat.primaryEnergyCarrierData,
      ctx.get("primaryEnergyCarrier"),
    ),
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "primaryEnergyCarrierData"
>;
