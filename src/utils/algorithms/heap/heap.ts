/* --- start heap --- */
// 215. Kth Largest Element in an Array ★★★★
// O(nlogk)
import {HeapNode, MinHeap} from "../../data-structures/heap";
import {runAlgorithm} from "../helpers";
import {
    findKthLargestCase1,
    findKthLargestCase2,
    findKthLargestCase3,
    findKthLargestCase9,
    mergeKListsCase1, mergeKListsCase2
} from "./cases";
import {SinglyLinkedListNode} from "../../data-structures/linked-list";

export function findKthLargestMinHeap(nums: number[], k: number): number {
    const heap = new MinHeap<number>([]);
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
    const heap = new MinHeap<HeapNode<SinglyLinkedListNode>>();
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
/* --- end heap --- */
