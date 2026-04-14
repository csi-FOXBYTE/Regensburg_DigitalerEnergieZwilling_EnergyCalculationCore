import type { Resolver } from "../../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../../";
import { HeatFlowDirection } from "../../../../types/heat-flow-direction.js";
import { resolveKeyedValue } from "../../../../types/keyed-values.js";

declare module "../../" {
  interface DETCalculatorRegistry {
    topFloorInnerSurfaceThermalResistance: number;
  }
}

export default {
  key: "topFloorInnerSurfaceThermalResistance",
  resolve: (ctx) =>
    resolveKeyedValue(
      ctx.input.config.heat.innerSurfaceThermalResistance,
      HeatFlowDirection.UPWARD,
    ),
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "topFloorInnerSurfaceThermalResistance"
>;
