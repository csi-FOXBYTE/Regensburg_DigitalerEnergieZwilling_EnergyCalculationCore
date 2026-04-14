import type { Resolver } from "../../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../../";
import { resolveYearBand } from "../../../../types/range-bands.js";

declare module "../../" {
  interface DETCalculatorRegistry {
    topFloorType: string;
  }
}

export default {
  key: "topFloorType",
  resolve: (ctx) => {
    const override = ctx.input.input.topFloor.topFloorType;
    if (override != null) return override;
    const result = resolveYearBand(
      ctx.input.config.topFloor.defaultTopFloorType,
      ctx.get("buildingYear"),
    );
    if (result == null) throw new Error("Failed to resolve topFloorType");
    return result;
  },
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "topFloorType"
>;
