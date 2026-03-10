import { coreConfigFromJson, defaultCoreConfig, resolveUValue } from "../../src/index";
import type {
  CatalogName,
  ConstructionName,
  CoreConfigJson,
  CoreInput,
  HeatingTypeFromConfigs,
} from "../../src/index";

type Equal<A, B> =
  (<T>() => T extends A ? 1 : 2) extends
  (<T>() => T extends B ? 1 : 2)
    ? true
    : false;

type Assert<T extends true> = T;

const typedConfigJson = {
  envelope: {
    defaultFactor: 1,
    defaultDeltaUwb: 0.1,
    catalogs: {
      category1: {
        roof: [
          { to: 1990, value: 1.2 },
          { from: 1991, value: 0.8 },
        ],
        wall: [
          { to: 1990, value: 1.5 },
          { from: 1991, value: 0.9 },
        ],
      },
      category2: {
        window: [
          { to: 1990, value: 3.1 },
          { from: 1991, value: 1.6 },
        ],
      },
    },
    recommendations: {
      roof: [],
      roofWindow: [],
      wall: [],
      wallWindow: [],
      topFloorCeiling: [],
      lowestFloor: [],
    },
  },
  heating: defaultCoreConfig.heating,
  energy: defaultCoreConfig.energy,
} satisfies CoreConfigJson;

const typedConfig = coreConfigFromJson(typedConfigJson);

type TypedCatalogs = typeof typedConfig.envelope.catalogs;
type _CatalogNames = Assert<Equal<CatalogName<TypedCatalogs>, "category1" | "category2">>;
type _Category1Constructions = Assert<Equal<ConstructionName<TypedCatalogs, "category1">, "roof" | "wall">>;
type _Category2Constructions = Assert<Equal<ConstructionName<TypedCatalogs, "category2">, "window">>;

const validInput: CoreInput<TypedCatalogs> = {
  wallWindow: {
    wall: {
      catalog: "category1",
      construction: "wall",
      year: 1980,
      area: 20,
    },
    window: {
      uValue: 1.2,
      area: 4,
    },
  },
};

resolveUValue(
  {
    catalog: "category1",
    construction: "roof",
    year: 1985,
  },
  typedConfig.envelope.catalogs,
);

// @ts-expect-error invalid construction for the chosen catalog
resolveUValue({ catalog: "category1", construction: "window", year: 1985 }, typedConfig.envelope.catalogs);

// @ts-expect-error invalid catalog for the provided config
const invalidSurface: CoreInput<TypedCatalogs>["topFloorCeiling"] = {
  catalog: "missing",
  construction: "wall",
  year: 1980,
  area: 5,
};

void validInput;
void invalidSurface;

type DefaultHeatingType = HeatingTypeFromConfigs<typeof defaultCoreConfig.heating, typeof defaultCoreConfig.energy>;

const validHeatingInput: CoreInput<typeof defaultCoreConfig.envelope.catalogs, DefaultHeatingType>["heating"] = {
  mode: "central",
  primaryCarrier: "gas",
  primaryType: "standard_boiler_gas",
};

const validHeatingInputFromEnergyConfig: CoreInput<
  typeof defaultCoreConfig.envelope.catalogs,
  DefaultHeatingType
>["heating"] = {
  mode: "central",
  primaryCarrier: "oil",
  primaryType: "condensing_boiler_oil",
};

void validHeatingInput;
void validHeatingInputFromEnergyConfig;
