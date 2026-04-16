import type { Resolver } from "../../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../../";
import { resolveKeyedValue } from "../../../../types/keyed-values.js";
import { resolveYearBand } from "../../../../types/range-bands.js";

declare module "../../" {
  interface DETCalculatorRegistry {
    bottomFloorConstructionType: string;
  }
}

export default {
  key: "bottomFloorConstructionType",
  resolve: (ctx) => {
    const override = ctx.input.input.bottomFloor.constructionType;
    if (override != null) return override;
    const yearBands = resolveKeyedValue(
      ctx.input.config.bottomFloor.defaultConstructionType,
      ctx.get("isSpaceAboveBaseSlabHeated"),
    );
    const result = resolveYearBand(yearBands, ctx.get("bottomFloorYear"));
    if (result == null) throw new Error("Failed to resolve bottomFloorConstructionType");
    return result;
  },
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "bottomFloorConstructionType"
>;
