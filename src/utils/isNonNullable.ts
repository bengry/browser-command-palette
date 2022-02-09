export function isNonNullable<T>(v: T): v is NonNullable<T> {
  return v !== null && v !== undefined;
}
