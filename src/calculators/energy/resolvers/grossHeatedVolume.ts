import type { Resolver } from "../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../";

declare module "../" {
  interface DETCalculatorRegistry {
    grossHeatedVolume: number;
  }
}

export default {
  key: "grossHeatedVolume",
  resolve: (ctx) =>
    ctx.get("buildingBaseArea") * ctx.get("totalStoryHeight"),
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "grossHeatedVolume"
>;
