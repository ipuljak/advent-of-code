const fs = require('fs');
const readline = require('readline');

// 1a
(async function run() {
  let answer = 0;

  const rl = readline.createInterface({
    input: fs.createReadStream('input.txt'),
    crlfDelay: Infinity
  });

  for await (const line of rl) {
    let number = '';
    const chars = line.split('');

    for (let x = 0; x < chars.length; x++) {
      if (chars[x] >= '0' && chars[x] <= '9') {
        number += chars[x];
        break;
      }
    }

    for (let x = chars.length - 1; x >= 0; x--) {
      if (chars[x] >= '0' && chars[x] <= '9') {
        number += chars[x];
        break;
      }
    }

    answer += parseInt(number);
  }

  console.log("Answer - ", answer);
})();
