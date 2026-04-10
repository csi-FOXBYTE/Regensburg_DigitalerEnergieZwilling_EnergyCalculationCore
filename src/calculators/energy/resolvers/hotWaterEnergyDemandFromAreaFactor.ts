import type { Resolver } from "../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../";

declare module "../" {
  interface DETCalculatorRegistry {
    hotWaterEnergyDemandFromAreaFactor: number;
  }
}

export default {
  key: "hotWaterEnergyDemandFromAreaFactor",
  resolve: (ctx) => ctx.input.config.heat.hotWaterEnergyDemandFromAreaFactor,
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "hotWaterEnergyDemandFromAreaFactor"
>;
