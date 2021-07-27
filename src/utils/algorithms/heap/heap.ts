/* --- start heap --- */
// 215. Kth Largest Element in an Array ★★★★
// O(nLog(k))
import {HeapNode, MaxHeap, MinHeap} from "../../data-structures/heap";
import {runAlgorithm} from "../helpers";
import {
    findKthLargestCase1,
    findKthLargestCase2,
    findKthLargestCase3,
    findKthLargestCase9,
    mergeKListsCase1,
    mergeKListsCase2,
    reorganizeStringCase1,
    topKFrequentCase1
} from "./cases";
import {SinglyLinkedListNode} from "../../data-structures/linked-list";

export function findKthLargestMinHeap(nums: number[], k: number): number {
    const heap = new MinHeap<number, number>([]);
    for (let i of nums) {
        if (heap.size() < k || i >= heap.peek()!) {
            heap.insert(i);
        }
        if (heap.size() > k) {
            heap.poll();
        }
    }
    return heap!.peek()!;
}

const runAllFindKthLargest = async () => {
    await runAlgorithm(findKthLargestMinHeap, false, ...findKthLargestCase1);
    await runAlgorithm(findKthLargestMinHeap, false, ...findKthLargestCase2);
    await runAlgorithm(findKthLargestMinHeap, false, ...findKthLargestCase3);
    await runAlgorithm(findKthLargestMinHeap, false, ...findKthLargestCase9);
}

// runAllFindKthLargest().then();

//23. Merge k Sorted Lists
function mergeKLists(lists: SinglyLinkedListNode[]): SinglyLinkedListNode | null {
    // TODO dev tools was disconnected issue
    const heap = new MinHeap<HeapNode<SinglyLinkedListNode>, SinglyLinkedListNode>();
    for (let l of lists) {
        if (l) {
            heap.insert(new HeapNode<SinglyLinkedListNode>(l.value, l));
        }
    }
    if (heap.size() < 1) {
        return null;
    }

    const ans: SinglyLinkedListNode | null = heap.poll()!.val!;
    ans.prev = null;
    if (ans.next) {
        heap.insert(new HeapNode(ans.next.value, ans.next));
    }
    let prev: SinglyLinkedListNode = ans;
    while (!heap.isEmpty()) {
        const cur = heap.poll()!.val!;
        cur.prev = prev;
        prev.next = cur;
        prev = prev.next;
        if (cur.next) {
            heap.insert(new HeapNode(cur.next.value, cur.next));
        }
    }

    return ans;
}

const runAllMergeKLists = async () => {
    await runAlgorithm(mergeKLists, false, ...mergeKListsCase1);
    await runAlgorithm(mergeKLists, false, ...mergeKListsCase2);
}

// runAllMergeKLists().then();

//347. Top K Frequent Elements
function topKFrequent(nums: number[], k: number): number[] {
    const hash: Map<number, number> = new Map<number, number>();
    for (let num of nums) {
        if (hash.has(num)) {
            const val = hash.get(num);
            if (val !== undefined) {
                hash.set(num, val + 1);
            }
        } else {
            hash.set(num, 1);
        }
    }

    const heap = new MinHeap<HeapNode<[number, number]>, [number, number]>();

    for (let entry of hash) {
        const node = new HeapNode<[number, number]>(entry[1], entry);

        if (heap.size() < k) {
            heap.insert(node);
        } else if (heap.size() === k) {
            const peek = heap.peek();
            if (peek!.id < entry[1]) {
                heap.poll();
                heap.insert(node);
            }
        }

    }

    return heap.toArray().map(item => item.val![0])
}

