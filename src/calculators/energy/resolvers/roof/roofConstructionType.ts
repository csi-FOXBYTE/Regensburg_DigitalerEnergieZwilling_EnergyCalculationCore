import type { Resolver } from "../../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../../";

declare module "../../" {
  interface DETCalculatorRegistry {
    roofConstructionType: string;
  }
}

export default {
  key: "roofConstructionType",
  resolve: (ctx) => {
    const override = ctx.input.input.roof.constructionType;
    if (override != null) return override;
    return ctx.input.config.roof.defaultConstructionType;
  },
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "roofConstructionType"
>;
