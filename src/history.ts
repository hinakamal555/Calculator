export interface HistoryEntry {
  expression: string;
  result: number;
}

const MAX_ENTRIES = 10;

export class HistoryManager {
  private entries: HistoryEntry[] = [];

  add(entry: HistoryEntry): void {
    this.entries.push(entry);
    if (this.entries.length > MAX_ENTRIES) {
      this.entries.shift();
    }
  }

  undo(): { undoneEntry: HistoryEntry; newState: HistoryEntry | null } | null {
    const undoneEntry = this.entries.pop();
    if (!undoneEntry) {
      return null;
    }

    const latestEntry = this.entries.at(-1) ?? null;
    return { undoneEntry, newState: latestEntry };
  }

  clear(): void {
    this.entries = [];
  }

  getAll(): HistoryEntry[] {
    return this.entries.slice();
  }
}
