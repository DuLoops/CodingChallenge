'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;
let count = 0
process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
    if (++count== 8) {
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
 * Complete the 'cutTheTree' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER_ARRAY data
 *  2. 2D_INTEGER_ARRAY edges
 */

function dfs(nodes, data, i, treeVal, visited) {
    let sum = data[i - 1]
    visited[i] = true
    for (const n of nodes[i]) {
        if (visited[n] == false)
            sum += dfs(nodes, data, n, treeVal, visited)
    }
    treeVal[i] += sum
    
    return sum 
}

function cutTheTree(data, edges) {
    const sum = data.reduce((prev, cur) => prev += cur)
    const nodes = new Array(data.length + 1)
    for (let i = 0; i < nodes.length; i++) {
        nodes[i] = []
    }
    let min = sum;
    for (const edge of edges) {
        nodes[edge[0]].push(edge[1])
        nodes[edge[1]].push(edge[0])
    }
    const treeVal = new Array(data.length + 1).fill(0)
    const visited = new Array(data.length + 1).fill(false)
    dfs(nodes, data, 1, treeVal, visited)
    for (let i = 1; i < treeVal.length; i++) {
        if (treeVal[i] != sum)
            min = Math.min(min, Math.abs(treeVal[i] - (sum - treeVal[i])))
    }
    return min
}

function main() {
    // const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine().trim(), 10);

    const data = readLine().replace(/\s+$/g, '').split(' ').map(dataTemp => parseInt(dataTemp, 10));

    let edges = Array(n - 1);

    for (let i = 0; i < n - 1; i++) {
        edges[i] = readLine().replace(/\s+$/g, '').split(' ').map(edgesTemp => parseInt(edgesTemp, 10));
    }

    const result = cutTheTree(data, edges);

    // ws.write(result + '\n');
    console.log(result + '\n')

    // ws.end();
}
