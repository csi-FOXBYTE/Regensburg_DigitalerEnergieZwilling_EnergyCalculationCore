import type { Resolver } from "../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../";
import type { ElectricityTypeData } from "../../../types/config/heat.js";
import { resolveKeyedValue } from "../../../types/keyed-values.js";

declare module "../" {
  interface DETCalculatorRegistry {
    electricityType: string;
    electricityTypeData: ElectricityTypeData;
    electricityCo2Factor: number;
    electricityUnitRate: number;
    electricityBaseRate: number;
    electricityOffset: number;
    electricityConsumption: number;
    electricityCost: number;
    electricityCo2Emissions: number;
    electricalPrimaryEnergyDemand: number;
  }
}

export const electricityType = {
  key: "electricityType",
  resolve: (ctx) => {
    const override = ctx.input.input.electricity.electricityType;
    if (override != null) return override;
    return ctx.input.config.heat.defaultElectricityType;
  },
} satisfies Resolver<DETCalculatorContext, DETCalculatorRegistry, "electricityType">;

export const electricityTypeData = {
  key: "electricityTypeData",
  resolve: (ctx) =>
    resolveKeyedValue(ctx.input.config.heat.electricityTypeData, ctx.get("electricityType")),
} satisfies Resolver<DETCalculatorContext, DETCalculatorRegistry, "electricityTypeData">;

export const electricityCo2Factor = {
  key: "electricityCo2Factor",
  resolve: (ctx) => ctx.get("electricityTypeData").co2Factor,
} satisfies Resolver<DETCalculatorContext, DETCalculatorRegistry, "electricityCo2Factor">;

export const electricityUnitRate = {
  key: "electricityUnitRate",
  resolve: (ctx) => {
    const override = ctx.input.input.electricity.electricityUnitRate;
    if (override != null) return override;
    return ctx.get("electricityTypeData").unitRate;
  },
} satisfies Resolver<DETCalculatorContext, DETCalculatorRegistry, "electricityUnitRate">;

export const electricityBaseRate = {
  key: "electricityBaseRate",
  resolve: (ctx) => {
    const override = ctx.input.input.electricity.userElectricityBaseRate;
    if (override != null) return override;
    return ctx.get("electricityTypeData").baseRate;
  },
} satisfies Resolver<DETCalculatorContext, DETCalculatorRegistry, "electricityBaseRate">;

export const electricityOffset = {
  key: "electricityOffset",
  resolve: (ctx) => {
    const preRenovationValues = ctx.input.input.preRenovationValues;
    if (preRenovationValues != null) {
      return preRenovationValues.electricityOffset;
    }
    const userElectricityConsumption = ctx.input.input.electricity.userElectricityConsumption;
    if (userElectricityConsumption != null) {
      return userElectricityConsumption - ctx.get("calculatedElectricalEnergyDemand");
    }
    return 0;
  },
} satisfies Resolver<DETCalculatorContext, DETCalculatorRegistry, "electricityOffset">;

export const electricityConsumption = {
  key: "electricityConsumption",
  resolve: (ctx) => ctx.get("electricalEnergyDemand"),
} satisfies Resolver<DETCalculatorContext, DETCalculatorRegistry, "electricityConsumption">;

export const electricityCost = {
  key: "electricityCost",
  resolve: (ctx) =>
    ctx.get("electricalEnergyDemand") * ctx.get("electricityUnitRate") +
    ctx.get("electricityBaseRate"),
} satisfies Resolver<DETCalculatorContext, DETCalculatorRegistry, "electricityCost">;

export const electricityCo2Emissions = {
  key: "electricityCo2Emissions",
  resolve: (ctx) =>
    ctx.get("electricalEnergyDemand") * ctx.get("electricityCo2Factor") * 0.000001,
} satisfies Resolver<DETCalculatorContext, DETCalculatorRegistry, "electricityCo2Emissions">;

export const electricalPrimaryEnergyDemand = {
  key: "electricalPrimaryEnergyDemand",
  resolve: (ctx) =>
    ctx.get("electricalEnergyDemand") * ctx.get("electricityTypeData").primaryEnergyFactor,
} satisfies Resolver<DETCalculatorContext, DETCalculatorRegistry, "electricalPrimaryEnergyDemand">;

export default [
  electricityType,
  electricityTypeData,
  electricityCo2Factor,
  electricityUnitRate,
  electricityBaseRate,
  electricityOffset,
  electricityConsumption,
  electricityCost,
  electricityCo2Emissions,
  electricalPrimaryEnergyDemand,
];
