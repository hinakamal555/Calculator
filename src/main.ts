import { calculate, type Operator } from "./calculator.js";
import {
  createInitialState,
  cloneCalculatorState,
  type CalculatorState,
  type FourOperator,
} from "./calculatorState.js";
import { CalculationHistory } from "./calculationHistory.js";
import type { CalculationHistoryEntry } from "./calculationHistory.js";
import { formatDisplayValue } from "./formatNumber.js";
import { attachHistoryPanel } from "./historyPanel.js";

const operatorLabels: Record<FourOperator, string> = {
  "+": "+",
  "-": "-",
  "*": "*",
  "/": "/",
};

function parseDisplay(display: string): number {
  if (display === "Error") {
    return Number.NaN;
  }
  return Number(display);
}

class CalculatorApp {
  private state: CalculatorState = createInitialState();
  private readonly history = new CalculationHistory();
  private readonly historyPanel: ReturnType<typeof attachHistoryPanel>;
  private readonly displayEl: HTMLElement;

  constructor() {
    const displayEl = document.getElementById("display");
    const listEl = document.getElementById("history-list");
    const undoBtn = document.getElementById("undo-btn");
    const clearBtn = document.getElementById("clear-history-btn");

    if (!displayEl || !listEl || !undoBtn || !clearBtn) {
      throw new Error("Calculator markup is missing required elements.");
    }

    this.displayEl = displayEl;
    this.historyPanel = attachHistoryPanel({
      listElement: listEl as HTMLUListElement,
      undoButton: undoBtn as HTMLButtonElement,
      clearButton: clearBtn as HTMLButtonElement,
      history: this.history,
      onUndoClick: () => this.handleUndo(),
      onClearClick: () => this.handleClearAll(),
    });

    for (const button of Array.from(
      document.querySelectorAll<HTMLButtonElement>("[data-action]"),
    )) {
      const action = button.dataset.action;
      if (!action) continue;
      button.addEventListener("click", () => this.handleAction(action));
    }

    this.refreshDisplay();
    this.historyPanel.render();
  }

  private refreshDisplay(): void {
    this.displayEl.textContent = this.state.display;
  }

  private handleUndo(): void {
    if (this.history.getEntryCount() === 0) {
      return;
    }
    const restored = this.history.undo();
    if (restored) {
      this.state = cloneCalculatorState(restored);
      this.refreshDisplay();
      this.historyPanel.render();
    }
  }

  private handleClearAll(): void {
    this.history.clear();
    this.state = createInitialState();
    this.refreshDisplay();
    this.historyPanel.render();
  }

  private snapshot(): CalculatorState {
    return cloneCalculatorState(this.state);
  }

  private handleAction(action: string): void {
    if (action.startsWith("digit-")) {
      this.inputDigit(action.slice("digit-".length));
    } else if (action.startsWith("op-")) {
      this.inputOperator(action.slice("op-".length) as FourOperator);
    } else if (action === "equals") {
      this.inputEquals();
    } else if (action === "clear") {
      this.inputClear();
    } else if (action === "decimal") {
      this.inputDecimal();
    }
    this.refreshDisplay();
    this.historyPanel.render();
  }

  private inputClear(): void {
    this.state = createInitialState();
  }

  private inputDecimal(): void {
    this.inputDigit(".");
  }

  private inputDigit(digit: string): void {
    if (this.state.display === "Error") {
      this.state = createInitialState();
    }

    if (this.state.overwriteDisplay) {
      if (digit === ".") {
        this.state = {
          ...this.state,
          display: "0.",
          overwriteDisplay: false,
        };
      } else {
        this.state = {
          ...this.state,
          display: digit,
          overwriteDisplay: false,
        };
      }
      return;
    }

    let { display } = this.state;

    if (digit === ".") {
      if (display.includes(".")) {
        return;
      }
      display = display === "" || display === "0" ? "0." : `${display}.`;
    } else if (display === "0") {
      display = digit;
    } else {
      display = `${display}${digit}`;
    }

    this.state = { ...this.state, display };
  }

  private inputOperator(op: FourOperator): void {
    if (this.state.display === "Error") {
      return;
    }

    const current = parseDisplay(this.state.display);
    if (!Number.isFinite(current)) {
      return;
    }

    let { stored, pendingOperator, display, overwriteDisplay } = this.state;

    if (stored !== null && pendingOperator !== null && !overwriteDisplay) {
      try {
        const result = calculate(stored, pendingOperator as Operator, current);
        display = formatDisplayValue(result);
        stored = result;
      } catch {
        this.state = {
          display: "Error",
          stored: null,
          pendingOperator: null,
          overwriteDisplay: true,
        };
        return;
      }
    } else if (
      !(stored !== null && pendingOperator !== null && overwriteDisplay)
    ) {
      stored = current;
    }

    this.state = {
      ...this.state,
      display,
      stored,
      pendingOperator: op,
      overwriteDisplay: true,
    };
  }

  private inputEquals(): void {
    const { stored, pendingOperator, display } = this.state;
    if (display === "Error" || pendingOperator === null || stored === null) {
      return;
    }

    const right = parseDisplay(display);
    if (!Number.isFinite(right)) {
      return;
    }

    const stateBeforeEquals = this.snapshot();

    try {
      const result = calculate(stored, pendingOperator as Operator, right);
      const entry: CalculationHistoryEntry = {
        a: stored,
        b: right,
        operator: operatorLabels[pendingOperator],
        result,
        stateBeforeEquals,
      };
      this.history.record(entry);
      this.state = {
        display: formatDisplayValue(result),
        stored: null,
        pendingOperator: null,
        overwriteDisplay: true,
      };
    } catch {
      this.state = {
        display: "Error",
        stored: null,
        pendingOperator: null,
        overwriteDisplay: true,
      };
    }
  }
}

new CalculatorApp();
