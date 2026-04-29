import type { Resolver } from "../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../";
import type { ElectricityTypeData } from "../../../types/config/heat.js";
import { resolveKeyedValue } from "../../../types/keyed-values.js";

declare module "../" {
  interface DETCalculatorRegistry {
    electricityTypeData: ElectricityTypeData;
  }
}

export default {
  key: "electricityTypeData",
  resolve: (ctx) =>
    resolveKeyedValue(
      ctx.input.config.heat.electricityTypeData,
      ctx.get("electricityType"),
    ),
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "electricityTypeData"
>;
