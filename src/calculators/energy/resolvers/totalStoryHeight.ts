import type { Resolver } from "../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../";

declare module "../" {
  interface DETCalculatorRegistry {
    totalStoryHeight: number;
  }
}

export default {
  key: "totalStoryHeight",
  resolve: (ctx) => {
    const n = ctx.get("numberOfHeatedStories");
    return (
      n * ctx.get("interiorStoryHeight") +
      (n - 1) * ctx.get("floorSlabThickness")
    );
  },
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "totalStoryHeight"
>;
