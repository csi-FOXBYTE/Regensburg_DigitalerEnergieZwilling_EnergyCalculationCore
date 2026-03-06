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
 * Input payload for heating evaluation.
 *
 * @group Heating
 */
export type HeatingInput = Readonly<{
  mode: HeatingMode;
  primaryCarrier: EnergyCarrier;
  primaryType: string;
  yearOfConstruction?: number;
  secondaryType?: string;
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
export type HeatingRecommendation = Readonly<{
  action: HeatingRecommendationAction;
  reason: string;
  preferredReplacement?: string;
}>;

/**
 * Runtime heating-domain configuration.
 *
 * @group Heating
 */
export type HeatingConfig = Readonly<{
  referenceYear: number;
  replaceAfterYears: number;
  optimizeAfterYears: number;
  noActionTypes: readonly string[];
  directReplaceTypes: readonly string[];
  replacementByCarrier: Readonly<Record<EnergyCarrier, string>>;
}>;

/**
 * Heating evaluation result.
 *
 * @group Heating
 */
export type HeatingResult = Readonly<{
  ageYears?: number;
  recommendation: HeatingRecommendation;
}>;
