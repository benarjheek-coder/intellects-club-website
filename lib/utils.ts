// =========================================================
// lib/utils.ts — Utility helpers
// =========================================================

/**
 * Combines class names, filtering falsy values
 */
export function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

/**
 * Clamps a number between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Maps a value from one range to another
 */
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

/**
 * Lerp (linear interpolation)
 */
export function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t;
}

/**
 * Truncates text to a given length
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + "…";
}

/**
 * Generates a UI Avatars URL for a given name
 */
export function avatarUrl(
  name: string,
  bg: string = "7c3aed",
  color: string = "fff"
): string {
  const encoded = encodeURIComponent(name);
  return `https://ui-avatars.com/api/?name=${encoded}&background=${bg}&color=${color}&size=200&bold=true&format=png`;
}

/**
 * Returns the badge color class based on a color string
 */
export function getBadgeClass(color: string): string {
  const map: Record<string, string> = {
    purple: "badge-purple",
    blue: "badge-blue",
    cyan: "badge-cyan",
    green: "badge-green",
    orange: "badge-orange",
  };
  return map[color] ?? "badge-purple";
}
