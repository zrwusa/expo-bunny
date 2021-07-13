// Online Algorithms use Heap (e.g. Top K problems)
// Offline Algorithms use sort

type PropertyType = 'id' | 'val';
type NodeOrPropertyType = 'node' | PropertyType;
type DFSMode = 'pre' | 'in' | 'post';

export class HeapNode<V> {
    private _id: number | string;
    get id(): number | string {
        return this._id
    }

    set id(v: number | string) {
        this._id = v;
    }

    private _val: V | null;
    get val(): V | null {
        return this._val
    }

    set val(v: V | null) {
        this._val = v;
    }

    constructor(id: number | string, val?: V | null) {
        if (val === undefined) {
            val = null
        }
        this._id = id;
        this._val = val || null;
    }
}

export abstract class Heap<T extends number | HeapNode<V>, V> {
    protected readonly _nodes: T[];

    protected constructor(nodes?: T[]) {
        // TODO support distinct
        this._nodes = Array.isArray(nodes) ? [...nodes] : [];
        this._fix();
    }

    abstract compare(parentIndex: number, childIndex: number): boolean;

    abstract clone(): Heap<T, V>;

    protected _swap(i: number, j: number) {
        const temp = this._nodes[i];
        this._nodes[i] = this._nodes[j];
        this._nodes[j] = temp;
    }

    protected _shouldSwap(parentIndex: number, childIndex: number) {
        if (parentIndex < 0 || parentIndex >= (this.size() - 1)) return false;
        if (childIndex < 1 || childIndex > (this.size() - 1)) return false;
        return !this.compare(parentIndex, childIndex);
    }

    protected _parentIndex(childIndex: number): number {
        const parentIndex = Math.floor((childIndex - 1) / 2);
        if (parentIndex < 0 || parentIndex >= (this.size() - 1)) return -1;
        return parentIndex;
    }

    protected _hasParent(childIndex: number): boolean {
        return this._parentIndex(childIndex) > -1
    }

    protected _leftChildIndex(parentIndex: number): number {
        const leftChildIndex = parentIndex * 2 + 1;
        if (leftChildIndex < 1 || leftChildIndex > (this.size() - 1)) {
            return -1;
        } else {
            return leftChildIndex;
        }
    }

    protected _rightChildIndex(parentIndex: number): number {
        const rightChildIndex = parentIndex * 2 + 2;
        if (rightChildIndex < 1 || rightChildIndex > (this.size() - 1)) {
            return -1;
        } else {
            return rightChildIndex;
        }
    }

    protected _hasLeftChild(parentIndex: number) {
        return this._leftChildIndex(parentIndex) !== -1
    }

    protected _hasRightChild(parentIndex: number) {
        return this._rightChildIndex(parentIndex) !== -1;
    }

    protected _compareChildren(parentIndex: number): number {
        if (!this._hasLeftChild(parentIndex) && !this._hasRightChild(parentIndex)) return -1;
        const leftChildIndex = this._leftChildIndex(parentIndex), rightChildIndex = this._rightChildIndex(parentIndex);
        if (!this._hasLeftChild(parentIndex)) return rightChildIndex;
        if (!this._hasRightChild(parentIndex)) return leftChildIndex;
        return this.compare(leftChildIndex, rightChildIndex) ? leftChildIndex : rightChildIndex;
    }

