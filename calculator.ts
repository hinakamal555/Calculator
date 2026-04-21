export type Operator = "+" | "-" | "*" | "/";

function parseNumber(value: unknown, inputName: string): number {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    throw new TypeError(
      `${inputName} must be a finite number (not NaN, Infinity, or non-numeric).`,
    );
  }

  return value;
}

function validateInputs(a: unknown, b: unknown): [number, number] {
  return [parseNumber(a, "First input"), parseNumber(b, "Second input")];
}

/**
 * Adds two validated numbers.
 * @throws {TypeError} When any input is not a finite number.
 */
export function add(a: unknown, b: unknown): number {
  const [left, right] = validateInputs(a, b);

  return left + right;
}

/**
 * Subtracts the second validated number from the first.
 * @throws {TypeError} When any input is not a finite number.
 */
export function subtract(a: unknown, b: unknown): number {
  const [left, right] = validateInputs(a, b);

  return left - right;
}

/**
 * Multiplies two validated numbers.
 * @throws {TypeError} When any input is not a finite number.
 */
export function multiply(a: unknown, b: unknown): number {
  const [left, right] = validateInputs(a, b);

  return left * right;
}

/**
 * Divides the first validated number by the second.
 * @throws {TypeError} When any input is not a finite number.
 * @throws {Error} When the second input is zero.
 */
export function divide(a: unknown, b: unknown): number {
  const [left, right] = validateInputs(a, b);

  if (right === 0) {
    throw new Error("Division by zero is not allowed.");
  }

  return left / right;
}

/**
 * Calculates a result for a supported arithmetic operator.
 */
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
