import type { Resolver } from "../../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../../";
import { resolveYearBand } from "../../../../types/range-bands.js";

declare module "../../" {
  interface DETCalculatorRegistry {
    exteriorWallWindowsType: string;
  }
}

export default {
  key: "exteriorWallWindowsType",
  resolve: (ctx) => {
    const override = ctx.input.input.exteriorWallWindows.windowType;
    if (override != null) return override;
    const result = resolveYearBand(
      ctx.input.config.windows.defaultWindowType,
      ctx.get("exteriorWallWindowsYear"),
    );
    if (result == null)
      throw new Error("Failed to resolve exteriorWallWindowsType");
    return result;
  },
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "exteriorWallWindowsType"
>;
