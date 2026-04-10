import type { Resolver } from "../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../";
import { resolveKeyedValue } from "../../../types/keyed-values.js";

declare module "../" {
  interface DETCalculatorRegistry {
    primaryEnergyCarrierEfficiencyFactor: number;
  }
}

export default {
  key: "primaryEnergyCarrierEfficiencyFactor",
  resolve: (ctx) =>
    resolveKeyedValue(
      ctx.input.config.heat.primaryEnergyCarrierEfficiencyFactor,
      ctx.get("primaryEnergyCarrier"),
    ),
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "primaryEnergyCarrierEfficiencyFactor"
>;
