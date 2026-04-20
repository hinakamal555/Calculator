/**
 * @param {number} a
 * @param {'+' | '-' | '*' | '/'} operator
 * @param {number} b
 * @returns {number}
 */
export function calculate(a, operator, b) {
  switch (operator) {
    case '+':
      return a + b;
    case '-':
      return a - b;
    case '*':
      return a * b;
    case '/':
      return a / b;
    default:
      return NaN;
  }
}
