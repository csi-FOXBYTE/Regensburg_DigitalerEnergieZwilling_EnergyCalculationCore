import type { Resolver } from "../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../";

declare module "../" {
  interface DETCalculatorRegistry {
    heatedAirVolume: number;
  }
}

export default {
  key: "heatedAirVolume",
  resolve: (ctx) =>
    ctx.get("grossHeatedVolume") *
    ctx.input.config.general.heatedAirVolumeCorrectionFactor,
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "heatedAirVolume"
>;
