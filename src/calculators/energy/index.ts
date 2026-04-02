import { createCalculator } from "../../engine";
import type { DETConfig } from "../../types/config";
import type { DETInput } from "../../types/input";
import buildingBaseArea from "./resolvers/buildingBaseArea";
import buildingHeight from "./resolvers/buildingHeight.js";
import buildingType from "./resolvers/buildingType.js";
import floorSlabThickness from "./resolvers/floorSlabThickness";
import grossHeatedVolume from "./resolvers/grossHeatedVolume";
import heatedAirVolume from "./resolvers/heatedAirVolume";
import interiorStoryHeight from "./resolvers/interiorStoryHeight";
import livingArea from "./resolvers/livingArea";
import isBasementHeated from "./resolvers/isBasementHeated";
import netFloorArea from "./resolvers/netFloorArea";
import netFloorAreaFromLivingAreaFactor from "./resolvers/netFloorAreaFromLivingAreaFactor";
import netFloorAreaFromUsableFloorAreaFactor from "./resolvers/netFloorAreaFromUsableFloorAreaFactor";
import numberOfStories from "./resolvers/numberOfStories";
import totalStoryHeight from "./resolvers/totalStoryHeight";
import usableFloorArea from "./resolvers/usableFloorArea";

export interface DETCalculatorRegistry {}

export interface DETCalculatorContext {
  config: DETConfig;
  input: DETInput;
}

export const DETEnergyCaluclator = createCalculator<
  DETCalculatorContext,
  DETCalculatorRegistry
>([
  buildingBaseArea,
  buildingHeight,
  buildingType,
  floorSlabThickness,
  grossHeatedVolume,
  heatedAirVolume,
  interiorStoryHeight,
  isBasementHeated,
  livingArea,
  netFloorArea,
  netFloorAreaFromLivingAreaFactor,
  netFloorAreaFromUsableFloorAreaFactor,
  numberOfStories,
  totalStoryHeight,
  usableFloorArea,
]);
