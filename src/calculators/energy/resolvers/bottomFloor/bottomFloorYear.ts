import type { Resolver } from "../../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../../";
import type { RangeKey } from "../../../../types/range-bands";

declare module "../../" {
  interface DETCalculatorRegistry {
    bottomFloorYear: number | RangeKey;
  }
}

export default {
  key: "bottomFloorYear",
  resolve: (ctx) => {
    const override = ctx.input.input.bottomFloor.year;
    if (override != null) return override;
    return ctx.get("buildingYear");
  },
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "bottomFloorYear"
>;
