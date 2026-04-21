/**
 * @param {number} a
 * @param {'+' | '-' | '*' | '/'} operator
 * @param {number} b
 * @returns {number}
 */
export function calculate(a, operator, b) {
  if (!Number.isFinite(a) || !Number.isFinite(b)) {
    return NaN;
  }

  switch (operator) {
    case '+':
      return a + b;
    case '-':
      return a - b;
    case '*':
      return a * b;
    case '/':
      if (b === 0) {
        return NaN;
      }
      return a / b;
    default:
      return NaN;
  }
}
