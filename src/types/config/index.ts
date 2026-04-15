import type { DETGeneralConfig } from "./general"
import type { DETHeatConfig } from "./heat"
import type { DETRoofConfig } from "./roof"
import type { DETTopFloorConfig } from "./topFloor"
import type { DETOuterWallConfig } from "./outerWall"
import type { DETBaseSlabConfig } from "./baseSlab"
import type { DETWindowsConfig } from "./windows"

export type DETConfig = {
  general: DETGeneralConfig,
  heat: DETHeatConfig,
  roof: DETRoofConfig,
  topFloor: DETTopFloorConfig,
  outerWall: DETOuterWallConfig,
  baseSlab: DETBaseSlabConfig,
  windows: DETWindowsConfig,
}