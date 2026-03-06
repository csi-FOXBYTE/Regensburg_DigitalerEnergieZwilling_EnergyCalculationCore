/**
 * Divides two numbers and returns `0` when the denominator is `0`.
 *
 * @param numerator - Dividend.
 * @param denominator - Divisor.
 * @returns Division result or `0` for zero denominator.
 * @group Shared
 */
export function safeDivide(numerator: number, denominator: number): number {
  if (denominator === 0) {
    return 0;
  }
  return numerator / denominator;
}
