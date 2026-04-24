import type { DETConfig } from "../config";
import { isCarrierCompatible } from "../config/heat";
import type { DETInput } from "../input";
import type { RangeLast } from "../range-bands";
import { insulationKeys } from "./renovation";
import type {
  InputPatch,
  InsulationRenovationKeys,
  Renovation,
} from "./renovation";

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
      label: systemRenewalLabel,
      patch: { heat: { heatingSystemConstructionYear: lastYearBand } },
    });
  }

  for (const hRenConf of config.renovation.heatingRenovations) {
    const carrier = config.heat.primaryEnergyCarriers.find(
      (c) => c.value === hRenConf.targetCarrier,
    );
    if (carrier == null || !isCarrierCompatible(carrier, input)) continue;
    const label = hRenConf.localization[locale];
    if (label == null) {
      throw new Error(
        "Translation for heat renovation did not exist for locale " + locale,
      );
    }
    renovations.push({
      label,
      patch: {
        heat: {
          primaryEnergyCarrier: hRenConf.targetCarrier,
          heatingSystemType: hRenConf.targetSystem,
          heatingSystemConstructionYear: lastYearBand,
        },
      },
    });
  }
  return renovations;
}

function makeInsulationPatch(
  key: InsulationRenovationKeys,
  config: DETConfig,
): InputPatch {
  const uValue = config.renovation.insulationRenovations[key].uValue;
  let patch: InputPatch;
  switch (key) {
    case "roof":
      patch = { roof: { uValue } };
      break;
    case "topFloor":
      patch = { topFloor: { uValue } };
      break;
    case "bottomFloor":
      patch = { bottomFloor: { uValue } };
      break;
    case "outerWalls":
      patch = { outerWall: { uValue } };
      break;
    case "outerWindows":
      patch = { exteriorWallWindows: { uValue } };
      break;
    case "roofWindows":
      patch = { roofWindows: { uValue } };
      break;
  }
  return patch;
}

export function generateInsulationRenovations(
  config: DETConfig,
  translate: (key: InsulationRenovationKeys) => string,
): Renovation[] {
  const renovations: Renovation[] = [];
  for (const key of insulationKeys) {
    const patch = makeInsulationPatch(key, config);
    const label = translate(key);
    renovations.push({ patch, label });
  }
  return renovations;
}

export function generateHeatingSurfaceRenovations(
  config: DETConfig,
  locale: string,
): Renovation[] {
  const renovations: Renovation[] = [];
  for (const hRenConf of config.renovation.heatingSurfaceRenovations) {
    const label = hRenConf.localization[locale];
    if (label == null) {
      throw new Error(
        "Translation for heat renovation did not exist for locale " + locale,
      );
    }
    renovations.push({
      label,
      patch: {
        heat: {
          heatingSurfaceType: hRenConf.targetSurfaceType,
        },
      },
    });
  }
  return renovations;
}
