import type { Resolver } from "../../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../../";

declare module "../../" {
  interface DETCalculatorRegistry {
    topFloorThermalResistance: number;
  }
}

export default {
  key: "topFloorThermalResistance",
  resolve: (ctx) =>
    ctx.get("topFloorConstructionResistance") +
    ctx.get("topFloorInsulationResistance"),
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "topFloorThermalResistance"
>;
