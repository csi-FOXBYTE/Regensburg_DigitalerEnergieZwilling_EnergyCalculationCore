import type { Resolver } from "../../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../../";
import { HeatFlowDirection } from "../../../../types/heat-flow-direction.js";
import { resolveKeyedValue } from "../../../../types/keyed-values.js";

declare module "../../" {
  interface DETCalculatorRegistry {
    baseSlabInnerSurfaceThermalResistance: number;
  }
}

export default {
  key: "baseSlabInnerSurfaceThermalResistance",
  resolve: (ctx) =>
    resolveKeyedValue(
      ctx.input.config.heat.innerSurfaceThermalResistance,
      HeatFlowDirection.DOWNWARD,
    ),
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "baseSlabInnerSurfaceThermalResistance"
>;
