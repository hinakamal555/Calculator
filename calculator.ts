export type Operator = "+" | "-" | "*" | "/" | "%";

function parseNumber(value: number, inputName: string): number {
  if (!Number.isFinite(value)) {
    throw new TypeError(
      `${inputName} must be a finite number (not NaN, Infinity, or non-numeric).`,
    );
  }

  return value;
}

function validateInputs(a: number, b: number): [number, number] {
  return [parseNumber(a, "First input"), parseNumber(b, "Second input")];
}

/**
 * Adds two validated numbers.
 * @param a The first number to add.
 * @param b The second number to add.
 * @throws {TypeError} When any input is not a finite number.
 */
export function add(a: number, b: number): number {
  const [left, right] = validateInputs(a, b);

  return left + right;
}

/**
 * Subtracts the second validated number from the first.
 * @param a The number to subtract from.
 * @param b The number to subtract.
 * @throws {TypeError} When any input is not a finite number.
 */
export function subtract(a: number, b: number): number {
  const [left, right] = validateInputs(a, b);

  return left - right;
}

/**
 * Multiplies two validated numbers.
 * @param a The first number.
 * @param b The second number.
 * @throws {TypeError} When any input is not a finite number.
 */
export function multiply(a: number, b: number): number {
  const [left, right] = validateInputs(a, b);

  return left * right;
}

/**
 * Divides the first validated number by the second.
 * @param a The dividend.
 * @param b The divisor.
 * @throws {TypeError} When any input is not a finite number.
 * @throws {Error} When the second input is zero.
 */
export function divide(a: number, b: number): number {
  const [left, right] = validateInputs(a, b);

  if (right === 0) {
    throw new Error("Division by zero is not allowed.");
  }

  return left / right;
}

/**
 * Returns the remainder after dividing the first validated number by the second.
 * @param a The dividend.
 * @param b The divisor.
 * @throws {TypeError} When any input is not a finite number.
 * @throws {Error} When the second input is zero.
 */
export function modulo(a: number, b: number): number {
  const [left, right] = validateInputs(a, b);

  if (right === 0) {
    throw new Error("Modulo by zero is not allowed.");
  }

  return left % right;
}

/**
 * Calculates a result for a supported arithmetic operator.
 * @param a The first numeric operand.
 * @param operator The arithmetic operator to apply.
 * @param b The second numeric operand.
 */
export function calculate(a: number, operator: Operator, b: number): number {
  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      return divide(a, b);
    case "%":
      return modulo(a, b);
  }

  const exhaustiveCheck: never = operator;
  throw new Error(`Unsupported operator: ${String(exhaustiveCheck)}`);
}
