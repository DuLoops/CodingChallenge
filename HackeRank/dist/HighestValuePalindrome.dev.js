'use strict';

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');
var inputString = '';
var currentLine = 0;
var counter = 0;
process.stdin.on('data', function (inputStdin) {
  inputString += inputStdin;

  if (++counter == 2) {
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
 * Complete the 'highestValuePalindrome' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts following parameters:
 *  1. STRING s
 *  2. INTEGER n
 *  3. INTEGER k
 */


var isPal = function isPal(s) {
  for (var i = 0; i < s.length / 2; i++) {
    if (s[i] != s[s.length - 1 - i]) {
      return false;
    }
  }

  return true;
};

var replaceCharAt = function replaceCharAt(str, index, _char) {
  if (index > str.length - 1) return str;
  return str.substr(0, index) + _char + str.substr(index + 1);
};

function highestValuePalindrome(s, n, k) {
  if (n === 1) return k == 1 ? '9' : '-1';

  var arr = _toConsumableArray(s);

  var c = Array(n).fill(0);
  var x = Math.floor(n / 2) + (n & 1);

  for (var i = 0; i < x; i++) {
    if (arr[i] !== arr[n - 1 - i]) {
      arr[i] = arr[n - 1 - i] = Math.max(arr[i], arr[n - 1 - i]);
      c[i]++;
      k--;
    }

    if (k < 0) return '-1';
  }

  for (var _i = 0; _i < x; _i++) {
    if (arr[_i] != '9') {
      var cost = c[_i] === 1 || _i === n - 1 - _i ? 1 : 2;

      if (k >= cost) {
        arr[_i] = arr[n - 1 - _i] = '9';
        k -= cost;
      }
    }
  }

  return arr.join('');
}

function main() {
  // const ws = fs.createWriteStream(process.env.OUTPUT_PATH);
  var firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');
  var n = parseInt(firstMultipleInput[0], 10);
  var k = parseInt(firstMultipleInput[1], 10);
  var s = readLine();
  var result = highestValuePalindrome(s, n, k); // ws.write(result + '\n');

  console.log(result + '\n'); // ws.end();
}