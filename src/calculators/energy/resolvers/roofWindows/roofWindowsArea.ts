import type { Resolver } from "../../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../../";

declare module "../../" {
  interface DETCalculatorRegistry {
    roofWindowsArea: number;
  }
}

export default {
  key: "roofWindowsArea",
  resolve: (ctx) =>
    ctx.input.input.roofWindows.area ??
    ctx.get("roofArea") * ctx.input.config.windows.roofAreaFactor,
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "roofWindowsArea"
>;
