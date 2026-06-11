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

// Export functions for unit testing
module.exports = { add, subtract, multiply, divide };

// CLI wrapper: only run when executed directly
if (require.main === module) {
  function showUsage() {
    console.error('Usage: node src/calculator.js <operation> <a> <b>');
    console.error('Operations: add (+), subtract (-), multiply (*), divide (/)');
    process.exit(1);
  }

  const [, , op, aStr, bStr] = process.argv;
  if (!op || !aStr || !bStr) showUsage();

  const a = Number(aStr);
  const b = Number(bStr);
  if (!Number.isFinite(a) || !Number.isFinite(b)) {
    console.error('Error: both operands must be valid numbers');
    showUsage();
  }

  const operation = op.toString().toLowerCase();
  try {
    let result;
    switch (operation) {
      case 'add':
      case '+':
      case 'plus':
        result = add(a, b);
        break;
      case 'subtract':
      case '-':
      case 'minus':
        result = subtract(a, b);
        break;
      case 'multiply':
      case '*':
      case 'x':
      case 'times':
        result = multiply(a, b);
        break;
      case 'divide':
      case '/':
      case '÷':
        result = divide(a, b);
        break;
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
