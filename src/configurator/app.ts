import { calculateCore, coreConfigFromJson } from "../index";

declare const Jedison: {
  Create: new (options: {
    container: HTMLElement;
    theme: unknown;
    schema: unknown;
  }) => {
    setValue(value: unknown): void;
    getValue(): unknown;
    getErrors(): Array<{ path?: string; messages?: string[] }>;
    showValidationErrors(errors: unknown[]): void;
    on(event: string, listener: () => void): void;
  };
  Theme: new () => unknown;
};

function readJsonScript<T>(id: string): T {
  const element = document.getElementById(id);
  if (!element?.textContent) {
    throw new Error(`Missing JSON payload: ${id}`);
  }

  return JSON.parse(element.textContent) as T;
}

function deepClone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function setStatus(element: HTMLElement, message: string, tone?: "success" | "error"): void {
  element.textContent = message;
  element.className = `status${tone ? ` ${tone}` : ""}`;
}

function refreshPreview(editor: { getValue(): unknown }, preview: HTMLTextAreaElement): void {
  preview.value = JSON.stringify(editor.getValue(), null, 2);
}

function validateEditor(
  editor: {
    getErrors(): Array<{ path?: string; messages?: string[] }>;
    showValidationErrors(errors: unknown[]): void;
  },
  statusElement: HTMLElement,
  label: string,
): boolean {
  const errors = editor.getErrors();
  if (errors.length === 0) {
    setStatus(statusElement, `${label} schema validation passed.`, "success");
    return true;
  }

  editor.showValidationErrors(errors);
  const first = errors[0];
  const message = first?.messages?.[0] ?? "Unknown validation error.";
  const path = first?.path ?? "root";
  setStatus(statusElement, `${label} schema validation failed: ${path} ${message}`, "error");
  return false;
}

