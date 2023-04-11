'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;
let count = 0, n;

process.stdin.on('data', function (inputStdin) {

  inputString += inputStdin;
  if (count == 0) {
    n = parseInt(inputString.split(/\s/)[0])
  }
  if (count++ == n) {
    inputString = inputString.split('\n');
    main();
  }
});

process.stdin.on('SIGINT', function () {
  inputString = inputString.split('\n');

  main();
});

function readLine() {
  return inputString[currentLine++];
}



/*
 * Complete the 'truckTour' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts 2D_INTEGER_ARRAY petrolpumps as parameter.
 */

function truckTour(petrolpumps) {
  for (let i = 0; i < petrolpumps.length; i++) {
    let tank = petrolpumps[i][0] - petrolpumps[i][1];
    let j = i + 1;
    while (tank >= 0) {
      if (i == j) {
        return i;
      }
      if (j >= petrolpumps.length) j = 0;
      tank += petrolpumps[j][0] - petrolpumps[j][1];
      j++;
    }
  }

}

function main() {
  // const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const n = parseInt(readLine().trim(), 10);

  let petrolpumps = Array(n);

  for (let i = 0; i < n; i++) {
    petrolpumps[i] = readLine().replace(/\s+$/g, '').split(' ').map(petrolpumpsTemp => parseInt(petrolpumpsTemp, 10));
  }

  const result = truckTour(petrolpumps);

  console.log(result + '\n');

  // ws.end();
}
