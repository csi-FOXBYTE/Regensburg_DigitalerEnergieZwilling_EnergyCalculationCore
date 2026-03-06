import type { AgeRecommendationRule, EnvelopeRecommendation } from "./types";

/**
 * Evaluates age-based recommendation rules for a single envelope component.
 *
 * Rules are evaluated in array order and the first matching rule is returned.
 *
 * @param component - Component identifier used in the result.
 * @param ageYears - Component age in years.
 * @param rules - Ordered age-based recommendation rules.
 * @returns Matching recommendation or `undefined` if no rule applies.
 * @group Envelope
 */
export function evaluateAgeRecommendation(
  component: string,
  ageYears: number | undefined,
  rules: readonly AgeRecommendationRule[],
): EnvelopeRecommendation | undefined {
  if (ageYears === undefined) {
    return undefined;
  }

  for (const rule of rules) {
    const minOk = rule.minAge === undefined || ageYears >= rule.minAge;
    const maxOk = rule.maxAge === undefined || ageYears <= rule.maxAge;
    if (minOk && maxOk) {
      return {
        component,
        action: rule.action,
        reason: rule.reason,
        ...(rule.targetUValue !== undefined ? { targetUValue: rule.targetUValue } : {}),
      };
    }
  }

  return undefined;
}
