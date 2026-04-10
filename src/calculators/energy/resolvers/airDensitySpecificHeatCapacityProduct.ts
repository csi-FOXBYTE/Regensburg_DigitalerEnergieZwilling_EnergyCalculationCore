import type { Resolver } from "../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../";

declare module "../" {
  interface DETCalculatorRegistry {
    airDensitySpecificHeatCapacityProduct: number;
  }
}

export default {
  key: "airDensitySpecificHeatCapacityProduct",
  resolve: () => 0.34,
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "airDensitySpecificHeatCapacityProduct"
>;
