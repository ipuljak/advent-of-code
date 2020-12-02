const fs = require('fs');

const solution = file => {
    const data = fs.readFileSync(file, 'UTF-8');
    const lines = data.split(/\r?\n/);
    const map = {};

    for (let x = 0; x < lines.length - 1; x++) {
        let val = parseInt(lines[x]);
        map[2020-val] = val;
    }

    for (let x = 0; x < lines.length - 1; x++) {
        for (let y = x + 1; y < lines.length; y++) {
            let xval = parseInt(lines[x]);
            let yval = parseInt(lines[y]);
            let sum = xval + yval;

            if (map[sum] !== undefined) {
                console.log(map[sum], xval, yval);
                return map[sum] * xval * yval;
            }
        }
    }
};

console.log(solution('./input.txt'));