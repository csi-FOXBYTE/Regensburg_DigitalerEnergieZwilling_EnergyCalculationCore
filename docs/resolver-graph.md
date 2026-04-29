# Resolver Graph

```mermaid
flowchart LR

%% ═══════════════ BUILDING GEOMETRY ═══════════════
subgraph BLD["Building Geometry"]
  bYear["<b>buildingYear</b>: number | RangeKey<br/><small>input: general.buildingYear</small>"]
  bType["<b>buildingType</b>: BuildingType<br/><small>input: general.type</small>"]
  bBase["<b>buildingBaseArea</b>: number<br/><small>input: general.buildingBaseArea</small>"]
  bHeight["<b>buildingHeight</b>: number<br/><small>input: general.buildingHeight</small>"]
  bLiving["<b>livingArea</b>: number | null<br/><small>input: general.livingArea ?? null</small>"]
  bIsBasHeated["<b>isBasementHeated</b>: boolean<br/><small>input: bottomFloor.isBasementHeated ?? false</small>"]
  floorSlab["<b>floorSlabThickness</b>: number<br/><small>config: assumedFloorSlabThickness</small>"]
  storyH["<b>interiorStoryHeight</b>: number<br/><small>config: assumedInteriorStoryHeight</small>"]
  nStories["<b>numberOfStories</b>: number<br/><small>override or round(h / (hg+hd))</small>"]
  nHeatedStories["<b>numberOfHeatedStories</b>: number<br/><small>nStories + attic? + basement?</small>"]
  totalH["<b>totalStoryHeight</b>: number<br/><small>n×hg + (n-1)×hd</small>"]
  grossVol["<b>grossHeatedVolume</b>: number<br/><small>baseArea × totalStoryHeight</small>"]
  airVolFact["<b>heatedAirVolumeCorrectionFactor</b>: number<br/><small>config rangeBand by numberOfStories</small>"]
  airVol["<b>heatedAirVolume</b>: number<br/><small>grossVol × correctionFactor</small>"]
  usableAreaFact["<b>usableFloorAreaFactor</b>: number<br/><small>config: general.usableFloorAreaFactor</small>"]
  usableArea["<b>usableFloorArea</b>: number<br/><small>grossVol × usableFloorAreaFactor</small>"]
  netFromLivingFact["<b>netFloorAreaFromLivingAreaFactor</b>: number<br/><small>config: general.netFloorAreaFromLivingAreaFactor</small>"]
  netFromUsableFact["<b>netFloorAreaFromUsableFloorAreaFactor</b>: number<br/><small>config keyed by buildingType + isBasementHeated</small>"]
  netArea["<b>netFloorArea</b>: number<br/><small>livingArea×factor OR usableFloorArea×factor</small>"]

  bHeight --> nStories
  floorSlab --> nStories
  storyH --> nStories
  nStories --> nHeatedStories
  bIsBasHeated --> nHeatedStories
  bIsBasHeated --> netFromUsableFact
  bType --> netFromUsableFact
  nHeatedStories --> totalH
  storyH --> totalH
  floorSlab --> totalH
  bBase --> grossVol
  totalH --> grossVol
  nStories --> airVolFact
  grossVol --> airVol
  airVolFact --> airVol
  grossVol --> usableArea
  usableAreaFact --> usableArea
  bLiving --> netArea
  netFromLivingFact --> netArea
  usableArea --> netArea
  netFromUsableFact --> netArea
end

%% ═══════════════ OUTER WALL ═══════════════
subgraph OW["Outer Wall"]
  owYear["<b>outerWallYear</b>: number | RangeKey<br/><small>override or buildingYear</small>"]
  owArea["<b>outerWallArea</b>: number<br/><small>input: outerWall.area</small>"]
  owHasIns["<b>outerWallHasInsulation</b>: boolean<br/><small>input: outerWall.hasInsulation ?? false</small>"]
  owConstrType["<b>outerWallConstructionType</b>: string<br/><small>override or config yearBand by year</small>"]
  owConstrU["<b>outerWallConstructionUValue</b>: number<br/><small>config keyed by constructionType + year</small>"]
  owConstrR["<b>outerWallConstructionResistance</b>: number<br/><small>1 / constructionUValue</small>"]
  owInsThick["<b>outerWallInsulationThickness</b>: number<br/><small>override or config default</small>"]
  owLambda["<b>outerWallThermalConductivity</b>: number<br/><small>config: outerWall.thermalConductivity</small>"]
  owRsi["<b>outerWallInnerSurfaceThermalResistance</b>: number<br/><small>config by HORIZONTAL heat flow</small>"]
  owRso["<b>outerWallOuterSurfaceThermalResistance</b>: number<br/><small>config by HORIZONTAL heat flow</small>"]
  owInsR["<b>outerWallInsulationResistance</b>: number<br/><small>0 if no insulation; else Rsi + d/λ + Rso</small>"]
  owThermalR["<b>outerWallThermalResistance</b>: number<br/><small>constructionR + insulationR</small>"]
  owU["<b>outerWallUValue</b>: number<br/><small>override or 1 / thermalResistance</small>"]
  owFactor["<b>outerWallHeatLossFactor</b>: number<br/><small>config: outerWall.heatLossFactor</small>"]
  owHL["<b>outerWallHeatLoss</b>: number<br/><small>area × U × factor</small>"]

  owYear --> owConstrType
  owConstrType --> owConstrU
  owYear --> owConstrU
  owConstrU --> owConstrR
  owHasIns --> owInsR
  owInsThick --> owInsR
  owLambda --> owInsR
  owRsi --> owInsR
  owRso --> owInsR
  owConstrR --> owThermalR
  owInsR --> owThermalR
  owThermalR --> owU
  owArea --> owHL
  owU --> owHL
  owFactor --> owHL
end

%% ═══════════════ BOTTOM FLOOR ═══════════════
subgraph BF["Bottom Floor"]
  bfYear["<b>bottomFloorYear</b>: number | RangeKey<br/><small>override or buildingYear</small>"]
  bfArea["<b>bottomFloorArea</b>: number<br/><small>input: bottomFloor.area</small>"]
  hasBasement["<b>hasBasement</b>: boolean<br/><small>input: bottomFloor.hasBasement ?? false</small>"]
  bfIsHeated["<b>bottomFloorIsHeated</b>: boolean<br/><small>input: bottomFloor.isHeated ?? false</small>"]
  bfSpaceHeated["<b>isSpaceAboveBaseSlabHeated</b>: boolean<br/><small>!hasBasement ? true : isBasementHeated</small>"]
  bfHasIns["<b>bottomFloorHasInsulation</b>: boolean<br/><small>input: bottomFloor.hasInsulation ?? false</small>"]
  bfConstrType["<b>bottomFloorConstructionType</b>: string<br/><small>override or config yearBand by spaceHeated + year</small>"]
  bfConstrU["<b>bottomFloorConstructionUValue</b>: number<br/><small>config keyed by constructionType + year</small>"]
  bfConstrR["<b>bottomFloorConstructionResistance</b>: number<br/><small>1 / constructionUValue</small>"]
  bfInsThick["<b>bottomFloorInsulationThickness</b>: number<br/><small>override or config default</small>"]
  bfLambda["<b>bottomFloorThermalConductivity</b>: number<br/><small>config: bottomFloor.thermalConductivity</small>"]
  bfRsi["<b>bottomFloorInnerSurfaceThermalResistance</b>: number<br/><small>config by DOWNWARD heat flow</small>"]
  bfRso["<b>bottomFloorOuterSurfaceThermalResistance</b>: number<br/><small>config by DOWNWARD heat flow</small>"]
  bfInsR["<b>bottomFloorInsulationResistance</b>: number<br/><small>0 if no insulation; else Rsi + d/λ + Rso</small>"]
  bfThermalR["<b>bottomFloorThermalResistance</b>: number<br/><small>constructionR + insulationR</small>"]
  bfU["<b>bottomFloorUValue</b>: number<br/><small>override or 1 / thermalResistance</small>"]
  bfFactor["<b>bottomFloorHeatLossFactor</b>: number<br/><small>config: bottomFloor.heatLossFactor</small>"]
  bfHL["<b>bottomFloorHeatLoss</b>: number<br/><small>area × U × factor</small>"]

  hasBasement --> bfSpaceHeated
  bfSpaceHeated --> bfConstrType
  bfYear --> bfConstrType
  bfConstrType --> bfConstrU
  bfYear --> bfConstrU
  bfConstrU --> bfConstrR
  bfHasIns --> bfInsR
  bfInsThick --> bfInsR
  bfLambda --> bfInsR
  bfRsi --> bfInsR
  bfRso --> bfInsR
  bfConstrR --> bfThermalR
  bfInsR --> bfThermalR
  bfThermalR --> bfU
  bfArea --> bfHL
  bfU --> bfHL
  bfFactor --> bfHL
end

%% ═══════════════ TOP FLOOR ═══════════════
subgraph TF["Top Floor"]
  tfYear["<b>topFloorYear</b>: number | RangeKey<br/><small>override or buildingYear</small>"]
  tfArea["<b>topFloorArea</b>: number<br/><small>input: topFloor.area</small>"]
  hasAttic["<b>hasAttic</b>: boolean<br/><small>input: topFloor.hasAttic ?? false</small>"]
  isAtticHeated["<b>isAtticHeated</b>: boolean<br/><small>input: topFloor.isAtticHeated ?? false</small>"]
  tfType["<b>topFloorType</b>: string<br/><small>override or config yearBand by year</small>"]
  tfHasIns["<b>topFloorHasInsulation</b>: boolean<br/><small>input: topFloor.hasInsulation ?? false</small>"]
  tfConstrU["<b>topFloorConstructionUValue</b>: number<br/><small>config keyed by type + year</small>"]
  tfConstrR["<b>topFloorConstructionResistance</b>: number<br/><small>1 / constructionUValue</small>"]
  tfInsThick["<b>topFloorInsulationThickness</b>: number<br/><small>override or config default</small>"]
  tfLambda["<b>topFloorThermalConductivity</b>: number<br/><small>config: topFloor.thermalConductivity</small>"]
  tfRsi["<b>topFloorInnerSurfaceThermalResistance</b>: number<br/><small>config by UPWARD heat flow</small>"]
  tfRso["<b>topFloorOuterSurfaceThermalResistance</b>: number<br/><small>config by UPWARD heat flow</small>"]
  tfInsR["<b>topFloorInsulationResistance</b>: number<br/><small>0 if no insulation; else Rsi + d/λ + Rso</small>"]
  tfThermalR["<b>topFloorThermalResistance</b>: number<br/><small>constructionR + insulationR</small>"]
  tfU["<b>topFloorUValue</b>: number<br/><small>override or 1 / thermalResistance</small>"]
  tfFactor["<b>topFloorHeatLossFactor</b>: number<br/><small>config: topFloor.heatLossFactor</small>"]
  tfHL["<b>topFloorHeatLoss</b>: number<br/><small>area × U × factor</small>"]

  tfYear --> tfType
  tfType --> tfConstrU
  tfYear --> tfConstrU
  tfConstrU --> tfConstrR
  tfHasIns --> tfInsR
  tfInsThick --> tfInsR
  tfLambda --> tfInsR
  tfRsi --> tfInsR
  tfRso --> tfInsR
  tfConstrR --> tfThermalR
  tfInsR --> tfThermalR
  tfThermalR --> tfU
  tfArea --> tfHL
  tfU --> tfHL
  tfFactor --> tfHL
end

%% ═══════════════ ROOF ═══════════════
subgraph RF["Roof"]
  rfYear["<b>roofYear</b>: number | RangeKey<br/><small>override or buildingYear</small>"]
  rfArea["<b>roofArea</b>: number<br/><small>input: roof.area</small>"]
  rfHasIns["<b>roofHasInsulation</b>: boolean<br/><small>input: roof.hasInsulation ?? false</small>"]
  rfConstrType["<b>roofConstructionType</b>: string<br/><small>override or config default</small>"]
  rfConstrU["<b>roofConstructionUValue</b>: number<br/><small>config keyed by constructionType + year</small>"]
  rfConstrR["<b>roofConstructionResistance</b>: number<br/><small>1 / constructionUValue</small>"]
  rfInsThick["<b>roofInsulationThickness</b>: number<br/><small>override or config default</small>"]
  rfLambda["<b>roofThermalConductivity</b>: number<br/><small>config: roof.thermalConductivity</small>"]
  rfRsi["<b>roofInnerSurfaceThermalResistance</b>: number<br/><small>config by UPWARD heat flow</small>"]
  rfRso["<b>roofOuterSurfaceThermalResistance</b>: number<br/><small>config by UPWARD heat flow</small>"]
  rfInsRedFact["<b>roofInsulationReductionFactor</b>: number<br/><small>config: roof.insulationReductionFactor</small>"]
  rfInsR["<b>roofInsulationResistance</b>: number<br/><small>0 if no insulation; else Rsi + d/λ + Rso</small>"]
  rfBetweenR["<b>betweenRafterRoofResistance</b>: number<br/><small>insulationR / (reductionFactor + 1)</small>"]
  rfInsType["<b>roofInsulationType</b>: RoofInsulationType<br/><small>override or config default</small>"]
  rfTotalR["<b>roofTotalThermalResistance</b>: number<br/><small>BETWEEN_RAFTER? betweenR : constrR + insR</small>"]
  rfU["<b>roofUValue</b>: number<br/><small>override or 1 / totalThermalResistance</small>"]
  rfFactor["<b>roofHeatLossFactor</b>: number<br/><small>config: roof.heatLossFactor</small>"]
  rfHL["<b>roofHeatLoss</b>: number<br/><small>factor × U × area</small>"]
  rfSpaceBelow["<b>isSpaceBelowRoofHeated</b>: boolean<br/><small>!hasAttic ? true : isAtticHeated</small>"]

  rfYear --> rfConstrType
  rfConstrType --> rfConstrU
  rfYear --> rfConstrU
  rfConstrU --> rfConstrR
  rfHasIns --> rfInsR
  rfInsThick --> rfInsR
  rfLambda --> rfInsR
  rfRsi --> rfInsR
  rfRso --> rfInsR
  rfInsR --> rfBetweenR
  rfInsRedFact --> rfBetweenR
  rfInsType --> rfTotalR
  rfBetweenR --> rfTotalR
  rfConstrR --> rfTotalR
  rfInsR --> rfTotalR
  rfTotalR --> rfU
  rfArea --> rfHL
  rfU --> rfHL
  rfFactor --> rfHL
end

%% ═══════════════ EXTERIOR WALL WINDOWS ═══════════════
subgraph EWW["Exterior Wall Windows"]
  ewwYear["<b>exteriorWallWindowsYear</b>: number | RangeKey<br/><small>override or buildingYear</small>"]
  ewwArea["<b>exteriorWallWindowsArea</b>: number<br/><small>input: exteriorWallWindows.area</small>"]
  ewwType["<b>exteriorWallWindowsType</b>: string<br/><small>override or config yearBand</small>"]
  ewwU["<b>exteriorWallWindowsUValue</b>: number<br/><small>override or config keyed by type + year</small>"]
  ewwFactor["<b>exteriorWallWindowsHeatLossFactor</b>: number<br/><small>config: windows.exteriorWallWindowsHeatLossFactor</small>"]
  ewwHL["<b>exteriorWallWindowsHeatLoss</b>: number<br/><small>factor × U × area</small>"]

  ewwYear --> ewwType
  ewwType --> ewwU
  ewwYear --> ewwU
  ewwFactor --> ewwHL
  ewwU --> ewwHL
  ewwArea --> ewwHL
end

%% ═══════════════ ROOF WINDOWS ═══════════════
subgraph RWN["Roof Windows"]
  rwYear["<b>roofWindowsYear</b>: number | RangeKey<br/><small>override or buildingYear</small>"]
  rwArea["<b>roofWindowsArea</b>: number<br/><small>input: roofWindows.area</small>"]
  rwType["<b>roofWindowsType</b>: string<br/><small>override or config yearBand</small>"]
  rwU["<b>roofWindowsUValue</b>: number<br/><small>override or config keyed by type + year</small>"]
  rwFactor["<b>roofWindowsHeatLossFactor</b>: number<br/><small>config: windows.roofWindowsHeatLossFactor</small>"]
  rwHL["<b>roofWindowsHeatLoss</b>: number<br/><small>factor × U × area</small>"]

  rwYear --> rwType
  rwType --> rwU
  rwYear --> rwU
  rwFactor --> rwHL
  rwU --> rwHL
  rwArea --> rwHL
end

%% ═══════════════ VENTILATION ═══════════════
subgraph VNT["Ventilation"]
  airConst["<b>airDensitySpecificHeatCapacityProduct</b>: number<br/><small>hardcoded: 0.34</small>"]
  ventFact["<b>ventilationHeatLossCorrectionFactor</b>: number<br/><small>config: heat.ventilationHeatLossCorrectionFactor</small>"]
  ventHL["<b>ventilationHeatLoss</b>: number<br/><small>heatedAirVol × correctionFactor × 0.34</small>"]

  airConst --> ventHL
  ventFact --> ventHL
end

%% ═══════════════ HEATING SYSTEM ═══════════════
subgraph HS["Heating System"]
  priCarrier["<b>primaryEnergyCarrier</b>: string<br/><small>override or config default</small>"]
  sysType["<b>heatingSystemType</b>: string<br/><small>override or config keyed by primaryEnergyCarrier</small>"]
  sysYear["<b>heatingSystemConstructionYear</b>: number | RangeKey<br/><small>override or buildingYear</small>"]
  surfType["<b>heatingSurfaceType</b>: string<br/><small>override or config default</small>"]
  heatPF["<b>heatingPerformanceFactor</b>: number<br/><small>config keyed by systemType + year + usableFloorArea</small>"]
  tempCtrlPF["<b>temperatureControlPerformanceFactor</b>: number<br/><small>config keyed by systemType + year + surfaceType</small>"]
  combPF["<b>combinedHeatingPerformanceFactor</b>: number<br/><small>heatingPF + temperatureControlPF</small>"]
  degDays["<b>heatingDegreeDays</b>: number<br/><small>config: heat.heatingDegreeDays</small>"]
  heatLossSum["<b>heatLossSum</b>: number<br/><small>ventilation + (roof OR topFloor) + roofWin + wallWin + wall + floor</small>"]
  preHeatDemand["<b>preliminaryHeatingEnergyDemand</b>: number<br/><small>heatLossSum × heatingDegreeDays × 0.024</small>"]
  heatDemand["<b>heatingEnergyDemand</b>: number<br/><small>= preliminaryHeatingEnergyDemand (passthrough)</small>"]

  priCarrier --> sysType
  sysType --> heatPF
  sysYear --> heatPF
  sysType --> tempCtrlPF
  sysYear --> tempCtrlPF
  surfType --> tempCtrlPF
  heatPF --> combPF
  tempCtrlPF --> combPF
  degDays --> preHeatDemand
  heatLossSum --> preHeatDemand
  preHeatDemand --> heatDemand
end

%% ═══════════════ HOT WATER ═══════════════
subgraph HW["Hot Water"]
  hwFactor["<b>hotWaterEnergyDemandFromAreaFactor</b>: number<br/><small>config: heat.hotWaterEnergyDemandFromAreaFactor</small>"]
  hwDemand["<b>hotWaterEnergyDemand</b>: number<br/><small>netFloorArea × factor</small>"]

  hwFactor --> hwDemand
end

%% ═══════════════ PRIMARY ENERGY & OUTPUTS ═══════════════
subgraph PE["Primary Energy and Outputs"]
  priCarrierData["<b>primaryEnergyCarrierData</b>: PrimaryEnergyCarrierData<br/><small>config keyed by primaryEnergyCarrier</small>"]
  priCarrierEff["<b>primaryEnergyCarrierEfficiencyFactor</b>: number<br/><small>config keyed by primaryEnergyCarrier</small>"]
  co2Fact["<b>co2Factor</b>: number<br/><small>config keyed by primaryEnergyCarrier</small>"]
  totalDemand["<b>totalEnergyDemand</b>: number<br/><small>heatingDemand × combinedPF + hotWaterDemand</small>"]
  totalDemandM2["<b>totalEnergyDemandPerSquareMeter</b>: number<br/><small>totalDemand / usableFloorArea</small>"]
  priDemand["<b>primaryEnergyDemand</b>: number<br/><small>totalDemand × efficiencyFactor</small>"]
  priDemandM2["<b>primaryEnergyDemandPerSquareMeter</b>: number<br/><small>primaryDemand / usableFloorArea</small>"]
  effClass["<b>energyEfficiencyClass</b>: EnergyEfficiencyClass<br/><small>config rangeBand by primaryDemandPerM2</small>"]
  co2Emit["<b>co2Emissions</b>: number<br/><small>totalDemand × co2Factor × 0.000001</small>"]
  consumption["<b>energyCarrierConsumption</b>: number<br/><small>totalDemand / energyPerUnit</small>"]
  cost["<b>energyCarrierCost</b>: number<br/><small>consumption × unitRate + baseRate</small>"]
  hasRenewable["<b>hasRenewableEnergy</b>: boolean<br/><small>input: electricity.hasRenewableEnergy ?? false</small>"]
  hasGas["<b>hasGasSupply</b>: boolean<br/><small>input: heat.hasGasSupply ?? false</small>"]
  hasBiogas["<b>hasBioGas</b>: boolean<br/><small>input: heat.hasBioGas ?? false</small>"]
  hasStore["<b>hasStorage</b>: boolean<br/><small>input: heat.hasStorage ?? false</small>"]

  priCarrierData --> consumption
  priCarrierData --> cost
  priCarrierEff --> priDemand
  co2Fact --> co2Emit
  totalDemand --> totalDemandM2
  totalDemand --> priDemand
  totalDemand --> co2Emit
  totalDemand --> consumption
  priDemand --> priDemandM2
  priDemandM2 --> effClass
  consumption --> cost
end

%% ═══════════════ CROSS-GROUP EDGES ═══════════════

%% buildingYear -> all component years
bYear --> owYear
bYear --> bfYear
bYear --> tfYear
bYear --> rfYear
bYear --> ewwYear
bYear --> rwYear
bYear --> sysYear

%% basement flags cross subgraph boundaries
hasBasement --> nHeatedStories
bIsBasHeated --> bfSpaceHeated
hasBasement --> bfSpaceHeated

%% attic flags cross subgraph boundaries
hasAttic --> nHeatedStories
isAtticHeated --> nHeatedStories
hasAttic --> rfSpaceBelow
isAtticHeated --> rfSpaceBelow

%% heatedAirVolume feeds ventilation
airVol --> ventHL

%% usableFloorArea feeds heating performance factor lookup and per-m2 outputs
usableArea --> heatPF
usableArea --> totalDemandM2
usableArea --> priDemandM2

%% netFloorArea feeds hot water demand
netArea --> hwDemand

%% all component heat losses -> heatLossSum
owHL --> heatLossSum
bfHL --> heatLossSum
ewwHL --> heatLossSum
rwHL --> heatLossSum
ventHL --> heatLossSum
tfHL --> heatLossSum
rfHL --> heatLossSum
rfSpaceBelow -. "selects roof or topFloor" .-> heatLossSum

%% heating demand chain -> total energy demand
heatDemand --> totalDemand
combPF --> totalDemand
hwDemand --> totalDemand

%% primaryEnergyCarrier -> PE carrier lookups
priCarrier --> priCarrierData
priCarrier --> priCarrierEff
priCarrier --> co2Fact

%% ═══════════════ STYLES ═══════════════
style BLD fill:#dbeafe,stroke:#93c5fd,color:#1e3a5f
style OW  fill:#fed7aa,stroke:#f97316,color:#431407
style BF  fill:#d1fae5,stroke:#34d399,color:#064e3b
style TF  fill:#fef3c7,stroke:#fbbf24,color:#451a03
style RF  fill:#e9d5ff,stroke:#a855f7,color:#3b0764
style EWW fill:#bfdbfe,stroke:#3b82f6,color:#1e3a5f
style RWN fill:#99f6e4,stroke:#14b8a6,color:#042f2e
style VNT fill:#fce7f3,stroke:#ec4899,color:#500724
style HS  fill:#fee2e2,stroke:#ef4444,color:#450a0a
style HW  fill:#f5f5f4,stroke:#a3a3a3,color:#1c1917
style PE  fill:#fef9c3,stroke:#eab308,color:#422006
```
