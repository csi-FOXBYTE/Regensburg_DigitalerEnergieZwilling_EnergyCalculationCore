import type { ZodError } from "zod";

export type ValidationIssue = { path: string; message: string };

export type ValidationResult<T> =
  | { success: true; data: T }
  | { success: false; issues: ValidationIssue[] };

export function mapZodError(error: ZodError): ValidationIssue[] {
  return error.errors.map((issue) => ({
    path: issue.path.join("."),
    message: issue.message,
  }));
}
