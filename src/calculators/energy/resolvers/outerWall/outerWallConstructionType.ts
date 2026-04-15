import type { Resolver } from "../../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../../";
import { resolveYearBand } from "../../../../types/range-bands.js";

declare module "../../" {
  interface DETCalculatorRegistry {
    outerWallConstructionType: string;
  }
}

export default {
  key: "outerWallConstructionType",
  resolve: (ctx) => {
    const override = ctx.input.input.outerWall.constructionType;
    if (override != null) return override;
    const result = resolveYearBand(
      ctx.input.config.outerWall.defaultConstructionType,
      ctx.get("buildingYear"),
    );
    if (result == null) throw new Error("Failed to resolve outerWallConstructionType");
    return result;
  },
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "outerWallConstructionType"
>;
