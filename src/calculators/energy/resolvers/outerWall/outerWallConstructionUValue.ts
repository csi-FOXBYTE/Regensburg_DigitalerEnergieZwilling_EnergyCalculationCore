import type { Resolver } from "../../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../../";
import { resolveKeyedValue } from "../../../../types/keyed-values.js";
import { resolveYearBand } from "../../../../types/range-bands.js";

declare module "../../" {
  interface DETCalculatorRegistry {
    outerWallConstructionUValue: number;
  }
}

export default {
  key: "outerWallConstructionUValue",
  resolve: (ctx) => {
    const yearBands = resolveKeyedValue(
      ctx.input.config.outerWall.uValue,
      ctx.get("outerWallConstructionType"),
    );
    const result = resolveYearBand(yearBands, ctx.get("outerWallYear"));
    if (result == null) throw new Error("Failed to resolve outerWallConstructionUValue");
    return result;
  },
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "outerWallConstructionUValue"
>;
