import type { Resolver } from "../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../";
import { resolveRangeBand } from "../../../types/range-bands.js";

declare module "../" {
  interface DETCalculatorRegistry {
    heatedAirVolumeCorrectionFactor: number;
  }
}

export default {
  key: "heatedAirVolumeCorrectionFactor",
  resolve: (ctx) => {
    const result = resolveRangeBand(
      ctx.input.config.general.heatedAirVolumeCorrectionFactor,
      ctx.get("numberOfStories"),
    );
    if (result == null) throw new Error("Failed to resolve heatedAirVolumeCorrectionFactor");
    return result;
  },
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "heatedAirVolumeCorrectionFactor"
>;
