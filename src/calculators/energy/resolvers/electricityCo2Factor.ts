import type { Resolver } from "../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../";

declare module "../" {
  interface DETCalculatorRegistry {
    electricityCo2Factor: number;
  }
}

export default {
  key: "electricityCo2Factor",
  resolve: (ctx) => ctx.get("electricityTypeData").co2Factor,
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "electricityCo2Factor"
>;
