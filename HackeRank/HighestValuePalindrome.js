'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;
let counter = 0

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
    if (++counter == 2) {
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
 * Complete the 'highestValuePalindrome' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts following parameters:
 *  1. STRING s
 *  2. INTEGER n
 *  3. INTEGER k
 */

const isPal = (s) => {
    for (let i = 0; i < s.length / 2; i++) {
        if (s[i] != s[s.length - 1 - i]) {
            return false
        }
    }
    return true
}

const replaceCharAt = (str, index, char) => {
    if (index > str.length - 1) return str
    return str.substr(0, index) + char + str.substr(index + 1)
}

function highestValuePalindrome(s, n, k) {
    if (n === 1) return k == 1 ? '9' : '-1'
            
    let arr = [...s]
    let c = Array(n).fill(0)
    let x = Math.floor(n/2) + (n&1)
    
    for (let i = 0; i < x; i++) {
        if (arr[i] !== arr[n-1-i]) {
            arr[i] = arr[n-1-i] = Math.max(arr[i], arr[n-1-i])
            c[i]++
            k--
        }
        if (k < 0) return '-1'
    }
    
    for (let i = 0; i < x; i++) {
        if (arr[i] != '9') {
            let cost = c[i] === 1 || i === (n-1-i) ? 1 : 2
            if (k >= cost) {
                arr[i] = arr[n-1-i] = '9'
                k -= cost
            }
        }
    }
    return arr.join('')
}

function main() {
    // const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const n = parseInt(firstMultipleInput[0], 10);

    const k = parseInt(firstMultipleInput[1], 10);

    const s = readLine();

    const result = highestValuePalindrome(s, n, k);

    // ws.write(result + '\n');
    console.log(result + '\n')

    // ws.end();
}
