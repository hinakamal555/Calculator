/** Formats a number for the history line (e.g. `2 + 3 = 5`, no spurious trailing zeros). */
export function formatCalculationNumber(value: number): string {
  if (!Number.isFinite(value)) {
    return String(value);
  }
  if (Object.is(value, -0)) {
    return "0";
  }
  if (Number.isInteger(value)) {
    return String(Math.trunc(value));
  }
  const normalized = Number.parseFloat(value.toPrecision(12));
  return String(normalized);
}

/** Formats a finite result for the main display (non-finite becomes `Error`). */
export function formatDisplayValue(value: number): string {
  if (!Number.isFinite(value)) {
    return "Error";
  }
  return formatCalculationNumber(value);
}
