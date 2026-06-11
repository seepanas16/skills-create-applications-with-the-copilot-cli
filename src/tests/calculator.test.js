const { add, subtract, multiply, divide } = require('../calculator');

describe('calculator basic operations', () => {
  test('2 + 3 = 5', () => {
    expect(add(2, 3)).toBe(5);
  });

  test('10 - 4 = 6', () => {
    expect(subtract(10, 4)).toBe(6);
  });

  test('45 * 2 = 90', () => {
    expect(multiply(45, 2)).toBe(90);
  });

  test('20 / 5 = 4', () => {
    expect(divide(20, 5)).toBe(4);
  });
});

describe('calculator edge cases', () => {
  test('division by zero throws', () => {
    expect(() => divide(1, 0)).toThrow('Division by zero');
  });

  test('works with negative numbers', () => {
    expect(add(-2, -3)).toBe(-5);
    expect(subtract(-2, -3)).toBe(1);
    expect(multiply(-4, 5)).toBe(-20);
    expect(divide(-10, 2)).toBe(-5);
  });

  test('handles floating point numbers', () => {
    expect(add(0.1, 0.2)).toBeCloseTo(0.3, 5);
    expect(divide(1, 3)).toBeCloseTo(0.3333333, 5);
  });
});
