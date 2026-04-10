import type { DETExteriorWallWindowsInput } from "./exteriorWallWindows";
import type { DETGeneralInput } from "./general";
import type { DETHeatInput } from "./heat";
import type { DETRoofInput } from "./roof";
import type { DETRoofWindowsInput } from "./roofWindows";

export type DETInput = {
  general: DETGeneralInput;
  heat: DETHeatInput;
  roof: DETRoofInput;
  roofWindows: DETRoofWindowsInput;
  exteriorWallWindows: DETExteriorWallWindowsInput;
};
