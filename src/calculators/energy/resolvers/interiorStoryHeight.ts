import type { Resolver } from "../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../";

declare module "../" {
  interface DETCalculatorRegistry {
    interiorStoryHeight: number;
  }
}

export default {
  key: "interiorStoryHeight",
  resolve: (ctx) => ctx.input.config.general.assumedInteriorStoryHeight,
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "interiorStoryHeight"
>;
