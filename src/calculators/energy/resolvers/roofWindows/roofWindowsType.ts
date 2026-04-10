import type { Resolver } from "../../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../../";
import { resolveYearBand } from "../../../../types/range-bands.js";

declare module "../../" {
  interface DETCalculatorRegistry {
    roofWindowsType: string;
  }
}

export default {
  key: "roofWindowsType",
  resolve: (ctx) => {
    const override = ctx.input.input.roofWindows.windowType;
    if (override != null) return override;
    const result = resolveYearBand(
      ctx.input.config.windows.defaultWindowType,
      ctx.get("roofWindowsYear"),
    );
    if (result == null) throw new Error("Failed to resolve roofWindowsType");
    return result;
  },
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "roofWindowsType"
>;
