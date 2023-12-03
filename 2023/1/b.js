const fs = require('fs');
const readline = require('readline');

const map = {
  '1': '1',
  '2': '2',
  '3': '3',
  '4': '4',
  '5': '5',
  '6': '6',
  '7': '7',
  '8': '8',
  '9': '9',
  'one': '1',
  'two': '2',
  'three': '3',
  'four': '4',
  'five': '5',
  'six': '6',
  'seven': '7',
  'eight': '8',
  'nine': '9'
}

const keys = Object.keys(map);

// Read the two digit number from the given string
function getNumber(str) {
  const numbers = [];

  let ptr1 = 0;
  let ptr2 = 0;
  let curr = '';

  while (ptr1 < str.length) {
    curr += str[ptr2];

    const match = keys.find(key => key.startsWith(curr));

    if (match) {
      if (curr === match) {
        numbers.push(map[curr]);
      } else {
        ptr2 += 1;
        continue;
      }
    }

    ptr1 += 1;
    ptr2 = ptr1;
    curr = '';
  }

  return parseInt(numbers[0] + numbers[numbers.length - 1]);
}

// 1b
(async function run() {
  let answer = 0;

  const rl = readline.createInterface({
    input: fs.createReadStream('input.txt'),
    crlfDelay: Infinity
  });

  for await (const line of rl) {
    answer += getNumber(line);
  }

  console.log("Answer - ", answer);
})();
