import type { Resolver } from "../../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../../";
import type { RangeKey } from "../../../../types/range-bands";

declare module "../../" {
  interface DETCalculatorRegistry {
    roofYear: number | RangeKey;
  }
}

export default {
  key: "roofYear",
  resolve: (ctx) => {
    const override = ctx.input.input.roof.year;
    if (override != null) return override;
    return ctx.get("buildingYear");
  },
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "roofYear"
>;
