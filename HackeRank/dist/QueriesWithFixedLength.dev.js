'use strict';

var fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');
var inputString = '';
var currentLine = 0;
process.stdin.on('data', function (inputStdin) {
  inputString += inputStdin;
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


function solve(arr, queries) {// Write your code here
}

function main() {
  var ws = fs.createWriteStream(process.env.OUTPUT_PATH);
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

  var result = solve(arr, queries);
  ws.write(result.join('\n') + '\n');
  ws.end();
}