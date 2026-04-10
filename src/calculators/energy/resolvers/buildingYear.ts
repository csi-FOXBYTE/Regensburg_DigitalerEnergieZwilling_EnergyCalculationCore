import type { Resolver } from "../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../";
import type { RangeKey } from "../../../types/range-bands";

declare module "../" {
  interface DETCalculatorRegistry {
    buildingYear: number | RangeKey;
  }
}

export default {
  key: "buildingYear",
  resolve: (ctx) => ctx.input.input.general.buildingYear,
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "buildingYear"
>;
