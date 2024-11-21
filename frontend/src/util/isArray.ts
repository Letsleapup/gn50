export function isArray<T>(input: T | T[]): T[] {
  return Array.isArray(input) ? input : [input];
}
