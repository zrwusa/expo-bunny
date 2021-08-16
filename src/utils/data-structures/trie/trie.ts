export class TrieNode {
    protected _keys: Map<string, TrieNode> = new Map<string, TrieNode>();

    get keys(): Map<string, TrieNode> {
        return this._keys;
    }

    set keys(v: Map<string, TrieNode>) {
        this._keys = v;
    }

    protected _isEnd: boolean = false;

    get isEnd(): boolean {
        return this._isEnd;
    }

    set isEnd(v: boolean) {
        this._isEnd = v;
    }
}

export class Trie {
    protected _root: TrieNode;

    constructor() {
        this._root = new TrieNode();
    }

    add(input: string, node: TrieNode = this._root): boolean {
        if (input.length === 0) {
            node.isEnd = true;
            return false;
        } else if (!node.keys.has(input[0])) {
            node.keys.set(input[0], new TrieNode());
            this.add(input.substr(1), node.keys.get(input[0]));
        } else {
            this.add(input.substr(1), node.keys.get(input[0]));
        }
        return true;
    }

    isWord(input: string): boolean {
        let node = this._root;

        while (input.length > 1) {
            const ret = node.keys.get(input[0]);
            if (!ret) {
                return false;
            } else {
                node = ret;
                input = input.substr(1);
            }

        }
        const target = node.keys.get(input)
        return !!(target && target.isEnd);
    }

    getWords(): string[] | null {
        const words: string[] = [];
        const search = (node: TrieNode, word: string) => {
            if (node.keys.size !== 0) {
                for (let letter of node.keys.keys()) {
                    search(node.keys.get(letter)!, word.concat(letter));
                }
                if (node.isEnd) {
                    words.push(word);
                }
            } else {
                word.length > 0 && words.push(word);
            }

        }
        search(this._root, '');
        return words.length > 0 ? words : null;
    }
}
