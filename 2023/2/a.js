const fs = require('fs');
const readline = require('readline');

const RED_MAX = 12;
const GREEN_MAX = 13;
const BLUE_MAX = 14;

// Get the id of the given game if it matches the threshold
function getGameScore(line) {
  const map = {
    red: 0,
    green: 0,
    blue: 0,
  };

  const [group1, group2] = line.split(':');
  const [_, id] = group1.trim().split(' ');
  const sets = group2.trim().split(';').map(set => set.trim());

  for (const set of sets) {
    const cubes = set.split(',').map(cube => cube.trim());

    for (const cube of cubes) {
      const [count, colour] = cube.split(' ');

      if (parseInt(count) > map[colour]) {
        map[colour] = parseInt(count);
      }
    }
  }

  if (map['red'] > RED_MAX || map['green'] > GREEN_MAX || map['blue'] > BLUE_MAX) {
    return 0;
  }

  return parseInt(id);
}

// 2a
(async function run() {
  let answer = 0;

  const rl = readline.createInterface({
    input: fs.createReadStream('input.txt'),
    crlfDelay: Infinity
  });

  for await (const line of rl) {
    answer += getGameScore(line);
  }

  console.log('Answer - ', answer);
})();
