/* --- start heap --- */
// 215. Kth Largest Element in an Array ★★★★
// O(nlogk)
import {runAlgorithm} from "../helpers";
import {findKthLargestCase1, findKthLargestCase2, findKthLargestCase3, findKthLargestCase9} from "./cases";
import {MinHeapBunny} from "../../data-structures/heap";

export function findKthLargestMinHeap(nums: number[], k: number): number {
    const heap = new MinHeapBunny<number>([]);
    for (let i of nums) {
        // if (heap.size() === k) {
        //     if (i > heap.peek()!) {
        //         heap.add(i);
        //         heap.poll();
        //     }
        // } else {
        //     heap.add(i);
        // }
        console.log(heap.toArray())
        if (heap.size() < k || i >= heap.peek()!) {
            heap.add(i);
        }
        if (heap.size() > k) {
            heap.poll();
        }
    }
    return heap!.peek()!;
}

runAlgorithm(findKthLargestMinHeap, false, ...findKthLargestCase2).then();

/* --- end heap --- */
