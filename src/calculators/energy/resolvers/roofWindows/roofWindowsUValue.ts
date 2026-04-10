import type { Resolver } from "../../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../../";
import { resolveKeyedValue } from "../../../../types/keyed-values.js";
import { resolveYearBand } from "../../../../types/range-bands.js";

declare module "../../" {
  interface DETCalculatorRegistry {
    roofWindowsUValue: number;
  }
}

export default {
  key: "roofWindowsUValue",
  resolve: (ctx) => {
    const override = ctx.input.input.roofWindows.uValue;
    if (override != null) return override;

    const yearBands = resolveKeyedValue(
      ctx.input.config.windows.uValue,
      ctx.get("roofWindowsType"),
    );
    const result = resolveYearBand(yearBands, ctx.get("roofWindowsYear"));
    if (result == null) throw new Error("Failed to resolve roofWindowsUValue");
    return result;
  },
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "roofWindowsUValue"
>;
