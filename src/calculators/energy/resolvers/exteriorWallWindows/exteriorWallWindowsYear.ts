import type { Resolver } from "../../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../../";
import type { RangeKey } from "../../../../types/range-bands";

declare module "../../" {
  interface DETCalculatorRegistry {
    exteriorWallWindowsYear: number | RangeKey;
  }
}

export default {
  key: "exteriorWallWindowsYear",
  resolve: (ctx) => {
    const override = ctx.input.input.exteriorWallWindows.year;
    if (override != null) return override;
    return ctx.get("buildingYear");
  },
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "exteriorWallWindowsYear"
>;
