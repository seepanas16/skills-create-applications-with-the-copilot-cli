#!/usr/bin/env node

// calculator.js
// Supported operations:
// - addition (add, +)
// - subtraction (subtract, -)
// - multiplication (multiply, *, x)
// - division (divide, /)
//
// Usage examples:
//   node src/calculator.js add 2 3
//   node src/calculator.js + 2 3
//   node src/calculator.js multiply 4 5
//
// Exits with code 0 on success, non-zero on error.

function showUsage() {
  console.error('Usage: node src/calculator.js <operation> <a> <b>');
  console.error('Operations: add (+), subtract (-), multiply (*), divide (/)');
  process.exit(1);
}

const [, , op, aStr, bStr] = process.argv;

if (!op || !aStr || !bStr) showUsage();

function toNumber(s) {
  const n = Number(s);
  return Number.isFinite(n) ? n : null;
}

const a = toNumber(aStr);
const b = toNumber(bStr);

if (a === null || b === null) {
  console.error('Error: both operands must be valid numbers');
  showUsage();
}

let result;
const operation = op.toString().toLowerCase();

switch (operation) {
  // Addition
  case 'add':
  case '+':
  case 'plus':
    result = a + b;
    break;

  // Subtraction
  case 'subtract':
  case '-':
  case 'minus':
    result = a - b;
    break;

  // Multiplication
  case 'multiply':
  case '*':
  case 'x':
  case 'times':
    result = a * b;
    break;

  // Division
  case 'divide':
  case '/':
  case '÷':
    if (b === 0) {
      console.error('Error: division by zero');
      process.exit(2);
    }
    result = a / b;
    break;

  default:
    console.error(`Unknown operation: ${op}`);
    showUsage();
}

// Print the result (no extra formatting to keep CLI small and scriptable)
console.log(result);
process.exit(0);
