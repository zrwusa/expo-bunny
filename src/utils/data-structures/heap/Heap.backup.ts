
export interface HeapNode<T extends number | string, U> {
    key: T;
    value: U;
}

/**
 * @license MIT
 * @copyright 2020 Eyas Ranjous <eyas.ranjous@gmail.com>
 *
 * @class
 * @abstract
 */
export abstract class Heap<T extends number | string, U = undefined> {
    protected _nodes: (HeapNode<T, U> | T)[];
    private _leaf: (HeapNode<T, U> | T) | null;

    /**
     * Creates a heap instance
     * @param {array<string|number|object>} nodes
     * @param {string|number|object} [leaf]
     * @returns {number}
     */
    constructor(nodes?: (HeapNode<T, U> | T)[], leaf?: (HeapNode<T, U> | T)) {
        this._nodes = Array.isArray(nodes) ? nodes : [];
        this._leaf = leaf || null;
    }

    /**
     * Checks if a parent has a left child
     * @private
     * @param {number} parentIndex
     * @returns {boolean}
     */
    _hasLeftChild(parentIndex: number) {
        const leftChildIndex = (parentIndex * 2) + 1;
        return leftChildIndex < this.size();
    }

    /**
     * Checks if a parent has a right child
     * @private
     * @param {number} parentIndex
     * @returns {boolean}
     */
    _hasRightChild(parentIndex: number) {
        const rightChildIndex = (parentIndex * 2) + 2;
        return rightChildIndex < this.size();
    }

    /**
     * Returns heap node's key
     * @private
     * @param {object|number|string} node
     * @returns {number|string}
     */
    _getKey(node: HeapNode<T, U> | T): HeapNode<T, U> | T {
        if (typeof node === 'object') return node.key;
        return node;
    }

    /**
     * Swaps two nodes in the heap
     * @private
     * @param {number} i
     * @param {number} j
     */
    _swap(i: number, j: number) {
        const temp = this._nodes[i];
        this._nodes[i] = this._nodes[j];
        this._nodes[j] = temp;
    }

    abstract _compareChildrenBefore(index: number, leftChildIndex: number, rightChildIndex: number): number

    abstract _compareKeys(parentKey: HeapNode<T, U> | T, childKey: HeapNode<T, U> | T): boolean

    /**
     * Compares parent & child nodes
     * and returns true if they are in right positions
     *
     * @private
     * @param {object|number|string} parentNode
     * @param {object|number|string} childNode
     * @returns {boolean}
     */
    _compare(parentNode: HeapNode<T, U> | T, childNode: HeapNode<T, U> | T) {
        return this._compareKeys(
            this._getKey(parentNode),
            this._getKey(childNode)
        );
    }

    /**
     * Compares parent & child nodes
     * and returns true if they are in right positions
     *
     * @private
     * @param {object|number|string} parentIndex
     * @param {object|number|string} childIndex
     * @returns {boolean}
     */
    _compareByIndex(parentIndex: number, childIndex: number): boolean {
        return this._compareKeys(
            this._getKey(this._nodes[parentIndex]),
            this._getKey(this._nodes[childIndex])
        );
    }

    /**
     * Checks if parent and child nodes should be swapped
     * @private
     * @param {number} parentIndex
     * @param {number} childIndex
     * @returns {boolean}
     */
    _shouldSwap(parentIndex: number, childIndex: number) {
        if (parentIndex < 0 || parentIndex >= this.size()) return false;
        if (childIndex < 0 || childIndex >= this.size()) return false;

        return !this._compareByIndex(parentIndex, childIndex);
    }

    /**
     * Bubbles a node from a starting index up in the heap
     * @param {number} startingIndex
     * @public
     */
    heapifyUp(startingIndex: number) {
        let childIndex = startingIndex;
        let parentIndex = Math.floor((childIndex - 1) / 2);
        while (this._shouldSwap(parentIndex, childIndex)) {
            this._swap(parentIndex, childIndex);
            childIndex = parentIndex;
            parentIndex = Math.floor((childIndex - 1) / 2);
        }
    }

    /**
     * Compares left and right & children of a parent
     * @private
     * @param {number} parentIndex
     * @returns {number} - a child's index
     */
    _compareChildrenOf(parentIndex: number) {
        if (
            !this._hasLeftChild(parentIndex)
            && !this._hasRightChild(parentIndex)
        ) {
            return -1;
        }

        const leftChildIndex = (parentIndex * 2) + 1;
        const rightChildIndex = (parentIndex * 2) + 2;

        if (!this._hasLeftChild(parentIndex)) {
            return rightChildIndex;
        }

        if (!this._hasRightChild(parentIndex)) {
            return leftChildIndex;
        }

        return this._compareByIndex(leftChildIndex, rightChildIndex)
            ? leftChildIndex
            : rightChildIndex;
    }

    /**
     * Pushes a node from a starting index down in the heap
     * @private
     */
    _heapifyDown(startingIndex: number) {
        let parentIndex = startingIndex;
        let childIndex = this._compareChildrenOf(parentIndex);
        while (this._shouldSwap(parentIndex, childIndex)) {
            this._swap(parentIndex, childIndex);
            parentIndex = childIndex;
            childIndex = this._compareChildrenOf(parentIndex);
        }
    }

