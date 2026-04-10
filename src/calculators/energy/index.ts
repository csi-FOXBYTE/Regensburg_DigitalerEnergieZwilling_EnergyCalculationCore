import { createCalculator } from "../../engine";
import type { DETConfig } from "../../types/config";
import type { DETInput } from "../../types/input";
import airDensitySpecificHeatCapacityProduct from "./resolvers/airDensitySpecificHeatCapacityProduct";
import buildingBaseArea from "./resolvers/buildingBaseArea";
import co2Emissions from "./resolvers/co2Emissions";
import co2Factor from "./resolvers/co2Factor";
import combinedHeatingPerformanceFactor from "./resolvers/combinedHeatingPerformanceFactor";
import primaryEnergyCarrier from "./resolvers/primaryEnergyCarrier";
import primaryEnergyCarrierData from "./resolvers/primaryEnergyCarrierData";
import primaryEnergyCarrierEfficiencyFactor from "./resolvers/primaryEnergyCarrierEfficiencyFactor";
import primaryEnergyDemand from "./resolvers/primaryEnergyDemand";
import primaryEnergyDemandPerSquareMeter from "./resolvers/primaryEnergyDemandPerSquareMeter";
import energyCarrierConsumption from "./resolvers/energyCarrierConsumption";
import energyCarrierCost from "./resolvers/energyCarrierCost";
import buildingYear from "./resolvers/buildingYear";
import buildingHeight from "./resolvers/buildingHeight.js";
import buildingType from "./resolvers/buildingType.js";
import floorSlabThickness from "./resolvers/floorSlabThickness";
import grossHeatedVolume from "./resolvers/grossHeatedVolume";
import heatCircuitTemperature from "./resolvers/heatCircuitTemperature";
import heatEmitterType from "./resolvers/heatEmitterType";
import heatingPerformanceFactor from "./resolvers/heatingPerformanceFactor";
import heatingSurfaceType from "./resolvers/heatingSurfaceType";
import heatingSystemConstructionYear from "./resolvers/heatingSystemConstructionYear";
import heatedAirVolume from "./resolvers/heatedAirVolume";
import heatedAirVolumeCorrectionFactor from "./resolvers/heatedAirVolumeCorrectionFactor";
import heatingDegreeDays from "./resolvers/heatingDegreeDays";
import hotWaterEnergyDemand from "./resolvers/hotWaterEnergyDemand";
import hotWaterEnergyDemandFromAreaFactor from "./resolvers/hotWaterEnergyDemandFromAreaFactor";
import heatingEnergyDemand from "./resolvers/heatingEnergyDemand";
import heatLossSum from "./resolvers/heatLossSum";
import interiorStoryHeight from "./resolvers/interiorStoryHeight";
import livingArea from "./resolvers/livingArea";
import isBasementHeated from "./resolvers/isBasementHeated";
import netFloorArea from "./resolvers/netFloorArea";
import netFloorAreaFromLivingAreaFactor from "./resolvers/netFloorAreaFromLivingAreaFactor";
import netFloorAreaFromUsableFloorAreaFactor from "./resolvers/netFloorAreaFromUsableFloorAreaFactor";
import numberOfStories from "./resolvers/numberOfStories";
import preliminaryHeatingEnergyDemand from "./resolvers/preliminaryHeatingEnergyDemand";
import totalStoryHeight from "./resolvers/totalStoryHeight";
import usableFloorArea from "./resolvers/usableFloorArea";
import temperatureControlPerformanceFactor from "./resolvers/temperatureControlPerformanceFactor";
import totalEnergyDemand from "./resolvers/totalEnergyDemand";
import totalEnergyDemandPerSquareMeter from "./resolvers/totalEnergyDemandPerSquareMeter";
import usableFloorAreaFactor from "./resolvers/usableFloorAreaFactor";
import ventilationHeatLoss from "./resolvers/ventilationHeatLoss";
import ventilationHeatLossCorrectionFactor from "./resolvers/ventilationHeatLossCorrectionFactor";

export interface DETCalculatorRegistry {}

export interface DETCalculatorContext {
  config: DETConfig;
  input: DETInput;
}

export const DETEnergyCaluclator = createCalculator<
  DETCalculatorContext,
  DETCalculatorRegistry
>([
  airDensitySpecificHeatCapacityProduct,
  buildingBaseArea,
  co2Emissions,
  co2Factor,
  energyCarrierConsumption,
  energyCarrierCost,
  combinedHeatingPerformanceFactor,
  primaryEnergyCarrier,
  primaryEnergyCarrierData,
  primaryEnergyCarrierEfficiencyFactor,
  primaryEnergyDemand,
  primaryEnergyDemandPerSquareMeter,
  buildingYear,
  buildingHeight,
  buildingType,
  floorSlabThickness,
  grossHeatedVolume,
  heatCircuitTemperature,
  heatEmitterType,
  heatedAirVolume,
  heatingPerformanceFactor,
  heatingSurfaceType,
  heatingSystemConstructionYear,
  heatedAirVolumeCorrectionFactor,
  heatingDegreeDays,
  heatingEnergyDemand,
  heatLossSum,
  hotWaterEnergyDemand,
  hotWaterEnergyDemandFromAreaFactor,
  interiorStoryHeight,
  isBasementHeated,
  livingArea,
  netFloorArea,
  netFloorAreaFromLivingAreaFactor,
  netFloorAreaFromUsableFloorAreaFactor,
  numberOfStories,
  preliminaryHeatingEnergyDemand,
  totalStoryHeight,
  usableFloorArea,
  temperatureControlPerformanceFactor,
  totalEnergyDemand,
  totalEnergyDemandPerSquareMeter,
  usableFloorAreaFactor,
  ventilationHeatLoss,
  ventilationHeatLossCorrectionFactor,
]);
