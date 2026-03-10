import { safeDivide } from "../shared/math";
import type { YearBand } from "../catalogs/types";
import type { HeatingInput } from "../heating/types";
import type { EnergyCalculationContext, EnergyConfig, EnergyInput, EnergyResult, SolarGainInput } from "./types";

/**
 * Calculates annual building-energy indicators such as `HV`, `QH`,
 * final energy demand, and primary energy demand.
 *
 * @param input - Energy-demand inputs and optional overrides.
 * @param context - Precomputed core context such as aggregated `HT`.
 * @param config - Runtime defaults and factor tables.
 * @returns Calculated energy indicators.
 * @group Energy
 */
export function calculateEnergy(input: EnergyInput, context: EnergyCalculationContext, config: EnergyConfig): EnergyResult {
  const transmissionHeatLossWPerK = input.transmissionHeatLossWPerK ?? context.totalHt;
  const ventilationHeatTransferCoefficientWPerK =
    input.ventilationHeatTransferCoefficientWPerK ?? calculateVentilationHeatTransferCoefficient(input, config);
  const usableAreaM2 = input.usableAreaM2 ?? calculateUsableArea(input.heatedAirVolumeM3 ?? 0, config);
  const degreeDayFactor = input.degreeDaysKdPerA * config.degreeDayFactorMultiplier;
  const solarGainUtilizationFactor = input.solarGainUtilizationFactor ?? config.defaultSolarGainUtilizationFactor;
  const internalGainsKWhPerYear = input.internalGainsKWhPerYear ?? calculateInternalGains(usableAreaM2, config);
  const solarGainsKWhPerYear = input.solarGainsKWhPerYear ?? calculateSolarGains(input.solarGainEntries);
  const heatingDemandKWhPerYear = Math.max(
    0,
    degreeDayFactor * (transmissionHeatLossWPerK + ventilationHeatTransferCoefficientWPerK) -
      solarGainUtilizationFactor * (solarGainsKWhPerYear + internalGainsKWhPerYear),
  );
  const peopleCount = resolvePeopleCount(input.peopleCount, usableAreaM2, config);
  const domesticHotWaterDemandKWhPerYear =
    input.domesticHotWaterDemandKWhPerYear ?? peopleCount * config.domesticHotWaterDemandPerPersonKWhPerYear;
  const thermalEnergyDemandKWhPerYear = heatingDemandKWhPerYear + domesticHotWaterDemandKWhPerYear;
  const finalEnergyFactor = input.finalEnergyFactor ?? resolveFinalEnergyFactor(context.heating, config);
  const primaryEnergyFactor = input.primaryEnergyFactor ?? resolvePrimaryEnergyFactor(context.heating, config);
  const generatorEfficiency = input.generatorEfficiency ?? safeDivide(1, finalEnergyFactor);
  const finalEnergyDemandKWhPerYear = thermalEnergyDemandKWhPerYear * finalEnergyFactor;
  const primaryEnergyDemandKWhPerYear = finalEnergyDemandKWhPerYear * primaryEnergyFactor;
  const fuelProfile = resolveFuelProfile(context.heating, config);
  const fuelConsumptionUnit = input.fuelUnit ?? fuelProfile.unit;
  const fuelConsumptionUnitsPerKWh = input.fuelConsumptionUnitsPerKWh ?? fuelProfile.unitsPerKWh;
  const fuelConsumptionPerYear =
    input.fuelConsumptionPerYear ?? finalEnergyDemandKWhPerYear * fuelConsumptionUnitsPerKWh;
  const specificFuelCostPerUnit = input.specificFuelCostPerUnit ?? fuelProfile.pricePerUnit;
  const specificFuelCostPerKWh = specificFuelCostPerUnit * fuelConsumptionUnitsPerKWh;
  const fuelCostPerYear = fuelConsumptionPerYear * specificFuelCostPerUnit;
  const co2KgPerFuelUnit = input.co2KgPerFuelUnit ?? fuelProfile.co2KgPerUnit;
  const co2EmissionsTonsPerYear = (fuelConsumptionPerYear * co2KgPerFuelUnit) / 1000;

  return {
    transmissionHeatLossWPerK,
    ventilationHeatTransferCoefficientWPerK,
    usableAreaM2,
    degreeDayFactor,
    solarGainUtilizationFactor,
    internalGainsKWhPerYear,
    solarGainsKWhPerYear,
    heatingDemandKWhPerYear,
    domesticHotWaterDemandKWhPerYear,
    thermalEnergyDemandKWhPerYear,
    finalEnergyFactor,
    primaryEnergyFactor,
    finalEnergyDemandKWhPerYear,
    finalEnergyDemandKWhPerM2A: safeDivide(finalEnergyDemandKWhPerYear, usableAreaM2),
    primaryEnergyDemandKWhPerYear,
    primaryEnergyDemandKWhPerM2A: safeDivide(primaryEnergyDemandKWhPerYear, usableAreaM2),
    generatorEfficiency,
    fuelConsumptionPerYear,
    fuelConsumptionUnit,
    specificFuelCostPerUnit,
    specificFuelCostPerKWh,
    fuelCostPerYear,
    co2EmissionsTonsPerYear,
    peopleCount,
  };
}

