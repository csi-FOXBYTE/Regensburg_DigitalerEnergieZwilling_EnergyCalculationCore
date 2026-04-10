import type { Resolver } from "../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../";
import type { RangeKey } from "../../../types/range-bands";

declare module "../" {
  interface DETCalculatorRegistry {
    heatingSystemConstructionYear: number | RangeKey;
  }
}

export default {
  key: "heatingSystemConstructionYear",
  resolve: (ctx) => {
    const override = ctx.input.input.heat.heatingSystemConstructionYear;
    if (override != null) return override;
    return ctx.get("buildingYear");
  },
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "heatingSystemConstructionYear"
>;
