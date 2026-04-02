import type { Resolver } from "../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../";

declare module "../" {
  interface DETCalculatorRegistry {
    buildingBaseArea: number;
  }
}

export default {
  key: "buildingBaseArea",
  resolve: (ctx) => ctx.input.input.general.buildingBaseArea,
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "buildingBaseArea"
>;
