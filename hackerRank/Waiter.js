'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;
let count = 1;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
    if(count++ == 2) {
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
 * Complete the 'waiter' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts following parameters:
 *  1. INTEGER_ARRAY number
 *  2. INTEGER q
 */



function waiter(number, q) {
    const isPrime = n => {
        for (let i = 2; i < n; i++) {
            if (n % i == 0) return false
        }
        return true;
    }

    const getPrimes = n => {
        const primes = [];
        let i = 2;
        while (primes.length < n) {
            if (isPrime(i)) primes.push(i);
            i++;
        }
        return primes;
    }

    const primes = getPrimes(q);
    const ans = [];
    const a = [number];
    const b= [[]];

    for (let i = 1; i <= q; i++) {
        a.push([]);
        b.push([])
        while (a[i - 1].length) {
            let e = a[i - 1].pop()
            if (e % primes[i - 1] == 0) b[i-1].push(e);
            else a[i].push(e)
        }
    }
    b.concat(a).forEach(ab => ans.push(...ab.reverse()))



    return ans;

}

function main() {
    // const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const n = parseInt(firstMultipleInput[0], 10);

    const q = parseInt(firstMultipleInput[1], 10);

    const number = readLine().replace(/\s+$/g, '').split(' ').map(numberTemp => parseInt(numberTemp, 10));

    const result = waiter(number, q);

    console.log(result.join('\n') + '\n');
    // ws.write(result.join('\n') + '\n');

    // ws.end();
}
