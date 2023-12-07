const fs = require('fs');
const readline = require('readline');

function getSeeds(lines) {
  return lines
    .shift()
    .split(':')[1]
    .trim()
    .split(/\s+/)
    .map(seed => parseInt(seed));
}

function getMaps(lines) {
  lines.shift();

  const maps = [];
  let map = [];

  for (const line of lines) {
    if (!line) {
      maps.push(map);
      continue;
    }

    if (line.includes('map')) {
      map = [];
      continue;
    }

    map.push(line.trim().split(/\s+/).map(number => parseInt(number)));
  }

  if (map.length) {
    maps.push(map);
  }

  return maps;
}

function getLocation(seed, maps) {
  let curr = seed;

  for (const map of maps) {
    let match = false;

    for (const path of map) {
      if (!match && (path[1] <= curr) && (curr < (path[1] + path[2]))) {
        curr = path[0] + (curr - path[1]);
        match = true;
      }
    }

    if (!match) {
      curr = curr;
    }
  }

  return curr;
}

// 5a
(async function run() {
  let answer = Infinity;

  const rl = readline.createInterface({
    input: fs.createReadStream('input.txt'),
    crlfDelay: Infinity
  });

  const lines = [];

  for await (const line of rl) {
    lines.push(line);
  }

  const seeds = getSeeds(lines);
  const maps = getMaps(lines);

  for (const seed of seeds) {
    answer = Math.min(answer, getLocation(seed, maps));
  }

  console.log("Answer - ", answer);
})();
