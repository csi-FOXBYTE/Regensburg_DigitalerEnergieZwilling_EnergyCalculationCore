import type { Resolver } from "../../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../../";

declare module "../../" {
  interface DETCalculatorRegistry {
    roofHasInsulation: boolean;
  }
}

export default {
  key: "roofHasInsulation",
  resolve: (ctx) => ctx.input.input.roof.hasInsulation ?? false,
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "roofHasInsulation"
>;
