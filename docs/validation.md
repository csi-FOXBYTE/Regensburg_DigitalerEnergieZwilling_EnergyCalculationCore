# Validation

## Motivation

The calculator currently trusts its input entirely. Adding a validation layer catches bad input early, gives callers actionable errors, and avoids silent wrong results from undefined catalogue values.

## Two-layer approach

### Layer 1 — Static shape validation (TypeBox)

Replace all hand-written type declarations in `src/types/` with TypeBox schema definitions. TypeScript types are inferred via `Static<typeof Schema>` — single source of truth.

- Type checking and required field enforcement via `Value.Check(schema, input)`
- Unknown field stripping via `Value.Clean(schema, input)` (non-destructive — operates on a clone)
- Detailed error paths via `Value.Errors(schema, input)`

### Layer 2 — Config-aware validation

A separate pass that validates runtime catalogue membership — things TypeBox cannot check statically because the valid values come from the config instance.

Examples:
- `input.heat.primaryEnergyCarrier` must exist in `config.heat.primaryEnergyCarriers`
- `input.heat.heatingSystemType` must exist in `config.heat.heatingSystemTypes`
- `input.heat.heatingSurfaceType` must exist in `config.heat.heatingSurfaceTypes`

Signature: `validateInputAgainstConfig(input: DETInput, config: DETConfig): ValidationError[]`

### Composition

```
validate(input, config): ValidationError[]
  → run Layer 1 (shape)
  → if valid, run Layer 2 (config-aware)
  → return combined error list
```

Layer 2 only runs if Layer 1 passes — no point checking catalogue membership on a malformed input.

## ValidationError shape

```ts
type ValidationError = {
  path: string;   // e.g. "heat.primaryEnergyCarrier"
  message: string;
};
```

## Design rules

- Validation is **pure and non-mutating** — does not modify input, does not throw. Caller decides what to do with the error list.
- Exposed as a standalone exported utility, not coupled to the calculator execution path. Caller can validate before passing input to the calculator.
