import type { DETConfig } from "../config";
import { isCarrierCompatible } from "../config/heat";
import type { DETInput } from "../input";
import type { RangeKey, RangeLast } from "../range-bands";
import { insulationKeys } from "./renovation";
import type {
  InputPatch,
  InsulationRenovationKeys,
  Renovation,
} from "./renovation";
import { DETEnergyCaluclator } from "../../calculators/energy/index.js";

function localizedValue(
  localization: Record<string, string>,
  locale: string,
  description: string,
): string {
  const value = localization[locale];
  if (value == null) {
    throw new Error(`Translation for ${description} did not exist for locale ${locale}`);
  }
  return value;
}

function generateHeatingRenovationLabel(
  config: DETConfig,
  locale: string,
  currentCarrier: string,
  currentSystem: string,
  targetCarrier: string,
  targetSystem: string,
): string {
  const templates = config.renovation.heatingRenovationLabelTemplates;
  const carrierChanged = targetCarrier !== currentCarrier;
  const systemChanged = targetSystem !== currentSystem;
  const templateLocalization = carrierChanged && systemChanged
    ? templates.carrierAndSystem
    : carrierChanged
      ? templates.carrierOnly
      : templates.systemOnly;
  const template = localizedValue(templateLocalization, locale, "heating renovation label template");
  const carrier = config.heat.primaryEnergyCarriers.find((entry) => entry.value === targetCarrier);
  const system = config.heat.heatingSystemTypes.find((entry) => entry.value === targetSystem);
  if (carrier == null || system == null) {
    throw new Error("Heating renovation references an unknown carrier or system");
  }
  const carrierLabel = localizedValue(carrier.localization, locale, `primary energy carrier ${targetCarrier}`);
  const systemLabel = localizedValue(system.localization, locale, `heating system ${targetSystem}`);
  return template.replaceAll("{{carrier}}", carrierLabel).replaceAll("{{system}}", systemLabel);
}

function isYearInRange(
  year: number | RangeKey | null | undefined,
  range: RangeKey,
): boolean {
  if (year == null) return false;
  const rangeFrom = range.from ?? -Infinity;
  const rangeTo = range.to ?? Infinity;
  if (typeof year === "number") {
    return year >= rangeFrom && year <= rangeTo;
  }
  const yearFrom = year.from ?? -Infinity;
  const yearTo = year.to ?? Infinity;
  return yearFrom <= rangeTo && yearTo >= rangeFrom;
}

function isInsulationRecommended(
  key: InsulationRenovationKeys,
  config: DETConfig,
  input: DETInput,
): boolean {
  const { recommendYearRange } = config.renovation.insulationRenovations[key];
  switch (key) {
    case "roof":
      if (input.roof.hasInsulation === true) return false;
      return isYearInRange(input.roof.year, recommendYearRange);
    case "topFloor":
      if (input.topFloor.hasInsulation === true) return false;
      return isYearInRange(input.topFloor.year, recommendYearRange);
    case "bottomFloor":
      if (input.bottomFloor.hasInsulation === true) return false;
      return isYearInRange(input.bottomFloor.year, recommendYearRange);
    case "outerWalls":
      if (input.outerWall.hasInsulation === true) return false;
      return isYearInRange(input.outerWall.year, recommendYearRange);
    case "outerWindows":
      return isYearInRange(input.exteriorWallWindows.year, recommendYearRange);
    case "roofWindows":
      return isYearInRange(input.roofWindows.year, recommendYearRange);
  }
}

export function generateHeatingRenovations(
  config: DETConfig,
  input: DETInput,
  locale: string,
  systemRenewalLabel?: string,
): Renovation[] {
  const renovations: Renovation[] = [];
  const lastYearBand = config.general.generalYearBands[
    config.general.generalYearBands.length - 1
  ] as RangeLast;
  const ctx = DETEnergyCaluclator({ config, input });
  const currentCarrierValue = ctx.get("primaryEnergyCarrier");
  const currentSystemValue = ctx.get("heatingSystemType");
  if (systemRenewalLabel != null) {
    const currentCarrier = config.heat.primaryEnergyCarriers.find(
      (carrier) => carrier.value === currentCarrierValue,
    );
    const currentSystem = config.heat.heatingSystemTypes.find(
      (system) => system.value === currentSystemValue,
    );
    const excludeFromSystemRenewal =
      currentCarrier?.excludeFromSystemRenewal === true ||
      currentSystem?.excludeFromSystemRenewal === true;

    if (!excludeFromSystemRenewal) {
      renovations.push({
        id: "heat_renew",
        label: systemRenewalLabel,
        patch: { heat: { heatingSystemConstructionYear: lastYearBand } },
        recommended: false,
      });
    }
  }

  const currentCarrierIsTarget = config.renovation.primaryEnergyCarrierTargets.includes(
    currentCarrierValue,
  );

  const compatible = config.renovation.heatingRenovations.filter((hRenConf) => {
    if (hRenConf.targetCarrier === currentCarrierValue && hRenConf.targetSystem === currentSystemValue) return false;
    const carrier = config.heat.primaryEnergyCarriers.find(
      (c) => c.value === hRenConf.targetCarrier,
    );
    return carrier != null && isCarrierCompatible(carrier, input);
  });

  const highestPriority = currentCarrierIsTarget
    ? Math.min(...compatible.map((r) => r.priority))
    : Infinity;

  for (const hRenConf of compatible) {
    const label = generateHeatingRenovationLabel(
      config,
      locale,
      currentCarrierValue,
      currentSystemValue,
      hRenConf.targetCarrier,
      hRenConf.targetSystem,
    );
    renovations.push({
      id: `heat_${hRenConf.targetCarrier}_${hRenConf.targetSystem}`,
      label,
      patch: {
        heat: {
          primaryEnergyCarrier: hRenConf.targetCarrier,
          heatingSystemType: hRenConf.targetSystem,
          heatingSystemConstructionYear: lastYearBand,
        },
      },
      recommended: hRenConf.priority === highestPriority,
    });
  }
  return renovations;
}

