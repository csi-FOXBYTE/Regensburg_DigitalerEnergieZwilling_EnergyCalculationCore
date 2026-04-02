import type { Resolver } from "../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../";

declare module "../" {
  interface DETCalculatorRegistry {
    numberOfStories: number;
  }
}

export default {
  key: "numberOfStories",
  resolve: (ctx) => {
    const override = ctx.input.input.general.numberOfStories;
    if (override != null) return override;
    return Math.round(
      ctx.get("buildingHeight") /
        (ctx.get("interiorStoryHeight") + ctx.get("floorSlabThickness")),
    );
  },
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "numberOfStories"
>;
