import type { DETConfig } from "./types/config/index.js";
import type { DETInput } from "./types/input/index.js";
import type { EnergyEfficiencyClass } from "./types/energy-efficiency-class.js";
import { DETEnergyCaluclator } from "./calculators/energy/index.js";

export type CalculationResult = {
  energyConsumptionPerSquareMeter: number;
  energyEfficiencyClass: EnergyEfficiencyClass;
  yearlyCost: number;
  co2Emissions: number;
};

export function calculate(config: DETConfig, input: DETInput): CalculationResult {
  const ctx = DETEnergyCaluclator({ config, input });

  return {
    energyConsumptionPerSquareMeter: ctx.get("totalEnergyDemandPerSquareMeter"),
    energyEfficiencyClass: ctx.get("energyEfficiencyClass"),
    yearlyCost: ctx.get("energyCarrierCost"),
    co2Emissions: ctx.get("co2Emissions"),
  };
}
