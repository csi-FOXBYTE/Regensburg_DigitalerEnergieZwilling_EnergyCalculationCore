import type { Resolver } from "../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../";

declare module "../" {
  interface DETCalculatorRegistry {
    totalCo2Emissions: number;
  }
}

export default {
  key: "totalCo2Emissions",
  resolve: (ctx) =>
    ctx.get("thermalCo2Emissions") + ctx.get("electricityCo2Emissions"),
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "totalCo2Emissions"
>;
