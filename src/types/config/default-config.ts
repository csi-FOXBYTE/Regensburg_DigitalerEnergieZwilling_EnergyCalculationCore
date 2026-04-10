import { BuildingType } from "../building-type";
import { EnergyEfficiencyClass } from "../energy-efficiency-class";
import { HeatFlowDirection } from "../heat-flow-direction";
import type { DETConfig } from ".";

export const DEFAULT_CONFIG: DETConfig = {
  general: {
    generalYearBands: [
      { to: 1918 },
      { from: 1919, to: 1948 },
      { from: 1949, to: 1957 },
      { from: 1958, to: 1968 },
      { from: 1969, to: 1978 },
      { from: 1979, to: 1983 },
      { from: 1984, to: 1994 },
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
      "Heizöl EL",
      "Erdgas E",
      "Pellets",
      "Biomasse Stückholz",
      "Strom-Mix",
      "Nah-/Fernwärme",
    ],
    heatEmitterTypes: [
      "Standardkessel",
      "Niedertemperaturkessel",
      "Brennwertkessel",
      "Brennwertkessel (verbessert)",
      "Fernwärme",
      "Elektrowärmepumpe Außenluft (55/45)",
      "Elektrowärmepumpe Außenluft (<40)",
      "Elektrowärmepumpe Erdreich/Grundwasser (55/45)",
      "Elektrowärmepumpe Erdreich/Grundwasser (<40)",
      "Ölbefeuerte Einzelöfen",
      "Gasraumheizer",
      "Elektro-Direktheizgerät",
    ],
    heatingSurfaceTypes: ["Flächenheizung", "Freie Heizflächen"],

    // defaults
    defaultPrimaryEnergyCarrier: "", // TODO
    defaultHeatEmitterType: "", // TODO
    defaultHeatingSurfaceType: "", // TODO

    // HDD
    heatingDegreeDays: 0, // TODO
    // kHv
    ventilationHeatLossCorrectionFactor: 0, // TODO
    // kQwb — graph says [type] but config is a single number
    hotWaterEnergyDemandFromAreaFactor: 0, // TODO

    // keyed by primaryEnergyCarrier
    // fp
    primaryEnergyCarrierEfficiencyFactor: [], // TODO
    // xco2
    co2Factor: [], // TODO
    // bheiz, barb, bgrund
    primaryEnergyCarrierData: [], // TODO

    // keyed by heating device, then year bands
    heatCircuitTemperature: [], // TODO
    heatingPerformanceFactor: [], // TODO
    temperatureControlPerformanceFactor: [], // TODO
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
    heatLossFactor: 1, // TODO
    insulationTypes: [], // TODO
    defaultInsulationType: "", // TODO
    constructionTypes: [], // TODO
    defaultConstructionType: "", // TODO
    assumedInsulationThickness: 0, // TODO
    thermalConductivity: 0.04,
    insulationReductionFactor: [], // TODO
    uValue: [], // TODO
  },
  windows: {
    windowTypes: [], // TODO
    defaultWindowType: [{ value: "" }], // TODO
    uValue: [], // TODO
    roofWindowsHeatLossFactor: 0.93, // TODO
    exteriorWallWindowsHeatLossFactor: 1, // TODO
  },
};
