import type { Resolver } from "../../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../../";

declare module "../../" {
  interface DETCalculatorRegistry {
    baseSlabUValue: number;
  }
}

export default {
  key: "baseSlabUValue",
  resolve: (ctx) => 1 / ctx.get("baseSlabThermalResistance"),
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "baseSlabUValue"
>;
