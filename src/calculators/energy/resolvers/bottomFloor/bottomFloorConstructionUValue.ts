import type { Resolver } from "../../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../../";
import { resolveKeyedValue } from "../../../../types/keyed-values.js";
import { resolveYearBand } from "../../../../types/range-bands.js";

declare module "../../" {
  interface DETCalculatorRegistry {
    bottomFloorConstructionUValue: number;
  }
}

export default {
  key: "bottomFloorConstructionUValue",
  resolve: (ctx) => {
    const yearBands = resolveKeyedValue(
      ctx.input.config.bottomFloor.uValue,
      ctx.get("bottomFloorConstructionType"),
    );
    const result = resolveYearBand(yearBands, ctx.get("bottomFloorYear"));
    if (result == null) throw new Error("Failed to resolve bottomFloorConstructionUValue");
    return result;
  },
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "bottomFloorConstructionUValue"
>;
