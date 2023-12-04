const fs = require('fs');
const readline = require('readline');

function isNumber(str) {
  return !isNaN(parseInt(str));
}

function isSymbol(str) {
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

  // Construct the grid with valid parts
  for (let x = 0; x < matrix.length; x++) {
    let number = '';
    let part = false;

    for (let y = 0; y < matrix[x].length; y++) {
      // If we are observing a digit, check if it can be considered a valid part
      if (isNumber(matrix[x][y])) {
        number += matrix[x][y];
        part = part || isPart(matrix, x, y);
      }

      // If we are no longer looking at a digit, check if the constructed number was ever a part
      if (!isNumber(matrix[x][y]) || y === matrix[x].length - 1) {
        if (number.length && part) {
          answer += parseInt(number);
        }

        // Reset
        number = '';
        part = false;
      }
    }
  }


  console.log("Answer - ", answer);
})();
