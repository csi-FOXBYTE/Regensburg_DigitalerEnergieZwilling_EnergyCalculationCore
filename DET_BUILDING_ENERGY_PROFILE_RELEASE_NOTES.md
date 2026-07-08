# DETBuildingEnergyProfile Generator Release Notes

## Added

- Added a canonical `DETBuildingEnergyProfile` model definition with all NGSI-LD attributes.
- Added a generator for:
  - JSON-LD context
  - NGSI-LD example payload
  - key-value example payload
  - JSON Schema
- Added deterministic JSON output with 2-space formatting.
- Added a repository-local generator config file:
  - `det-building-energy-profile.config.ts`
- Added a CLI entry point:
  - `generate-det-building-energy-profile`
- Added a local script wrapper:
  - `pnpm run gen:det-building-energy-profile`
- Added a generator test covering config-driven output and generated artifacts.

## Changed

- Moved deployment-specific metadata such as `contextUrl`, `namespace`, `schemaId`, `description`, and `outputDir` into config.
- Kept the canonical model definition focused on entity type and attributes.
- Added `KWH` unit codes only for attributes already emitted with `kwh(...)` in the existing NGSI-LD entity mapper.
- Replaced placeholder descriptions with data-consumer-facing descriptions.
- Kept all domain attributes optional by default; only `id` and `type` are required in the generated schema.

## Backend Usage

Backend repositories can provide their own root-level config file:

```ts
import type { DetBuildingEnergyProfileGeneratorConfig } from "@csi-foxbyte/regensburg_digitalerenergiezwilling_energycalculationcore";

export default {
  outputDir: "generated/det-building-energy-profile",
  contextUrl: "https://example.org/det-building-energy-profile/context.jsonld",
  namespace: "https://example.org/det-building-energy-profile/context.jsonld#",
  schemaId: "https://example.org/det-building-energy-profile/schema.json",
  description: "Annual building energy profile covering energy demand, costs, emissions, heating system and energy carrier information.",
} satisfies DetBuildingEnergyProfileGeneratorConfig;
```

Then run:

```bash
generate-det-building-energy-profile
```

## Notes

- Generated files are written relative to the current working directory.
- The CLI searches for `det-building-energy-profile.config.*` in the current working directory by default.
- The generated artifacts should be regenerated after model or config changes.
