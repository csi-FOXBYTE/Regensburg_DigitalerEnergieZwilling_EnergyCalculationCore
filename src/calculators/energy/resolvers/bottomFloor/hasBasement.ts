import type { Resolver } from "../../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../../";

declare module "../../" {
  interface DETCalculatorRegistry {
    hasBasement: boolean;
  }
}

export default {
  key: "hasBasement",
  resolve: (ctx) => ctx.input.input.bottomFloor.hasBasement ?? false,
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "hasBasement"
>;
