import type { RuleCondition, RuleValue } from "../shared/rule-conditions";

/**
 * Supported system-level heating modes.
 *
 * @group Heating
 */
export type HeatingMode = "central" | "central_with_secondary" | "decentral";

/**
 * Supported primary energy carriers.
 *
 * @group Heating
 */
export type EnergyCarrier = "oil" | "gas" | "biomass" | "electricity" | "district_heating" | "other";

/**
 * String literal union that keeps editor completion for known values while
 * still allowing custom strings.
 *
 * @group Heating
 */
export type LiteralUnion<TKnown extends string> = TKnown | (string & {});

/**
 * Known heating-type literals derived from heating config only.
 *
 * @group Heating
 */
export type HeatingTypeFromConfig<TConfig extends HeatingConfig> = LiteralUnion<
  | Extract<TConfig["noActionTypes"][number], string>
  | Extract<TConfig["directReplaceTypes"][number], string>
  | Extract<TConfig["replacementByCarrier"][keyof TConfig["replacementByCarrier"]], string>
  | Extract<NonNullable<TConfig["rules"]>[number]["preferredReplacement"], string>
>;

/**
 * Known heating-type literals derived from heating config plus energy config.
 *
 * @group Heating
 */
export type HeatingTypeFromConfigs<
  THeatingConfig extends HeatingConfig,
  TEnergyConfig extends Readonly<{
    generationFactorByHeatingType: Readonly<Record<string, readonly unknown[]>>;
  }>,
> = LiteralUnion<
  | Extract<THeatingConfig["noActionTypes"][number], string>
  | Extract<THeatingConfig["directReplaceTypes"][number], string>
  | Extract<THeatingConfig["replacementByCarrier"][keyof THeatingConfig["replacementByCarrier"]], string>
  | Extract<NonNullable<THeatingConfig["rules"]>[number]["preferredReplacement"], string>
  | Extract<keyof TEnergyConfig["generationFactorByHeatingType"], string>
>;

/**
 * Input payload for heating evaluation.
 *
 * @group Heating
 */
export type HeatingInput<THeatingType extends string = string> = Readonly<{
  mode: HeatingMode;
  primaryCarrier: EnergyCarrier;
  primaryType: THeatingType;
  yearOfConstruction?: number;
  secondaryCarrier?: EnergyCarrier;
  secondaryType?: THeatingType;
  details?: HeatingDetails;
}>;

/**
 * Action set returned by heating recommendation logic.
 *
 * @group Heating
 */
export type HeatingRecommendationAction = "none" | "optimize" | "replace";

/**
 * Heating recommendation payload.
 *
 * @group Heating
 */
export type HeatingRecommendation<THeatingType extends string = string> = Readonly<{
  action: HeatingRecommendationAction;
  reason: string;
  preferredReplacement?: THeatingType;
}>;

/**
 * Optional LOD2/LOD3 metadata for heating-system assessment.
 *
 * @group Heating
 */
export type HeatingDetails = Readonly<{
  annualConsumptionKWh?: number;
  controlType?: string;
  emitterType?: string;
  flowTemperatureC?: number;
  generatorPowerKw?: number;
  pumpType?: string;
  districtAssignment?: string;
  radiatorPosition?: string;
  intermittentOperation?: boolean;
  singleRoomControlType?: string;
  pvAvailable?: boolean;
  pvPossible?: boolean;
  districtHeatingAvailable?: boolean;
  gasConnectionAvailable?: boolean;
  floorHeatingPlanned?: boolean;
  fuelStorageAvailable?: boolean;
  fuelStoragePossible?: boolean;
  renovationRequested?: boolean;
  attributes?: Readonly<Record<string, RuleValue>>;
}>;

/**
 * Configurable rule for detailed heating recommendations.
 *
 * @group Heating
 */
export type HeatingRecommendationRule<THeatingType extends string = string> = Readonly<{
  conditions?: readonly RuleCondition[];
  action: HeatingRecommendationAction;
  reason: string;
  preferredReplacement?: THeatingType;
  useCarrierReplacement?: boolean;
}>;

/**
 * Runtime heating-domain configuration.
 *
 * @group Heating
 */
export type HeatingConfig<THeatingType extends string = string> = Readonly<{
  referenceYear: number;
  replaceAfterYears: number;
  optimizeAfterYears: number;
  noActionTypes: readonly THeatingType[];
  directReplaceTypes: readonly THeatingType[];
  replacementByCarrier: Readonly<Record<EnergyCarrier, THeatingType>>;
  rules?: readonly HeatingRecommendationRule<THeatingType>[];
}>;

/**
 * Heating evaluation result.
 *
 * @group Heating
 */
export type HeatingResult<THeatingType extends string = string> = Readonly<{
  ageYears?: number;
  recommendation: HeatingRecommendation<THeatingType>;
}>;
