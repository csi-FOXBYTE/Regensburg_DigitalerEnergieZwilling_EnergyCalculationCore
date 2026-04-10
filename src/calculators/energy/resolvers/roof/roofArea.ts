import type { Resolver } from "../../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../../";

declare module "../../" {
  interface DETCalculatorRegistry {
    roofArea: number;
  }
}

export default {
  key: "roofArea",
  resolve: (ctx) => ctx.input.input.roof.area,
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "roofArea"
>;
