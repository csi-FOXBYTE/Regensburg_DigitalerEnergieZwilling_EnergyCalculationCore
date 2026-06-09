import type { Resolver } from "../../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../../";
import type { RangeKey } from "../../../../types/range-bands.js";

declare module "../../" {
  interface DETCalculatorRegistry {
    outerWallYear: number | RangeKey;
    outerWallArea: number;
    adjacentWallArea: number;
    outerWallHasInsulation: boolean;
    outerWallInsulationThickness: number;
  }
}

export const outerWallYear = {
  key: "outerWallYear",
  resolve: (ctx) => {
    const override = ctx.input.input.outerWall.year;
    if (override != null) return override;
    return ctx.get("buildingYear");
  },
} satisfies Resolver<DETCalculatorContext, DETCalculatorRegistry, "outerWallYear">;

export const outerWallArea = {
  key: "outerWallArea",
  resolve: (ctx) => ctx.input.input.outerWall.area,
} satisfies Resolver<DETCalculatorContext, DETCalculatorRegistry, "outerWallArea">;

export const adjacentWallArea = {
  key: "adjacentWallArea",
  resolve: (ctx) => ctx.input.input.outerWall.adjacentWallArea ?? 0,
} satisfies Resolver<DETCalculatorContext, DETCalculatorRegistry, "adjacentWallArea">;

export const outerWallHasInsulation = {
  key: "outerWallHasInsulation",
  resolve: (ctx) => ctx.input.input.outerWall.hasInsulation ?? false,
} satisfies Resolver<DETCalculatorContext, DETCalculatorRegistry, "outerWallHasInsulation">;

export const outerWallInsulationThickness = {
  key: "outerWallInsulationThickness",
  resolve: (ctx) => {
    const override = ctx.input.input.outerWall.insulationThickness;
    if (override != null) return override;
    return ctx.input.config.outerWall.assumedInsulationThickness;
  },
} satisfies Resolver<DETCalculatorContext, DETCalculatorRegistry, "outerWallInsulationThickness">;

export default [outerWallYear, outerWallArea, adjacentWallArea, outerWallHasInsulation, outerWallInsulationThickness];
