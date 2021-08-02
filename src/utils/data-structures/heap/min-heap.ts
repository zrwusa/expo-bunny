import {Heap, HeapNode} from "./heap";

export class MinHeap<T extends number | HeapNode<V>, V> extends Heap<T, V> {
    constructor(nodes?: T[]) {
        super(nodes);
    }

    compare(parentIndex: number, childIndex: number): boolean {
        const parentNode = this._nodes[parentIndex];
        const childNode = this._nodes[childIndex];
        if (parentNode instanceof HeapNode && childNode instanceof HeapNode) {
            return parentNode.id < childNode.id;
        } else {
            return parentNode < childNode;
        }
    }

    clone(): MinHeap<T, V> {
        return new MinHeap<T, V>(this._nodes);
    }

    static heapify<T extends number | HeapNode<V>, V>(nodes: T[]) {
        const minHeap = new MinHeap(nodes);
        minHeap._fix();
        return minHeap;
    }
}
