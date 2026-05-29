import type { Resolver } from "../../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../../";

declare module "../../" {
  interface DETCalculatorRegistry {
    adjacentWallUValue: number;
  }
}

export default {
  key: "adjacentWallUValue",
  resolve: () => 0,
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "adjacentWallUValue"
>;
