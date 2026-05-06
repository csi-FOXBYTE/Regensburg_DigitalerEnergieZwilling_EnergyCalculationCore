import type { Resolver } from "../../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../../";

declare module "../../" {
  interface DETCalculatorRegistry {
    exteriorWallWindowsArea: number;
  }
}

export default {
  key: "exteriorWallWindowsArea",
  resolve: (ctx) =>
    ctx.input.input.exteriorWallWindows.area ??
    ctx.get("outerWallArea") * ctx.input.config.windows.exteriorWallAreaFactor,
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "exteriorWallWindowsArea"
>;
