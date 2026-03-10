import type { AgeRecommendationRule, EnvelopeRecommendation } from "./types";
import { matchesRuleConditions } from "../shared/rule-conditions";

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
  context: Readonly<Record<string, unknown>>,
  rules: readonly AgeRecommendationRule[],
): EnvelopeRecommendation | undefined {
  const ageYears = typeof context.ageYears === "number" ? context.ageYears : undefined;

  for (const rule of rules) {
    const minOk = rule.minAge === undefined || (ageYears !== undefined && ageYears >= rule.minAge);
    const maxOk = rule.maxAge === undefined || (ageYears !== undefined && ageYears <= rule.maxAge);
    const conditionsOk = matchesRuleConditions(context, rule.conditions);
    if (minOk && maxOk && conditionsOk) {
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
