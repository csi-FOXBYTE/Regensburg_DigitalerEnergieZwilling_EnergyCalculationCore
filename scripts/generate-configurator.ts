import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

import { build } from "esbuild";
import { createGenerator } from "ts-json-schema-generator";

import { defaultCoreConfigJson } from "../src/config/default-core-config";
import { defaultCoreInputJson } from "../src/config/default-core-input";

const outputPath = resolve(process.cwd(), "docs/configurator.html");
const configSchemaOutputPath = resolve(process.cwd(), "docs/core-config.schema.json");
const inputSchemaOutputPath = resolve(process.cwd(), "docs/core-input.schema.json");

async function main(): Promise<void> {
  await mkdir(dirname(outputPath), { recursive: true });

  const configSchema = simplifyConfiguratorSchema(
    generateJsonSchema("src/config/core-config-schema-source.ts", "CoreConfigJsonSchemaSource"),
  );
  const inputSchema = simplifyConfiguratorSchema(
    generateJsonSchema("src/config/core-input-schema-source.ts", "CoreInputSchemaSource"),
  );
  const appBundle = await bundleBrowserApp();

  const html = renderConfiguratorHtml({
    configSchema,
    inputSchema,
    configDefaults: defaultCoreConfigJson,
    inputDefaults: defaultCoreInputJson,
    appBundle,
  });

  await writeFile(configSchemaOutputPath, JSON.stringify(configSchema, null, 2), "utf8");
  await writeFile(inputSchemaOutputPath, JSON.stringify(inputSchema, null, 2), "utf8");
  await writeFile(outputPath, html, "utf8");
  console.log(`Configurator written to ${outputPath}`);
}

function generateJsonSchema(path: string, type: string): unknown {
  const generator = createGenerator({
    path: resolve(process.cwd(), path),
    tsconfig: resolve(process.cwd(), "tsconfig.json"),
    type,
    expose: "export",
    additionalProperties: false,
    jsDoc: "extended",
    skipTypeCheck: false,
  });

  return generator.createSchema(type);
}

async function bundleBrowserApp(): Promise<string> {
  const result = await build({
    entryPoints: [resolve(process.cwd(), "src/configurator/app.ts")],
    bundle: true,
    format: "iife",
    platform: "browser",
    target: ["es2020"],
    minify: false,
    sourcemap: false,
    write: false,
  });

  const output = result.outputFiles[0];
  if (!output) {
    throw new Error("Bundled configurator app output is missing.");
  }

  return output.text;
}

