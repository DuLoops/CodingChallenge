'use strict';
//4/12/2023

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;
let count = 0
process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
    if (++count == 5) {
        process.stdin.emit('end');
    }
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the 'arrayManipulation' function below.
 *
 * The function is expected to return a LONG_INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER n
 *  2. 2D_INTEGER_ARRAY queries
 */

function arrayManipulation(n, queries) {
  const arr = new Array(n + 1).fill(0)
  for (let i = 0; i < queries.length; i++) {
      const [start, end, value] = queries[i]
      arr[start - 1] += value
      arr[end] -= value
  }
  let max = arr[0]
  for (let i = 1; i < arr.length - 1; i++) {
      arr[i] += arr[i - 1]
      max = Math.max(max, arr[i])
  }
  return max

}

function main() {
    // const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const n = parseInt(firstMultipleInput[0], 10);

    const m = parseInt(firstMultipleInput[1], 10);

    let queries = Array(m);

    for (let i = 0; i < m; i++) {
        queries[i] = readLine().replace(/\s+$/g, '').split(' ').map(queriesTemp => parseInt(queriesTemp, 10));
    }

    const result = arrayManipulation(n, queries);

    // ws.write(result + '\n');
    console.log(result + '\n')
    // ws.end();
}
