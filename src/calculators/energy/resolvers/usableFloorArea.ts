import type { Resolver } from "../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../";

declare module "../" {
  interface DETCalculatorRegistry {
    usableFloorArea: number;
  }
}

export default {
  key: "usableFloorArea",
  resolve: (ctx) =>
    ctx.get("grossHeatedVolume") *
    ctx.input.config.general.usableFloorAreaFactor,
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "usableFloorArea"
>;
