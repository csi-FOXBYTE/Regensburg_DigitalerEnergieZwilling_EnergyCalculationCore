import type { Resolver } from "../../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../../";
import { HeatFlowDirection } from "../../../../types/heat-flow-direction.js";
import { resolveKeyedValue } from "../../../../types/keyed-values.js";

declare module "../../" {
  interface DETCalculatorRegistry {
    outerWallInnerSurfaceThermalResistance: number;
  }
}

export default {
  key: "outerWallInnerSurfaceThermalResistance",
  resolve: (ctx) =>
    resolveKeyedValue(
      ctx.input.config.heat.innerSurfaceThermalResistance,
      HeatFlowDirection.HORIZONTAL,
    ),
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "outerWallInnerSurfaceThermalResistance"
>;
