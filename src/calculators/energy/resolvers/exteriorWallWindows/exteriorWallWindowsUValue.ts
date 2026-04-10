import type { Resolver } from "../../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../../";
import { resolveKeyedValue } from "../../../../types/keyed-values.js";
import { resolveYearBand } from "../../../../types/range-bands.js";

declare module "../../" {
  interface DETCalculatorRegistry {
    exteriorWallWindowsUValue: number;
  }
}

export default {
  key: "exteriorWallWindowsUValue",
  resolve: (ctx) => {
    const override = ctx.input.input.exteriorWallWindows.uValue;
    if (override != null) return override;

    const yearBands = resolveKeyedValue(
      ctx.input.config.windows.uValue,
      ctx.get("exteriorWallWindowsType"),
    );
    const result = resolveYearBand(
      yearBands,
      ctx.get("exteriorWallWindowsYear"),
    );
    if (result == null)
      throw new Error("Failed to resolve exteriorWallWindowsUValue");
    return result;
  },
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "exteriorWallWindowsUValue"
>;
