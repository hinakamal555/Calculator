/**
 * @param {number} a
 * @param {'+' | '-' | '*' | '/' | '%'} operator
 * @param {number} b
 * @returns {number}
 */
function isValidNumber(value) {
  return Number.isFinite(value);
}

function divide(a, b) {
  if (b === 0) {
    return NaN;
  }

  return a / b;
}

function modulo(a, b) {
  if (b === 0) {
    return NaN;
  }

  return a % b;
}

export function calculate(a, operator, b) {
  if (!isValidNumber(a) || !isValidNumber(b)) {
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
      return divide(a, b);
    case '%':
      return modulo(a, b);
    default:
      return NaN;
  }
}