function topKFrequentByBucket(nums: number[], k: number): number[] {
    const hash: Map<number, number> = new Map<number, number>();
    let maxFrequency = 1;
    for (let num of nums) {
        if (hash.has(num)) {
            const val = hash.get(num);
            if (val !== undefined) {
                if (val + 1 > maxFrequency) maxFrequency = val + 1;
                hash.set(num, val + 1);
            }
        } else {
            hash.set(num, 1);
        }
    }

    const buckets = new Array<number[]>(maxFrequency + 1);
    for (let i = 0; i < buckets.length; i++) {
        buckets[i] = [];
    }

    for (let entry of hash) {
        buckets[entry[1]].push(entry[0]);
    }

    let ans: number[] = [];
    while (ans.length < k) {
        const bucket = buckets.pop();
        if (bucket && bucket.length > 0) {
            ans = ans.concat(bucket);
        }
    }
    return ans;
}

const runAllTopKFrequent = async () => {
    await runAlgorithm(topKFrequent, false, ...topKFrequentCase1);
    await runAlgorithm(topKFrequentByBucket, false, ...topKFrequentCase1);
}

// runAllTopKFrequent().then();
//253
//295. Find Median from Data Stream  ★★★★
class MedianFinder {
    private _leftHeap: MaxHeap<number, number>;
    private _rightHeap: MinHeap<number, number>;

    constructor() {
        this._leftHeap = new MaxHeap<number, number>();
        this._rightHeap = new MinHeap<number, number>();
    }

    addNum(num: number): void {
        if (this._leftHeap.size() === 0) {
            this._leftHeap.insert(num);
        } else {
            const leftPeek = this._leftHeap.peek();
            if (leftPeek !== null) {
                if (num > leftPeek) {
                    this._rightHeap.insert(num);
                } else {
                    this._leftHeap.insert(num);
                }
            }
        }
        const leftSize = this._leftHeap.size();
        const rightSize = this._rightHeap.size();
        if (leftSize - rightSize >= 2) {
            this._rightHeap.insert(this._leftHeap.poll()!);
        } else if (rightSize > leftSize) {
            this._leftHeap.insert(this._rightHeap.poll()!);
        }
    }

    findMedian(): number {
        const leftSize = this._leftHeap.size();
        const rightSize = this._rightHeap.size();
        if (leftSize > rightSize) {
            return this._leftHeap.peek()!;
        } else {
            return (this._leftHeap.peek()! + this._rightHeap.peek()!) / 2;
        }
    }
}

function medianFind() {
    const medianFinder = new MedianFinder();
    medianFinder.addNum(-1);
    console.log(medianFinder.findMedian());
    medianFinder.addNum(-2);
    console.log(medianFinder.findMedian());
    medianFinder.addNum(-3);
    console.log(medianFinder.findMedian());
    medianFinder.addNum(-4);
    console.log(medianFinder.findMedian());
    medianFinder.addNum(-5);
    console.log(medianFinder.findMedian());
}

const runAllMedianFind = async () => {
    await runAlgorithm(medianFind, false)
}

// runAllMedianFind().then();

// 767. Reorganize String
function reorganizeString(s: string): string {
    const hash: Map<string, number> = new Map<string, number>();
    for (let char of s) {
        if (hash.has(char)) {
            let count = hash.get(char);
            if (count) {
                hash.set(char, ++count);
            }
        } else {
            hash.set(char, 1);
        }
    }

    const heap = new MaxHeap<HeapNode<[string, number]>, [string, number]>();

    for (let entry of hash) {
        heap.insert(new HeapNode<[string, number]>(entry[1], entry));
    }
    let ans: string = '';
    if (heap.peek()!.val![1] > Math.ceil(s.length / 2)) {

    } else {
        const conveyor: string[][] = [];
        const peek = heap.poll();
        for (let i = 0; i < peek!.id; i++) {
            conveyor.push([peek!.val![0]])
        }
        let processCount = 0;
        while (heap.size() > 0) {
            const peek1 = heap.poll();
            const count = peek1!.id;
            for (let j = 0; j < count; j++) {
                processCount++;
                const cur = conveyor.shift();
                cur!.push(peek1!.val![0]);
                conveyor.push(cur!);
            }
        }
        const needOrderedCount = conveyor.length - processCount % conveyor.length;

        for (let m = 0; m < needOrderedCount; m++) {
            conveyor.push(conveyor.shift()!)
        }
        ans = conveyor.join().replaceAll(',', '');
    }
    return ans;
}

