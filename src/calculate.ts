import type { DETConfig } from "./types/config/index.js";
import type { DETInput } from "./types/input/index.js";
import type { EnergyEfficiencyClass } from "./types/energy-efficiency-class.js";
import type { DETCalculatorRegistry } from "./calculators/energy/index.js";
import { DETEnergyCaluclator } from "./calculators/energy/index.js";

type BaseCalculationResult = {
  energyConsumptionPerSquareMeter: number;
  energyEfficiencyClass: EnergyEfficiencyClass;
  yearlyCost: number;
  co2Emissions: number;
};

export type CalculationResult<K extends keyof DETCalculatorRegistry = never> =
  [K] extends [never]
    ? BaseCalculationResult
    : BaseCalculationResult & { extra: Pick<DETCalculatorRegistry, K> };

export type CalculateOptions<K extends keyof DETCalculatorRegistry = never> = {
  debug?: boolean;
  extra?: ReadonlyArray<K>;
};

export function calculate<K extends keyof DETCalculatorRegistry = never>(
  config: DETConfig,
  input: DETInput,
  options?: CalculateOptions<K>,
): CalculationResult<K> {
  const ctx = DETEnergyCaluclator({ config, input });

  const result: BaseCalculationResult = {
    energyConsumptionPerSquareMeter: ctx.get("totalEnergyDemandPerSquareMeter"),
    energyEfficiencyClass: ctx.get("energyEfficiencyClass"),
    yearlyCost: ctx.get("energyCarrierCost"),
    co2Emissions: ctx.get("co2Emissions"),
  };

  if (options?.debug) {
    console.log("[DET] Resolved values:", ctx.getAll());
  }

  if (!options?.extra?.length) {
    return result as CalculationResult<K>;
  }

  const extra = {} as Pick<DETCalculatorRegistry, K>;
  for (const key of options.extra) {
    (extra as Partial<DETCalculatorRegistry>)[key] = ctx.get(key);
  }
  return { ...result, extra } as CalculationResult<K>;
}