    protected _fix() {
        for (let i = Math.floor(this.size() / 2); i > -1; i--) {
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
        let childIndex = this._compareChildren(parentIndex);
        while (this._shouldSwap(parentIndex, childIndex)) {
            this._swap(parentIndex, childIndex);
            parentIndex = childIndex;
            childIndex = this._compareChildren(parentIndex);
        }
        return parentIndex;
    }

    poll(): T | null {
        let res;
        if (this.size() > 1) {
            this._swap(0, this._nodes.length - 1);
            res = this._nodes.pop()!;
            this.heapifyDown(0);
        } else {
            if (this.size() === 1) {
                res = this._nodes.pop()!;
            } else {
                res = null;
            }
        }

        return res;
    }

    add(node: T): void {
        this._nodes.push(node);
        this.heapifyUp(this._nodes.length - 1);
    }

    isValidNode(index: number): boolean {
        return this._nodes[index] !== undefined;
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

    toArray(): T[] {
        return this._nodes;
    }

    peek(): T | null {
        return this.isValidNode(0) ? this._nodes[0] : null;
    }

    leaf(): T | null {
        return this.isValidNode(this.size() - 1) ? this._nodes[this.size() - 1] : null;
    }

    size(): number {
        return this._nodes.length;
    }

    isEmpty() {
        return this.size() === 0;
    }

    // --- start additional functions
    sort(): number[];
    sort(nodeOrPropertyType: 'id'): number[];
    sort(nodeOrPropertyType: 'val'): (V | null)[];
    sort(nodeOrPropertyType: 'node'): HeapNode<V>[];
    sort(nodeOrPropertyType?: NodeOrPropertyType) {
        const visitedId: (number | string)[] = [];
        const visitedVal: (V | null)[] = [];
        const visitedNode: HeapNode<V>[] = [];
        const visitedNumber: number[] = []


        const pushByValueType = (index: number) => {
            const node: number | HeapNode<V> = this._nodes[index];
            switch (nodeOrPropertyType) {
                case 'id':
                    if (node instanceof HeapNode) {
                        visitedId.push(node.id);
                    }
                    break;
                case 'val':
                    if (node instanceof HeapNode) {
                        visitedVal.push(node.val);
                    }
                    break;
                case 'node':
                    if (node instanceof HeapNode) {
                        visitedNode.push(node);
                    }
                    break;
                default:
                    if (typeof node === 'number') {
                        visitedNumber.push(node)
                    }
                    break;
            }
        }

        while (!this.isEmpty()) {
            this._swap(0, this.size() - 1);
            pushByValueType(this.size() - 1);
            this._nodes.pop();
            this.heapifyDown(0);
        }


        switch (nodeOrPropertyType) {
            case 'id':
                return visitedId;
            case 'val':
                return visitedVal;
            case 'node':
                return visitedNode;
            default:
                return visitedNumber;
        }
    }

    DFS(dfsMode: DFSMode): number[];
    DFS(dfsMode: DFSMode, nodeOrPropertyType: 'id'): number[];
    DFS(dfsMode: DFSMode, nodeOrPropertyType: 'val'): (V | null)[];
    DFS(dfsMode: DFSMode, nodeOrPropertyType: 'node'): HeapNode<V>[];
    DFS(dfsMode: DFSMode, nodeOrPropertyType?: NodeOrPropertyType) {
        const visitedId: (number | string)[] = [];
        const visitedVal: (V | null)[] = [];
        const visitedNode: HeapNode<V>[] = [];
        const visitedNumber: number[] = []

        const pushByValueType = (index: number) => {
            const node: number | HeapNode<V> = this._nodes[index];
            switch (nodeOrPropertyType) {
                case 'id':
                    if (node instanceof HeapNode) {
                        visitedId.push(node.id);
                    }
                    break;
                case 'val':
                    if (node instanceof HeapNode) {
                        visitedVal.push(node.val);
                    }
                    break;
                case 'node':
                    if (node instanceof HeapNode) {
                        visitedNode.push(node);
                    }
                    break;
                default:
                    if (typeof node === 'number') {
                        visitedNumber.push(node)
                    }
                    break;
            }
        }

        const _traverse = (cur: number) => {
            const leftChildIndex = cur * 2 + 1;
            const rightChildIndex = cur * 2 + 2;
            switch (dfsMode) {
                case 'in':
                    if (this.isValidNode(leftChildIndex)) _traverse(leftChildIndex);
                    pushByValueType(cur);
                    if (this.isValidNode(rightChildIndex)) _traverse(rightChildIndex);
                    break;
                case 'pre':
                    pushByValueType(cur);
                    if (this.isValidNode(leftChildIndex)) _traverse(leftChildIndex);
                    if (this.isValidNode(rightChildIndex)) _traverse(rightChildIndex);
                    break;
                case 'post':
                    if (this.isValidNode(leftChildIndex)) _traverse(leftChildIndex);
                    if (this.isValidNode(rightChildIndex)) _traverse(rightChildIndex);
                    pushByValueType(cur);
                    break;
            }

        }

        this.isValidNode(0) && _traverse(0);
        switch (nodeOrPropertyType) {
            case 'id':
                return visitedId;
            case 'val':
                return visitedVal;
            case 'node':
                return visitedNode;
            default:
                return visitedNumber;
        }
    }
    // --- end additional functions

}

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