function downloadText(filename: string, content: string): void {
  const blob = new Blob([content], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function bindImportButton(
  fileInput: HTMLInputElement,
  editor: { setValue(value: unknown): void; getValue(): unknown },
  preview: HTMLTextAreaElement,
  statusElement: HTMLElement,
  successMessage: string,
): void {
  fileInput.addEventListener("change", async (event) => {
    const input = event.currentTarget as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) {
      return;
    }

    try {
      const text = await file.text();
      const value = JSON.parse(text);
      editor.setValue(value);
      refreshPreview(editor, preview);
      setStatus(statusElement, successMessage, "success");
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      setStatus(statusElement, `Import failed: ${message}`, "error");
    } finally {
      input.value = "";
    }
  });
}

function activateTab(tabName: string): void {
  for (const button of document.querySelectorAll<HTMLElement>("[data-tab-target]")) {
    const isActive = button.dataset.tabTarget === tabName;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-selected", String(isActive));
  }

  for (const panel of document.querySelectorAll<HTMLElement>("[data-tab-panel]")) {
    const isActive = panel.dataset.tabPanel === tabName;
    panel.classList.toggle("active", isActive);
    panel.hidden = !isActive;
  }
}

function setupTabs(): void {
  for (const button of document.querySelectorAll<HTMLElement>("[data-tab-target]")) {
    button.addEventListener("click", () => {
      const tabName = button.dataset.tabTarget;
      if (!tabName) {
        return;
      }

      activateTab(tabName);
    });
  }

  activateTab("configuration");
}

function main(): void {
  const configSchema = readJsonScript("core-config-schema");
  const inputSchema = readJsonScript("core-input-schema");
  const configDefaults = readJsonScript("core-config-defaults");
  const inputDefaults = readJsonScript("core-input-defaults");

  const configStatus = document.getElementById("config-status");
  const inputStatus = document.getElementById("input-status");
  const resultStatus = document.getElementById("result-status");
  const configPreview = document.getElementById("config-preview");
  const inputPreview = document.getElementById("input-preview");
  const resultPreview = document.getElementById("result-preview");
  const configHolder = document.getElementById("config-editor");
  const inputHolder = document.getElementById("input-editor");
  const configImport = document.getElementById("config-import-file");
  const inputImport = document.getElementById("input-import-file");

  if (
    !(configStatus instanceof HTMLElement) ||
    !(inputStatus instanceof HTMLElement) ||
    !(resultStatus instanceof HTMLElement) ||
    !(configPreview instanceof HTMLTextAreaElement) ||
    !(inputPreview instanceof HTMLTextAreaElement) ||
    !(resultPreview instanceof HTMLTextAreaElement) ||
    !(configHolder instanceof HTMLElement) ||
    !(inputHolder instanceof HTMLElement) ||
    !(configImport instanceof HTMLInputElement) ||
    !(inputImport instanceof HTMLInputElement)
  ) {
    throw new Error("Configurator DOM is incomplete.");
  }

  const configEditor = new Jedison.Create({
    container: configHolder,
    theme: new Jedison.Theme(),
    schema: configSchema,
  });
  const inputEditor = new Jedison.Create({
    container: inputHolder,
    theme: new Jedison.Theme(),
    schema: inputSchema,
  });

  configEditor.setValue(deepClone(configDefaults));
  inputEditor.setValue(deepClone(inputDefaults));

  configEditor.on("change", () => {
    refreshPreview(configEditor, configPreview);
    setStatus(configStatus, "Config edited. Validate or calculate when ready.");
  });

  inputEditor.on("change", () => {
    refreshPreview(inputEditor, inputPreview);
    setStatus(inputStatus, "Input edited. Validate or calculate when ready.");
  });

  document.getElementById("config-reset")?.addEventListener("click", () => {
    configEditor.setValue(deepClone(configDefaults));
    refreshPreview(configEditor, configPreview);
    setStatus(configStatus, "Config defaults restored.", "success");
  });

  document.getElementById("input-reset")?.addEventListener("click", () => {
    inputEditor.setValue(deepClone(inputDefaults));
    refreshPreview(inputEditor, inputPreview);
    setStatus(inputStatus, "Input defaults restored.", "success");
  });

  document.getElementById("config-validate")?.addEventListener("click", () => {
    validateEditor(configEditor, configStatus, "Config");
  });

  document.getElementById("input-validate")?.addEventListener("click", () => {
    validateEditor(inputEditor, inputStatus, "Input");
  });

  document.getElementById("config-copy")?.addEventListener("click", async () => {
    refreshPreview(configEditor, configPreview);
    await navigator.clipboard.writeText(configPreview.value);
    setStatus(configStatus, "Config JSON copied to clipboard.", "success");
  });

  document.getElementById("input-copy")?.addEventListener("click", async () => {
    refreshPreview(inputEditor, inputPreview);
    await navigator.clipboard.writeText(inputPreview.value);
    setStatus(inputStatus, "Input JSON copied to clipboard.", "success");
  });

  document.getElementById("result-copy")?.addEventListener("click", async () => {
    await navigator.clipboard.writeText(resultPreview.value);
    setStatus(resultStatus, "Result JSON copied to clipboard.", "success");
  });

  document.getElementById("config-download")?.addEventListener("click", () => {
    refreshPreview(configEditor, configPreview);
    downloadText("core-config.json", configPreview.value);
    setStatus(configStatus, "Config download started.", "success");
  });

  document.getElementById("input-download")?.addEventListener("click", () => {
    refreshPreview(inputEditor, inputPreview);
    downloadText("core-input.json", inputPreview.value);
    setStatus(inputStatus, "Input download started.", "success");
  });

  document.getElementById("result-download")?.addEventListener("click", () => {
    downloadText("core-result.json", resultPreview.value);
    setStatus(resultStatus, "Result download started.", "success");
  });

  bindImportButton(configImport, configEditor, configPreview, configStatus, "Config JSON imported.");
  bindImportButton(inputImport, inputEditor, inputPreview, inputStatus, "Input JSON imported.");

  document.getElementById("calculate")?.addEventListener("click", () => {
    const configValid = validateEditor(configEditor, configStatus, "Config");
    const inputValid = validateEditor(inputEditor, inputStatus, "Input");
    if (!configValid || !inputValid) {
      setStatus(resultStatus, "Calculation blocked until both editors are schema-valid.", "error");
      return;
    }

    try {
      const normalizedConfig = coreConfigFromJson(configEditor.getValue() as never);
      const result = calculateCore(inputEditor.getValue() as never, normalizedConfig as never);
      resultPreview.value = JSON.stringify(result, null, 2);
      setStatus(resultStatus, "Calculation succeeded.", "success");
      activateTab("result");
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      setStatus(resultStatus, `Calculation failed: ${message}`, "error");
      activateTab("result");
    }
  });

  refreshPreview(configEditor, configPreview);
  refreshPreview(inputEditor, inputPreview);
  setupTabs();
  setStatus(configStatus, "Config editor ready.");
  setStatus(inputStatus, "Input editor ready.");
  setStatus(resultStatus, "Ready to calculate.");
}

main();
