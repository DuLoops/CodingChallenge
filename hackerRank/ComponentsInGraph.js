'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;
let count = 0

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
    if (++count == 11) {
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
 * Complete the 'componentsInGraph' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts 2D_INTEGER_ARRAY gb as parameter.
 */

function calculateClusterSizes(nodes) {
    const visited = new Array(nodes.length).fill(false);
    const clusterSizes = [];
  
    for (let i = 1; i < nodes.length; i++) {
      if (!visited[i]) {
        const clusterSize = BFS(nodes, i, visited);
        clusterSizes.push(clusterSize);
      }
    }
  
    return clusterSizes;
  }
  
  function BFS(nodes, startNode, visited) {
    const queue = [startNode];
    visited[startNode] = true;
    let clusterSize = 1;
  
    while (queue.length > 0) {
      const node = queue.shift();
      const connectedNodes = nodes[node];
  
      for (const connectedNode of connectedNodes) {
        if (!visited[connectedNode]) {
          queue.push(connectedNode);
          visited[connectedNode] = true;
          clusterSize++;
        }
      }
    }
  
    return clusterSize;
  }
  
function componentsInGraph(gb) {
    const nodes = new Array(gb.length * 2 + 1)
    for (let i = 0; i < nodes.length; i++) {
        nodes[i] = new Set()
    }

    for (const edge of gb) {
        nodes[edge[0]].add(edge[1])
        nodes[edge[1]].add(edge[0])
    }
    const clusterSizes = calculateClusterSizes(nodes)
    const filtered = clusterSizes.filter(x => x > 1)
    const minClusterSize = Math.min(...filtered)
    const maxClusterSize = Math.max(...clusterSizes)
    return [minClusterSize, maxClusterSize]
}

function main() {
    // const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine().trim(), 10);

    let gb = Array(n);

    for (let i = 0; i < n; i++) {
        gb[i] = readLine().replace(/\s+$/g, '').split(' ').map(gbTemp => parseInt(gbTemp, 10));
    }

    const result = componentsInGraph(gb);

    // ws.write(result.join(' ') + '\n');
    console.log(result.join(' ') + '\n');

    // ws.end();
}
