import type { Resolver } from "../../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../../";
import { HeatFlowDirection } from "../../../../types/heat-flow-direction.js";
import { resolveKeyedValue } from "../../../../types/keyed-values.js";

declare module "../../" {
  interface DETCalculatorRegistry {
    outerWallOuterSurfaceThermalResistance: number;
  }
}

export default {
  key: "outerWallOuterSurfaceThermalResistance",
  resolve: (ctx) =>
    resolveKeyedValue(
      ctx.input.config.heat.outerSurfaceThermalResistance,
      HeatFlowDirection.HORIZONTAL,
    ),
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "outerWallOuterSurfaceThermalResistance"
>;
