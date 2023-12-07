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

// 4a
(async function run() {
  let answer = 0;

  const rl = readline.createInterface({
    input: fs.createReadStream('input.txt'),
    crlfDelay: Infinity
  });

  for await (const line of rl) {
    const matches = getMatches(line);
    answer += matches ? 2 ** (matches - 1) : 0;
  }

  console.log("Answer - ", answer);
})();
