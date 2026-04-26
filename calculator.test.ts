import { describe, expect, it } from "vitest";
import {
  add,
  calculate,
  divide,
  modulo,
  multiply,
  power,
  subtract,
} from "./calculator.js";

describe("add", () => {
  it("sums finite numbers", () => {
    expect(add(2, 3)).toBe(5);
    expect(add(-1, 1)).toBe(0);
  });

  it("rejects non-finite inputs", () => {
    expect(() => add(NaN, 1)).toThrow(TypeError);
    expect(() => add(1, Infinity)).toThrow(TypeError);
  });
});

describe("subtract", () => {
  it("subtracts the second operand", () => {
    expect(subtract(10, 4)).toBe(6);
  });
});

describe("multiply", () => {
  it("multiplies operands", () => {
    expect(multiply(3, 4)).toBe(12);
  });
});

describe("divide", () => {
  it("divides when divisor is non-zero", () => {
    expect(divide(10, 2)).toBe(5);
  });

  it("rejects division by zero", () => {
    expect(() => divide(1, 0)).toThrow("Division by zero");
  });
});

describe("modulo", () => {
  it("returns remainder", () => {
    expect(modulo(10, 3)).toBe(1);
  });

  it("rejects modulo by zero", () => {
    expect(() => modulo(1, 0)).toThrow("Modulo by zero");
  });
});

describe("power", () => {
  it("raises base to exponent", () => {
    expect(power(2, 3)).toBe(8);
    expect(power(4, 0.5)).toBe(2);
  });

  it("rejects non-finite results", () => {
    expect(() => power(0, -1)).toThrow(RangeError);
  });
});

describe("calculate", () => {
  it("dispatches to the correct operation", () => {
    expect(calculate(2, "+", 3)).toBe(5);
    expect(calculate(10, "-", 4)).toBe(6);
    expect(calculate(3, "*", 4)).toBe(12);
    expect(calculate(10, "/", 2)).toBe(5);
    expect(calculate(10, "%", 3)).toBe(1);
    expect(calculate(2, "**", 3)).toBe(8);
  });

  it("propagates validation from underlying ops", () => {
    expect(() => calculate(1, "/", 0)).toThrow("Division by zero");
  });
});
