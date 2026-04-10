import type { Resolver } from "../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../";

declare module "../" {
  interface DETCalculatorRegistry {
    ventilationHeatLossCorrectionFactor: number;
  }
}

export default {
  key: "ventilationHeatLossCorrectionFactor",
  resolve: (ctx) => ctx.input.config.heat.ventilationHeatLossCorrectionFactor,
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "ventilationHeatLossCorrectionFactor"
>;
