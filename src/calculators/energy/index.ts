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
import hasRenewableEnergy from "./resolvers/hasRenewableEnergy";
import hasGasSupply from "./resolvers/hasGasSupply";
import hasBioGas from "./resolvers/hasBioGas";
import hasStorage from "./resolvers/hasStorage";
import netFloorArea from "./resolvers/netFloorArea";
import netFloorAreaFromLivingAreaFactor from "./resolvers/netFloorAreaFromLivingAreaFactor";
import netFloorAreaFromUsableFloorAreaFactor from "./resolvers/netFloorAreaFromUsableFloorAreaFactor";
import numberOfStories from "./resolvers/numberOfStories";
import numberOfHeatedStories from "./resolvers/numberOfHeatedStories";
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
import isAtticHeated from "./resolvers/topFloor/isAtticHeated";
import hasAttic from "./resolvers/topFloor/hasAttic";
import topFloorYear from "./resolvers/topFloor/topFloorYear";
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
import isSpaceBelowRoofHeated from "./resolvers/roof/isSpaceBelowRoofHeated";
import outerWallYear from "./resolvers/outerWall/outerWallYear";
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
import bottomFloorIsHeated from "./resolvers/bottomFloor/bottomFloorIsHeated";
import bottomFloorYear from "./resolvers/bottomFloor/bottomFloorYear";
import hasBasement from "./resolvers/bottomFloor/hasBasement";
import isSpaceAboveBaseSlabHeated from "./resolvers/bottomFloor/isSpaceAboveBaseSlabHeated";
import bottomFloorArea from "./resolvers/bottomFloor/bottomFloorArea";
import bottomFloorConstructionType from "./resolvers/bottomFloor/bottomFloorConstructionType";
import bottomFloorConstructionUValue from "./resolvers/bottomFloor/bottomFloorConstructionUValue";
import bottomFloorConstructionResistance from "./resolvers/bottomFloor/bottomFloorConstructionResistance";
import bottomFloorHasInsulation from "./resolvers/bottomFloor/bottomFloorHasInsulation";
import bottomFloorInsulationThickness from "./resolvers/bottomFloor/bottomFloorInsulationThickness";
import bottomFloorInnerSurfaceThermalResistance from "./resolvers/bottomFloor/bottomFloorInnerSurfaceThermalResistance";
import bottomFloorOuterSurfaceThermalResistance from "./resolvers/bottomFloor/bottomFloorOuterSurfaceThermalResistance";
import bottomFloorThermalConductivity from "./resolvers/bottomFloor/bottomFloorThermalConductivity";
import bottomFloorInsulationResistance from "./resolvers/bottomFloor/bottomFloorInsulationResistance";
import bottomFloorThermalResistance from "./resolvers/bottomFloor/bottomFloorThermalResistance";
import bottomFloorUValue from "./resolvers/bottomFloor/bottomFloorUValue";
import bottomFloorHeatLossFactor from "./resolvers/bottomFloor/bottomFloorHeatLossFactor";
import bottomFloorHeatLoss from "./resolvers/bottomFloor/bottomFloorHeatLoss";
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
  hasRenewableEnergy,
  hasGasSupply,
  hasBioGas,
  hasStorage,
  livingArea,
  netFloorArea,
  netFloorAreaFromLivingAreaFactor,
  netFloorAreaFromUsableFloorAreaFactor,
  numberOfStories,
  numberOfHeatedStories,
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
  isAtticHeated,
  hasAttic,
  topFloorYear,
  isSpaceBelowRoofHeated,
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
  outerWallYear,
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
  bottomFloorIsHeated,
  bottomFloorYear,
  hasBasement,
  isSpaceAboveBaseSlabHeated,
  bottomFloorArea,
  bottomFloorConstructionType,
  bottomFloorConstructionUValue,
  bottomFloorConstructionResistance,
  bottomFloorHasInsulation,
  bottomFloorInsulationThickness,
  bottomFloorInnerSurfaceThermalResistance,
  bottomFloorOuterSurfaceThermalResistance,
  bottomFloorThermalConductivity,
  bottomFloorInsulationResistance,
  bottomFloorThermalResistance,
  bottomFloorUValue,
  bottomFloorHeatLossFactor,
  bottomFloorHeatLoss,
  roofWindowsArea,
  roofWindowsHeatLoss,
  roofWindowsHeatLossFactor,
  roofWindowsType,
  roofWindowsUValue,
  roofWindowsYear,
]);