    /**
     * Removes and returns the root node in the heap
     * @public
     * @returns {object}
     */
    extractRoot(): HeapNode<T, U> | T | null {
        if (this.isEmpty()) return null;

        const root = this.root();
        this._nodes[0] = this._nodes[this.size() - 1];
        this._nodes.pop();
        this._heapifyDown(0);

        if (root === this._leaf) {
            this._leaf = this.root();
        }

        return root;
    }

    /**
     * Pushes a node with down in the heap before an index
     * @private
     * @param {number} index
     */
    _heapifyDownUntil(index: number) {
        let parentIndex = 0;
        let leftChildIndex = 1;
        let rightChildIndex = 2;
        let childIndex;

        while (leftChildIndex < index) {
            childIndex = this._compareChildrenBefore(
                index,
                leftChildIndex,
                rightChildIndex
            );

            if (this._shouldSwap(parentIndex, childIndex)) {
                this._swap(parentIndex, childIndex);
            }

            parentIndex = childIndex;
            leftChildIndex = (parentIndex * 2) + 1;
            rightChildIndex = (parentIndex * 2) + 2;
        }
    }

    /**
     * Returns a shallow copy of the heap
     * @protected
     * @param {class} HeapType
     * @returns {Heap}
     */
    _clone(HeapType: any) {
        return new HeapType(this._nodes.slice(), this._leaf);
    }

    /**
     * Sorts the heap by swapping root with all nodes and fixing positions
     * @public
     * @returns {array} the sorted nodes
     */
    sort(): (HeapNode<T, U> | T)[] {
        for (let i = this.size() - 1; i > 0; i -= 1) {
            this._swap(0, i);
            this._heapifyDownUntil(i);
        }

        return this._nodes;
    }

    /**
     * Inserts a node in the right position into the heap
     * @public
     * @param {number|string} key
     * @param {any} [value]
     * @returns {Heap}
     */
    insert(key: T, value?: U): Heap<T, U> {
        const newNode = value !== undefined ? {key, value} : key;
        this._nodes.push(newNode);
        this.heapifyUp(this.size() - 1);
        if (this._leaf === null || !this._compare(newNode, this._leaf)) {
            this._leaf = newNode;
        }
        return this;
    }

    /**
     * Fixes all positions of the nodes in the heap
     * @public
     * @returns {Heap}
     */
    fix(): Heap<T, U> {
        for (let i = 0; i < this.size(); i += 1) {
            this.heapifyUp(i);
        }
        return this;
    }

    /**
     * Verifies that the heap is valid
     * @public
     * @returns {boolean}
     */
    isValid(): boolean {
        const isValidRecursive = (parentIndex: number): boolean => {
            let isValidLeft = true;
            let isValidRight = true;

            if (this._hasLeftChild(parentIndex)) {
                const leftChildIndex = (parentIndex * 2) + 1;
                if (!this._compareByIndex(parentIndex, leftChildIndex)) return false;
                isValidLeft = isValidRecursive(leftChildIndex);
            }

            if (this._hasRightChild(parentIndex)) {
                const rightChildIndex = (parentIndex * 2) + 2;
                if (!this._compareByIndex(parentIndex, rightChildIndex)) return false;
                isValidRight = isValidRecursive(rightChildIndex);
            }

            return isValidLeft && isValidRight;
        };

        return isValidRecursive(0);
    }

    /**
     * Returns the root node in the heap
     * @public
     * @returns {object|number|string|null}
     */
    root(): HeapNode<T, U> | T | null {
        if (this.isEmpty()) return null;
        return this._nodes[0];
    }

    /**
     * Returns a leaf node in the heap
     * @public
     * @returns {object|number|string|null}
     */
    leaf(): HeapNode<T, U> | T | null {
        return this._leaf;
    }

    /**
     * Returns the number of nodes in the heap
     * @public
     * @returns {number}
     */
    size(): number {
        return this._nodes.length;
    }

    /**
     * Checks if the heap is empty
     * @public
     * @returns {boolean}
     */
    isEmpty(): boolean {
        return this.size() === 0;
    }

    /**
     * Clears the heap
     * @public
     */
    clear(): void {
        this._nodes = [];
        this._leaf = null;
    }

    /**
     * Convert a list of items into a heap
     * @protected
     * @static
     * @param {array} list
     * @param {class} HeapType
     * @returns {Heap}
     */
    static _heapify<T extends number | string, U = undefined>(list: (HeapNode<T, U> | T)[], HeapType: any) {
        if (!Array.isArray(list)) {
            throw new Error('.heapify expects an array');
        }

        return new HeapType(list).fix();
    }

    /**
     * Checks if a list of items is a valid heap
     * @protected
     * @static
     * @param {array} list
     * @param {class} HeapType
     * @returns {boolean}
     */
    static _isHeapified<T extends number | string, U = undefined>(list: (HeapNode<T, U> | T)[], HeapType: any) {
        return new HeapType(list).isValid();
    }
}
