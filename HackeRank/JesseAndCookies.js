'use strict';




const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;
let count = 0
process.stdin.on('data', function (inputStdin) {
  if (count++ == 2) {
    inputString = inputString.split('\n');

    main();
  }
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
 * Complete the 'cookies' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER k
 *  2. INTEGER_ARRAY A
 */


// PriorityQueue class
class PriorityQueue {

  constructor() {
    this.items = [];
  }

  enqueue(element) {
    // creating object from queue element
    var contain = false;

    for (var i = 0; i < this.items.length; i++) {
      if (this.items[i] > element) {
        // Once the correct location is found it is
        // enqueued
        this.items.splice(i, 0, element);
        contain = true;
        break;
      }
    }
    if (!contain) {
      this.items.push(element);
    }
  }

  dequeue() {
    // return the dequeued element
    // and remove it.
    // if the queue is empty
    // returns Underflow
    return this.items.shift();
  }

  front() {
    // returns the highest priority element
    // in the Priority queue without removing it.

    return this.items[0];
  }

  len() {
    return this.items.length;
  }
}

function cookies(k, A) {
  const pq = new PriorityQueue();
  A.forEach(a => pq.enqueue(a, a));
  let iter = 0;
  while (pq.front() < k && pq.len() > 1) {
    let a = pq.dequeue();
    let b = pq.dequeue();
    pq.enqueue(a + b * 2,a + b * 2)
    iter++;
  }
  return A.length > 1 ? iter : -1;

}

function main() {
  // const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

  const n = parseInt(firstMultipleInput[0], 10);

  const k = parseInt(firstMultipleInput[1], 10);

  const A = readLine().replace(/\s+$/g, '').split(' ').map(ATemp => parseInt(ATemp, 10));

  const result = cookies(k, A);

  // ws.write(result + '\n');
  console.log(result + '\n')

  // ws.end();
}
