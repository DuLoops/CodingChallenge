'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;
let count = 0

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
    if (++count == 9) {
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
 * Complete the 'bfs' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts following parameters:
 *  1. INTEGER n
 *  2. INTEGER m
 *  3. 2D_INTEGER_ARRAY edges
 *  4. INTEGER s
 */
    
function bfs(n, m, edges, s) {
    const output = new Array(n - 1).fill(-1)
    const adj = new Array(n + 1)
    for (let i = 0; i < adj.length; i++) {
        adj[i] = []
    }
    for (const e of edges) {
        adj[e[0]].push(e[1])
        adj[e[1]].push(e[0])
    }
    
    let visited = new Array(n + 1).fill(false)
    visited[s] = true
    let queue = []
    queue.push(s)
    let step = 1
    while (queue.length > 0) {
        const queLen = queue.length
        for (let i = 0; i < queLen; i++) {
            const q = queue.shift()
            adj[q].forEach(node => {
                if (visited[node] == false) {
                    queue.push(node)
                    visited[node] = true
                    const outputIndex = node > s ? node - 2 : node - 1;
                    output[outputIndex] = step * 6
                }
            })
        }
        step++;
    }
    
    
    return output

}

function main() {
    // const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const q = parseInt(readLine().trim(), 10);

    for (let qItr = 0; qItr < q; qItr++) {
        const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

        const n = parseInt(firstMultipleInput[0], 10);

        const m = parseInt(firstMultipleInput[1], 10);

        let edges = Array(m);

        for (let i = 0; i < m; i++) {
            edges[i] = readLine().replace(/\s+$/g, '').split(' ').map(edgesTemp => parseInt(edgesTemp, 10));
        }

        const s = parseInt(readLine().trim(), 10);

        const result = bfs(n, m, edges, s);

        // ws.write(result.join(' ') + '\n');
        console.log(result.join(' ') + '\n');
    }

    ws.end();
}
