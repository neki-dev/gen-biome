export function clamp(
  value: number | undefined,
  defaultValue: number,
  limit: [number, number] = [0, 1],
) {
  return Math.max(limit[0], Math.min(limit[1], value ?? defaultValue));
}
