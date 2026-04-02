import type { Resolver } from "../../../engine/index.js";
import type { BuildingType } from "../../../types/building-type.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../";

declare module "../" {
  interface DETCalculatorRegistry {
    buildingType: BuildingType;
  }
}

export default {
  key: "buildingType",
  resolve: (ctx) => ctx.input.input.general.type,
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "buildingType"
>;
