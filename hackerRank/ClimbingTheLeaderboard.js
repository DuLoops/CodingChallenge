'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');


let inputString = '';
let currentLine = 0;
let count = 0;

process.stdin.on('data', function(inputStdin) {
  if (count++ == 4) {
    inputString = inputString.split('\n');

    main();
  }
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
 * Complete the 'climbingLeaderboard' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts following parameters:
 *  1. INTEGER_ARRAY ranked
 *  2. INTEGER_ARRAY player
 */

function climbingLeaderboard(ranked, player) {
    // Write your code here
    ranked.sort((a, b) => {b -a});
    ranked = [... new Set(ranked)]
    const output = [];
    player.forEach((score) => {
      
      for (let i = 0; i < ranked.length; i++) {
        if (score >= ranked[i]) {
          output.push(i + 1);
          break;
        }  
        else if (i == ranked.length - 1) {
          output.push(i + 2);
        }
      }
    }) 

    return output;

}
// 7
// 100 100 50 40 40 20 10
// 4
// 5 25 50 120

function main() {
    // const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const rankedCount = parseInt(readLine().trim(), 10);

    const ranked = readLine().replace(/\s+$/g, '').split(' ').map(rankedTemp => parseInt(rankedTemp, 10));

    const playerCount = parseInt(readLine().trim(), 10);

    const player = readLine().replace(/\s+$/g, '').split(' ').map(playerTemp => parseInt(playerTemp, 10));

    const result = climbingLeaderboard(ranked, player);

    console.log(result.join('\n') + '\n');

    // ws.end();
}
