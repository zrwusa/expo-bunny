/* --- start heap --- */
// 215. Kth Largest Element in an Array ★★★★
// O(nlogk)
import {HeapNode, MaxHeap, MinHeap} from "../../data-structures/heap";
import {runAlgorithm} from "../helpers";
import {
    findKthLargestCase1,
    findKthLargestCase2,
    findKthLargestCase3,
    findKthLargestCase9,
    mergeKListsCase1,
    mergeKListsCase2
} from "./cases";
import {SinglyLinkedListNode} from "../../data-structures/linked-list";

export function findKthLargestMinHeap(nums: number[], k: number): number {
    const heap = new MinHeap<number, number>([]);
    for (let i of nums) {
        // if (heap.size() === k) {
        //     if (i > heap.peek()!) {
        //         heap.add(i);
        //         heap.poll();
        //     }
        // } else {
        //     heap.add(i);
        // }
        if (heap.size() < k || i >= heap.peek()!) {
            heap.add(i);
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
            heap.add(new HeapNode<SinglyLinkedListNode>(l.value, l));
        }
    }
    if (heap.size() < 1) {
        return null;
    }

    const ans: SinglyLinkedListNode | null = heap.poll()!.val!;
    ans.prev = null;
    if (ans.next) {
        heap.add(new HeapNode(ans.next.value, ans.next));
    }
    let prev: SinglyLinkedListNode = ans;
    while (!heap.isEmpty()) {
        const cur = heap.poll()!.val!;
        cur.prev = prev;
        prev.next = cur;
        prev = prev.next;
        if (cur.next) {
            heap.add(new HeapNode(cur.next.value, cur.next));
        }
    }

    return ans;
}

const runAllMergeKLists = async () => {
    await runAlgorithm(mergeKLists, false, ...mergeKListsCase1);
    await runAlgorithm(mergeKLists, false, ...mergeKListsCase2);
}

// runAllMergeKLists().then();

//347
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
            this._leftHeap.add(num);
        } else {
            const leftPeek = this._leftHeap.peek();
            if (leftPeek !== null) {
                if (num > leftPeek) {
                    this._rightHeap.add(num);
                } else {
                    this._leftHeap.add(num);
                }
            }
        }
        const leftSize = this._leftHeap.size();
        const rightSize = this._rightHeap.size();
        if (leftSize - rightSize >= 2) {
            this._rightHeap.add(this._leftHeap.poll()!);
        } else if (rightSize > leftSize) {
            this._leftHeap.add(this._rightHeap.poll()!);
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
//767
//703


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

const runAllTestHeap = async () => {
    await runAlgorithm(testHeap1, false);
    await runAlgorithm(testHeap2, false);
    await runAlgorithm(testHeap3, false);
}

// runAllTestHeap().then()
/* --- end heap --- */
