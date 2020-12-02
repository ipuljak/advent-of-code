const fs = require('fs');

const solution = file => {
    const data = fs.readFileSync(file, 'UTF-8');
    const lines = data.split(/\r?\n/);
    const map = {};

    for (let x = 0; x < lines.length - 1; x++) {
        let val = parseInt(lines[x]);

        if (map[val] !== undefined) {
            return map[val] * val;
        } else {
            map[2020-val] = val;
        }
    }
};

console.log(solution('./input.txt'));