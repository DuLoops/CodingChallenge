'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the 'minimumMoves' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. STRING_ARRAY grid
 *  2. INTEGER startX
 *  3. INTEGER startY
 *  4. INTEGER goalX
 *  5. INTEGER goalY
 */

function minimumMoves(grid, startX, startY, goalX, goalY) {
    const queue = []
    const directions = ["right", "down", "left", "up"]
    for (let x = 0; x < grid.length; x++) {
        grid[x] = grid[x].split("")
    }

    grid[startX][startY] = 0
    queue.push({x: startX, y: startY})

    while(queue.length > 0) {
        const toProcess = queue.shift()
        const currentValue = grid[toProcess.x][toProcess.y]

        for (let direction of directions) {
            let x = toProcess.x, y = toProcess.y

            while(true) {
                if (direction == "right") x++;
                else if (direction == "down") y++
                else if (direction == "left") x--
                else if (direction == "up") y--

                if(x < 0 || x > grid.length - 1) break
                if (y < 0 || y > grid.length - 1) break

                const next = grid[x][y]
                if (next === 'X') break
                if (next <= currentValue + 1) continue

                grid[x][y] = currentValue + 1
                queue.push({x: x, y:y})
            }
        }
    }
    return grid[goalX][goalY]

}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine().trim(), 10);

    let grid = [];

    for (let i = 0; i < n; i++) {
        const gridItem = readLine();
        grid.push(gridItem);
    }

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const startX = parseInt(firstMultipleInput[0], 10);

    const startY = parseInt(firstMultipleInput[1], 10);

    const goalX = parseInt(firstMultipleInput[2], 10);

    const goalY = parseInt(firstMultipleInput[3], 10);

    const result = minimumMoves(grid, startX, startY, goalX, goalY);

    ws.write(result + '\n');

    ws.end();
}
