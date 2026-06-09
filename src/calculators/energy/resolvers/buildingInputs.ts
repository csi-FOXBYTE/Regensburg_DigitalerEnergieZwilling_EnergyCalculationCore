import type { Resolver } from "../../../engine/index.js";
import type { BuildingType } from "../../../types/building-type.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../";
import type { RangeKey } from "../../../types/range-bands.js";

declare module "../" {
  interface DETCalculatorRegistry {
    buildingYear: number | RangeKey;
    buildingHeight: number;
    buildingBaseArea: number;
    buildingType: BuildingType;
    livingArea: number | null;
    isBasementHeated: boolean;
  }
}

export const buildingYear = {
  key: "buildingYear",
  resolve: (ctx) => ctx.input.input.general.buildingYear,
} satisfies Resolver<DETCalculatorContext, DETCalculatorRegistry, "buildingYear">;

export const buildingHeight = {
  key: "buildingHeight",
  resolve: (ctx) => ctx.input.input.general.buildingHeight,
} satisfies Resolver<DETCalculatorContext, DETCalculatorRegistry, "buildingHeight">;

export const buildingBaseArea = {
  key: "buildingBaseArea",
  resolve: (ctx) => ctx.input.input.general.buildingBaseArea,
} satisfies Resolver<DETCalculatorContext, DETCalculatorRegistry, "buildingBaseArea">;

export const buildingType = {
  key: "buildingType",
  resolve: (ctx) => ctx.input.input.general.type,
} satisfies Resolver<DETCalculatorContext, DETCalculatorRegistry, "buildingType">;

export const livingArea = {
  key: "livingArea",
  resolve: (ctx) => ctx.input.input.general.livingArea ?? null,
} satisfies Resolver<DETCalculatorContext, DETCalculatorRegistry, "livingArea">;

export const isBasementHeated = {
  key: "isBasementHeated",
  resolve: (ctx) => ctx.input.input.bottomFloor.isBasementHeated ?? false,
} satisfies Resolver<DETCalculatorContext, DETCalculatorRegistry, "isBasementHeated">;

export default [buildingYear, buildingHeight, buildingBaseArea, buildingType, livingArea, isBasementHeated];
