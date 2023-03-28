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
var count = 1;
process.stdin.on('data', function (inputStdin) {
  inputString += inputStdin;

  if (count++ == 2) {
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
 * Complete the 'waiter' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts following parameters:
 *  1. INTEGER_ARRAY number
 *  2. INTEGER q
 */


function waiter(number, q) {
  var isPrime = function isPrime(n) {
    for (var i = 2; i < n; i++) {
      if (n % i == 0) return false;
    }

    return true;
  };

  var getPrimes = function getPrimes(n) {
    var primes = [];
    var i = 2;

    while (primes.length < n) {
      if (isPrime(i)) primes.push(i);
      i++;
    }

    return primes;
  };

  var primes = getPrimes(q);
  var ans = [];
  var a = [number];
  var b = [[]];

  for (var i = 1; i <= q; i++) {
    a.push([]);
    b.push([]);

    while (a[i - 1].length) {
      var e = a[i - 1].pop();
      if (e % primes[i - 1] == 0) b[i - 1].push(e);else a[i].push(e);
    }
  }

  b.concat(a).forEach(function (ab) {
    return ans.push.apply(ans, _toConsumableArray(ab.reverse()));
  });
  return ans;
}

function main() {
  // const ws = fs.createWriteStream(process.env.OUTPUT_PATH);
  var firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');
  var n = parseInt(firstMultipleInput[0], 10);
  var q = parseInt(firstMultipleInput[1], 10);
  var number = readLine().replace(/\s+$/g, '').split(' ').map(function (numberTemp) {
    return parseInt(numberTemp, 10);
  });
  var result = waiter(number, q);
  console.log(result.join('\n') + '\n'); // ws.write(result.join('\n') + '\n');
  // ws.end();
}