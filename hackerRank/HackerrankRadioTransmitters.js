'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;
let counter = 0
process.stdin.on('data', function (inputStdin) {
  inputString += inputStdin;
  if (counter++ == 2) {
    inputString = inputString.split('\n');

    main();
  }
});

process.stdin.on('end', function () {
  inputString = inputString.split('\n');

  main();
});

function readLine() {
  return inputString[currentLine++];
}

/*
 * Complete the 'hackerlandRadioTransmitters' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER_ARRAY x
 *  2. INTEGER k
 */

function hackerlandRadioTransmitters(x, k) {
  x.sort((a, b) => a - b)
  const transmitters = []
  let covered = false
  for (let i = 0; i < x.length; i++) {
    covered = false
    transmitters.forEach(item => {
      if (item + k >= x[i]) covered = true
    })

    if (!covered) {
      let j = i
      while (j < x.length && x[j + 1] - x[i] <= k) {
        j++
      }
      transmitters.push(x[j])
    }
  }
  return transmitters.length

}

function main() {
  // const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

  const n = parseInt(firstMultipleInput[0], 10);

  const k = parseInt(firstMultipleInput[1], 10);

  const x = readLine().replace(/\s+$/g, '').split(' ').map(xTemp => parseInt(xTemp, 10));

  const result = hackerlandRadioTransmitters(x, k);

  // ws.write(result + '\n');
  console.log(result + '\n')

  // ws.end();
}
