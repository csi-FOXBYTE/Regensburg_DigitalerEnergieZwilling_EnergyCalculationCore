import type { Resolver } from "../../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../../";

declare module "../../" {
  interface DETCalculatorRegistry {
    bottomFloorThermalResistance: number;
  }
}

export default {
  key: "bottomFloorThermalResistance",
  resolve: (ctx) =>
    ctx.get("bottomFloorConstructionResistance") +
    ctx.get("bottomFloorInsulationResistance"),
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "bottomFloorThermalResistance"
>;
