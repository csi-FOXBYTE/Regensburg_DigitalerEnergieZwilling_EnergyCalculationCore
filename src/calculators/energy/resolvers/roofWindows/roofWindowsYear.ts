import type { Resolver } from "../../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../../";
import type { RangeKey } from "../../../../types/range-bands";

declare module "../../" {
  interface DETCalculatorRegistry {
    roofWindowsYear: number | RangeKey;
  }
}

export default {
  key: "roofWindowsYear",
  resolve: (ctx) => {
    const override = ctx.input.input.roofWindows.year;
    if (override != null) return override;
    return ctx.get("buildingYear");
  },
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "roofWindowsYear"
>;
