import type { DETElectricityInput } from "./electricity";
import type { DETExteriorWallWindowsInput } from "./exteriorWallWindows";
import type { DETGeneralInput } from "./general";
import type { DETHeatInput } from "./heat";
import type { DETRoofInput } from "./roof";
import type { DETRoofWindowsInput } from "./roofWindows";
import type { DETTopFloorInput } from "./topFloor";
import type { DETOuterWallInput } from "./outerWall";
import type { DETBottomFloorInput } from "./bottomFloor";

export type DETInput = {
  general: DETGeneralInput;
  heat: DETHeatInput;
  electricity: DETElectricityInput;
  roof: DETRoofInput;
  roofWindows: DETRoofWindowsInput;
  exteriorWallWindows: DETExteriorWallWindowsInput;
  topFloor: DETTopFloorInput;
  outerWall: DETOuterWallInput;
  bottomFloor: DETBottomFloorInput;
};
