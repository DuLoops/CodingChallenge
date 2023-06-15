'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;
let count = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
    if (++count > 6) {
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
 * Complete the 'roadsAndLibraries' function below.
 *
 * The function is expected to return a LONG_INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER n
 *  2. INTEGER c_lib
 *  3. INTEGER c_road
 *  4. 2D_INTEGER_ARRAY cities
 */


function roadsAndLibraries(n, c_lib, c_road, cities) {
    const allCities  = new Map()
    const clusters = new Set()

    // if lib cost less than road, build libraries in every city
    if (c_lib < c_road || cities.length === 0) {
        return n * c_lib
    }

    for (let connection of cities) {
        const city1 = allCities.get(connection[0] || {value: connection[0]})
        const city2 = allCities.get(connection[1] || {value: connection[1]})

        //if clusters are set, continue
        if (city1.cluster && city1.cluster === city2.cluster ) continue

        //if both have no clusters, start new
        if (!city1.cluster && !city2.cluster) {
            city1.cluster = city2.cluster = new Set([city1, city2])
            clusters.add(city1.clutser)
            allCities.set(city1.value, city1) 
            allCities.set(city2.value, city2)
            continue
        }

        //if both have clusters, merge
        if (city1.cluster && city2.cluster) {
            clusters.delete(city2.cluster)
            for (let node of city2.cluster) {
                city1.cluster.add(node)
                node.cluster = city1.cluster
            }
            continue
        }

        //if only one city has cluster, join 
        city1.cluster = city2.cluster = city1.cluster || city2.cluster
        city1.cluster.add(city1)
        city1.cluster.add(city2)
        allCities.set(city1.value, city1)
        allCities.set(city2.value, city2)
    }

    let totalCost = 0
    let totalClusteredCities = 0

    for (let cluster of clusters) {
        totalCost += c_clib
        totalCost += (cluster.size - 1) * c_road
        totalClusteredCities += cluster.size
    }

    const isolatedCities = n - totalClusteredCities
    totalCost += isolatedCities * c_lib
    return totalCost

}

function main() {
    // const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const q = parseInt(readLine().trim(), 10);

    for (let qItr = 0; qItr < q; qItr++) {
        const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

        const n = parseInt(firstMultipleInput[0], 10);

        const m = parseInt(firstMultipleInput[1], 10);

        const c_lib = parseInt(firstMultipleInput[2], 10);

        const c_road = parseInt(firstMultipleInput[3], 10);

        let cities = Array(m);

        for (let i = 0; i < m; i++) {
            cities[i] = readLine().replace(/\s+$/g, '').split(' ').map(citiesTemp => parseInt(citiesTemp, 10));
        }

        const result = roadsAndLibraries(n, c_lib, c_road, cities);

        // ws.write(result + '\n');
        console.log(result);
    }

    ws.end();
}
