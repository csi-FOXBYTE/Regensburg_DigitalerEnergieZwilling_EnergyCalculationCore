import type { CoreInput } from "../core/types";
import type { HeatingTypeFromConfigs } from "../heating/types";
import { defaultCoreConfig } from "./default-core-config";

/**
 * Default example input used as the configurator baseline.
 *
 * @group Configuration
 */
export const defaultCoreInputJson = {
  roofWindow: {
    roof: {
      catalog: "category1",
      construction: "roof_massive",
      year: 1985,
      area: 120,
    },
    roofWindow: {
      catalog: "category1",
      construction: "window_pvc_iso",
      year: 2002,
      area: 18,
    },
    envelopeArea: 150,
  },
  wallWindow: {
    wall: {
      catalog: "category1",
      construction: "wall_over_20cm",
      year: 1975,
      area: 180,
    },
    window: {
      catalog: "category1",
      construction: "window_wood_double",
      year: 1998,
      area: 32,
    },
    envelopeArea: 212,
  },
  topFloorCeiling: {
    catalog: "category1",
    construction: "topFloorCeiling_massive",
    year: 1975,
    area: 110,
  },
  lowestFloor: {
    catalog: "category1",
    construction: "lowestFloor_concrete",
    year: 1975,
    area: 110,
  },
  aggregateReferenceAreaOverride: 582,
  heating: {
    mode: "central",
    primaryCarrier: "gas",
    primaryType: "standard_boiler_gas",
    yearOfConstruction: 1995,
    details: {
      controlType: "room_temperature_control",
      emitterType: "radiator",
      flowTemperatureC: 70,
      radiatorPosition: "exterior_wall",
      intermittentOperation: true,
      singleRoomControlType: "independent",
    },
  },
  energy: {
    degreeDaysKdPerA: 3000,
    heatedAirVolumeM3: 700,
    airChangeRate: 0.5,
    peopleCount: 4,
    solarGainEntries: [
      {
        area: 20,
        irradiationKWhPerM2A: 180,
        energyTransmittance: 0.5,
      },
    ],
  },
} satisfies CoreInput<
  typeof defaultCoreConfig.envelope.catalogs,
  HeatingTypeFromConfigs<typeof defaultCoreConfig.heating, typeof defaultCoreConfig.energy>
>;
