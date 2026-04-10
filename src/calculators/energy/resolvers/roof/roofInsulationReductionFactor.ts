import type { Resolver } from "../../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../../";
import { resolveKeyedValue } from "../../../../types/keyed-values.js";

declare module "../../" {
  interface DETCalculatorRegistry {
    roofInsulationReductionFactor: number | null;
  }
}

export default {
  key: "roofInsulationReductionFactor",
  resolve: (ctx) => {
    const insulationType = ctx.input.input.roof.insulationType;
    if (insulationType == null) return null;
    return resolveKeyedValue(
      ctx.input.config.roof.insulationReductionFactor,
      insulationType,
    );
  },
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "roofInsulationReductionFactor"
>;
