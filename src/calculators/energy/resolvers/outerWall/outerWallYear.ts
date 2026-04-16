import type { Resolver } from "../../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../../";
import type { RangeKey } from "../../../../types/range-bands";

declare module "../../" {
  interface DETCalculatorRegistry {
    outerWallYear: number | RangeKey;
  }
}

export default {
  key: "outerWallYear",
  resolve: (ctx) => {
    const override = ctx.input.input.outerWall.year;
    if (override != null) return override;
    return ctx.get("buildingYear");
  },
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "outerWallYear"
>;
