import type { Resolver } from "../../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../../";
import { resolveYearBand } from "../../../../types/range-bands.js";

declare module "../../" {
  interface DETCalculatorRegistry {
    baseSlabConstructionType: string;
  }
}

export default {
  key: "baseSlabConstructionType",
  resolve: (ctx) => {
    const override = ctx.input.input.baseSlab.constructionType;
    if (override != null) return override;
    const result = resolveYearBand(
      ctx.input.config.baseSlab.defaultConstructionType,
      ctx.get("buildingYear"),
    );
    if (result == null) throw new Error("Failed to resolve baseSlabConstructionType");
    return result;
  },
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "baseSlabConstructionType"
>;
