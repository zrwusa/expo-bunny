import {Heap, HeapNode} from './heap';

export class MaxHeap<T extends number | HeapNode<V>, V> extends Heap<T, V> {
    constructor(nodes?: T[]) {
        super(nodes);
    }

    compare(parentIndex: number, childIndex: number): boolean {
        const parentNode = this._nodes[parentIndex];
        const childNode = this._nodes[childIndex];
        if (parentNode instanceof HeapNode && childNode instanceof HeapNode) {
            return parentNode.id > childNode.id;
        } else {
            return parentNode > childNode;
        }
    }

    clone(): MaxHeap<T, V> {
        return new MaxHeap<T, V>(this._nodes);
    }

    static heapify<T extends number | HeapNode<V>, V>(nodes: T[]) {
        const maxHeap = new MaxHeap(nodes);
        maxHeap._fix();
        return maxHeap;
    }
}
