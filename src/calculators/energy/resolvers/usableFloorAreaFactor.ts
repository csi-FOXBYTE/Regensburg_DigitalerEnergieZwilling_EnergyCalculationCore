import type { Resolver } from "../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../";

declare module "../" {
  interface DETCalculatorRegistry {
    usableFloorAreaFactor: number;
  }
}

export default {
  key: "usableFloorAreaFactor",
  resolve: (ctx) => ctx.input.config.general.usableFloorAreaFactor,
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "usableFloorAreaFactor"
>;
