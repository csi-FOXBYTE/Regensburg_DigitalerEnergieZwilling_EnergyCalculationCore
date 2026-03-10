import { yearBandsFromLayout } from "../catalogs/u-value";
import { coreConfigFromJson, type CoreConfigJson } from "./core-config-json";

const defaultEnvelopeYearBandLayout = [
  { to: 1918 },
  { from: 1919, to: 1948 },
  { from: 1949, to: 1957 },
  { from: 1958, to: 1968 },
  { from: 1969, to: 1978 },
  { from: 1979, to: 1983 },
  { from: 1984, to: 1994 },
  { from: 1995, to: 2001 },
  { from: 2002 },
] as const;

/**
 * Default external JSON configuration used as project baseline.
 *
 * @group Configuration
 */
export const defaultCoreConfigJson = {
  envelope: {
    defaultFactor: 1,
    defaultDeltaUwb: 0.1,
    componentDefaults: {
      roofWindow: { factor: 0.93 },
    },
    catalogs: {
      category1: {
        roof_massive: yearBandsFromLayout([2.1, 2.1, 2.1, 1.3, 1.3, 0.6, 0.4, 0.3, 0.2], defaultEnvelopeYearBandLayout),
        roof_timber: yearBandsFromLayout([2.6, 1.4, 1.4, 1.4, 0.8, 0.7, 0.5, 0.3, 0.2], defaultEnvelopeYearBandLayout),
        topFloorCeiling_massive: yearBandsFromLayout(
          [2.1, 2.1, 2.1, 2.1, 0.6, 0.6, 0.3, 0.3, 0.2],
          defaultEnvelopeYearBandLayout,
        ),
        wall_over_20cm: yearBandsFromLayout([2.2, 2.2, 2.2, 1.4, 1.0, 0.8, 0.6, 0.5, 0.4], defaultEnvelopeYearBandLayout),
        lowestFloor_concrete: yearBandsFromLayout(
          [1.6, 1.6, 2.3, 1.0, 1.0, 0.8, 0.6, 0.6, 0.5],
          defaultEnvelopeYearBandLayout,
        ),
        lowestFloor_timber: yearBandsFromLayout([1.0, 1.0, 1.0, 0.8, 0.6, 0.6, 0.4, 0.4, 0.4], defaultEnvelopeYearBandLayout),
        window_wood_double: [
          { to: 1978, value: 2.7 },
          { from: 1979, to: 1983, value: 2.7 },
          { from: 1984, to: 1994, value: 2.7 },
          { from: 1995, to: 2001, value: 1.6 },
          { from: 2002, value: 1.5 },
        ],
        window_pvc_iso: [
          { to: 1978, value: 3.0 },
          { from: 1979, to: 1983, value: 3.0 },
          { from: 1984, to: 1994, value: 3.0 },
          { from: 1995, to: 2001, value: 1.9 },
          { from: 2002, value: 1.5 },
        ],
      },
    },
    recommendations: {
      roof: [
        {
          maxAge: 19,
          action: "none",
          reason: "Roof is younger than 20 years and is treated as recently renovated.",
        },
        {
          minAge: 20,
          maxAge: 40,
          conditions: [{ field: "details.insulationPresent", equals: false }],
          action: "insulate",
          reason: "Roof is 20-40 years old and has no confirmed insulation.",
          targetUValue: 0.14,
        },
        {
          minAge: 20,
          maxAge: 40,
          action: "insulate",
          reason: "Roof is 20-40 years old; the concept recommends insulation to BEG EM level.",
          targetUValue: 0.14,
        },
        {
          minAge: 41,
          action: "full_renovation",
          reason: "Roof is older than 40 years and is treated as requiring full roof renovation.",
          targetUValue: 0.14,
        },
      ],
      roofWindow: [
        {
          maxAge: 29,
          action: "none",
          reason: "Roof window is younger than 30 years and is treated as a newer unit.",
        },
        {
          minAge: 30,
          action: "replace",
          reason: "Roof window is 30 years or older and should be replaced.",
          targetUValue: 1.0,
        },
      ],
      wall: [
        {
          conditions: [
            { field: "details.insulationPresent", equals: true },
            { field: "details.insulationAgeYears", max: 50 },
          ],
          action: "none",
          reason: "External wall is confirmed as insulated and the insulation age is at most 50 years.",
        },
        {
          conditions: [{ field: "details.insulationPresent", equals: false }],
          action: "insulate",
          reason: "External wall is confirmed as uninsulated and should receive facade insulation.",
          targetUValue: 0.2,
        },
        {
          conditions: [{ field: "details.insulationAgeYears", min: 51 }],
          action: "replace_insulation",
          reason: "Existing facade insulation is older than 50 years and should be replaced.",
          targetUValue: 0.2,
        },
        {
          maxAge: 39,
          action: "none",
          reason: "External wall is younger than 40 years and is treated as insulated in the concept fallback.",
        },
        {
          minAge: 40,
          maxAge: 50,
          action: "insulate",
          reason: "External wall is 40-50 years old and should be insulated to BEG EM level.",
          targetUValue: 0.2,
        },
        {
          minAge: 51,
          action: "full_renovation",
          reason: "External wall is older than 50 years and should be comprehensively renovated if no insulation status is known.",
          targetUValue: 0.2,
        },
      ],
      wallWindow: [
        {
          maxAge: 29,
          action: "none",
          reason: "Window is younger than 30 years and is treated as a newer unit.",
        },
        {
          minAge: 30,
          action: "replace",
          reason: "Window is 30 years or older and should be replaced.",
          targetUValue: 0.95,
        },
      ],
      topFloorCeiling: [
        {
          conditions: [
            { field: "details.insulationPresent", equals: true },
            { field: "details.insulationAgeYears", max: 40 },
          ],
          action: "none",
          reason: "Top floor ceiling is insulated and the insulation age is at most 40 years.",
        },
        {
          conditions: [{ field: "details.insulationPresent", equals: false }],
          action: "insulate",
          reason: "Top floor ceiling is not insulated and should be upgraded.",
          targetUValue: 0.14,
        },
        {
          conditions: [{ field: "details.insulationAgeYears", min: 41 }],
          action: "full_renovation",
          reason: "Top floor ceiling insulation is older than 40 years and should be renewed comprehensively.",
          targetUValue: 0.14,
        },
        {
          maxAge: 39,
          action: "none",
          reason: "Top floor ceiling is younger than 40 years in the age-based fallback.",
        },
        {
          minAge: 40,
          action: "insulate",
          reason: "Top floor ceiling should be insulated to BEG EM level.",
          targetUValue: 0.14,
        },
      ],
      lowestFloor: [
        {
          conditions: [{ field: "details.insulationPresent", equals: true }],
          action: "none",
          reason: "Bottom floor/slab is confirmed as insulated.",
        },
        {
          conditions: [{ field: "details.insulationPresent", equals: false }],
          action: "insulate",
          reason: "Bottom floor/slab is confirmed as uninsulated and should be upgraded.",
          targetUValue: 0.25,
        },
        {
          maxAge: 39,
          action: "none",
          reason: "Bottom floor/slab is younger than 40 years in the age-based fallback.",
        },
        {
          minAge: 40,
          action: "insulate",
          reason: "Bottom floor/slab insulation is recommended to BEG EM level.",
          targetUValue: 0.25,
        },
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
  energy: {
    usableAreaFactorFromVolume: 0.32,
    internalGainWattsPerM2: 5,
    heatingPeriodDays: 185,
    degreeDayFactorMultiplier: 0.024,
    ventilationCoefficient: 0.34,
    defaultSolarGainUtilizationFactor: 1,
    domesticHotWaterDemandPerPersonKWhPerYear: 500,
    occupancyAreaPerPersonM2: 40,
    defaultFinalEnergyFactor: 1,
    defaultControlFactor: 1.095,
    generationFactorByHeatingType: {
      standard_boiler_oil: [
        { to: 1986, value: 1.6 },
        { from: 1987, to: 1994, value: 1.5 },
        { from: 1995, value: 1.4 },
      ],
      standard_boiler_gas: [
        { to: 1986, value: 1.6 },
        { from: 1987, to: 1994, value: 1.5 },
        { from: 1995, value: 1.4 },
      ],
      low_temp_boiler_oil: [
        { to: 1986, value: 1.4 },
        { from: 1987, value: 1.3 },
      ],
      low_temp_boiler_gas: [
        { to: 1986, value: 1.4 },
        { from: 1987, value: 1.3 },
      ],
      condensing_boiler_gas: [{ value: 1.2 }],
      condensing_boiler_oil: [{ value: 1.2 }],
      log_wood_boiler: [
        { to: 1986, value: 1.6 },
        { from: 1987, to: 1994, value: 1.5 },
        { from: 1995, value: 1.4 },
      ],
      pellet_boiler: [
        { to: 1986, value: 1.6 },
        { from: 1987, to: 1994, value: 1.5 },
        { from: 1995, value: 1.4 },
      ],
      water_water_heat_pump: [
        { to: 1994, value: 0.4 },
        { from: 1995, value: 0.3 },
      ],
      ground_source_heat_pump: [
        { to: 1994, value: 0.4 },
        { from: 1995, value: 0.3 },
      ],
      air_water_heat_pump: [
        { to: 1994, value: 0.5 },
        { from: 1995, value: 0.4 },
      ],
      direct_electric_heating: [{ value: 1 }],
      district_heating: [{ value: 1 }],
    },
    controlFactorByType: {
      unregulated_central_flow: 1.149,
      lead_room_or_one_pipe: 1.107,
      room_temperature_control: 1.095,
      p_controller_pre_1988: 1.083,
      p_or_two_point: 1.042,
      pi_controller: 1.042,
      pid_optimized: 1.03,
    },
    emitterFactorAdjustmentByType: {
      underfloor_wet: 0.021,
      underfloor_dry: 0.012,
      underfloor_low_cover: 0.006,
      wall_heating: 0.045,
      ceiling_heating: 0.063,
      mechanical_ventilation_heating: 0,
      radiator: 0,
    },
    flowTemperatureAdjustmentBands: [
      { from: 80, value: 0.036 },
      { from: 62.5, to: 79.9999, value: 0.021 },
      { from: 50, to: 62.4999, value: 0.015 },
      { to: 49.9999, value: 0.012 },
    ],
    radiatorPositionAdjustmentByType: {
      inside_wall: 0.039,
      glass_without_shield: 0.051,
      glass_with_shield: 0.036,
      exterior_wall: 0.009,
    },
    intermittentAdjustmentByEmitterType: {
      radiator: -0.018,
    },
    singleRoomControlAdjustmentByType: {
      independent: -0.03,
      self_adjusting: -0.06,
      networked: -0.072,
    },
    primaryEnergyFactorByCarrier: {
      oil: 1.1,
      gas: 1.1,
      biomass: 0.2,
      electricity: 1.8,
      district_heating: 0.7,
      other: 1,
    },
    fuelCarrierProfileByCarrier: {
      oil: {
        unit: "l",
        unitsPerKWh: 0.1,
        pricePerUnit: 1.1,
        co2KgPerUnit: 2.66,
      },
      gas: {
        unit: "m3",
        unitsPerKWh: 0.1,
        pricePerUnit: 1.2,
        co2KgPerUnit: 2.02,
      },
      biomass: {
        unit: "kg",
        unitsPerKWh: 0.2,
        pricePerUnit: 0.4,
        co2KgPerUnit: 0.18,
      },
      electricity: {
        unit: "kWh",
        unitsPerKWh: 1,
        pricePerUnit: 0.35,
        co2KgPerUnit: 0.38,
      },
      district_heating: {
        unit: "kWh",
        unitsPerKWh: 1,
        pricePerUnit: 0.15,
        co2KgPerUnit: 0.25,
      },
      other: {
        unit: "kWh",
        unitsPerKWh: 1,
        pricePerUnit: 0.12,
        co2KgPerUnit: 0.25,
      },
    },
  },
} satisfies CoreConfigJson;

/**
 * Normalized runtime configuration derived from {@link defaultCoreConfigJson}.
 *
 * @group Configuration
 */
export const defaultCoreConfig = coreConfigFromJson(defaultCoreConfigJson);
