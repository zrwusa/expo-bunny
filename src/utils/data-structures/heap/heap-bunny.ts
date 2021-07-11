import {runAlgorithm} from "../../algorithms";

export class HeapBunnyNode<U> {
    private _id: number | string;
    get id(): number | string {
        return this._id
    }

    set id(v: number | string) {
        this._id = v;
    }

    private _val: U | null;
    get val(): U | null {
        return this._val
    }

    set val(v: U | null) {
        this._val = v;
    }

    constructor(id: number | string, val?: U) {
        this._id = id;
        this._val = val || null;
    }
}

export abstract class HeapBunny<T extends number | HeapBunnyNode<any>> {
    protected readonly _nodes: T[];

    abstract compare(parentIndex: number, childIndex: number): boolean;

    protected _swap(i: number, j: number) {
        const temp = this._nodes[i];
        this._nodes[i] = this._nodes[j];
        this._nodes[j] = temp;
    }

    protected _shouldSwap(parentIndex: number, childIndex: number) {
        if (parentIndex < 0 || parentIndex >= this.size()) return false;
        if (childIndex < 0 || childIndex >= this.size()) return false;
        return !this.compare(parentIndex, childIndex);
    }

    protected _hasLeftChild(parentIndex: number) {
        const leftChildIndex = parentIndex * 2 + 1;
        return leftChildIndex < this.size();
    }

    protected _hasRightChild(parentIndex: number) {
        const rightChildIndex = parentIndex * 2 + 2;
        return rightChildIndex < this.size();
    }

    protected _compareChildrenOf(parentIndex: number): number {
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

        return this.compare(leftChildIndex, rightChildIndex)
            ? leftChildIndex
            : rightChildIndex;
    }

    protected constructor(nodes?: T[]) {
        this._nodes = Array.isArray(nodes) ? nodes : [];
    }

    isValid(): boolean {
        const isValidRecursive = (parentIndex: number): boolean => {
            let isValidLeft = true;
            let isValidRight = true;

            if (this._hasLeftChild(parentIndex)) {
                const leftChildIndex = (parentIndex * 2) + 1;
                if (!this.compare(parentIndex, leftChildIndex)) return false;
                isValidLeft = isValidRecursive(leftChildIndex);
            }

            if (this._hasRightChild(parentIndex)) {
                const rightChildIndex = (parentIndex * 2) + 2;
                if (!this.compare(parentIndex, rightChildIndex)) return false;
                isValidRight = isValidRecursive(rightChildIndex);
            }

            return isValidLeft && isValidRight;
        };

        return isValidRecursive(0);
    }

    fix() {
        for (let i = this.size() / 2; i > -1; i--) {
            this.heapifyDown(i);
        }
    }

    heapifyUp(startingIndex: number): number {
        let childIndex = startingIndex;
        let parentIndex = Math.floor((childIndex - 1) / 2);
        while (this._shouldSwap(parentIndex, childIndex)) {
            this._swap(parentIndex, childIndex);
            childIndex = parentIndex;
            parentIndex = Math.floor((childIndex - 1) / 2);
        }
        return childIndex;
    }

    heapifyDown(startingIndex: number): number {
        let parentIndex = startingIndex;
        let childIndex = this._compareChildrenOf(parentIndex);
        while (this._shouldSwap(parentIndex, childIndex)) {
            this._swap(parentIndex, childIndex);
            parentIndex = childIndex;
            childIndex = this._compareChildrenOf(parentIndex);
        }
        return parentIndex;
    }

    root(): T | null {
        return this._nodes[0] || null;
    }

    extractRoot(): T | null {
        this._swap(0, this._nodes.length - 1);
        const result = this._nodes.pop();
        this.heapifyDown(0);
        return result || null;
    }

    push(node: T): void {
        this._nodes.push(node);
        this.heapifyUp(this._nodes.length - 1);
    }

    size(): number {
        return this._nodes.length;
    }

    isEmpty() {
        return this.size() === 0;
    }

    nodes(): T[] {
        return this._nodes;
    }
}

export class MinHeapBunny<T extends number | HeapBunnyNode<any>> extends HeapBunny<T> {
    constructor(nodes?: T[]) {
        super(nodes);
    }

    compare(parentIndex: number, childIndex: number): boolean {
        const parentNode = this._nodes[parentIndex];
        const childNode = this._nodes[childIndex];
        if (typeof parentNode === 'number' || typeof childNode === 'number') {
            return parentNode < childNode;
        } else {
            return parentNode.id < childNode.id;
        }
    }
}

export class MaxHeapBunny<T extends number | HeapBunnyNode<any>> extends HeapBunny<T> {
    constructor(nodes?: T[]) {
        super(nodes);
    }

    compare(parentIndex: number, childIndex: number): boolean {
        const parentNode = this._nodes[parentIndex];
        const childNode = this._nodes[childIndex];
        if (typeof parentNode === 'number' || typeof childNode === 'number') {
            return parentNode > childNode;
        } else {
            return parentNode.id > childNode.id;
        }
    }
}

const testHeap = () => {
    const minHeap = new MinHeapBunny<number>([5, 2, 3, 4, 6, 1]);
    console.log(minHeap.nodes());
    minHeap.fix();
    console.log(minHeap.nodes());
    console.log(minHeap.root());
    minHeap.extractRoot();
    minHeap.extractRoot();
    minHeap.extractRoot();
    console.log(minHeap.nodes());

    // const maxHeap = new MaxHeapBunny<number>([5, 2, 3, 4, 6, 1]);
    const maxHeap = new MaxHeapBunny<HeapBunnyNode<number>>([new HeapBunnyNode(5,5), new HeapBunnyNode(2), new HeapBunnyNode(3), new HeapBunnyNode(4), new HeapBunnyNode('6', 6), new HeapBunnyNode(1)]);
    console.log(maxHeap.nodes());
    maxHeap.fix();
    console.log(maxHeap.nodes());
    console.log(maxHeap.root());
    maxHeap.extractRoot();
    maxHeap.extractRoot();
    maxHeap.extractRoot();
    console.log(maxHeap.nodes());
}


runAlgorithm(testHeap, false).then()
