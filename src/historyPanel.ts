import type { CalculationHistory } from "./calculationHistory.js";
import { formatHistoryLine } from "./calculationHistory.js";

export type HistoryPanel = {
  render(): void;
};

/**
 * DOM bindings for the history list and actions. Calculator math stays elsewhere.
 */
export function attachHistoryPanel(options: {
  listElement: HTMLUListElement;
  undoButton: HTMLButtonElement;
  clearButton: HTMLButtonElement;
  history: CalculationHistory;
  onUndoClick(): void;
  onClearClick(): void;
}): HistoryPanel {
  const {
    listElement,
    undoButton,
    clearButton,
    history,
    onUndoClick,
    onClearClick,
  } = options;

  undoButton.addEventListener("click", onUndoClick);
  clearButton.addEventListener("click", onClearClick);

  return {
    render(): void {
      listElement.replaceChildren();
      for (const entry of history.getEntries()) {
        const item = document.createElement("li");
        item.textContent = formatHistoryLine(entry);
        listElement.appendChild(item);
      }
      undoButton.disabled = history.getEntryCount() === 0;
    },
  };
}
