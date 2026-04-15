import type { Resolver } from "../../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../../";
import type { RoofInsulationType } from "../../../../types/roof-insulation-type.js";

declare module "../../" {
  interface DETCalculatorRegistry {
    roofInsulationType: RoofInsulationType;
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
