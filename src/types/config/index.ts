import type { DETGeneralConfig } from "./general"
import type { DETHeatConfig } from "./heat"
import type { DETRoofConfig } from "./roof"
import type { DETWindowsConfig } from "./windows"

export type DETConfig = {
  general: DETGeneralConfig,
  heat: DETHeatConfig,
  roof: DETRoofConfig,
  windows: DETWindowsConfig,
}