function simplifyConfiguratorSchema(schema: unknown): unknown {
  if (!isRecord(schema)) {
    return schema;
  }

  const definitions = schema.definitions;
  if (!isRecord(definitions)) {
    return schema;
  }

  const resolvedRoot = resolveDefinitionRef(definitions, schema.$ref);

  const normalizedSchema = {
    ...schema,
    ...(resolvedRoot ? resolvedRoot : {}),
    $ref: undefined,
    definitions,
  };

  return dereferenceLocalRefs(normalizedSchema, normalizedSchema);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function resolveDefinitionRef(
  definitions: Record<string, unknown>,
  ref: unknown,
): Record<string, unknown> | undefined {
  if (typeof ref !== "string" || !ref.startsWith("#/definitions/")) {
    return undefined;
  }

  const definitionKey = decodeURIComponent(ref.replace("#/definitions/", ""));
  const definition = definitions[definitionKey];
  if (!isRecord(definition)) {
    return undefined;
  }

  if (typeof definition.$ref === "string") {
    return resolveDefinitionRef(definitions, definition.$ref) ?? definition;
  }

  return definition;
}

function dereferenceLocalRefs(node: unknown, rootSchema: Record<string, unknown>, stack: readonly string[] = []): unknown {
  if (Array.isArray(node)) {
    return node.map((entry) => dereferenceLocalRefs(entry, rootSchema, stack));
  }

  if (!isRecord(node)) {
    return node;
  }

  if (typeof node.$ref === "string" && node.$ref.startsWith("#/definitions/")) {
    const ref = node.$ref;
    if (stack.includes(ref)) {
      return node;
    }

    const definitions = isRecord(rootSchema.definitions) ? rootSchema.definitions : {};
    const resolved = resolveDefinitionRef(definitions, ref);
    if (!resolved) {
      return node;
    }

    const { $ref: _ignoredRef, ...rest } = node;
    return dereferenceLocalRefs(
      {
        ...resolved,
        ...rest,
      },
      rootSchema,
      [...stack, ref],
    );
  }

  return Object.fromEntries(
    Object.entries(node).map(([key, value]) => [key, dereferenceLocalRefs(value, rootSchema, stack)]),
  );
}

function renderConfiguratorHtml(input: {
  configSchema: unknown;
  inputSchema: unknown;
  configDefaults: unknown;
  inputDefaults: unknown;
  appBundle: string;
}): string {
  const configSchemaJson = JSON.stringify(input.configSchema, null, 2);
  const inputSchemaJson = JSON.stringify(input.inputSchema, null, 2);
  const configDefaultsJson = JSON.stringify(input.configDefaults, null, 2);
  const inputDefaultsJson = JSON.stringify(input.inputDefaults, null, 2);

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Core Configurator</title>
    <style>
      :root {
        --bg: #f3f5f8;
        --panel: #ffffff;
        --panel-alt: #eef2f7;
        --text: #17202b;
        --muted: #5f6b7a;
        --border: #cdd6e1;
        --border-strong: #9aa7b8;
        --accent: #1f4b99;
        --accent-soft: #dbe8ff;
        --shadow: 0 8px 24px rgba(22, 32, 43, 0.08);
      }

      * { box-sizing: border-box; }

      body {
        margin: 0;
        color: var(--text);
        font-family: "IBM Plex Sans", "Segoe UI", sans-serif;
        background:
          linear-gradient(180deg, #f8fafc 0%, #eef3f8 100%);
      }

      .page {
        width: min(1600px, calc(100vw - 32px));
        margin: 24px auto 40px;
      }

      .hero, .panel {
        background: var(--panel);
        border: 1px solid var(--border);
        border-radius: 10px;
        box-shadow: var(--shadow);
      }

      .hero {
        padding: 20px 22px;
        margin-bottom: 20px;
      }

      .eyebrow {
        margin: 0 0 8px;
        color: var(--accent);
        font-size: 11px;
        font-weight: 600;
        letter-spacing: 0.1em;
        text-transform: uppercase;
      }

      h1 {
        margin: 0 0 8px;
        font-size: clamp(26px, 4vw, 38px);
        line-height: 1.1;
        font-family: "IBM Plex Sans", "Segoe UI", sans-serif;
        font-weight: 600;
      }

      .hero p {
        max-width: 1080px;
        margin: 0;
        color: var(--muted);
        font-size: 14px;
        line-height: 1.6;
      }

      .tab-shell {
        display: grid;
        gap: 14px;
      }

      .tab-strip {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }

      .tab-button {
        appearance: none;
        border: 1px solid var(--border);
        background: var(--panel);
        color: var(--muted);
        padding: 9px 14px;
        border-radius: 6px;
        font: 13px/1.3 "IBM Plex Sans", "Segoe UI", sans-serif;
        cursor: pointer;
        transition: background 120ms ease, border-color 120ms ease, color 120ms ease;
      }

      .tab-button:hover {
        border-color: var(--border-strong);
        background: #f8fbff;
        color: var(--text);
      }

      .tab-button.active {
        border-color: var(--accent);
        background: var(--accent-soft);
        color: var(--accent);
      }

      .tab-panel {
        display: none;
      }

      .tab-panel.active {
        display: block;
      }

      .panel {
        padding: 20px;
      }

      .panel-heading {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        gap: 12px;
        margin-bottom: 14px;
        padding-bottom: 10px;
        border-bottom: 1px solid var(--border);
      }

      .panel-heading h2 {
        margin: 0;
        font-size: 18px;
        font-family: "IBM Plex Sans", "Segoe UI", sans-serif;
        font-weight: 600;
      }

      .panel-heading p {
        margin: 0;
        color: var(--muted);
        font-size: 12px;
      }

      .toolbar {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-bottom: 16px;
      }

      button, .button-label {
        appearance: none;
        border: 1px solid var(--border);
        background: var(--panel);
        color: var(--text);
        padding: 8px 12px;
        border-radius: 6px;
        font: 13px/1.3 "IBM Plex Sans", "Segoe UI", sans-serif;
        cursor: pointer;
        transition: background 120ms ease, border-color 120ms ease, color 120ms ease;
      }

      button.primary {
        background: var(--accent);
        border-color: var(--accent);
        color: #ffffff;
      }

      button:hover, .button-label:hover {
        border-color: var(--border-strong);
        background: #f8fbff;
      }

      input[type="file"] { display: none; }

      .status {
        margin-bottom: 16px;
        padding: 10px 12px;
        border-radius: 6px;
        border: 1px solid var(--border);
        background: var(--panel-alt);
        color: var(--muted);
        font-size: 12px;
      }

      .status.error {
        background: #fbecec;
        border-color: #e3b9b9;
        color: #8a2d2d;
      }

      .status.success {
        background: #e8f3ea;
        border-color: #b9d5c0;
        color: #235c35;
      }

      .section-title {
        margin: 14px 0 10px;
        font-size: 11px;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: var(--muted);
      }

      textarea {
        width: 100%;
        min-height: 260px;
        resize: vertical;
        border: 1px solid var(--border);
        border-radius: 6px;
        padding: 12px;
        background: #fff;
        color: var(--text);
        font: 12px/1.5 "IBM Plex Mono", "SFMono-Regular", monospace;
      }

      .result-preview {
        min-height: 720px;
      }

      .notes {
        margin-top: 12px;
        color: var(--muted);
        font-size: 12px;
        line-height: 1.6;
      }

      #config-editor .je-object__container,
      #config-editor .well,
      #input-editor .je-object__container,
      #input-editor .well {
        border-radius: 6px;
      }

      @media (max-width: 1280px) {
        .result-preview {
          min-height: 420px;
        }
      }

      @media (max-width: 980px) {
        .page {
          width: min(100vw - 20px, 1600px);
          margin: 10px auto 24px;
        }

        .hero,
        .panel {
          border-radius: 8px;
        }
      }
    </style>
  </head>
  <body>
    <div class="page">
      <section class="hero">
        <p class="eyebrow">Energy Calculation Core</p>
        <h1>Configuration and Calculation Interface</h1>
        <p>
          Generated from the project's TypeScript types. Configuration and input are edited with Jedison, validated
          against JSON Schema, and evaluated with the same calculation runtime as the library.
        </p>
      </section>

      <div class="tab-shell">
        <div class="tab-strip" role="tablist" aria-label="Configurator sections">
          <button class="tab-button active" type="button" role="tab" aria-selected="true" data-tab-target="configuration">
            Configuration
          </button>
          <button class="tab-button" type="button" role="tab" aria-selected="false" data-tab-target="input">
            Input
          </button>
          <button class="tab-button" type="button" role="tab" aria-selected="false" data-tab-target="result">
            Result
          </button>
        </div>

        <section class="panel tab-panel active" data-tab-panel="configuration">
          <div class="panel-heading">
            <h2>Configuration</h2>
            <p>Catalogs, defaults, rules, factors</p>
          </div>
          <div class="toolbar">
            <button id="config-reset" type="button">Reset</button>
            <label class="button-label" for="config-import-file">Import</label>
            <input id="config-import-file" type="file" accept="application/json,.json" />
            <button id="config-copy" class="primary" type="button">Copy</button>
            <button id="config-download" type="button">Download</button>
            <button id="config-validate" type="button">Validate</button>
          </div>
          <div id="config-status" class="status">Loading configuration editor...</div>
          <div id="config-editor"></div>
          <p class="section-title">Configuration JSON</p>
          <textarea id="config-preview" spellcheck="false" readonly></textarea>
        </section>

        <section class="panel tab-panel" data-tab-panel="input" hidden>
          <div class="panel-heading">
            <h2>Input</h2>
            <p>Building-specific input for one calculation run</p>
          </div>
          <div class="toolbar">
            <button id="input-reset" type="button">Reset</button>
            <label class="button-label" for="input-import-file">Import</label>
            <input id="input-import-file" type="file" accept="application/json,.json" />
            <button id="input-copy" class="primary" type="button">Copy</button>
            <button id="input-download" type="button">Download</button>
            <button id="input-validate" type="button">Validate</button>
          </div>
          <div id="input-status" class="status">Loading input editor...</div>
          <div id="input-editor"></div>
          <p class="section-title">Input JSON</p>
          <textarea id="input-preview" spellcheck="false" readonly></textarea>
        </section>

        <aside class="panel tab-panel" data-tab-panel="result" hidden>
          <div class="panel-heading">
            <h2>Result</h2>
            <p>Runtime output from <code>calculateCore(...)</code></p>
          </div>
          <div class="toolbar">
            <button id="calculate" class="primary" type="button">Calculate</button>
            <button id="result-copy" type="button">Copy</button>
            <button id="result-download" type="button">Download</button>
          </div>
          <div id="result-status" class="status">Preparing runtime...</div>
          <textarea id="result-preview" class="result-preview" spellcheck="false" readonly></textarea>
          <div class="notes">
            Schema validation checks only structure. Runtime calculation can still fail if the input no longer matches
            the edited configuration, for example when catalog or construction names differ.
          </div>
        </aside>
      </div>
    </div>

    <script type="application/json" id="core-config-schema">${configSchemaJson}</script>
    <script type="application/json" id="core-input-schema">${inputSchemaJson}</script>
    <script type="application/json" id="core-config-defaults">${configDefaultsJson}</script>
    <script type="application/json" id="core-input-defaults">${inputDefaultsJson}</script>
    <script src="https://cdn.jsdelivr.net/npm/jedison@1.5.1/dist/umd/jedison.umd.js"></script>
    <script>${input.appBundle}</script>
  </body>
</html>
`;
}

void main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
