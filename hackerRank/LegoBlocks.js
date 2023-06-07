'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;
let count =0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
    if (count++ == 4) {
        inputString = inputString.split('\n');
        main();
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
 * Complete the 'legoBlocks' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER n
 *  2. INTEGER m
 */

function legoBlocks(h, w) {
    const A = 1000000007n;
    const a = new Array(w + 1).fill(0n);
    const b = new Array(w + 1).fill(0n);
    
    a[0] = 1n;
    for (let i = 1; i <= w; i++) {
        a[i] += (i - 1 >= 0) ? a[i-1] : 0n;
        a[i] += (i - 2 >= 0) ? a[i-2] : 0n;
        a[i] += (i - 3 >= 0) ? a[i-3] : 0n;
        a[i] += (i - 4 >= 0) ? a[i-4] : 0n;
    }
    
    for (let i = 1; i <= w; i++) {
        const n1 = a[i] % A;
        const sum = n1 ** BigInt(h);
        a[i] = sum % A;
    }
    
    b[1] = 1n;
    for (let i = 2; i <= w; i++) {
        b[i] = a[i];
        for (let j = 1; j < i; j++) {
            const n1= b[j] * a[i - j];
            b[i] -= n1;
        }
        b[i] = b[i] % A + A;
    }
    return b[w] % A;

}

function main() {
    // const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const t = parseInt(readLine().trim(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

        const n = parseInt(firstMultipleInput[0], 10);

        const m = parseInt(firstMultipleInput[1], 10);

        const result = legoBlocks(n, m);

        console.log(result + '\n');
        // ws.write(result + '\n');
    }

    // ws.end();
}
