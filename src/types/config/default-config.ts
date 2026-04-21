import { BuildingType } from "../building-type";
import { EnergyEfficiencyClass } from "../energy-efficiency-class";
import { HeatFlowDirection } from "../heat-flow-direction";
import { RoofInsulationType } from "../roof-insulation-type";
import type { DETConfig } from ".";

export const DEFAULT_CONFIG: DETConfig = {
  general: {
    supportedLocales: ["de", "en"],
    // generalYearBands: [
    //   { to: 1918 },
    //   { from: 1919, to: 1948 },
    //   { from: 1949, to: 1957 },
    //   { from: 1958, to: 1968 },
    //   { from: 1969, to: 1978 },
    //   { from: 1979, to: 1983 },
    //   { from: 1984, to: 1994 },
    //   { from: 1995, to: 2001 },
    //   { from: 2002, to: 2006 },
    //   { from: 2007 },
    // ], ORIGINAL FROM MOCKUPS
    generalYearBands: [
      { to: 1918 },
      { from: 1919, to: 1948 },
      { from: 1949, to: 1957 },
      { from: 1958, to: 1968 },
      { from: 1969, to: 1978 },
      { from: 1979, to: 1983 },
      { from: 1984, to: 1986 },
      { from: 1987, to: 1994 },
      { from: 1995, to: 2001 },
      { from: 2002, to: 2006 },
      { from: 2007 },
    ],
    energyEfficiencyClasses: [
      { to: 30, value: EnergyEfficiencyClass.A_PLUS },
      { from: 30, to: 50, value: EnergyEfficiencyClass.A },
      { from: 50, to: 75, value: EnergyEfficiencyClass.B },
      { from: 75, to: 100, value: EnergyEfficiencyClass.C },
      { from: 100, to: 130, value: EnergyEfficiencyClass.D },
      { from: 130, to: 160, value: EnergyEfficiencyClass.E },
      { from: 160, to: 200, value: EnergyEfficiencyClass.F },
      { from: 200, to: 250, value: EnergyEfficiencyClass.G },
      { from: 250, value: EnergyEfficiencyClass.H },
    ],
    assumedFloorSlabThickness: 0.2,
    assumedInteriorStoryHeight: 2.75,
    heatedAirVolumeCorrectionFactor: [
      { to: 3, value: 0.76 },
      { from: 3, value: 0.8 },
    ],
    usableFloorAreaFactor: 0.32,
    netFloorAreaFromUsableFloorAreaFactor: [
      {
        key: BuildingType.SINGLE_FAMILY,
        value: [
          { key: false, value: 0.917 },
          { key: true, value: 0.815 },
        ],
      },
      {
        key: BuildingType.MULTI_FAMILY,
        value: [
          { key: false, value: 0.917 },
          { key: true, value: 0.917 },
        ],
      },
    ],
    netFloorAreaFromLivingAreaFactor: 1.1,
  },
  heat: {
    primaryEnergyCarriers: [
      {
        value: "heating_oil_heavy",
        localization: {
          de: "Heizöl, schwer",
          en: "Heavy fuel oil",
        },
      },
      {
        value: "heating_oil_light",
        localization: {
          de: "Heizöl, extra leicht",
          en: "Extra light heating oil",
        },
      },
      {
        value: "renewable_electricity",
        localization: {
          de: "Strom Erneuerbar",
          en: "Renewable electricity",
        },
      },
      {
        value: "electricity",
        localization: {
          de: "Strom",
          en: "Electricity",
        },
      },
      {
        value: "natural_gas",
        localization: {
          de: "Erdgas",
          en: "Natural gas",
        },
      },
      {
        value: "bio_gas",
        localization: {
          de: "Biogas",
          en: "Biogas",
        },
      },
      {
        value: "wood_biomass",
        localization: {
          de: "Biomasse Holz",
          en: "Wood biomass",
        },
      },
      {
        value: "wood_pellets",
        localization: {
          de: "Holz Pellets",
          en: "Wood pellets",
        },
      },
      {
        value: "district_heating",
        localization: {
          de: "Nah-/Fernwärme",
          en: "District heating",
        },
      },
    ],

    heatingSystemTypes: [
      {
        value: "standard_boiler_70_55",
        localization: {
          de: "Standardkessel (auch Holzkessel) 70/55°C",
          en: "Standard boiler (incl. wood boiler) 70/55°C",
        },
      },
      {
        value: "low_temperature_boiler_oil_gas_70_55",
        localization: {
          de: "Niedertemperaturkessel Öl/Gas 70/55°C",
          en: "Low-temperature boiler (oil/gas) 70/55°C",
        },
      },
      {
        value: "condensing_boiler_70_55",
        localization: {
          de: "Brennwertkessel 70/55°C",
          en: "Condensing boiler 70/55°C",
        },
      },
      {
        value: "improved_condensing_boiler_55_45",
        localization: {
          de: "Brennwertkessel (verbessert) 55/45°C",
          en: "Improved condensing boiler 55/45°C",
        },
      },
      {
        value: "district_heating_all_temperatures",
        localization: {
          de: "Fernwärme alle Temperaturen",
          en: "District heating all temperatures",
        },
      },
      {
        value: "air_source_heat_pump_55_45",
        localization: {
          de: "Elektrowärmepumpe Außenluft / Luft-Wasser 55/45°C",
          en: "Air-source heat pump 55/45°C",
        },
      },
      {
        value: "air_source_heat_pump_lt_40",
        localization: {
          de: "Elektrowärmepumpe Außenluft / Luft-Wasser <40°C",
          en: "Air-source heat pump <40°C",
        },
      },
      {
        value: "ground_source_heat_pump_55_45",
        localization: {
          de: "Elektrowärmepumpe Erdreich/Grundwasser / Sole-Wasser / Wasser-Wasser 55/45°C",
          en: "Ground-source heat pump 55/45°C",
        },
      },
      {
        value: "ground_source_heat_pump_lt_40",
        localization: {
          de: "Elektrowärmepumpe Erdreich/Grundwasser / Sole-Wasser / Wasser-Wasser <40°C",
          en: "Ground-source heat pump <40°C",
        },
      },
      {
        value: "oil_fired_single_stove",
        localization: {
          de: "Ölbefeuerte Einzelöfen",
          en: "Oil-fired single stove",
        },
      },
      {
        value: "gas_space_heater",
        localization: { de: "Gasraumheizer", en: "Gas space heater" },
      },
      {
        value: "electric_direct_heater",
        localization: {
          de: "Elektro-Direktheizgerät",
          en: "Electric direct heater",
        },
      },
    ],
    heatingSurfaceTypes: [
      {
        value: "radiant_surface_heating",
        localization: { de: "Flächenheizung", en: "Radiant surface heating" },
      },
      {
        value: "free_heat_emitter",
        localization: {
          de: "Freie Heizflächen",
          en: "Free heat emitter surfaces",
        },
      },
    ],

    allowedHeatingSystemTypesByCarrier: [
      {
        key: "heating_oil_light",
        allowedValues: [
          "standard_boiler_70_55",
          "low_temperature_boiler_oil_gas_70_55",
          "condensing_boiler_70_55",
          "improved_condensing_boiler_55_45",
          "oil_fired_single_stove",
        ],
      },
      {
        key: "heating_oil_heavy",
        allowedValues: [
          "standard_boiler_70_55",
          "low_temperature_boiler_oil_gas_70_55",
          "condensing_boiler_70_55",
          "improved_condensing_boiler_55_45",
          "oil_fired_single_stove",
        ],
      },
      {
        key: "natural_gas",
        allowedValues: [
          "standard_boiler_70_55",
          "low_temperature_boiler_oil_gas_70_55",
          "condensing_boiler_70_55",
          "improved_condensing_boiler_55_45",
          "gas_space_heater",
        ],
      },
      {
        key: "bio_gas",
        allowedValues: [
          "standard_boiler_70_55",
          "low_temperature_boiler_oil_gas_70_55",
          "condensing_boiler_70_55",
          "improved_condensing_boiler_55_45",
          "gas_space_heater",
        ],
      },
      {
        key: "wood_biomass",
        allowedValues: ["standard_boiler_70_55"],
      },
      {
        key: "wood_pellets",
        allowedValues: ["standard_boiler_70_55"],
      },
      {
        key: "electricity",
        allowedValues: [
          "air_source_heat_pump_55_45",
          "air_source_heat_pump_lt_40",
          "ground_source_heat_pump_55_45",
          "ground_source_heat_pump_lt_40",
          "electric_direct_heater",
        ],
      },
      {
        key: "renewable_electricity",
        allowedValues: [
          "air_source_heat_pump_55_45",
          "air_source_heat_pump_lt_40",
          "ground_source_heat_pump_55_45",
          "ground_source_heat_pump_lt_40",
          "electric_direct_heater",
        ],
      },
      {
        key: "district_heating",
        allowedValues: ["district_heating_all_temperatures"],
      },
    ],

    defaultPrimaryEnergyCarrier: "heating_oil_heavy",
    defaultHeatingSystemType: [
      { key: "heating_oil_light", value: "standard_boiler_70_55" },
      { key: "heating_oil_heavy", value: "standard_boiler_70_55" },
      { key: "natural_gas", value: "standard_boiler_70_55" },
      { key: "bio_gas", value: "standard_boiler_70_55" },
      { key: "wood_biomass", value: "standard_boiler_70_55" },
      { key: "wood_pellets", value: "standard_boiler_70_55" },
      { key: "electricity", value: "air_source_heat_pump_55_45" },
      { key: "renewable_electricity", value: "air_source_heat_pump_55_45" },
      { key: "district_heating", value: "district_heating_all_temperatures" },
    ],
    defaultHeatingSurfaceType: "radiant_surface_heating",

    // HDD
    heatingDegreeDays: 3279,
    // kHv
    ventilationHeatLossCorrectionFactor: 0.79,
    // kQwb
    hotWaterEnergyDemandFromAreaFactor: 9.84,

    // fp
    primaryEnergyCarrierEfficiencyFactor: [
      { key: "heating_oil_heavy", value: 1.1 },
      { key: "heating_oil_light", value: 1.1 },
      { key: "electricity_renewable", value: 1.8 },
      { key: "electricity", value: 1.8 },
      { key: "natural_gas", value: 1.1 },
      { key: "bio_gas", value: 1.1 },
      { key: "wood_biomass", value: 0.2 },
      { key: "wood_pellets", value: 0.2 },
      { key: "district_heating", value: 1 },
    ],
    // xco2
    co2Factor: [
      { key: "heating_oil_heavy", value: 288 },
      { key: "heating_oil_light", value: 288 },
      { key: "electricity_renewable", value: 0 },
      { key: "electricity", value: 366 },
      { key: "natural_gas", value: 201 },
      { key: "bio_gas", value: 152 },
      { key: "wood_biomass", value: 30 },
      { key: "wood_pellets", value: 36 },
      { key: "district_heating", value: 280 },
    ],
    // bheiz, barb, bgrund
    primaryEnergyCarrierData: [
      {
        key: "heating_oil_heavy",
        value: { energyPerUnit: 10.08, unitRate: 0.597, baseRate: 0 },
      },
      {
        key: "heating_oil_light",
        value: { energyPerUnit: 10.08, unitRate: 0.597, baseRate: 0 },
      },
      {
        key: "electricity_renewable",
        value: { energyPerUnit: 1, unitRate: 0.192, baseRate: 50 },
      },
      {
        key: "electricity",
        value: { energyPerUnit: 1, unitRate: 0.192, baseRate: 50 },
      },
      {
        key: "natural_gas",
        value: { energyPerUnit: 10.42, unitRate: 0.652, baseRate: 181.83 },
      },
      {
        key: "bio_gas",
        value: { energyPerUnit: 10.42, unitRate: 0.652, baseRate: 181.83 },
      },
      {
        key: "wood_biomass",
        value: { energyPerUnit: 1900, unitRate: 57, baseRate: 0 },
      },
      {
        key: "wood_pellets",
        value: { energyPerUnit: 4.9, unitRate: 0.206, baseRate: 0 },
      },
      {
        key: "district_heating",
        value: { energyPerUnit: 1, unitRate: 0.192, baseRate: 50 },
      },
    ],

    heatingPerformanceFactor: [
      {
        key: "standard_boiler_70_55",
        value: [
          {
            to: 1986,
            value: [
              { to: 150, value: 1.47 },
              { from: 150, to: 500, value: 1.36 },
              { from: 500, value: 1.28 },
            ],
          },
          {
            from: 1987,
            to: 1994,
            value: [
              { to: 150, value: 1.34 },
              { from: 150, to: 500, value: 1.26 },
              { from: 500, value: 1.19 },
            ],
          },
          {
            from: 1995,
            value: [
              { to: 150, value: 1.33 },
              { from: 150, to: 500, value: 1.23 },
              { from: 500, value: 1.16 },
            ],
          },
        ],
      },
      {
        key: "low_temperature_boiler_oil_gas_70_55",
        value: [
          {
            to: 1986,
            value: [
              { to: 150, value: 1.24 },
              { from: 150, to: 500, value: 1.21 },
              { from: 500, value: 1.18 },
            ],
          },
          {
            from: 1987,
            to: 1994,
            value: [
              { to: 150, value: 1.19 },
              { from: 150, to: 500, value: 1.15 },
              { from: 500, value: 1.13 },
            ],
          },
          {
            from: 1995,
            value: [
              { to: 150, value: 1.14 },
              { from: 150, to: 500, value: 1.11 },
              { from: 500, value: 1.09 },
            ],
          },
        ],
      },
      {
        key: "condensing_boiler_70_55",
        value: [
          {
            to: 1986,
            value: [
              { to: 150, value: 1.11 },
              { from: 150, to: 500, value: 1.09 },
              { from: 500, value: 1.07 },
            ],
          },
          {
            from: 1987,
            to: 1994,
            value: [
              { to: 150, value: 1.09 },
              { from: 150, to: 500, value: 1.06 },
              { from: 500, value: 1.04 },
            ],
          },
          {
            from: 1995,
            value: [
              { to: 150, value: 1.07 },
              { from: 150, to: 500, value: 1.05 },
              { from: 500, value: 1.04 },
            ],
          },
        ],
      },
      {
        key: "improved_condensing_boiler_55_45",
        value: [
          {
            value: [
              { to: 150, value: 0.99 },
              { from: 150, to: 500, value: 0.98 },
              { from: 500, value: 0.97 },
            ],
          },
        ],
      },
      {
        key: "district_heating_all_temperatures",
        value: [
          {
            value: [{ value: 1.02 }],
          },
        ],
      },
      {
        key: "air_source_heat_pump_55_45",
        value: [
          {
            to: 1994,
            value: [{ value: 0.45 }],
          },
          {
            from: 1995,
            value: [{ value: 0.43 }],
          },
        ],
      },
      {
        key: "air_source_heat_pump_lt_40",
        value: [
          {
            to: 1994,
            value: [{ value: 0.4 }],
          },
          {
            from: 1995,
            value: [{ value: 0.38 }],
          },
        ],
      },
      {
        key: "ground_source_heat_pump_55_45",
        value: [
          {
            to: 1994,
            value: [{ value: 0.36 }],
          },
          {
            from: 1995,
            value: [{ value: 0.3 }],
          },
        ],
      },
      {
        key: "ground_source_heat_pump_lt_40",
        value: [
          {
            to: 1994,
            value: [{ value: 0.32 }],
          },
          {
            from: 1995,
            value: [{ value: 0.27 }],
          },
        ],
      },
      {
        key: "oil_fired_single_stove",
        value: [
          {
            value: [{ value: 1.4 }],
          },
        ],
      },
      {
        key: "gas_space_heater",
        value: [
          {
            value: [{ value: 1.47 }],
          },
        ],
      },
      {
        key: "electric_direct_heater",
        value: [
          {
            value: [{ value: 1.02 }],
          },
        ],
      },
    ],
    temperatureControlPerformanceFactor: [
      {
        key: "standard_boiler_70_55",
        value: [
          {
            to: 1986,
            value: [
              { key: "radiant_surface_heating", value: 1.128 },
              { key: "free_heat_emitter", value: 1.128 },
            ],
          },
          {
            from: 1987,
            to: 1994,
            value: [
              { key: "radiant_surface_heating", value: 1.104 },
              { key: "free_heat_emitter", value: 1.104 },
            ],
          },
          {
            from: 1995,
            value: [
              { key: "radiant_surface_heating", value: 1.063 },
              { key: "free_heat_emitter", value: 1.063 },
            ],
          },
        ],
      },
      {
        key: "low_temperature_boiler_oil_gas_70_55",
        value: [
          {
            to: 1986,
            value: [
              { key: "radiant_surface_heating", value: 1.104 },
              { key: "free_heat_emitter", value: 1.104 },
            ],
          },
          {
            from: 1987,
            to: 1994,
            value: [
              { key: "radiant_surface_heating", value: 1.063 },
              { key: "free_heat_emitter", value: 1.063 },
            ],
          },
          {
            from: 1995,
            value: [
              { key: "radiant_surface_heating", value: 1.063 },
              { key: "free_heat_emitter", value: 1.063 },
            ],
          },
        ],
      },
      {
        key: "condensing_boiler_70_55",
        value: [
          {
            to: 1986,
            value: [
              { key: "radiant_surface_heating", value: 1.104 },
              { key: "free_heat_emitter", value: 1.104 },
            ],
          },
          {
            from: 1987,
            to: 1994,
            value: [
              { key: "radiant_surface_heating", value: 1.063 },
              { key: "free_heat_emitter", value: 1.063 },
            ],
          },
          {
            from: 1995,
            value: [
              { key: "radiant_surface_heating", value: 1.063 },
              { key: "free_heat_emitter", value: 1.063 },
            ],
          },
        ],
      },
      {
        key: "improved_condensing_boiler_55_45",
        value: [
          {
            value: [
              { key: "radiant_surface_heating", value: 1.063 },
              { key: "free_heat_emitter", value: 1.063 },
            ],
          },
        ],
      },
      {
        key: "district_heating_all_temperatures",
        value: [
          {
            value: [
              { key: "radiant_surface_heating", value: 1.063 },
              { key: "free_heat_emitter", value: 1.063 },
            ],
          },
        ],
      },
      {
        key: "air_source_heat_pump_55_45",
        value: [
          {
            to: 1994,
            value: [
              { key: "radiant_surface_heating", value: 1.063 },
              { key: "free_heat_emitter", value: 1.057 },
            ],
          },
          {
            from: 1995,
            value: [
              { key: "radiant_surface_heating", value: 1.051 },
              { key: "free_heat_emitter", value: 1.045 },
            ],
          },
        ],
      },
      {
        key: "air_source_heat_pump_lt_40",
        value: [
          {
            to: 1994,
            value: [
              { key: "radiant_surface_heating", value: 1.063 },
              { key: "free_heat_emitter", value: 1.054 },
            ],
          },
          {
            from: 1995,
            value: [
              { key: "radiant_surface_heating", value: 1.051 },
              { key: "free_heat_emitter", value: 1.042 },
            ],
          },
        ],
      },
      {
        key: "ground_source_heat_pump_55_45",
        value: [
          {
            to: 1994,
            value: [
              { key: "radiant_surface_heating", value: 1.063 },
              { key: "free_heat_emitter", value: 1.057 },
            ],
          },
          {
            from: 1995,
            value: [
              { key: "radiant_surface_heating", value: 1.051 },
              { key: "free_heat_emitter", value: 1.045 },
            ],
          },
        ],
      },
      {
        key: "ground_source_heat_pump_lt_40",
        value: [
          {
            to: 1994,
            value: [
              { key: "radiant_surface_heating", value: 1.063 },
              { key: "free_heat_emitter", value: 1.054 },
            ],
          },
          {
            from: 1995,
            value: [
              { key: "radiant_surface_heating", value: 1.051 },
              { key: "free_heat_emitter", value: 1.042 },
            ],
          },
        ],
      },
      {
        key: "oil_fired_single_stove",
        value: [
          {
            value: [
              { key: "radiant_surface_heating", value: 0 },
              { key: "free_heat_emitter", value: 0 },
            ],
          },
        ],
      },
      {
        key: "gas_space_heater",
        value: [
          {
            value: [
              { key: "radiant_surface_heating", value: 0 },
              { key: "free_heat_emitter", value: 0 },
            ],
          },
        ],
      },
      {
        key: "electric_direct_heater",
        value: [
          {
            value: [
              { key: "radiant_surface_heating", value: 0 },
              { key: "free_heat_emitter", value: 0 },
            ],
          },
        ],
      },
    ],
    innerSurfaceThermalResistance: [
      { key: HeatFlowDirection.UPWARD, value: 0.1 },
      { key: HeatFlowDirection.HORIZONTAL, value: 0.13 },
      { key: HeatFlowDirection.DOWNWARD, value: 0.17 },
    ],
    outerSurfaceThermalResistance: [
      { key: HeatFlowDirection.UPWARD, value: 0.04 },
      { key: HeatFlowDirection.HORIZONTAL, value: 0.04 },
      { key: HeatFlowDirection.DOWNWARD, value: 0.04 },
    ],
  },
  roof: {
    heatLossFactor: 1,
    defaultInsulationType: RoofInsulationType.ABOVE_RAFTER,
    constructionTypes: [
      {
        value: "solid_construction",
        localization: {
          de: "Massive Konstruktion",
          en: "Solid construction",
        },
      },
      {
        value: "wood_construction",
        localization: {
          de: "Holzkonstruktion",
          en: "Wood construction",
        },
      },
    ],
    defaultConstructionType: "wood_construction",
    assumedInsulationThickness: 0.2,
    thermalConductivity: 0.04,
    insulationReductionFactor: 0.3,
    uValue: [
      {
        key: "solid_construction",
        value: [
          { to: 1957, value: 2.1 },
          { from: 1958, to: 1978, value: 1.3 },
          { from: 1979, to: 1983, value: 0.6 },
          { from: 1984, to: 1994, value: 0.4 },
          { from: 1995, to: 2001, value: 0.3 },
          { from: 2002, value: 0.2 },
        ],
      },
      {
        key: "wood_construction",
        value: [
          { to: 1918, value: 2.6 },
          { from: 1919, to: 1968, value: 1.4 },
          { from: 1969, to: 1978, value: 0.8 },
          { from: 1979, to: 1983, value: 0.7 },
          { from: 1984, to: 1994, value: 0.5 },
          { from: 1995, to: 2001, value: 0.3 },
          { from: 2002, value: 0.2 },
        ],
      },
    ],
  },
  topFloor: {
    topFloorTypes: [
      {
        value: "solid_ceiling",
        localization: {
          de: "Massive Decke",
          en: "Solid ceiling",
        },
      },
      {
        value: "wood_beam_ceiling",
        localization: {
          de: "Holzbalkendecke",
          en: "Wood beam ceiling",
        },
      },
    ],
    defaultTopFloorType: [
      { to: 1968, value: "wood_beam_ceiling" },
      { from: 1969, value: "solid_ceiling" },
    ],
    thermalConductivity: 0.032,
    assumedInsulationThickness: 0.35,
    heatLossFactor: 1,
    uValue: [
      {
        key: "solid_ceiling",
        value: [
          { to: 1968, value: 2.1 },
          { from: 1969, to: 1983, value: 0.6 },
          { from: 1984, to: 2001, value: 0.3 },
          { from: 2002, value: 0.2 },
        ],
      },
      {
        key: "wood_beam_ceiling",
        value: [
          { to: 1948, value: 1 },
          { from: 1949, to: 1957, value: 0.8 },
          { from: 1958, to: 1968, value: 0.7 },
          { from: 1969, to: 1978, value: 0.6 },
          { from: 1979, to: 1983, value: 0.4 },
          { from: 1984, value: 0.3 },
        ],
      },
    ],
  },
  outerWall: {
    constructionTypes: [
      {
        value: "brick_wall",
        localization: {
          de: "Vollziegelwand",
          en: "Brick wall",
        },
      },
      {
        value: "other_wall",
        localization: {
          de: "Sonstige Wand",
          en: "Other wall",
        },
      },
      {
        value: "solid_wall_with_thermal_insulation_composite_system",
        localization: {
          de: "Massivwand mit Wärmedämmverbundsystem",
          en: "Solid wall with thermal insulation composite system",
        },
      },
    ],
    defaultConstructionType: [
      { to: 1957, value: "brick_wall" },
      { from: 1958, to: 2006, value: "other_wall" },
      {
        from: 2007,
        value: "solid_wall_with_thermal_insulation_composite_system",
      },
    ],
    thermalConductivity: 0.035,
    assumedInsulationThickness: 0.35,
    heatLossFactor: 1,
    uValue: [
      {
        key: "brick_wall",
        value: [{ value: 1.5 }],
      },
      {
        key: "other_wall",
        value: [
          { to: 1968, value: 1.4 },
          { from: 1969, to: 1978, value: 1.0 },
          { from: 1979, to: 1983, value: 0.8 },
          { from: 1984, to: 1994, value: 0.6 },
          { from: 1995, to: 2001, value: 0.5 },
          { from: 2002, value: 0.4 },
        ],
      },
      {
        key: "solid_wall_with_thermal_insulation_composite_system",
        value: [{ value: 0.2 }],
      },
    ],
  },
  bottomFloor: {
    constructionTypes: [
      {
        value: "reinforced_concrete_on_ground",
        localization: {
          de: "Boden gegen Erdreich, Stahlbeton massiv",
          en: "Floor slab on ground, solid reinforced concrete",
        },
      },
      {
        value: "reinforced_concrete_ceiling",
        localization: {
          de: "Kellerdecke Stahlbeton massiv",
          en: "Basement ceiling, solid reinforced concrete",
        },
      },
      {
        value: "timber_joist_ceiling",
        localization: {
          de: "Kellerdecke als Holzbalkendecke",
          en: "Basement ceiling as a timber joist ceiling",
        },
      },
    ],

    allowedConstructionTypesByHeatedCellar: [
      {
        key: true,
        allowedValues: ["reinforced_concrete_on_ground"],
      },
      {
        key: false,
        allowedValues: ["timber_joist_ceiling", "reinforced_concrete_ceiling"],
      },
    ],

    defaultConstructionType: [
      {
        key: true,
        value: [{ value: "reinforced_concrete_on_ground" }],
      },
      {
        key: false,
        value: [
          { to: 1968, value: "timber_joist_ceiling" },
          { from: 1969, value: "reinforced_concrete_ceiling" },
        ],
      },
    ],
    thermalConductivity: 0.03,
    assumedInsulationThickness: 0.3,
    heatLossFactor: 1,
    uValue: [
      {
        key: "reinforced_concrete_on_ground",
        value: [
          { to: 1918, value: 1.6 },
          { from: 1919, to: 1948, value: 1.6 },
          { from: 1949, to: 1957, value: 2.3 },
          { from: 1958, to: 1968, value: 1.2 },
          { from: 1969, to: 1978, value: 1.2 },
          { from: 1979, to: 1983, value: 0.8 },
          { from: 1984, to: 1994, value: 0.6 },
          { from: 1995, to: 2001, value: 0.6 },
          { from: 2002, value: 0.5 },
        ],
      },
      {
        key: "reinforced_concrete_ceiling",
        value: [
          { to: 1918, value: 1.6 },
          { from: 1919, to: 1948, value: 1.6 },
          { from: 1949, to: 1957, value: 2.3 },
          { from: 1958, to: 1968, value: 1.0 },
          { from: 1969, to: 1978, value: 1.0 },
          { from: 1979, to: 1983, value: 0.8 },
          { from: 1984, to: 1994, value: 0.6 },
          { from: 1995, to: 2001, value: 0.6 },
          { from: 2002, value: 0.5 },
        ],
      },
      {
        key: "timber_joist_ceiling",
        value: [
          { to: 1918, value: 1.0 },
          { from: 1919, to: 1948, value: 1.0 },
          { from: 1949, to: 1957, value: 1.0 },
          { from: 1958, to: 1968, value: 0.8 },
          { from: 1969, to: 1978, value: 0.6 },
          { from: 1979, to: 1983, value: 0.6 },
          { from: 1984, to: 1994, value: 0.4 },
          { from: 1995, to: 2001, value: 0.4 },
          { from: 2002, value: 0.4 },
        ],
      },
    ],
  },
  windows: {
    windowTypes: [
      {
        value: "wooden_window_single_glazing",
        localization: {
          de: "Holzfenster, einfach verglast",
          en: "Wooden window, single glazing",
        },
      },
      {
        value: "wooden_window_double_glazing",
        localization: {
          de: "Holzfenster, zweifach verglast",
          en: "Wooden window, double glazing",
        },
      },
      {
        value: "plastic_window_insulated_glazing",
        localization: {
          de: "Kunststofffenster, Isolierverglasung",
          en: "Plastic window, insulated glazing",
        },
      },
      {
        value: "aluminum_or_steel_window_insulated_glazing",
        localization: {
          de: "Aluminium- oder Stahlfenster, Isolierverglasung",
          en: "Aluminum or steel window, insulated glazing",
        },
      },
    ],
    defaultWindowType: [
      { to: 1983, value: "wooden_window_double_glazing" },
      { from: 1984, value: "plastic_window_insulated_glazing" },
    ],
    uValue: [
      {
        key: "wooden_window_single_glazing",
        value: [{ value: 5.0 }],
      },
      {
        key: "wooden_window_double_glazing",
        value: [
          { to: 1994, value: 2.7 },
          { from: 1995, to: 2001, value: 1.6 },
          { from: 2002, value: 1.5 },
        ],
      },
      {
        key: "plastic_window_insulated_glazing",
        value: [
          { to: 1994, value: 3.0 },
          { from: 1995, to: 2001, value: 1.9 },
          { from: 2002, value: 1.5 },
        ],
      },
      {
        key: "aluminum_or_steel_window_insulated_glazing",
        value: [
          { to: 1983, value: 4.3 },
          { from: 1984, to: 1994, value: 3.2 },
          { from: 1995, to: 2001, value: 1.9 },
          { from: 2002, value: 1.5 },
        ],
      },
    ],
    roofWindowsHeatLossFactor: 0.93,
    exteriorWallWindowsHeatLossFactor: 1,
  },
};
