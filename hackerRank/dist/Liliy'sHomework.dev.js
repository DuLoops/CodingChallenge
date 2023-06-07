'use strict';

var fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');
var inputString = '';
var currentLine = 0;
var count = 0;
process.stdin.on('data', function (inputStdin) {
  inputString += inputStdin;

  if (++count == 2) {
    process.stdin.emit('end');
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
 * Complete the 'lilysHomework' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts INTEGER_ARRAY arr as parameter.
 */


function unsortVectorArr(vectorArr, arr) {
  var swaps = 0;

  for (var i = 0; i < arr.length; i++) {
    if (vectorArr[i].value !== arr[i]) {
      var newIndex = vectorArr.index[(vectorArr[i], vectorArr[newIndex])] = [vectorArr[newIndex], vectorArr[i]];
      swaps++;
      i--;
    }
  }

  return swaps;
}

function lilysHomework(arr) {
  var vectorArr = [];
  var swapsAscending = 0;
  var swapsDescending = 0;

  for (var i = 0; i < arr.length; i++) {
    vectorArr.push({
      value: arr[i],
      index: i
    });
  }

  vectorArr.sort(function (a, b) {
    return a.value - b.value;
  });
  swapsAscending = unsortVectorArr(vectorArr, arr);
  vectorArr.sort(function (a, b) {
    return b.value - a.value;
  });
  swapsDescending = unsortVectorArr(vectorArr, arr);
  return Math.min(swapsAscending, swapsDescending);
}

function main() {
  // const ws = fs.createWriteStream(process.env.OUTPUT_PATH);
  var n = parseInt(readLine().trim(), 10);
  var arr = readLine().replace(/\s+$/g, '').split(' ').map(function (arrTemp) {
    return parseInt(arrTemp, 10);
  });
  var result = lilysHomework(arr); // ws.write(result + '\n');

  console.log(result); // ws.end();
}