import type { Resolver } from "../../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../../";
import { resolveKeyedValue } from "../../../../types/keyed-values.js";
import { resolveYearBand } from "../../../../types/range-bands.js";

declare module "../../" {
  interface DETCalculatorRegistry {
    roofConstructionUValue: number;
  }
}

export default {
  key: "roofConstructionUValue",
  resolve: (ctx) => {
    const yearBands = resolveKeyedValue(
      ctx.input.config.roof.uValue,
      ctx.get("roofConstructionType"),
    );
    const result = resolveYearBand(yearBands, ctx.get("roofYear"));
    if (result == null) throw new Error("Failed to resolve roofConstructionUValue");
    return result;
  },
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "roofConstructionUValue"
>;
