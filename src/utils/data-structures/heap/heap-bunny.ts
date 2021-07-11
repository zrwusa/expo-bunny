import {runAlgorithm} from "../../algorithms";

export class HeapBunnyNode<U> {
    private _id: number;
    get id(): number {
        return this._id
    }

    set id(v: number) {
        this._id = v;
    }

    private _val: U | null;
    get val(): U | null {
        return this._val
    }

    set val(v: U | null) {
        this._val = v;
    }

    constructor(id: number, val?: U) {
        this._id = id;
        this._val = val || null;
    }
}

export abstract class HeapBunny<T extends number | HeapBunnyNode<U>, U> {
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

    heapifyUp(startingIndex: number): void {
        let childIndex = startingIndex;
        let parentIndex = Math.floor((childIndex - 1) / 2);
        while (this._shouldSwap(parentIndex, childIndex)) {
            this._swap(parentIndex, childIndex);
            childIndex = parentIndex;
            parentIndex = Math.floor((childIndex - 1) / 2);
        }
    }

    heapifyDown(startingIndex: number): void {
        let parentIndex = startingIndex;
        let childIndex = this._compareChildrenOf(parentIndex);
        while (this._shouldSwap(parentIndex, childIndex)) {
            this._swap(parentIndex, childIndex);
            parentIndex = childIndex;
            childIndex = this._compareChildrenOf(parentIndex);
        }
    }

    root(): T | null {
        return this._nodes[0] || null;
    }

    extractRoot(): T | HeapBunnyNode<U> | null {
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

    test() {
        console.log(this._nodes);
    }
}

export class MinHeapBunny<T extends number | HeapBunnyNode<U>, U> extends HeapBunny<T, U> {
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

const testHeap = () => {
    const minHeap = new MinHeapBunny<number, number>([5, 2, 3, 4, 6, 1]);
    minHeap.test();
    minHeap.fix();
    minHeap.test();
    let xxx = minHeap.root()
    console.log(minHeap.root());
    minHeap.extractRoot();
    minHeap.extractRoot();
    minHeap.extractRoot();
    minHeap.test();


    // const maxHeap = new MaxHeapBunny([5, 2, 3, 4, 6, 1]);
    // maxHeap.test();
    // maxHeap.fix();
    // maxHeap.test();
    // console.log(maxHeap.root());
    // maxHeap.extractRoot();
    // maxHeap.extractRoot();
    // maxHeap.extractRoot();
    // maxHeap.test();
}
// export class MaxHeapBunny<T extends (number | HeapBunnyNode<T>)> extends HeapBunny<T> {
//     constructor(nodes?: T[]) {
//         super(nodes);
//     }
//
//     compare(parentIndex: number, childIndex: number): boolean {
//         const parentNode = this._nodes[parentIndex];
//         const childNode = this._nodes[childIndex];
//         if (typeof parentNode === 'number' || typeof childNode === 'number') {
//             return parentNode > childNode;
//         } else {
//             return parentNode.id > childNode.id;
//         }
//     }
// }


runAlgorithm(testHeap, false).then()
