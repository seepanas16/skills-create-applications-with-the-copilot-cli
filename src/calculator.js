#!/usr/bin/env node

// calculator.js
// Supported operations:
// - addition (add, +)
// - subtraction (subtract, -)
// - multiplication (multiply, *, x)
// - division (divide, /)
//
// This file exports the core functions for testing and also provides a
// small CLI wrapper when executed directly.

// Core arithmetic functions
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) throw new Error('Division by zero');
  return a / b;
}

function modulo(a, b) {
  // Returns the remainder of a divided by b
  return a % b;
}

function power(base, exponent) {
  // Returns base raised to the exponent
  return Math.pow(base, exponent);
}

function squareRoot(n) {
  // Returns the square root of n; throws on negative input
  if (n < 0) throw new Error('Square root of negative number');
  return Math.sqrt(n);
}

// Export functions for unit testing
module.exports = { add, subtract, multiply, divide, modulo, power, squareRoot };

// CLI wrapper: only run when executed directly
if (require.main === module) {
  function showUsage() {
    console.error('Usage: node src/calculator.js <operation> <a> [<b>]');
    console.error('Operations: add (+), subtract (-), multiply (*), divide (/), mod (%), pow (^), sqrt');
    process.exit(1);
  }

  const [, , op, aStr, bStr] = process.argv;
  if (!op || !aStr) showUsage();

  const operation = op.toString().toLowerCase();

  // Helper to parse a single number and validate
  function parseNumber(s) {
    const n = Number(s);
    if (!Number.isFinite(n)) {
      console.error('Error: operand must be a valid number');
      process.exit(1);
    }
    return n;
  }

  try {
    let result;

    switch (operation) {
      case 'add':
      case '+':
      case 'plus': {
        if (bStr === undefined) showUsage();
        const a = parseNumber(aStr);
        const b = parseNumber(bStr);
        result = add(a, b);
        break;
      }
      case 'subtract':
      case '-':
      case 'minus': {
        if (bStr === undefined) showUsage();
        const a = parseNumber(aStr);
        const b = parseNumber(bStr);
        result = subtract(a, b);
        break;
      }
      case 'multiply':
      case '*':
      case 'x':
      case 'times': {
        if (bStr === undefined) showUsage();
        const a = parseNumber(aStr);
        const b = parseNumber(bStr);
        result = multiply(a, b);
        break;
      }
      case 'divide':
      case '/':
      case '÷': {
        if (bStr === undefined) showUsage();
        const a = parseNumber(aStr);
        const b = parseNumber(bStr);
        result = divide(a, b);
        break;
      }
      case 'mod':
      case '%': {
        if (bStr === undefined) showUsage();
        const a = parseNumber(aStr);
        const b = parseNumber(bStr);
        if (b === 0) {
          console.error('Error: modulo by zero');
          process.exit(2);
        }
        result = modulo(a, b);
        break;
      }
      case 'pow':
      case '^':
      case 'power': {
        if (bStr === undefined) showUsage();
        const base = parseNumber(aStr);
        const exponent = parseNumber(bStr);
        result = power(base, exponent);
        break;
      }
      case 'sqrt':
      case 'squareroot': {
        const n = parseNumber(aStr);
        result = squareRoot(n);
        break;
      }
      default:
        console.error(`Unknown operation: ${op}`);
        showUsage();
    }

    console.log(result);
    process.exit(0);
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(2);
  }
}
