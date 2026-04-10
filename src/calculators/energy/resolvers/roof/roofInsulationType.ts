import type { Resolver } from "../../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../../";

declare module "../../" {
  interface DETCalculatorRegistry {
    roofInsulationType: string;
  }
}

export default {
  key: "roofInsulationType",
  resolve: (ctx) => {
    const override = ctx.input.input.roof.insulationType;
    if (override != null) return override;
    return ctx.input.config.roof.defaultInsulationType;
  },
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "roofInsulationType"
>;
