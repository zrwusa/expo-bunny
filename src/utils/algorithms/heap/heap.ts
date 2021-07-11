/* --- start heap --- */
// 215. Kth Largest Element in an Array ★★★★
// O(nlogk)
import {MinHeap} from "../../data-structures/heap";
import {runAlgorithm} from "../helpers";
import {findKthLargestCase1, findKthLargestCase2, findKthLargestCase3, findKthLargestCase9} from "./cases";

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


/* --- end heap --- */
