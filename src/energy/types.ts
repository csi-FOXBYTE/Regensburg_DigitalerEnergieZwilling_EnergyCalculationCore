import type { YearBand } from "../catalogs/types";
import type { EnergyCarrier, HeatingInput } from "../heating/types";

/**
 * One solar-gain contribution.
 *
 * @group Energy
 */
export type SolarGainInput = Readonly<{
  area: number;
  irradiationKWhPerM2A: number;
  energyTransmittance: number;
  correctionFactor?: number;
  orientation?: string;
}>;

/**
 * Optional energy-demand input block used for annual demand indicators.
 *
 * @group Energy
 */
export type EnergyInput = Readonly<{
  transmissionHeatLossWPerK?: number;
  ventilationHeatTransferCoefficientWPerK?: number;
  heatedAirVolumeM3?: number;
  airChangeRate?: number;
  degreeDaysKdPerA: number;
  solarGainUtilizationFactor?: number;
  usableAreaM2?: number;
  solarGainsKWhPerYear?: number;
  solarGainEntries?: readonly SolarGainInput[];
  internalGainsKWhPerYear?: number;
  domesticHotWaterDemandKWhPerYear?: number;
  peopleCount?: number;
  finalEnergyFactor?: number;
  primaryEnergyFactor?: number;
  generatorEfficiency?: number;
  fuelConsumptionPerYear?: number;
  fuelConsumptionUnitsPerKWh?: number;
  fuelUnit?: string;
  specificFuelCostPerUnit?: number;
  co2KgPerFuelUnit?: number;
}>;

/**
 * Resolved energy KPIs.
 *
 * @group Energy
 */
export type EnergyResult = Readonly<{
  transmissionHeatLossWPerK: number;
  ventilationHeatTransferCoefficientWPerK: number;
  usableAreaM2: number;
  degreeDayFactor: number;
  solarGainUtilizationFactor: number;
  internalGainsKWhPerYear: number;
  solarGainsKWhPerYear: number;
  heatingDemandKWhPerYear: number;
  domesticHotWaterDemandKWhPerYear: number;
  thermalEnergyDemandKWhPerYear: number;
  finalEnergyFactor: number;
  primaryEnergyFactor: number;
  finalEnergyDemandKWhPerYear: number;
  finalEnergyDemandKWhPerM2A: number;
  primaryEnergyDemandKWhPerYear: number;
  primaryEnergyDemandKWhPerM2A: number;
  generatorEfficiency: number;
  fuelConsumptionPerYear: number;
  fuelConsumptionUnit: string;
  specificFuelCostPerUnit: number;
  specificFuelCostPerKWh: number;
  fuelCostPerYear: number;
  co2EmissionsTonsPerYear: number;
  peopleCount: number;
}>;

/**
 * Fuel- and emission-related defaults per carrier.
 *
 * @group Energy
 */
export type FuelCarrierProfile = Readonly<{
  unit: string;
  unitsPerKWh: number;
  pricePerUnit: number;
  co2KgPerUnit: number;
}>;

/**
 * Runtime defaults and factor tables for annual energy-demand calculations.
 *
 * @group Energy
 */
export type EnergyConfig = Readonly<{
  usableAreaFactorFromVolume: number;
  internalGainWattsPerM2: number;
  heatingPeriodDays: number;
  degreeDayFactorMultiplier: number;
  ventilationCoefficient: number;
  defaultSolarGainUtilizationFactor: number;
  domesticHotWaterDemandPerPersonKWhPerYear: number;
  occupancyAreaPerPersonM2: number;
  defaultFinalEnergyFactor: number;
  defaultControlFactor: number;
  generationFactorByHeatingType: Readonly<Record<string, readonly YearBand[]>>;
  controlFactorByType: Readonly<Record<string, number>>;
  emitterFactorAdjustmentByType: Readonly<Record<string, number>>;
  flowTemperatureAdjustmentBands: readonly YearBand[];
  radiatorPositionAdjustmentByType: Readonly<Record<string, number>>;
  intermittentAdjustmentByEmitterType: Readonly<Record<string, number>>;
  singleRoomControlAdjustmentByType: Readonly<Record<string, number>>;
  primaryEnergyFactorByCarrier: Readonly<Record<EnergyCarrier, number>>;
  fuelCarrierProfileByCarrier: Readonly<Record<EnergyCarrier, FuelCarrierProfile>>;
}>;

/**
 * Calculation context shared between core aggregation and the energy domain.
 *
 * @group Energy
 */
export type EnergyCalculationContext = Readonly<{
  totalHt: number;
  heating?: HeatingInput;
}>;
