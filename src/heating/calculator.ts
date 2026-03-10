import type { HeatingConfig, HeatingInput, HeatingResult, HeatingTypeFromConfig } from "./types";
import { matchesRuleConditions } from "../shared/rule-conditions";

/**
 * Evaluates heating-system recommendation status based on configured rule thresholds.
 *
 * Rule precedence:
 * 1. `noActionTypes`
 * 2. `directReplaceTypes`
 * 3. age-based replace threshold
 * 4. age-based optimize threshold
 * 5. default no-action
 *
 * @param input - Heating system input.
 * @param config - Heating recommendation configuration.
 * @returns Heating evaluation result with recommendation.
 * @group Heating
 */
export function calculateHeating<TConfig extends HeatingConfig>(
  input: HeatingInput<HeatingTypeFromConfig<TConfig>>,
  config: TConfig,
): HeatingResult<HeatingTypeFromConfig<TConfig>> {
  const ageYears = input.yearOfConstruction ? config.referenceYear - input.yearOfConstruction : undefined;
  const contextualInput: Record<string, unknown> = {
    ...input,
    ...(ageYears !== undefined ? { ageYears } : {}),
  };

  const configuredRecommendation = evaluateConfiguredRecommendation(contextualInput, input, config);
  if (configuredRecommendation) {
    return {
      ...(ageYears !== undefined ? { ageYears } : {}),
      recommendation: configuredRecommendation,
    };
  }

  if (includes(config.noActionTypes, input.primaryType)) {
    return {
      ...(ageYears !== undefined ? { ageYears } : {}),
      recommendation: {
        action: "none",
        reason: "System type has no renovation requirement based on configured rules.",
      },
    };
  }

  if (includes(config.directReplaceTypes, input.primaryType)) {
    return {
      ...(ageYears !== undefined ? { ageYears } : {}),
      recommendation: {
        action: "replace",
        reason: "Direct electric/inefficient system type, replacement is recommended.",
        preferredReplacement: config.replacementByCarrier[input.primaryCarrier],
      },
    };
  }

  if (ageYears !== undefined && ageYears >= config.replaceAfterYears) {
    return {
      ageYears,
      recommendation: {
        action: "replace",
        reason: `System age is ${ageYears} years (>= ${config.replaceAfterYears}).`,
        preferredReplacement: config.replacementByCarrier[input.primaryCarrier],
      },
    };
  }

  if (ageYears !== undefined && ageYears >= config.optimizeAfterYears) {
    return {
      ageYears,
      recommendation: {
        action: "optimize",
        reason: `System age is ${ageYears} years (>= ${config.optimizeAfterYears}).`,
      },
    };
  }

  return {
    ...(ageYears !== undefined ? { ageYears } : {}),
    recommendation: {
      action: "none",
      reason: "No immediate renovation need based on age rules.",
    },
  };
}

function evaluateConfiguredRecommendation<TConfig extends HeatingConfig>(
  context: Readonly<Record<string, unknown>>,
  input: HeatingInput<HeatingTypeFromConfig<TConfig>>,
  config: TConfig,
): HeatingResult<HeatingTypeFromConfig<TConfig>>["recommendation"] | undefined {
  if (!config.rules || config.rules.length === 0) {
    return undefined;
  }

  for (const rule of config.rules) {
    if (!matchesRuleConditions(context, rule.conditions)) {
      continue;
    }

    const preferredReplacement = resolvePreferredReplacement(
      rule.preferredReplacement,
      rule.useCarrierReplacement,
      input,
      config,
    );

    return {
      action: rule.action,
      reason: rule.reason,
      ...(preferredReplacement !== undefined ? { preferredReplacement } : {}),
    };
  }

  return undefined;
}

function resolvePreferredReplacement<TConfig extends HeatingConfig>(
  preferredReplacement: HeatingTypeFromConfig<TConfig> | undefined,
  useCarrierReplacement: boolean | undefined,
  input: HeatingInput<HeatingTypeFromConfig<TConfig>>,
  config: TConfig,
): HeatingTypeFromConfig<TConfig> | undefined {
  if (preferredReplacement !== undefined) {
    return preferredReplacement;
  }

  if (useCarrierReplacement) {
    return config.replacementByCarrier[input.primaryCarrier];
  }

  return undefined;
}

/**
 * Returns whether a string exists in a readonly string list.
 *
 * @param list - Candidate list.
 * @param value - Lookup value.
 * @returns `true` if the value is present.
 */
function includes(list: readonly string[], value: string): boolean {
  return list.some((item) => item === value);
}
