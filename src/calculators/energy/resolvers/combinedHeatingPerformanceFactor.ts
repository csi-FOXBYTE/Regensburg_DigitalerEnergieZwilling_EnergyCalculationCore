import type { Resolver } from "../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../";

declare module "../" {
  interface DETCalculatorRegistry {
    combinedHeatingPerformanceFactor: number;
  }
}

export default {
  key: "combinedHeatingPerformanceFactor",
  resolve: (ctx) =>
    ctx.get("heatingPerformanceFactor") +
    ctx.get("temperatureControlPerformanceFactor"),
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "combinedHeatingPerformanceFactor"
>;