function calculateVentilationHeatTransferCoefficient(input: EnergyInput, config: EnergyConfig): number {
  const heatedAirVolumeM3 = input.heatedAirVolumeM3 ?? 0;
  const airChangeRate = input.airChangeRate ?? 0;
  return config.ventilationCoefficient * airChangeRate * heatedAirVolumeM3;
}

function calculateUsableArea(heatedAirVolumeM3: number, config: EnergyConfig): number {
  return heatedAirVolumeM3 * config.usableAreaFactorFromVolume;
}

function calculateInternalGains(usableAreaM2: number, config: EnergyConfig): number {
  return usableAreaM2 * config.internalGainWattsPerM2 * config.heatingPeriodDays * 0.024;
}

function calculateSolarGains(entries: readonly SolarGainInput[] | undefined): number {
  if (!entries || entries.length === 0) {
    return 0;
  }

  return entries.reduce(
    (sum, entry) =>
      sum + entry.irradiationKWhPerM2A * entry.energyTransmittance * entry.area * (entry.correctionFactor ?? 1),
    0,
  );
}

function resolvePeopleCount(peopleCount: number | undefined, usableAreaM2: number, config: EnergyConfig): number {
  if (peopleCount !== undefined) {
    return peopleCount;
  }

  return Math.max(1, Math.round(safeDivide(usableAreaM2, config.occupancyAreaPerPersonM2)));
}

function resolveFinalEnergyFactor(heating: HeatingInput | undefined, config: EnergyConfig): number {
  if (!heating) {
    return config.defaultFinalEnergyFactor;
  }

  const generationFactor = resolveGenerationFactor(heating, config);
  const controlFactor = resolveControlFactor(heating, config);
  return generationFactor * controlFactor;
}

function resolvePrimaryEnergyFactor(heating: HeatingInput | undefined, config: EnergyConfig): number {
  if (!heating) {
    return 1;
  }

  return config.primaryEnergyFactorByCarrier[heating.primaryCarrier];
}

function resolveFuelProfile(heating: HeatingInput | undefined, config: EnergyConfig) {
  if (!heating) {
    return {
      unit: "kWh",
      unitsPerKWh: 1,
      pricePerUnit: 0,
      co2KgPerUnit: 0,
    };
  }

  return config.fuelCarrierProfileByCarrier[heating.primaryCarrier];
}

function resolveGenerationFactor(heating: HeatingInput, config: EnergyConfig): number {
  const bands = config.generationFactorByHeatingType[heating.primaryType];
  const year = heating.yearOfConstruction;

  if (!bands || bands.length === 0 || year === undefined) {
    return config.defaultFinalEnergyFactor;
  }

  return resolveBandValue(bands, year) ?? config.defaultFinalEnergyFactor;
}

function resolveControlFactor(heating: HeatingInput, config: EnergyConfig): number {
  const details = heating.details;
  if (!details) {
    return config.defaultControlFactor;
  }

  const base =
    (details.controlType ? config.controlFactorByType[details.controlType] : undefined) ?? config.defaultControlFactor;
  const emitterAdjustment =
    (details.emitterType ? config.emitterFactorAdjustmentByType[details.emitterType] : undefined) ?? 0;
  const flowTemperatureAdjustment =
    details.flowTemperatureC !== undefined ? resolveBandValue(config.flowTemperatureAdjustmentBands, details.flowTemperatureC) ?? 0 : 0;
  const radiatorPositionAdjustment =
    (details.radiatorPosition ? config.radiatorPositionAdjustmentByType[details.radiatorPosition] : undefined) ?? 0;
  const intermittentAdjustment =
    details.intermittentOperation && details.emitterType
      ? config.intermittentAdjustmentByEmitterType[details.emitterType] ?? 0
      : 0;
  const singleRoomControlAdjustment =
    (details.singleRoomControlType
      ? config.singleRoomControlAdjustmentByType[details.singleRoomControlType]
      : undefined) ?? 0;

  return base + emitterAdjustment + flowTemperatureAdjustment + radiatorPositionAdjustment + intermittentAdjustment + singleRoomControlAdjustment;
}

function resolveBandValue(bands: readonly YearBand[], value: number): number | undefined {
  for (const band of bands) {
    const lowerOk = band.from === undefined || value >= band.from;
    const upperOk = band.to === undefined || value <= band.to;
    if (lowerOk && upperOk) {
      return band.value;
    }
  }

  return undefined;
}
