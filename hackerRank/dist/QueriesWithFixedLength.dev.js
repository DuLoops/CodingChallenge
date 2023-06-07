'use strict';

var fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');
var inputString = '';
var currentLine = 0;
var counter = 0;
process.stdin.on('data', function (inputStdin) {
  inputString += inputStdin;

  if (++counter == 7) {
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
 * Complete the 'solve' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts following parameters:
 *  1. INTEGER_ARRAY arr
 *  2. INTEGER_ARRAY queries
 */


function solve(arr, queries) {
  var result = [];

  var _loop = function _loop(i) {
    var d = queries[i];
    var subArray = arr.slice(0, d);
    var maxIndex = subArray.reduce(function (prev, cur, curIndex) {
      return subArray[prev] < cur ? curIndex : prev;
    }, 0);
    var min = subArray[maxIndex];

    for (var index = d; index < arr.length; index++) {
      subArray[index - d] = -1;
      subArray.push(arr[index]);

      if (subArray[maxIndex] < 0) {
        var newMaxIndex = subArray.reduce(function (prev, cur, curIndex) {
          return subArray[prev] < cur ? curIndex : prev;
        }, 0);
        maxIndex = newMaxIndex;
        min = Math.min(min, subArray[maxIndex]);
        continue;
      }

      if (subArray[index] < subArray[maxIndex]) continue;
      maxIndex = index;
      min = Math.min(min, subArray[maxIndex]);
    }

    result.push(min);
  };

  for (var i = 0; i < queries.length; i++) {
    _loop(i);
  }

  return result;
}

function main() {
  // const ws = fs.createWriteStream(process.env.OUTPUT_PATH);
  var firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');
  var n = parseInt(firstMultipleInput[0], 10);
  var q = parseInt(firstMultipleInput[1], 10);
  var arr = readLine().replace(/\s+$/g, '').split(' ').map(function (arrTemp) {
    return parseInt(arrTemp, 10);
  });
  var queries = [];

  for (var i = 0; i < q; i++) {
    var queriesItem = parseInt(readLine().trim(), 10);
    queries.push(queriesItem);
  }

  var result = solve(arr, queries); // ws.write(result.join('\n') + '\n');

  console.log(result.join('\n') + '\n'); // ws.end();
}