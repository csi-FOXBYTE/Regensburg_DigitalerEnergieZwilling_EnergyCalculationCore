export type Selection = {
  value: string;
  localization: Record<string, string>;
};

export type SelectionFilter<K = string, V = string> = Array<{
  key: K;
  allowedValues: V[];
}>;
