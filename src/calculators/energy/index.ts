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
import energyEfficiencyClass from "./resolvers/energyEfficiencyClass";
import energyCarrierConsumption from "./resolvers/energyCarrierConsumption";
import energyCarrierCost from "./resolvers/energyCarrierCost";
import buildingYear from "./resolvers/buildingYear";
import buildingHeight from "./resolvers/buildingHeight.js";
import buildingType from "./resolvers/buildingType.js";
import floorSlabThickness from "./resolvers/floorSlabThickness";
import grossHeatedVolume from "./resolvers/grossHeatedVolume";
import heatingSystemType from "./resolvers/heatingSystemType";
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
import exteriorWallWindowsArea from "./resolvers/exteriorWallWindows/exteriorWallWindowsArea";
import exteriorWallWindowsHeatLoss from "./resolvers/exteriorWallWindows/exteriorWallWindowsHeatLoss";
import exteriorWallWindowsHeatLossFactor from "./resolvers/exteriorWallWindows/exteriorWallWindowsHeatLossFactor";
import exteriorWallWindowsType from "./resolvers/exteriorWallWindows/exteriorWallWindowsType";
import exteriorWallWindowsUValue from "./resolvers/exteriorWallWindows/exteriorWallWindowsUValue";
import exteriorWallWindowsYear from "./resolvers/exteriorWallWindows/exteriorWallWindowsYear";
import isTopFloorHeated from "./resolvers/topFloor/isTopFloorHeated";
import topFloorArea from "./resolvers/topFloor/topFloorArea";
import topFloorHasInsulation from "./resolvers/topFloor/topFloorHasInsulation";
import topFloorConstructionUValue from "./resolvers/topFloor/topFloorConstructionUValue";
import topFloorConstructionResistance from "./resolvers/topFloor/topFloorConstructionResistance";
import topFloorHeatLossFactor from "./resolvers/topFloor/topFloorHeatLossFactor";
import topFloorHeatLoss from "./resolvers/topFloor/topFloorHeatLoss";
import topFloorThermalResistance from "./resolvers/topFloor/topFloorThermalResistance";
import topFloorUValue from "./resolvers/topFloor/topFloorUValue";
import topFloorInsulationThickness from "./resolvers/topFloor/topFloorInsulationThickness";
import topFloorInsulationResistance from "./resolvers/topFloor/topFloorInsulationResistance";
import topFloorInnerSurfaceThermalResistance from "./resolvers/topFloor/topFloorInnerSurfaceThermalResistance";
import topFloorOuterSurfaceThermalResistance from "./resolvers/topFloor/topFloorOuterSurfaceThermalResistance";
import topFloorThermalConductivity from "./resolvers/topFloor/topFloorThermalConductivity";
import topFloorType from "./resolvers/topFloor/topFloorType";
import roofArea from "./resolvers/roof/roofArea";
import roofHasInsulation from "./resolvers/roof/roofHasInsulation";
import betweenRafterRoofResistance from "./resolvers/roof/betweenRafterRoofResistance";
import roofConstructionUValue from "./resolvers/roof/roofConstructionUValue";
import roofConstructionResistance from "./resolvers/roof/roofConstructionResistance";
import roofInsulationResistance from "./resolvers/roof/roofInsulationResistance";
import roofHeatLoss from "./resolvers/roof/roofHeatLoss";
import roofHeatLossFactor from "./resolvers/roof/roofHeatLossFactor";
import roofConstructionType from "./resolvers/roof/roofConstructionType";
import roofInnerSurfaceThermalResistance from "./resolvers/roof/roofInnerSurfaceThermalResistance";
import roofInsulationReductionFactor from "./resolvers/roof/roofInsulationReductionFactor";
import roofInsulationThickness from "./resolvers/roof/roofInsulationThickness";
import roofInsulationType from "./resolvers/roof/roofInsulationType";
import roofOuterSurfaceThermalResistance from "./resolvers/roof/roofOuterSurfaceThermalResistance";
import roofThermalConductivity from "./resolvers/roof/roofThermalConductivity";
import roofTotalThermalResistance from "./resolvers/roof/roofTotalThermalResistance";
import roofUValue from "./resolvers/roof/roofUValue";
import roofYear from "./resolvers/roof/roofYear";
import outerWallHasInsulation from "./resolvers/outerWall/outerWallHasInsulation";
import outerWallConstructionType from "./resolvers/outerWall/outerWallConstructionType";
import outerWallConstructionUValue from "./resolvers/outerWall/outerWallConstructionUValue";
import outerWallArea from "./resolvers/outerWall/outerWallArea";
import outerWallConstructionResistance from "./resolvers/outerWall/outerWallConstructionResistance";
import outerWallThermalResistance from "./resolvers/outerWall/outerWallThermalResistance";
import outerWallUValue from "./resolvers/outerWall/outerWallUValue";
import outerWallHeatLossFactor from "./resolvers/outerWall/outerWallHeatLossFactor";
import outerWallHeatLoss from "./resolvers/outerWall/outerWallHeatLoss";
import outerWallInnerSurfaceThermalResistance from "./resolvers/outerWall/outerWallInnerSurfaceThermalResistance";
import outerWallOuterSurfaceThermalResistance from "./resolvers/outerWall/outerWallOuterSurfaceThermalResistance";
import outerWallThermalConductivity from "./resolvers/outerWall/outerWallThermalConductivity";
import outerWallInsulationThickness from "./resolvers/outerWall/outerWallInsulationThickness";
import outerWallInsulationResistance from "./resolvers/outerWall/outerWallInsulationResistance";
import baseSlabIsHeated from "./resolvers/baseSlab/baseSlabIsHeated";
import baseSlabArea from "./resolvers/baseSlab/baseSlabArea";
import baseSlabConstructionType from "./resolvers/baseSlab/baseSlabConstructionType";
import baseSlabConstructionUValue from "./resolvers/baseSlab/baseSlabConstructionUValue";
import baseSlabConstructionResistance from "./resolvers/baseSlab/baseSlabConstructionResistance";
import baseSlabHasInsulation from "./resolvers/baseSlab/baseSlabHasInsulation";
import baseSlabInsulationThickness from "./resolvers/baseSlab/baseSlabInsulationThickness";
import baseSlabInnerSurfaceThermalResistance from "./resolvers/baseSlab/baseSlabInnerSurfaceThermalResistance";
import baseSlabOuterSurfaceThermalResistance from "./resolvers/baseSlab/baseSlabOuterSurfaceThermalResistance";
import baseSlabThermalConductivity from "./resolvers/baseSlab/baseSlabThermalConductivity";
import baseSlabInsulationResistance from "./resolvers/baseSlab/baseSlabInsulationResistance";
import baseSlabThermalResistance from "./resolvers/baseSlab/baseSlabThermalResistance";
import baseSlabUValue from "./resolvers/baseSlab/baseSlabUValue";
import baseSlabHeatLossFactor from "./resolvers/baseSlab/baseSlabHeatLossFactor";
import baseSlabHeatLoss from "./resolvers/baseSlab/baseSlabHeatLoss";
import roofWindowsArea from "./resolvers/roofWindows/roofWindowsArea";
import roofWindowsHeatLoss from "./resolvers/roofWindows/roofWindowsHeatLoss";
import roofWindowsHeatLossFactor from "./resolvers/roofWindows/roofWindowsHeatLossFactor";
import roofWindowsType from "./resolvers/roofWindows/roofWindowsType";
import roofWindowsUValue from "./resolvers/roofWindows/roofWindowsUValue";
import roofWindowsYear from "./resolvers/roofWindows/roofWindowsYear";

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
  energyEfficiencyClass,
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
  heatingSystemType,
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
  exteriorWallWindowsArea,
  exteriorWallWindowsHeatLoss,
  exteriorWallWindowsHeatLossFactor,
  exteriorWallWindowsType,
  exteriorWallWindowsUValue,
  exteriorWallWindowsYear,
  isTopFloorHeated,
  topFloorArea,
  topFloorHasInsulation,
  topFloorConstructionUValue,
  topFloorConstructionResistance,
  topFloorHeatLossFactor,
  topFloorHeatLoss,
  topFloorThermalResistance,
  topFloorUValue,
  topFloorInsulationThickness,
  topFloorInsulationResistance,
  topFloorInnerSurfaceThermalResistance,
  topFloorOuterSurfaceThermalResistance,
  topFloorThermalConductivity,
  topFloorType,
  roofArea,
  roofHasInsulation,
  betweenRafterRoofResistance,
  roofConstructionUValue,
  roofConstructionResistance,
  roofInsulationResistance,
  roofConstructionType,
  roofHeatLoss,
  roofHeatLossFactor,
  roofInnerSurfaceThermalResistance,
  roofInsulationReductionFactor,
  roofInsulationThickness,
  roofInsulationType,
  roofOuterSurfaceThermalResistance,
  roofThermalConductivity,
  roofTotalThermalResistance,
  roofUValue,
  roofYear,
  outerWallHasInsulation,
  outerWallConstructionType,
  outerWallConstructionUValue,
  outerWallArea,
  outerWallConstructionResistance,
  outerWallThermalResistance,
  outerWallUValue,
  outerWallHeatLossFactor,
  outerWallHeatLoss,
  outerWallInnerSurfaceThermalResistance,
  outerWallOuterSurfaceThermalResistance,
  outerWallThermalConductivity,
  outerWallInsulationThickness,
  outerWallInsulationResistance,
  baseSlabIsHeated,
  baseSlabArea,
  baseSlabConstructionType,
  baseSlabConstructionUValue,
  baseSlabConstructionResistance,
  baseSlabHasInsulation,
  baseSlabInsulationThickness,
  baseSlabInnerSurfaceThermalResistance,
  baseSlabOuterSurfaceThermalResistance,
  baseSlabThermalConductivity,
  baseSlabInsulationResistance,
  baseSlabThermalResistance,
  baseSlabUValue,
  baseSlabHeatLossFactor,
  baseSlabHeatLoss,
  roofWindowsArea,
  roofWindowsHeatLoss,
  roofWindowsHeatLossFactor,
  roofWindowsType,
  roofWindowsUValue,
  roofWindowsYear,
]);
