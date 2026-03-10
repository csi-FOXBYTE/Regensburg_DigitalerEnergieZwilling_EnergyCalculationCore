import test from "node:test";
import assert from "node:assert/strict";
import { resolve } from "node:path";

import { createGenerator } from "ts-json-schema-generator";

test("CoreConfigJsonSchemaSource can be converted to JSON Schema", () => {
  const generator = createGenerator({
    path: resolve(process.cwd(), "src/config/core-config-schema-source.ts"),
    tsconfig: resolve(process.cwd(), "tsconfig.json"),
    type: "CoreConfigJsonSchemaSource",
    expose: "export",
    additionalProperties: false,
    jsDoc: "extended",
    skipTypeCheck: false,
  });

  const schema = generator.createSchema("CoreConfigJsonSchemaSource") as {
    $ref?: string;
    definitions?: Record<string, unknown>;
  };

  assert.equal(schema.$ref, "#/definitions/CoreConfigJsonSchemaSource");
  assert.ok(schema.definitions);
  assert.ok("CoreConfigJsonSchemaSource" in schema.definitions);
  assert.ok("CoreConfigJson<JsonCatalogConfigMap,HeatingConfig,EnergyConfig>" in schema.definitions);
});
