const _ = require('lodash');

/**
 * Node containing a letter within the trie representing all dictionary words
 * Special nodes:
 *     < is the root node.
 *     > is a leaf node. Its direct parent is the last letter of a word.
 */
class TrieNode {
    constructor(letter) {
        this.letter = letter;
        this.parent = NaN;
        this.children = new Map();
    }
}

/**
 * Constructs and returns trie made from dictionary words.
 */
export function buildTrie(wordArr) {
    let trie = new TrieNode('<');

    for (const word of wordArr) {
        let curNode = trie;
        // add special character '>' to denote end of word
        for (const letter of (word + '>')) {
            // if the trie does not contain this letter branch, create a new child node.
            if (!curNode.children.has(letter)) {
                const newChildNode = new TrieNode(letter);
                newChildNode.parent = curNode;
                curNode.children.set(letter, newChildNode);
            }

            // updates curNode to the child node for the next iteration (following letter)
            curNode = curNode.children.get(letter);
        }
    }

    return trie
}

/**
 * Given the node of the last letter in a word, reconstructs and returns the word.
 */
export function reconstructWord(endNode) {
    let curNode = endNode;
    let word = '';
    
    while (curNode.letter != '<') {
        word = curNode.letter + word;
        curNode = curNode.parent;
    }

    return word;
}

/**
 * Returns whether the given word is in the trie (scrabble dictionary).
 * trie: root TrieNode
 * word: array of letters to validate
 */
export function wordValid(trie, word) {
    let isValid = true;
    let curNode = trie;
    const processedWord = [...word.map(letter => letter.toLowerCase()), '>'];
    
    processedWord.forEach(letter => {
        if (!curNode.children.has(letter)) {
            return isValid = false;
        }
        curNode = curNode.children.get(letter);
    });

    return isValid;
}


const vowelFreqMap = new Map([
    ['E', 12],
    ['A', 9],
    ['I', 9],
    ['O', 8],
    ['U', 4],
    ['Y', 2],
]);

const consonantFreqMap = new Map([
    ['N', 6],
    ['R', 6],
    ['T', 6],
    ['D', 4],
    ['L', 4],
    ['S', 4],
    ['G', 3],
    ['B', 2],
    ['C', 2],
    ['F', 2],
    ['H', 2],
    ['M', 2],
    ['P', 2],
    ['V', 2],
    ['W', 2],
    ['J', 1],
    ['K', 1],
    ['Q', 1],
    ['X', 1],
    ['Z', 1],
]);

/**
 * Randomly returns two vowels and four consonants, chosen without replacement with the frequencies above, shuffled.
 */
export function getLetters() {
    let vowelBag = [];
    for (const [letter, count] of vowelFreqMap) {
        const newLetters = new Array(count).fill(letter);
        vowelBag.push(...newLetters);
    }
    vowelBag = _.shuffle(vowelBag);
    
    let consonantBag = [];
    for (const [letter, count] of consonantFreqMap) {
        const newLetters = new Array(count).fill(letter);
        consonantBag.push(...newLetters);
    }
    consonantBag = _.shuffle(consonantBag);
    
    let result = [];
    result.push(...vowelBag.slice(0, 2));
    result.push(...consonantBag.slice(0, 4));
    return _.shuffle(result);
}