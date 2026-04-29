import type { Resolver } from "../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../";

declare module "../" {
  interface DETCalculatorRegistry {
    electricityOffset: number;
  }
}

export default {
  key: "electricityOffset",
  resolve: (ctx) => {
    const preRenovationValues = ctx.input.input.preRenovationValues;
    if (preRenovationValues != null) {
      return preRenovationValues.electricityOffset;
    }
    const userElectricityConsumption = ctx.input.input.electricity.userElectricityConsumption;
    if (userElectricityConsumption != null) {
      return userElectricityConsumption - ctx.get("calculatedElectricalEnergyDemand");
    }
    return 0;
  },
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "electricityOffset"
>;
