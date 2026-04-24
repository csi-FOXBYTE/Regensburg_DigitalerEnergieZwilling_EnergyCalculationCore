import type { DETInput } from "../input";

export type InputPatch = {
  [K in keyof DETInput]?: Partial<DETInput[K]>;
};

export interface Renovation {
  id: string;
  label: string;
  patch: InputPatch;
}

export interface HeatingRenovationConfig {
  targetCarrier: string;
  targetSystem: string;
  localization: Record<string, string>;
}

export interface HeatingSurfaceRenovationConfig {
  targetSurfaceType: string;
  localization: Record<string, string>;
}

export type DETRenovationConfig = {
  primaryEnergyCarrierTargets: string[];
  heatingRenovations: HeatingRenovationConfig[];
  insulationRenovations: InsulationRenovationConfigs;
  heatingSurfaceRenovations: HeatingSurfaceRenovationConfig[];
};

export const insulationKeys = [
  "roof",
  "topFloor",
  "bottomFloor",
  "outerWalls",
  "outerWindows",
  "roofWindows",
] as const;

export type InsulationRenovationKeys = (typeof insulationKeys)[number];

export interface InsulationRenovationConfig {
  uValue: number;
}

export type InsulationRenovationConfigs = {
  [K in InsulationRenovationKeys]: InsulationRenovationConfig;
};
