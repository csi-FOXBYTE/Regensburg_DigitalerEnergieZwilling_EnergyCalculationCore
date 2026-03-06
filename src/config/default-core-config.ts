import { coreConfigFromJson, type CoreConfigJson } from "./core-config-json";
import type { CoreConfig } from "../core/types";

/**
 * Default external JSON configuration used as project baseline.
 *
 * @group Configuration
 */
export const defaultCoreConfigJson: CoreConfigJson = {
  envelope: {
    defaultFactor: 1,
    defaultDeltaUwb: 0.1,
    yearBandLayout: [
      { to: 1918 },
      { from: 1919, to: 1948 },
      { from: 1949, to: 1957 },
      { from: 1958, to: 1968 },
      { from: 1969, to: 1978 },
      { from: 1979, to: 1983 },
      { from: 1984, to: 1994 },
      { from: 1995, to: 2001 },
      { from: 2002 },
    ],
    catalogs: {
      category1: {
        roof_massive: [2.1, 2.1, 2.1, 1.3, 1.3, 0.6, 0.4, 0.3, 0.2],
        roof_timber: [2.6, 1.4, 1.4, 1.4, 0.8, 0.7, 0.5, 0.3, 0.2],
        ogd_massive: [2.1, 2.1, 2.1, 2.1, 0.6, 0.6, 0.3, 0.3, 0.2],
        wall_over_20cm: [2.2, 2.2, 2.2, 1.4, 1.0, 0.8, 0.6, 0.5, 0.4],
        ugd_concrete: [1.6, 1.6, 2.3, 1.0, 1.0, 0.8, 0.6, 0.6, 0.5],
        ugd_timber: [1.0, 1.0, 1.0, 0.8, 0.6, 0.6, 0.4, 0.4, 0.4],
        window_wood_double: [3.0, 3.0, 3.0, 1.9, 1.9, 1.9, 1.9, 1.9, 1.5],
        window_pvc_iso: [4.3, 4.3, 3.2, 1.9, 1.9, 1.9, 1.9, 1.9, 1.5],
      },
    },
    recommendations: {
      roof: [
        { maxAge: 19, action: "none", reason: "Roof is younger than 20 years." },
        { minAge: 20, maxAge: 40, action: "insulate", reason: "Roof age is between 20 and 40 years.", targetUValue: 0.14 },
        { minAge: 41, action: "full_renovation", reason: "Roof is older than 40 years.", targetUValue: 0.14 },
      ],
      roofWindow: [
        { maxAge: 29, action: "none", reason: "Roof window is younger than 30 years." },
        { minAge: 30, action: "replace", reason: "Roof window is older than 30 years.", targetUValue: 1.0 },
      ],
      wall: [
        { maxAge: 29, action: "none", reason: "External wall has low short-term renovation need." },
        { minAge: 30, maxAge: 50, action: "insulate", reason: "External wall age is between 30 and 50 years.", targetUValue: 0.2 },
        { minAge: 51, action: "full_renovation", reason: "External wall is older than 50 years.", targetUValue: 0.2 },
      ],
      wallWindow: [
        { maxAge: 29, action: "none", reason: "Window is younger than 30 years." },
        { minAge: 30, action: "replace", reason: "Window is older than 30 years.", targetUValue: 0.95 },
      ],
      ogd: [
        { maxAge: 39, action: "none", reason: "Top floor ceiling is younger than 40 years." },
        { minAge: 40, action: "insulate", reason: "Top floor ceiling insulation is recommended.", targetUValue: 0.14 },
      ],
      ugd: [
        { maxAge: 39, action: "none", reason: "Bottom floor/slab is younger than 40 years." },
        { minAge: 40, action: "insulate", reason: "Bottom floor/slab insulation is recommended.", targetUValue: 0.25 },
      ],
    },
  },
  heating: {
    referenceYear: 2026,
    optimizeAfterYears: 15,
    replaceAfterYears: 25,
    noActionTypes: [
      "pellet_boiler",
      "log_wood_boiler",
      "air_water_heat_pump",
      "water_water_heat_pump",
      "ground_source_heat_pump",
      "district_heating",
    ],
    directReplaceTypes: ["direct_electric_heating", "standard_boiler_oil", "standard_boiler_gas"],
    replacementByCarrier: {
      oil: "air_water_heat_pump",
      gas: "air_water_heat_pump",
      biomass: "pellet_boiler",
      electricity: "air_water_heat_pump",
      district_heating: "district_heating",
      other: "air_water_heat_pump",
    },
  },
};

/**
 * Normalized runtime configuration derived from {@link defaultCoreConfigJson}.
 *
 * @group Configuration
 */
export const defaultCoreConfig: CoreConfig = coreConfigFromJson(defaultCoreConfigJson);