function makeInsulationRenovation(
  key: InsulationRenovationKeys,
  config: DETConfig,
  ctx: ReturnType<typeof DETEnergyCaluclator>,
  input: DETInput,
  lastYearBand: RangeLast,
): { patch: InputPatch; recommended: boolean } {
  const targetUValue = config.renovation.insulationRenovations[key].uValue;
  switch (key) {
    case "roof":
      if (ctx.get("roofUValue") <= targetUValue) return { patch: {}, recommended: false };
      return { patch: { roof: { uValue: targetUValue, year: lastYearBand } }, recommended: isInsulationRecommended(key, config, input) };
    case "topFloor":
      if (ctx.get("topFloorUValue") <= targetUValue) return { patch: {}, recommended: false };
      return { patch: { topFloor: { uValue: targetUValue, year: lastYearBand } }, recommended: isInsulationRecommended(key, config, input) };
    case "bottomFloor":
      if (ctx.get("bottomFloorUValue") <= targetUValue) return { patch: {}, recommended: false };
      return { patch: { bottomFloor: { uValue: targetUValue, year: lastYearBand } }, recommended: isInsulationRecommended(key, config, input) };
    case "outerWalls":
      if (ctx.get("outerWallUValue") <= targetUValue) return { patch: {}, recommended: false };
      return { patch: { outerWall: { uValue: targetUValue, year: lastYearBand } }, recommended: isInsulationRecommended(key, config, input) };
    case "outerWindows":
      if (ctx.get("exteriorWallWindowsUValue") <= targetUValue) return { patch: {}, recommended: false };
      return { patch: { exteriorWallWindows: { uValue: targetUValue, year: lastYearBand } }, recommended: isInsulationRecommended(key, config, input) };
    case "roofWindows":
      if (ctx.get("roofWindowsUValue") <= targetUValue) return { patch: {}, recommended: false };
      return { patch: { roofWindows: { uValue: targetUValue, year: lastYearBand } }, recommended: isInsulationRecommended(key, config, input) };
  }
}

export function generateInsulationRenovations(
  config: DETConfig,
  input: DETInput,
  translate: (key: InsulationRenovationKeys) => string,
): Renovation[] {
  const renovations: Renovation[] = [];
  const lastYearBand = config.general.generalYearBands[
    config.general.generalYearBands.length - 1
  ] as RangeLast;
  const ctx = DETEnergyCaluclator({ config, input });
  const isSpaceBelowRoofHeated = ctx.get("isSpaceBelowRoofHeated");
  for (const key of insulationKeys) {
    if (key === "roof" && !isSpaceBelowRoofHeated) continue;
    if (key === "topFloor" && isSpaceBelowRoofHeated) continue;
    const { patch, recommended } = makeInsulationRenovation(key, config, ctx, input, lastYearBand);
    const label = translate(key);
    renovations.push({ id: `envelope_${key}`, patch, label, recommended });
  }
  return renovations;
}

export function generateHeatingSurfaceRenovations(
  config: DETConfig,
  input: DETInput,
  locale: string,
): Renovation[] {
  const currentSystem = input.heat.heatingSystemType ?? "";
  const currentSurfaceIsRecommended = config.renovation.heatingSurfaceRenovations.some(
    (r) => r.targetSurfaceType === input.heat.heatingSurfaceType && r.recommendedForSystems.includes(currentSystem),
  );
  const renovations: Renovation[] = [];
  for (const hRenConf of config.renovation.heatingSurfaceRenovations) {
    if (hRenConf.targetSurfaceType === input.heat.heatingSurfaceType) continue;
    const label = hRenConf.localization[locale];
    if (label == null) {
      throw new Error(
        "Translation for heat renovation did not exist for locale " + locale,
      );
    }
    renovations.push({
      id: `surface_${hRenConf.targetSurfaceType}`,
      label,
      patch: { heat: { heatingSurfaceType: hRenConf.targetSurfaceType } },
      recommended: !currentSurfaceIsRecommended && hRenConf.recommendedForSystems.includes(currentSystem),
    });
  }
  return renovations;
}
