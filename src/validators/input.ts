import { DETInputSchema } from "../types/input/index.js";
import type { DETInput } from "../types/input/index.js";
import type { DETConfig } from "../types/config/index.js";
import { mapZodError, type ValidationIssue, type ValidationResult } from "./types.js";

export function validateInput(data: unknown, config: DETConfig): ValidationResult<DETInput> {
  const result = DETInputSchema.safeParse(data);
  if (!result.success) {
    return { success: false, issues: mapZodError(result.error) };
  }

  const input = result.data;
  const { heat, roof, topFloor, outerWall, bottomFloor, windows } = config;
  const issues: ValidationIssue[] = [];

  const carrierValues = heat.primaryEnergyCarriers.map((c) => c.value);
  const systemTypeValues = heat.heatingSystemTypes.map((s) => s.value);
  const surfaceTypeValues = heat.heatingSurfaceTypes.map((s) => s.value);
  const electricityTypeValues = heat.electricityTypes.map((e) => e.value);
  const roofConstructionTypeValues = roof.constructionTypes.map((c) => c.value);
  const topFloorTypeValues = topFloor.topFloorTypes.map((t) => t.value);
  const outerWallConstructionTypeValues = outerWall.constructionTypes.map((c) => c.value);
  const bottomFloorConstructionTypeValues = bottomFloor.constructionTypes.map((c) => c.value);
  const windowTypeValues = windows.windowTypes.map((w) => w.value);

  // ── Heat cross-checks ─────────────────────────────────────────────────────────

  if (input.heat.primaryEnergyCarrier != null && !carrierValues.includes(input.heat.primaryEnergyCarrier)) {
    issues.push({ path: "heat.primaryEnergyCarrier", message: `primaryEnergyCarrier "${input.heat.primaryEnergyCarrier}" is not in config.heat.primaryEnergyCarriers` });
  }

  if (input.heat.heatingSystemType != null && !systemTypeValues.includes(input.heat.heatingSystemType)) {
    issues.push({ path: "heat.heatingSystemType", message: `heatingSystemType "${input.heat.heatingSystemType}" is not in config.heat.heatingSystemTypes` });
  }

  if (input.heat.heatingSystemType != null && input.heat.primaryEnergyCarrier != null) {
    const entry = heat.allowedHeatingSystemTypesByCarrier.find((e) => e.key === input.heat.primaryEnergyCarrier);
    if (entry != null && !entry.allowedValues.includes(input.heat.heatingSystemType)) {
      issues.push({ path: "heat.heatingSystemType", message: `heatingSystemType "${input.heat.heatingSystemType}" is not allowed for carrier "${input.heat.primaryEnergyCarrier}"` });
    }
  }

  if (input.heat.heatingSurfaceType != null && !surfaceTypeValues.includes(input.heat.heatingSurfaceType)) {
    issues.push({ path: "heat.heatingSurfaceType", message: `heatingSurfaceType "${input.heat.heatingSurfaceType}" is not in config.heat.heatingSurfaceTypes` });
  }

  // ── Electricity cross-checks ──────────────────────────────────────────────────

  if (input.electricity.electricityType != null && !electricityTypeValues.includes(input.electricity.electricityType)) {
    issues.push({ path: "electricity.electricityType", message: `electricityType "${input.electricity.electricityType}" is not in config.heat.electricityTypes` });
  }

  // ── Pre-renovation cross-checks ───────────────────────────────────────────────

  const pre = input.preRenovationValues;
  if (pre != null) {
    if (!carrierValues.includes(pre.primaryEnergyCarrier)) {
      issues.push({ path: "preRenovationValues.primaryEnergyCarrier", message: `preRenovationValues.primaryEnergyCarrier "${pre.primaryEnergyCarrier}" is not in config.heat.primaryEnergyCarriers` });
    }
    if (!systemTypeValues.includes(pre.heatingSystemType)) {
      issues.push({ path: "preRenovationValues.heatingSystemType", message: `preRenovationValues.heatingSystemType "${pre.heatingSystemType}" is not in config.heat.heatingSystemTypes` });
    }
  }

  // ── Component cross-checks ────────────────────────────────────────────────────

  if (input.roof.constructionType != null && !roofConstructionTypeValues.includes(input.roof.constructionType)) {
    issues.push({ path: "roof.constructionType", message: `roof.constructionType "${input.roof.constructionType}" is not in config.roof.constructionTypes` });
  }

  if (input.topFloor.topFloorType != null && !topFloorTypeValues.includes(input.topFloor.topFloorType)) {
    issues.push({ path: "topFloor.topFloorType", message: `topFloor.topFloorType "${input.topFloor.topFloorType}" is not in config.topFloor.topFloorTypes` });
  }

  if (input.outerWall.constructionType != null && !outerWallConstructionTypeValues.includes(input.outerWall.constructionType)) {
    issues.push({ path: "outerWall.constructionType", message: `outerWall.constructionType "${input.outerWall.constructionType}" is not in config.outerWall.constructionTypes` });
  }

  if (input.bottomFloor.constructionType != null && !bottomFloorConstructionTypeValues.includes(input.bottomFloor.constructionType)) {
    issues.push({ path: "bottomFloor.constructionType", message: `bottomFloor.constructionType "${input.bottomFloor.constructionType}" is not in config.bottomFloor.constructionTypes` });
  }

  if (input.exteriorWallWindows.windowType != null && !windowTypeValues.includes(input.exteriorWallWindows.windowType)) {
    issues.push({ path: "exteriorWallWindows.windowType", message: `exteriorWallWindows.windowType "${input.exteriorWallWindows.windowType}" is not in config.windows.windowTypes` });
  }

  if (input.roofWindows.windowType != null && !windowTypeValues.includes(input.roofWindows.windowType)) {
    issues.push({ path: "roofWindows.windowType", message: `roofWindows.windowType "${input.roofWindows.windowType}" is not in config.windows.windowTypes` });
  }

  if (issues.length > 0) {
    return { success: false, issues };
  }
  return { success: true, data: input };
}
