import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

import { defaultCoreConfigJson } from "../src/config/default-core-config";
import { createGenerator } from "ts-json-schema-generator";

const outputPath = resolve(process.cwd(), "docs/configurator.html");
const schemaOutputPath = resolve(process.cwd(), "docs/core-config.schema.json");

async function main(): Promise<void> {
  await mkdir(dirname(outputPath), { recursive: true });
  const schema = simplifyConfiguratorSchema(generateCoreConfigJsonSchema());

  const html = renderConfiguratorHtml({
    schema,
    defaults: defaultCoreConfigJson,
  });

  await writeFile(schemaOutputPath, JSON.stringify(schema, null, 2), "utf8");
  await writeFile(outputPath, html, "utf8");
  console.log(`Configurator written to ${outputPath}`);
}

function generateCoreConfigJsonSchema(): unknown {
  const generator = createGenerator({
    path: resolve(process.cwd(), "src/config/core-config-schema-source.ts"),
    tsconfig: resolve(process.cwd(), "tsconfig.json"),
    type: "CoreConfigJsonSchemaSource",
    expose: "export",
    additionalProperties: false,
    jsDoc: "extended",
    skipTypeCheck: false,
  });

  return generator.createSchema("CoreConfigJsonSchemaSource");
}

function simplifyConfiguratorSchema(schema: unknown): unknown {
  if (!isRecord(schema)) {
    return schema;
  }

  const definitions = schema.definitions;
  if (!isRecord(definitions)) {
    return schema;
  }

  const resolvedRoot = resolveDefinitionRef(schema, definitions, schema.$ref);

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
  _rootSchema: Record<string, unknown>,
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
    return resolveDefinitionRef(_rootSchema, definitions, definition.$ref) ?? definition;
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

    const resolved = resolveDefinitionRef(rootSchema, rootSchema.definitions as Record<string, unknown>, ref);
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

function renderConfiguratorHtml(input: { schema: unknown; defaults: unknown }): string {
  const schemaJson = JSON.stringify(input.schema, null, 2);
  const defaultsJson = JSON.stringify(input.defaults, null, 2);

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Core Configurator</title>
    <style>
      :root {
        --bg: #f4f1ea;
        --panel: #fffdf8;
        --panel-alt: #f1eadf;
        --text: #1c1a17;
        --muted: #6c655d;
        --border: #d4c6b2;
        --accent: #9b4d2f;
        --accent-soft: #efe0d1;
        --shadow: 0 18px 48px rgba(60, 44, 29, 0.12);
      }

      * { box-sizing: border-box; }

      body {
        margin: 0;
        color: var(--text);
        font-family: "IBM Plex Sans", "Segoe UI", sans-serif;
        background:
          radial-gradient(circle at top left, rgba(155, 77, 47, 0.16), transparent 28%),
          radial-gradient(circle at bottom right, rgba(47, 91, 77, 0.12), transparent 24%),
          linear-gradient(180deg, #f7f2ea 0%, #ece4d8 100%);
      }

      .page {
        width: min(1400px, calc(100vw - 32px));
        margin: 24px auto 40px;
      }

      .hero, .panel {
        background: rgba(255, 253, 248, 0.9);
        border: 1px solid rgba(212, 198, 178, 0.9);
        border-radius: 24px;
        box-shadow: var(--shadow);
        backdrop-filter: blur(10px);
      }

      .hero {
        padding: 28px;
        margin-bottom: 20px;
      }

      .eyebrow {
        margin: 0 0 8px;
        color: var(--accent);
        font-size: 12px;
        font-weight: 700;
        letter-spacing: 0.12em;
        text-transform: uppercase;
      }

      h1 {
        margin: 0 0 10px;
        font-size: clamp(32px, 5vw, 56px);
        line-height: 0.95;
        font-family: "IBM Plex Serif", Georgia, serif;
      }

      .hero p {
        max-width: 900px;
        margin: 0;
        color: var(--muted);
        font-size: 16px;
        line-height: 1.5;
      }

      .layout {
        display: grid;
        grid-template-columns: minmax(0, 1.35fr) minmax(320px, 0.65fr);
        gap: 20px;
      }

      .panel {
        padding: 20px;
      }

      .toolbar {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin-bottom: 18px;
      }

      button, .button-label {
        appearance: none;
        border: 1px solid var(--border);
        background: var(--panel);
        color: var(--text);
        padding: 10px 14px;
        border-radius: 999px;
        font: inherit;
        cursor: pointer;
        transition: transform 140ms ease, background 140ms ease, border-color 140ms ease;
      }

      button.primary {
        background: var(--accent);
        border-color: var(--accent);
        color: #fffaf4;
      }

      button:hover, .button-label:hover {
        transform: translateY(-1px);
        border-color: var(--accent);
      }

      input[type="file"] { display: none; }

      .status {
        margin-bottom: 16px;
        padding: 12px 14px;
        border-radius: 16px;
        background: var(--panel-alt);
        color: var(--muted);
        font-size: 14px;
      }

      .status.error {
        background: #f8e0db;
        color: #7f2819;
      }

      .status.success {
        background: #ddeee5;
        color: #1f6149;
      }

      .section-title {
        margin: 0 0 10px;
        font-size: 13px;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: var(--muted);
      }

      textarea {
        width: 100%;
        min-height: 420px;
        resize: vertical;
        border: 1px solid var(--border);
        border-radius: 18px;
        padding: 16px;
        background: #fff;
        color: var(--text);
        font: 13px/1.45 "IBM Plex Mono", "SFMono-Regular", monospace;
      }

      .notes {
        margin-top: 12px;
        color: var(--muted);
        font-size: 13px;
        line-height: 1.5;
      }

      #editor_holder .je-object__container,
      #editor_holder .well {
        border-radius: 16px;
      }

      @media (max-width: 980px) {
        .layout {
          grid-template-columns: 1fr;
        }

        .page {
          width: min(100vw - 20px, 1400px);
          margin: 10px auto 24px;
        }

        .hero,
        .panel {
          border-radius: 20px;
        }
      }
    </style>
  </head>
  <body>
    <div class="page">
      <section class="hero">
        <p class="eyebrow">Energy Core Configurator</p>
        <h1>Configure, validate, export.</h1>
        <p>
          This form is generated from the project's TypeScript configuration types and rendered through Jedison.
          It is intended for fast structural editing of the core configuration JSON.
        </p>
      </section>

      <div class="layout">
        <section class="panel">
          <div class="toolbar">
            <button id="reset" type="button">Reset to Defaults</button>
            <label class="button-label" for="import-file">Import JSON</label>
            <input id="import-file" type="file" accept="application/json,.json" />
            <button id="copy" class="primary" type="button">Copy JSON</button>
            <button id="download" type="button">Download JSON</button>
            <button id="validate" type="button">Validate</button>
          </div>
          <div id="status" class="status">Loading editor...</div>
          <div id="editor_holder"></div>
        </section>

        <aside class="panel">
          <p class="section-title">JSON Preview</p>
          <textarea id="json-preview" spellcheck="false" readonly></textarea>
          <div class="notes">
            This checks structural validity against the generated JSON Schema derived from the TypeScript types.
            Project-specific semantic checks that depend on runtime code are not evaluated here.
          </div>
        </aside>
      </div>
    </div>

    <script type="application/json" id="core-config-schema">${schemaJson}</script>
    <script type="application/json" id="core-config-defaults">${defaultsJson}</script>
    <script src="https://cdn.jsdelivr.net/npm/jedison@1.5.1/dist/umd/jedison.umd.js"></script>
    <script>
      const schema = JSON.parse(document.getElementById("core-config-schema").textContent);
      const defaults = JSON.parse(document.getElementById("core-config-defaults").textContent);
      const holder = document.getElementById("editor_holder");
      const status = document.getElementById("status");
      const preview = document.getElementById("json-preview");
      const fileInput = document.getElementById("import-file");

      const editor = new Jedison.Create({
        container: holder,
        theme: new Jedison.Theme(),
        schema,
      });
      editor.setValue(structuredClone(defaults));

      function setStatus(message, tone) {
        status.textContent = message;
        status.className = "status" + (tone ? " " + tone : "");
      }

      function refreshPreview() {
        const value = editor.getValue();
        preview.value = JSON.stringify(value, null, 2);
      }

      function validateEditor() {
        const errors = editor.getErrors();
        if (errors.length === 0) {
          setStatus("Schema validation passed.", "success");
          return true;
        }

        const first = errors[0];
        editor.showValidationErrors(errors);
        const message = first.messages && first.messages[0] ? first.messages[0] : "Unknown validation error.";
        setStatus("Schema validation failed: " + first.path + " " + message, "error");
        return false;
      }

      editor.on("change", () => {
        refreshPreview();
        setStatus("Edited. Validate or export when ready.");
      });

      document.getElementById("reset").addEventListener("click", () => {
        editor.setValue(structuredClone(defaults));
        refreshPreview();
        setStatus("Defaults restored.", "success");
      });

      document.getElementById("validate").addEventListener("click", () => {
        validateEditor();
      });

      document.getElementById("copy").addEventListener("click", async () => {
        refreshPreview();
        await navigator.clipboard.writeText(preview.value);
        setStatus("JSON copied to clipboard.", "success");
      });

      document.getElementById("download").addEventListener("click", () => {
        refreshPreview();
        const blob = new Blob([preview.value], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "core-config.json";
        link.click();
        URL.revokeObjectURL(url);
        setStatus("JSON download started.", "success");
      });

      fileInput.addEventListener("change", async (event) => {
        const file = event.target.files && event.target.files[0];
        if (!file) {
          return;
        }

        try {
          const text = await file.text();
          const value = JSON.parse(text);
          editor.setValue(value);
          refreshPreview();
          setStatus("JSON imported.", "success");
        } catch (error) {
          const message = error instanceof Error ? error.message : String(error);
          setStatus("Import failed: " + message, "error");
        } finally {
          fileInput.value = "";
        }
      });

      refreshPreview();
      setStatus("Editor ready.");
    </script>
  </body>
</html>
`;
}

void main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
