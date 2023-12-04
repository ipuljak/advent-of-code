const fs = require('fs');
const readline = require('readline');

function isNumber(str) {
  return !isNaN(parseInt(str));
}

function isSymbol(str) {
  if (typeof str !== 'string') {
    return false;
  }

  const format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?]/;

  return !!str.match(format);
}

function isPart(matrix, x, y) {
  // Check up
  if (x > 0 && isSymbol(matrix[x - 1][y])) {
    return true;
  }

  // Check right
  if (y < matrix[x].length - 1 && isSymbol(matrix[x][y + 1])) {
    return true;
  }

  // Check down
  if (x < matrix.length - 1 && isSymbol(matrix[x + 1][y])) {
    return true;
  }

  // Check left
  if (y > 0 && isSymbol(matrix[x][y - 1])) {
    return true;
  }

  // Check up-left diagonal
  if (x > 0 && y > 0 && isSymbol(matrix[x - 1][y - 1])) {
    return true;
  }

  // Check up-right diagonal
  if (x > 0 && y < matrix[x].length - 1 && isSymbol(matrix[x - 1][y + 1])) {
    return true;
  }

  // Check down-left diagonal
  if (x < matrix.length - 1 && y > 0 && isSymbol(matrix[x + 1][y - 1])) {
    return true;
  }

  // Check down-right diagonal
  if (x < matrix.length - 1 && y < matrix[x].length - 1 && isSymbol(matrix[x + 1][y + 1])) {
    return true;
  }

  return false;
}

function getGearRatio(matrix, parts, x, y) {
  const set = new Set();

  // Check up
  if (x > 0 && parts[matrix[x - 1][y]]) {
    set.add(matrix[x - 1][y]);
  }

  // Check right
  if (y < matrix[x].length - 1 && parts[matrix[x][y + 1]]) {
    set.add(matrix[x][y + 1]);
  }

  // Check down
  if (x < matrix.length - 1 && parts[matrix[x + 1][y]]) {
    set.add(matrix[x + 1][y]);
  }

  // Check left
  if (y > 0 && parts[matrix[x][y - 1]]) {
    set.add(matrix[x][y - 1]);
  }

  // Check up-left diagonal
  if (x > 0 && y > 0 && parts[matrix[x - 1][y - 1]]) {
    set.add(matrix[x - 1][y - 1]);
  }

  // Check up-right diagonal
  if (x > 0 && y < matrix[x].length - 1 && parts[matrix[x - 1][y + 1]]) {
    set.add(matrix[x - 1][y + 1]);
  }

  // Check down-left diagonal
  if (x < matrix.length - 1 && y > 0 && parts[matrix[x + 1][y - 1]]) {
    set.add(matrix[x + 1][y - 1]);
  }

  // Check down-right diagonal
  if (x < matrix.length - 1 && y < matrix[x].length - 1 && parts[matrix[x + 1][y + 1]]) {
    set.add(matrix[x + 1][y + 1]);
  }

  const items = Array.from(set.values());

  if (items.length !== 2) {
    return 0;
  }

  return parts[String(items[0])] * parts[String(items[1])];
}

// 3a
(async function run() {
  let answer = 0;

  let matrix = [];

  const rl = readline.createInterface({
    input: fs.createReadStream('input.txt'),
    crlfDelay: Infinity
  });

  for await (const line of rl) {
    matrix.push(line.split(''));
  }

  const parts = {};

  let partNumber = 1;

  // Construct the grid with valid parts
  for (let x = 0; x < matrix.length; x++) {
    let number = '';
    let part = false;

    for (let y = 0; y < matrix[x].length; y++) {
      // If we are observing a digit, check if it can be considered a valid part
      if (isNumber(matrix[x][y])) {
        number += matrix[x][y];
        part = part || isPart(matrix, x, y);
        matrix[x][y] = partNumber;
      }

      // If we are no longer looking at a digit, check if the constructed number was ever a part
      if (!isNumber(matrix[x][y]) || y === matrix[x].length - 1) {
        if (number.length && part) {
          // Add the part to set for easy access
          parts[partNumber] = parseInt(number);
        }

        // Reset
        number = '';
        part = false;
        partNumber += 1;
      }
    }
  }

  // Constructed our parts list, now lets check for gear ratios
  for (let x = 0; x < matrix.length; x++) {
    for (let y = 0; y < matrix[x].length; y++) {
      if (matrix[x][y] === '*') {
        // Count how many parts it's connected to
        answer += getGearRatio(matrix, parts, x, y);
      }
    }
  }

  console.log("Answer - ", answer);
})();
