import { DEFAULT_CONFIG } from "../types/config/default-config.js";
import { validateConfig } from "./config.js";
import type { ValidationIssue, ValidationResult } from "./types.js";
import type { DETConfig } from "../types/config/index.js";

export type ConfigMigrator = {
  id: string;
  canFix: (issue: ValidationIssue) => boolean;
  migrate: (raw: unknown) => unknown;
};

const addRecommendedForSystems: ConfigMigrator = {
  id: "add-recommended-for-systems",
  canFix: (issue) =>
    /^renovation\.heatingSurfaceRenovations\.\d+\.recommendedForSystems$/.test(
      issue.path,
    ),
  migrate: (raw) => {
    const config = raw as Record<string, unknown>;
    const systemTypes: string[] =
      (config?.heat as any)?.heatingSystemTypes?.map((s: any) => s.value) ?? [];
    const hsr = (config?.renovation as any)?.heatingSurfaceRenovations;
    if (!Array.isArray(hsr)) return raw;
    return {
      ...config,
      renovation: {
        ...(config.renovation as object),
        heatingSurfaceRenovations: hsr.map((entry: any) => {
          if (entry.recommendedForSystems != null) return entry;
          const defaultEntry =
            DEFAULT_CONFIG.renovation.heatingSurfaceRenovations.find(
              (d) => d.targetSurfaceType === entry.targetSurfaceType,
            );
          return {
            ...entry,
            recommendedForSystems: defaultEntry
              ? defaultEntry.recommendedForSystems.filter((s) =>
                  systemTypes.includes(s),
                )
              : [],
          };
        }),
      },
    };
  },
};

const migrators: ConfigMigrator[] = [addRecommendedForSystems];

export function detectMigrations(
  _raw: unknown,
  issues: ValidationIssue[],
): ConfigMigrator[] {
  const applicable = new Set<ConfigMigrator>();
  for (const issue of issues) {
    const migrator = migrators.find((m) => m.canFix(issue));
    if (migrator == null) return [];
    applicable.add(migrator);
  }
  return Array.from(applicable);
}

export type ValidateAndMigrateResult =
  | { success: true; data: DETConfig; migrated: boolean }
  | { success: false; issues: ValidationIssue[]; migrated: boolean };

export function validateAndMigrate(raw: unknown): ValidateAndMigrateResult {
  const result = validateConfig(raw);
  if (result.success) return { ...result, migrated: false };
  const applicable = detectMigrations(raw, result.issues);
  if (applicable.length === 0) return { ...result, migrated: false };
  const fixed = applicable.reduce((acc, m) => m.migrate(acc), raw);
  return { ...validateConfig(fixed), migrated: true };
}
