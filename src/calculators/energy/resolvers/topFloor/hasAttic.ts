import type { Resolver } from "../../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../../";

declare module "../../" {
  interface DETCalculatorRegistry {
    hasAttic: boolean;
  }
}

export default {
  key: "hasAttic",
  resolve: (ctx) => ctx.input.input.topFloor.hasAttic ?? false,
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "hasAttic"
>;
