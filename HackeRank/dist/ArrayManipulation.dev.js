'use strict'; //4/12/2023

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');
var inputString = '';
var currentLine = 0;
var count = 0;
process.stdin.on('data', function (inputStdin) {
  inputString += inputStdin;

  if (++count == 5) {
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
 * Complete the 'arrayManipulation' function below.
 *
 * The function is expected to return a LONG_INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER n
 *  2. 2D_INTEGER_ARRAY queries
 */


function arrayManipulation(n, queries) {
  var arr = new Array(n + 1).fill(0);

  for (var i = 0; i < queries.length; i++) {
    var _queries$i = _slicedToArray(queries[i], 3),
        start = _queries$i[0],
        end = _queries$i[1],
        value = _queries$i[2];

    arr[start - 1] += value;
    arr[end] -= value;
  }

  var max = arr[0];

  for (var _i2 = 1; _i2 < arr.length - 1; _i2++) {
    arr[_i2] += arr[_i2 - 1];
    max = Math.max(max, arr[_i2]);
  }

  return max;
}

function main() {
  // const ws = fs.createWriteStream(process.env.OUTPUT_PATH);
  var firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');
  var n = parseInt(firstMultipleInput[0], 10);
  var m = parseInt(firstMultipleInput[1], 10);
  var queries = Array(m);

  for (var i = 0; i < m; i++) {
    queries[i] = readLine().replace(/\s+$/g, '').split(' ').map(function (queriesTemp) {
      return parseInt(queriesTemp, 10);
    });
  }

  var result = arrayManipulation(n, queries); // ws.write(result + '\n');

  console.log(result + '\n'); // ws.end();
}