export type RuleValue = string | number | boolean;

/**
 * Generic rule condition evaluated against a calculation input context.
 *
 * `field` supports dot-notation paths such as `details.insulationPresent`
 * or `ageYears`.
 *
 * @group Shared
 */
export type RuleCondition = Readonly<{
  field: string;
  equals?: RuleValue;
  notEquals?: RuleValue;
  oneOf?: readonly RuleValue[];
  min?: number;
  max?: number;
  exists?: boolean;
}>;

/**
 * Returns whether all configured rule conditions match the provided context.
 *
 * @param context - Arbitrary object used as rule-evaluation context.
 * @param conditions - Optional ordered list of conditions.
 * @returns `true` if all conditions match.
 * @group Shared
 */
export function matchesRuleConditions(context: unknown, conditions: readonly RuleCondition[] | undefined): boolean {
  if (!conditions || conditions.length === 0) {
    return true;
  }

  return conditions.every((condition) => matchesCondition(context, condition));
}

function matchesCondition(context: unknown, condition: RuleCondition): boolean {
  const value = getPathValue(context, condition.field);

  if (condition.exists !== undefined && (value !== undefined) !== condition.exists) {
    return false;
  }

  if (condition.equals !== undefined && value !== condition.equals) {
    return false;
  }

  if (condition.notEquals !== undefined && value === condition.notEquals) {
    return false;
  }

  if (condition.oneOf !== undefined && !condition.oneOf.some((entry) => entry === value)) {
    return false;
  }

  if (condition.min !== undefined) {
    if (typeof value !== "number" || value < condition.min) {
      return false;
    }
  }

  if (condition.max !== undefined) {
    if (typeof value !== "number" || value > condition.max) {
      return false;
    }
  }

  return true;
}

function getPathValue(context: unknown, field: string): unknown {
  const segments = field.split(".");
  let current: unknown = context;

  for (const segment of segments) {
    if (!isRecord(current) || !(segment in current)) {
      return undefined;
    }
    current = current[segment];
  }

  return current;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}
