/**
 * @license MIT
 * @copyright 2020 Eyas Ranjous <eyas.ranjous@gmail.com>
 */

import {Heap, HeapNode} from "./Heap.backup";

/**
 * @class MaxHeap
 * @extends Heap
 */
export class MaxHeap<T extends number | string, U = undefined> extends Heap<T, U> {
    /**
     * Checks two nodes are in relatively valid position
     * @private
     * @param {object} parentKey
     * @param {object} childKey
     * @returns {boolean}
     */
    _compareKeys(parentKey: T, childKey: T) {
        return parentKey > childKey;
    }

    /**
     * Returns max child's index of two children before an index
     * @private
     * @param {number} index
     * @param {number} leftChildIndex
     * @param {number} rightChildIndex
     * @returns {number}
     */
    _compareChildrenBefore(index: number, leftChildIndex: number, rightChildIndex: number) {
        const leftChildKey = this._getKey(this._nodes[leftChildIndex]);
        const rightChildKey = this._getKey(this._nodes[rightChildIndex]);

        if (rightChildKey > leftChildKey && rightChildIndex < index) {
            return rightChildIndex;
        }
        return leftChildIndex;
    }

    /**
     * Returns a shallow copy of the heap
     * @public
     * @returns {MaxHeap}
     */
    clone(): MaxHeap<T, U> {
        return super._clone(MaxHeap);
    }

    /**
     * Builds a max heap from an array of items
     * @public
     * @static
     * @param {array} list
     * @returns {MaxHeap}
     */
    static heapify<T extends number | string, U = undefined>(list: (HeapNode<T, U> | T)[]): MaxHeap<T, U> {
        return super._heapify(list, MaxHeap);
    }

    /**
     * Checks if a list of items is a valid max heap
     * @public
     * @static
     * @param {array} list
     * @returns {boolean}
     */
    static isHeapified<T extends number | string, U = undefined>(list: (HeapNode<T, U> | T)[]): boolean {
        return super._isHeapified(list, MaxHeap);
    }
}


