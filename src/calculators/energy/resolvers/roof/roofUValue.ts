import type { Resolver } from "../../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../../";
import { resolveKeyedValue } from "../../../../types/keyed-values.js";
import { resolveYearBand } from "../../../../types/range-bands.js";

declare module "../../" {
  interface DETCalculatorRegistry {
    roofUValue: number;
  }
}

export default {
  key: "roofUValue",
  resolve: (ctx) => {
    const rt = ctx.get("roofTotalThermalResistance");
    if (rt != null) return 1 / rt;

    const yearBands = resolveKeyedValue(
      ctx.input.config.roof.uValue,
      ctx.get("roofConstructionType"),
    );
    const result = resolveYearBand(yearBands, ctx.get("roofYear"));
    if (result == null) throw new Error("Failed to resolve roofUValue");
    return result;
  },
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "roofUValue"
>;
