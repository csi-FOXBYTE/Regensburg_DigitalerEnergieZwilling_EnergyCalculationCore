import type { Resolver } from "../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../";

declare module "../" {
  interface DETCalculatorRegistry {
    netFloorArea: number;
  }
}

export default {
  key: "netFloorArea",
  resolve: (ctx) => {
    const livingArea = ctx.get("livingArea");
    if (livingArea != null) {
      return livingArea * ctx.get("netFloorAreaFromLivingAreaFactor");
    }
    return ctx.get("usableFloorArea") * ctx.get("netFloorAreaFromUsableFloorAreaFactor");
  },
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "netFloorArea"
>;