const runAllReorganizeString = async () => {
    await runAlgorithm(reorganizeString, false, ...reorganizeStringCase1);
}

// runAllReorganizeString().then();

// 703. Kth Largest Element in a Stream
class KthLargest {
    private _heap: MinHeap<number, number>;
    private readonly _k: number;
    constructor(k: number, nums: number[]) {
        this._k = k;
        this._heap = new MinHeap<number, number>(nums);
        while (this._heap.size() > k) {
            this._heap.poll();
        }
    }

    add(val: number): number {
        const size = this._heap.size();
        if (size < this._k) {
            this._heap.insert(val);

        } else if (size === this._k) {
            if (val > this._heap.peek()!) {
                this._heap.poll();
                this._heap.insert(val);
            }
        }
        return this._heap.peek()!;
    }
}

const testKthLargest = () => {
    const kthLargest = new KthLargest(3, [4, 5, 8, 2]);
    console.log('kthLargest.add(3)', kthLargest.add(3));
    console.log('kthLargest.add(5)', kthLargest.add(5));
    console.log('kthLargest.add(10)', kthLargest.add(10));
    console.log('kthLargest.add(9)', kthLargest.add(9));
    console.log('kthLargest.add(4)', kthLargest.add(4));
}

const runAllKthLargest = async () => {
    await runAlgorithm(testKthLargest, false);
}

// runAllKthLargest().then();

const testHeap1 = () => {
    const minHeap = new MinHeap<number, unknown>([5, 2, 3, 4, 6, 1]);
    console.log(minHeap.toArray());
    console.log(minHeap.toArray());
    console.log(minHeap.peek());
    minHeap.poll();
    minHeap.poll();
    minHeap.poll();
    console.log(minHeap.toArray());
    console.log(MinHeap.heapify([3, 2, 1, 5, 6, 7, 8, 9, 10]).toArray())
    return
}

const testHeap2 = () => {
    // const maxHeap = new MaxHeap<number>([5, 2, 3, 4, 6, 1]);
    const maxHeap = new MaxHeap<HeapNode<number>, number>([new HeapNode(5, 5), new HeapNode(2), new HeapNode(3), new HeapNode(4), new HeapNode('6', 6), new HeapNode(1)]);
    console.log(maxHeap.toArray());
    console.log(maxHeap.toArray());
    console.log(maxHeap.peek());
    maxHeap.poll();
    maxHeap.poll();
    maxHeap.poll();
    console.log(maxHeap.toArray());
    console.log(MaxHeap.heapify([3, 2, 1, 5, 6, 7, 8, 9, 10]).toArray());
}

const testHeap3 = () => {
    const heapSortTest = new MinHeap<HeapNode<number>, number>([new HeapNode<number>(2, 2), new HeapNode<number>(5), new HeapNode<number>(8), new HeapNode<number>(3), new HeapNode<number>(1), new HeapNode<number>(6, 6), new HeapNode<number>(7), new HeapNode<number>(4)]);
    const sorted = heapSortTest.clone().sort('val');
    console.log('sorted', sorted, heapSortTest);
    console.log('DFS inOrder default', heapSortTest.DFS('in'));
    console.log('DFS inOrder id', heapSortTest.DFS('in', 'id'));
    console.log('DFS inOrder val', heapSortTest.DFS('in', 'val'));
    console.log('DFS preOrder val', heapSortTest.DFS('pre', 'val'));
}

// const runAllTestHeap = async () => {
//     await runAlgorithm(testHeap1, false);
//     await runAlgorithm(testHeap2, false);
//     await runAlgorithm(testHeap3, false);
// }

// runAllTestHeap().then()
/* --- end heap --- */
