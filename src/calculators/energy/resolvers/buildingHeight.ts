import type { Resolver } from "../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../";

declare module "../" {
  interface DETCalculatorRegistry {
    buildingHeight: number;
  }
}

export default {
  key: "buildingHeight",
  resolve: (ctx) => ctx.input.input.general.buildingHeight,
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "buildingHeight"
>;
