import type { Resolver } from "../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../";

declare module "../" {
  interface DETCalculatorRegistry {
    ventilationHeatLoss: number;
  }
}

export default {
  key: "ventilationHeatLoss",
  resolve: (ctx) =>
    ctx.get("heatedAirVolume") *
    ctx.get("ventilationHeatLossCorrectionFactor") *
    ctx.get("airDensitySpecificHeatCapacityProduct"),
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "ventilationHeatLoss"
>;
