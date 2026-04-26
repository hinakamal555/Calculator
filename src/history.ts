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

  undo(): HistoryEntry | null {
    const last = this.entries.pop();
    return last ?? null;
  }

  clear(): void {
    this.entries = [];
  }

  getAll(): HistoryEntry[] {
    return this.entries.slice();
  }
}
