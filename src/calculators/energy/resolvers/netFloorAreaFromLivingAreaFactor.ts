import type { Resolver } from "../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../";

declare module "../" {
  interface DETCalculatorRegistry {
    netFloorAreaFromLivingAreaFactor: number;
  }
}

export default {
  key: "netFloorAreaFromLivingAreaFactor",
  resolve: (ctx) => ctx.input.config.general.netFloorAreaFromLivingAreaFactor,
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "netFloorAreaFromLivingAreaFactor"
>;
