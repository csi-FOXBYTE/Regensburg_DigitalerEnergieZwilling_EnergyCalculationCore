import type { Resolver } from "../../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../../";
import { resolveKeyedValue } from "../../../../types/keyed-values.js";
import { resolveYearBand } from "../../../../types/range-bands.js";

declare module "../../" {
  interface DETCalculatorRegistry {
    topFloorConstructionUValue: number;
  }
}

export default {
  key: "topFloorConstructionUValue",
  resolve: (ctx) => {
    const yearBands = resolveKeyedValue(
      ctx.input.config.topFloor.uValue,
      ctx.get("topFloorType"),
    );
    const result = resolveYearBand(yearBands, ctx.get("buildingYear"));
    if (result == null) throw new Error("Failed to resolve topFloorConstructionUValue");
    return result;
  },
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "topFloorConstructionUValue"
>;
