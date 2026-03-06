import type { HeatingConfig, HeatingInput, HeatingResult } from "./types";

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
export function calculateHeating(input: HeatingInput, config: HeatingConfig): HeatingResult {
  const ageYears = input.yearOfConstruction ? config.referenceYear - input.yearOfConstruction : undefined;

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
