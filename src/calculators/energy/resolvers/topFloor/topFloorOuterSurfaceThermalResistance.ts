import type { Resolver } from "../../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../../";
import { HeatFlowDirection } from "../../../../types/heat-flow-direction.js";
import { resolveKeyedValue } from "../../../../types/keyed-values.js";

declare module "../../" {
  interface DETCalculatorRegistry {
    topFloorOuterSurfaceThermalResistance: number;
  }
}

export default {
  key: "topFloorOuterSurfaceThermalResistance",
  resolve: (ctx) =>
    resolveKeyedValue(
      ctx.input.config.heat.outerSurfaceThermalResistance,
      HeatFlowDirection.UPWARD,
    ),
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "topFloorOuterSurfaceThermalResistance"
>;
