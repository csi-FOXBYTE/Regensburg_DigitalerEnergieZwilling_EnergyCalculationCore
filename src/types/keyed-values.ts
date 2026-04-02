export type KeyedValues<K, T> = { key: K; value: T }[];

export function resolveKeyedValue<K, T>(values: KeyedValues<K, T>, key: K): T {
  return values.find((entry) => entry.key === key)!.value;
}
