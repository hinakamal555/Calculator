import type { CalculatorState } from "./calculatorState.js";
import { cloneCalculatorState } from "./calculatorState.js";
import { formatCalculationNumber } from "./formatNumber.js";

export const MAX_HISTORY_ENTRIES = 10;

export type CalculationHistoryEntry = {
  readonly a: number;
  readonly b: number;
  /** Symbol shown in the list, e.g. `+`, `*`. */
  readonly operator: string;
  readonly result: number;
  /** Calculator state immediately before `=` was applied for this result. */
  readonly stateBeforeEquals: CalculatorState;
};

export function formatHistoryLine(entry: CalculationHistoryEntry): string {
  return `${formatCalculationNumber(entry.a)} ${entry.operator} ${formatCalculationNumber(entry.b)} = ${formatCalculationNumber(entry.result)}`;
}

/**
 * In-memory calculation log (max {@link MAX_HISTORY_ENTRIES}); cleared on full page reload.
 */
export class CalculationHistory {
  private readonly entries: CalculationHistoryEntry[] = [];

  getEntryCount(): number {
    return this.entries.length;
  }

  getEntries(): readonly CalculationHistoryEntry[] {
    return this.entries;
  }

  record(entry: CalculationHistoryEntry): void {
    this.entries.push(entry);
    while (this.entries.length > MAX_HISTORY_ENTRIES) {
      this.entries.shift();
    }
  }

  /**
   * Removes the latest entry and returns the calculator state to restore.
   * Returns `null` when there is nothing to undo.
   */
  undo(): CalculatorState | null {
    const popped = this.entries.pop();
    return popped ? cloneCalculatorState(popped.stateBeforeEquals) : null;
  }

  clear(): void {
    this.entries.length = 0;
  }
}
