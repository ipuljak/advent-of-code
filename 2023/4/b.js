const fs = require('fs');
const readline = require('readline');

function getMatches(card) {
  let matches = 0;

  const [_, numbers] = card.split(':');
  const [winningNumbersString, myNumbersString] = numbers.trim().split('|');
  const winningNumbers = winningNumbersString.trim().split(/\s+/);
  const myNumbers = myNumbersString.trim().split(/\s+/);

  const map = {};

  for (const number of winningNumbers) {
    map[number] = true;
  }

  for (const number of myNumbers) {
    if (map[number]) {
      matches++;
      delete map[number];
    }
  }

  return matches;
}

// 4b
(async function run() {
  let answer = 0;

  const rl = readline.createInterface({
    input: fs.createReadStream('input.txt'),
    crlfDelay: Infinity
  });

  const matches = [];
  const copies = [];

  for await (const line of rl) {
    matches.push(getMatches(line));
    copies.push(1);
  }

  for (let x = 0; x < copies.length; x++) {
    if (matches[x] !== 0) {
      for (let y = x + 1; y < x + 1 + matches[x]; y++) {
        copies[y] += copies[x];
      }
    }

    answer += copies[x];
  }

  console.log("Answer - ", answer);
})();
