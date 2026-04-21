export type Operator = "+" | "-" | "*" | "/";

function parseNumber(value: unknown, inputName: string): number {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    throw new TypeError(`${inputName} must be a finite number.`);
  }

  return value;
}

export function add(a: unknown, b: unknown): number {
  const left = parseNumber(a, "First input");
  const right = parseNumber(b, "Second input");

  return left + right;
}

export function subtract(a: unknown, b: unknown): number {
  const left = parseNumber(a, "First input");
  const right = parseNumber(b, "Second input");

  return left - right;
}

export function multiply(a: unknown, b: unknown): number {
  const left = parseNumber(a, "First input");
  const right = parseNumber(b, "Second input");

  return left * right;
}

export function divide(a: unknown, b: unknown): number {
  const left = parseNumber(a, "First input");
  const right = parseNumber(b, "Second input");

  if (right === 0) {
    throw new Error("Division by zero is not allowed.");
  }

  return left / right;
}

export function calculate(a: unknown, operator: Operator, b: unknown): number {
  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      return divide(a, b);
    default:
      throw new Error(`Unsupported operator: ${String(operator)}`);
  }
}
