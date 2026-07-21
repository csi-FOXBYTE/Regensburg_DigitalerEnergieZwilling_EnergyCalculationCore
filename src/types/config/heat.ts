import { z } from "zod";
import { keyedValues } from "../keyed-values.js";
import { rangeBands, yearBands } from "../range-bands.js";
import { HeatFlowDirectionSchema } from "../heat-flow-direction.js";
import { SelectionSchema, selectionFilter } from "../selection.js";
import type { DETInput } from "../input/index.js";

export const CarrierRequirementsSchema = z.object({
  storage: z.boolean().optional(),
  gas: z.boolean().optional(),
});
export type CarrierRequirements = z.infer<typeof CarrierRequirementsSchema>;

export const CarrierSelectionSchema = SelectionSchema.extend({
  requirements: CarrierRequirementsSchema.optional(),
  excludeFromSystemRenewal: z.boolean().optional(),
});
export type CarrierSelection = z.infer<typeof CarrierSelectionSchema>;

export const HeatingSystemSelectionSchema = SelectionSchema.extend({
  excludeFromSystemRenewal: z.boolean().optional(),
});
export type HeatingSystemSelection = z.infer<typeof HeatingSystemSelectionSchema>;

export const PrimaryEnergyCarrierDataSchema = z.object({
  energyPerUnit: z.number(),
  unit: z.string(),
  unitRate: z.number(),
  baseRate: z.number(),
  co2Factor: z.number(),
  primaryEnergyFactor: z.number(),
});
export type PrimaryEnergyCarrierData = z.infer<typeof PrimaryEnergyCarrierDataSchema>;

export const ElectricityTypeDataSchema = z.object({
  co2Factor: z.number(),
  unitRate: z.number(),
  baseRate: z.number(),
  primaryEnergyFactor: z.number(),
});
export type ElectricityTypeData = z.infer<typeof ElectricityTypeDataSchema>;

export const DETHeatConfigSchema = z.object({
  primaryEnergyCarriers: z.array(CarrierSelectionSchema),
  heatingSystemTypes: z.array(HeatingSystemSelectionSchema),
  heatingSurfaceTypes: z.array(SelectionSchema),
  allowedHeatingSystemTypesByCarrier: selectionFilter(z.string(), z.string()),
  electricityTypes: z.array(SelectionSchema),
  defaultElectricityType: z.string(),
  electricityTypeData: keyedValues(z.string(), ElectricityTypeDataSchema),
  electricalRatio: keyedValues(z.string(), z.number()),
  hasInternalGains: keyedValues(z.string(), z.boolean()),
  internalGainsFactorByBuildingType: keyedValues(z.string(), z.number()),

  hotWaterEnergyDemandFromAreaFactor: z.number(),
  electricalBaseLoadFromFloorAreaFactor: z.number(),
  ventilationHeatLossCorrectionFactor: z.number(),
  heatingDegreeDays: z.number(),
  defaultPrimaryEnergyCarrier: z.string(),
  defaultHeatingSystemType: keyedValues(z.string(), z.string()),
  defaultHeatingSurfaceType: z.string(),
  heatingPerformanceFactor: keyedValues(z.string(), yearBands(rangeBands(z.number()))),
  temperatureControlPerformanceFactor: keyedValues(z.string(), yearBands(keyedValues(z.string(), z.number()))),
  primaryEnergyCarrierData: keyedValues(z.string(), PrimaryEnergyCarrierDataSchema),
  innerSurfaceThermalResistance: keyedValues(HeatFlowDirectionSchema, z.number()),
  outerSurfaceThermalResistance: keyedValues(HeatFlowDirectionSchema, z.number()),
});
export type DETHeatConfig = z.infer<typeof DETHeatConfigSchema>;

export function isCarrierCompatible(carrier: CarrierSelection, input: DETInput): boolean {
  const { requirements } = carrier;
  if (!requirements) return true;
  if (requirements.storage !== undefined && requirements.storage !== (input.heat.hasStorage ?? false)) return false;
  if (requirements.gas !== undefined && requirements.gas !== (input.heat.hasGasSupply ?? true)) return false;
  return true;
}
