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
      return isYearInRange(input.roof.year, recommendYearRange) || input.roof.hasInsulation === false;
    case "topFloor":
      if (input.topFloor.hasInsulation === true) return false;
      return isYearInRange(input.topFloor.year, recommendYearRange) || input.topFloor.hasInsulation === false;
    case "bottomFloor":
      if (input.bottomFloor.hasInsulation === true) return false;
      return isYearInRange(input.bottomFloor.year, recommendYearRange) || input.bottomFloor.hasInsulation === false;
    case "outerWalls":
      if (input.outerWall.hasInsulation === true) return false;
      return isYearInRange(input.outerWall.year, recommendYearRange) || input.outerWall.hasInsulation === false;
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
  if (systemRenewalLabel != null) {
    renovations.push({
      id: "heat_renew",
      label: systemRenewalLabel,
      patch: { heat: { heatingSystemConstructionYear: lastYearBand } },
      recommended: false,
    });
  }

  const currentCarrierIsTarget = config.renovation.primaryEnergyCarrierTargets.includes(
    input.heat.primaryEnergyCarrier ?? "",
  );

  const compatible = config.renovation.heatingRenovations.filter((hRenConf) => {
    const carrier = config.heat.primaryEnergyCarriers.find(
      (c) => c.value === hRenConf.targetCarrier,
    );
    return carrier != null && isCarrierCompatible(carrier, input);
  });

  const highestPriority = currentCarrierIsTarget
    ? Math.min(...compatible.map((r) => r.priority))
    : Infinity;

  for (const hRenConf of compatible) {
    const label = hRenConf.localization[locale];
    if (label == null) {
      throw new Error(
        "Translation for heat renovation did not exist for locale " + locale,
      );
    }
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
  for (const key of insulationKeys) {
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
      patch: {
        heat: {
          heatingSurfaceType: hRenConf.targetSurfaceType,
        },
      },
      recommended: false,
    });
  }
  return renovations;
}
