import type { Resolver } from "../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../";

declare module "../" {
  interface DETCalculatorRegistry {
    numberOfHeatedStories: number;
  }
}

export default {
  key: "numberOfHeatedStories",
  resolve: (ctx) =>
    ctx.get("numberOfStories") +
    (ctx.get("hasAttic") && ctx.get("isAtticHeated") ? 1 : 0) +
    (ctx.get("hasBasement") && ctx.get("isBasementHeated") ? 1 : 0),
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "numberOfHeatedStories"
>;
