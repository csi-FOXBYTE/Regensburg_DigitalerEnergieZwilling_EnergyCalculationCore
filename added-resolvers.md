# Added Resolvers

- primaryEnergyCarrierData — keyed config lookup by primaryEnergyCarrier, returns `{ energyPerUnit, unitRate, baseRate }`
- energyCarrierConsumption — totalEnergyDemand / primaryEnergyCarrierData.energyPerUnit
- energyCarrierCost — energyCarrierConsumption * unitRate + baseRate
