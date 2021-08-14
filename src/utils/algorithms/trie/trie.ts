import {Trie} from "../../data-structures/trie";
import {testTrieCase1} from "./cases";

export const testTrie = (words: string[]) => {
    const trie = new Trie();
    for (let word  of words) {
        trie.add(word);
    }

    console.log(trie.isWord('doll'));
    console.log(trie.isWord('dor'));
    console.log(trie.isWord('dorf'));
    console.log(trie.getWords());
};

testTrie(...testTrieCase1);
