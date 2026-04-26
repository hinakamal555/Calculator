import { calculate, historyManager, type Operator } from "./calculator.js";

const OPERATORS = new Set<string>(["+", "-", "*", "/", "%", "**"]);

function main(): void {
  const [cmd, ...args] = process.argv.slice(2);
  if (cmd === "history") {
    console.log(historyManager.getAll());
    return;
  }
  if (cmd === "undo") {
    const reverted = historyManager.undo();
    console.log(reverted ?? "Nothing to undo");
    return;
  }
  if (cmd === "clear-history") {
    historyManager.clear();
    console.log("History cleared");
    return;
  }
  if (cmd === "calculate" && args.length >= 3) {
    const a = Number(args[0]);
    const op = args[1] as Operator;
    const b = Number(args[2]);
    if (!OPERATORS.has(op) || !Number.isFinite(a) || !Number.isFinite(b)) {
      console.error("Invalid calculate arguments");
      process.exitCode = 1;
      return;
    }
    console.log(calculate(a, op, b));
    return;
  }
  console.error(
    'Usage: calculate <a> <op> <b> | history | undo | clear-history',
  );
  process.exitCode = 1;
}

main();
