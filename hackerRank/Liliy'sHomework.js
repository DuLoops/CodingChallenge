'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;
let count = 0
process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
    if (++count == 2) {
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
 * Complete the 'lilysHomework' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts INTEGER_ARRAY arr as parameter.
 */

function swap(arr, a, b) {
  let temp = arr[a]
  arr[a] = arr[b]
  arr[b] = temp
}


function unsortVectorArr(vectorArr, arr) {
let swaps = 0
for (let i = 0; i < arr.length; i++) {
  if (vectorArr[i].value !== arr[i]) {
    //let newIndex = vectorArr[i].index
    swap(vectorArr, i, vectorArr[i].index)
    swaps++
    i--
  }
}
return swaps
}

function lilysHomework(arr) {
  let vectorArr = []
  let swapsAscending = 0
  let swapsDescending = 0

  for (let i = 0; i < arr.length; i++) {
    vectorArr.push({value: arr[i], index: i})
  }

  vectorArr.sort((a, b) => a.value - b.value)

  swapsAscending = unsortVectorArr(vectorArr, arr)

  vectorArr.sort((a, b) => b.value - a.value)

  swapsDescending = unsortVectorArr(vectorArr, arr)

  return Math.min(swapsAscending, swapsDescending)
}


function main() {
    // const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine().trim(), 10);

    const arr = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));

    const result = lilysHomework(arr);

    // ws.write(result + '\n');
    console.log(result)
    // ws.end();
}
