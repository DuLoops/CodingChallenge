'use strict';

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;
let counter = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
    if (++counter == 1) {
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
 * Complete the 'miniMaxSum' function below.
 *
 * The function accepts INTEGER_ARRAY arr as parameter.
 */

function miniMaxSum(arr) {
    arr.sort()
    let sum = 0;
    for (let x of arr) {
        sum += x
    }
    console.log((sum - arr[4]) + ' ' + (sum - arr[0]))

}


function main() {

    const arr = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));

    miniMaxSum(arr);
}
