const fs = require('fs');
const readline = require('readline');

// Get the id of the given game if it matches the threshold
function getGamePower(line) {
  const map = {
    red: 0,
    green: 0,
    blue: 0,
  };

  const [_, group2] = line.split(':');
  const sets = group2.trim().split(';').map(set => set.trim());

  for (const set of sets) {
    const cubes = set.split(',').map(cube => cube.trim());

    for (const cube of cubes) {
      const [count, colour] = cube.split(' ');

      if (map[colour] === 0 || parseInt(count) > map[colour]) {
        map[colour] = parseInt(count);
      }
    }
  }

  return map['red'] * map['green'] * map['blue'];
}

// 2a
(async function run() {
  let answer = 0;

  const rl = readline.createInterface({
    input: fs.createReadStream('input.txt'),
    crlfDelay: Infinity
  });

  for await (const line of rl) {
    answer += getGamePower(line);
  }

  console.log('Answer - ', answer);
})();
