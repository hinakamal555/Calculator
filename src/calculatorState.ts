/** Operators exposed by the keypad (+, −, ×, ÷ map to these symbols in history). */
export type FourOperator = "+" | "-" | "*" | "/";

export type CalculatorState = {
  display: string;
  stored: number | null;
  pendingOperator: FourOperator | null;
  /** When true, the next digit (or decimal) replaces the display instead of appending. */
  overwriteDisplay: boolean;
};

export function createInitialState(): CalculatorState {
  return {
    display: "0",
    stored: null,
    pendingOperator: null,
    overwriteDisplay: false,
  };
}

export function cloneCalculatorState(state: CalculatorState): CalculatorState {
  return { ...state };
}
