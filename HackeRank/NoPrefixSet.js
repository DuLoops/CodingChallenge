'use strict';

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

let count = 0;

process.stdin.on('data', function(inputStdin) {
    if (count++ == 7) {
        inputString = inputString.split('\n');

        main();
    }
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the 'noPrefix' function below.
 *
 * The function accepts STRING_ARRAY words as parameter.
 */


class SimpleTree {
    constructor() {
        this.tree = {}
    }
    
    check_prefix(s) {
        let t = this.tree;
        let chars = s.split('');
        for (let i = 0; i < chars.length; i++) {
            const c = chars[i]
            if (!Object.keys(t).includes(c)) {
                t[c] = i == chars.length - 1 ? 'eow' : {};
            } else if (t[c] == 'eow'|| i === chars.length - 1) {
                return true;
            }
            t = t[c]
        }
        return false
    }
}



function noPrefix(words) {
    const tree= new SimpleTree();
    for (const word of words) {
        if (tree.check_prefix(word)) {
            console.log("BAD SET")
            console.log(word)
            return
        }
    }
    console.log('GOOD SET')
}

function main() {
    const n = parseInt(readLine().trim(), 10);

    let words = [];

    for (let i = 0; i < n; i++) {
        const wordsItem = readLine();
        words.push(wordsItem);
    }

    noPrefix(words);
}
