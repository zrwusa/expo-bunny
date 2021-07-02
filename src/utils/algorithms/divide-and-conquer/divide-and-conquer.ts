/* --- start Divide and conquer ---*/
// Binary Search
// 33 Search in Rotated Sorted Array
import {runAlgorithm} from "../helpers";
import {countSmallerCase1, countSmallerCase2, countSmallerCase3, countSmallerCase4, countSmallerCase5, countSmallerCase7} from "./cases";
import {BinaryIndexedTree} from "../../data-structures/binary-tree";

export const searchInRotatedSortedArray = function (nums: number[], target: number) {
    if (nums.length === 0) return -1; // check empty

    let left = 0;
    let right = nums.length - 1;

    while (left <= right) {
        const mid = left + Math.floor((right - left) / 2);

        const midEle = nums[mid], leftEle = nums[left], rightEle = nums[right];

        if (midEle === target) return mid;

        // left sorted
        if (leftEle <= midEle) {
            // check if is in the left sorted part
            if (leftEle <= target && target < midEle) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
            // right sorted
        } else {
            // check if is in the right sorted part
            if (midEle < target && target <= rightEle) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    }

    return -1;
};

// 169	Majority Element	★★
let majorityElement = function (nums: number[]) {
    let majority = nums[0];
    let count = 0;
    for (let num of nums) {
        if (num === majority) {
            count++;
        } else if (--count === 0) {
            count = 1;
            majority = num;
        }
    }
    return majority;
}
// 153	Find Minimum in Rotated Sorted Array	★★	154
const findMin = function (nums: number[]): number {
    const n = nums.length;
    const first = nums[0];
    if (n === 1) {
        return first;
    }

    const last = nums[nums.length - 1];
    if (first < last) {
        return first;
    }

    const left = nums.splice(0, Math.floor(nums.length / 2));
    if (left[0] > left[left.length - 1]) {
        return findMin(left);
    } else {
        return findMin(nums);
    }
}
// 912	Sort an Array	★★★						merge sort
// 307
class NumArray {
    private _tree: BinaryIndexedTree;
    private readonly _nums: number[];

    constructor(nums: number[]) {
        this._nums = nums;
        this._tree = new BinaryIndexedTree(nums.length);
        for (let i = 0; i < nums.length; i++) {
            this._tree.update(i + 1, nums[i]);
        }
    }

    update(index: number, val: number): void {
        this._tree.update(index + 1, val - this._nums[index]);
        this._nums[index] = val;
    }

    sumRange(left: number, right: number): number {
        return this._tree.getPrefixSum(right + 1) - this._tree.getPrefixSum(left);
    }
}

// 315	Count of Smaller Numbers After Self	★★★★						merge sort / BIT
const countSmallerNoReverse = function (nums: number[]): number[] {
    let uniqueSorted = [...new Set(nums)].sort((a, b) => b - a);
    let freqs = new Array(uniqueSorted.length).fill(0);
    let positions: number[] = [];

    for (let i = nums.length - 1; i > -1; i--) {
        positions.unshift(uniqueSorted.indexOf(nums[i]))
    }

    // O(n)
    const sumRight = (pos: number) => {
        let sum = 0;
        for (let i = freqs.length - 1; i > pos; i--) {
            sum += freqs[i];
        }
        return sum;
    }

    let ans: number[] = [];
    for (let i = nums.length - 1; i > -1; i--) {
        freqs[positions[i]]++;
        ans.unshift(sumRight(positions[i]));
    }

    return ans;
}

const countSmallerBITPlagiarized = (nums: number[]): number[] => {
    const ranks = new Map<number, number>();
    const sortedNums = [...nums].sort((a, b) => a - b);
    sortedNums.forEach((num, i) => ranks.set(num, i + 1));

    const ans: number[] = [];
    // O(log(n))
    const bit = new BinaryIndexedTree(nums.length);
    nums.reverse().forEach((num) => {
        ans.push(bit.getPrefixSum(ranks.get(num)! - 1));
        bit.update(ranks.get(num)!, 1);
    });

    return ans.reverse();
};

const countSmallerBIT = function (nums: number[]): number[] {
    const orgNums = [...nums];
    const sortedUniqueNums = [...new Set(nums)].sort((a, b) => a - b);
    const ranks: Map<number, number> = new Map();

    for (let i = 0; i < sortedUniqueNums.length; i++) {
        ranks.set(sortedUniqueNums[i], i + 1);
    }

    const ans: number[] = [];

    // O(log(n))
    const tree = new BinaryIndexedTree(ranks.size);
    const reversed = orgNums.reverse();

    for (let i = 0; i < reversed.length; i++) {
        const numRank = ranks.get(reversed[i]);
        ans.push(tree.getPrefixSum(numRank! - 1));
        tree.update(numRank!, 1);
    }

    return ans.reverse();
}
const runAllCountSmaller = async () => {
    await runAlgorithm(countSmallerBIT, false, ...countSmallerCase1);
    await runAlgorithm(countSmallerBIT, false, ...countSmallerCase2);
    await runAlgorithm(countSmallerBIT, false, ...countSmallerCase3);
    await runAlgorithm(countSmallerBIT, false, ...countSmallerCase4);
    await runAlgorithm(countSmallerBIT, false, ...countSmallerCase5);
    await runAlgorithm(countSmallerBIT, false, ...countSmallerCase7);
}
// runAllCountSmaller().then()
// Binary Search
// 69 「sqrt(x)」

/* --- start Binary Search --- */
// 278 First Bad Version
// 875 Koko Eating Bananas
// 378
// 35	Search Insert Position	★★	34	704	981					upper_bound
// 33	Search in Rotated Sorted Array	★★★	81	153	154	162	852			rotated / peak
// 69	Sqrt(x)	★★★								upper_bound
// 74	Search a 2D Matrix	★★★								treat 2d as 1d
// 875	Koko Eating Bananas	★★★	1011
// guess ans and check
// 4	Median of Two Sorted Arrays	★★★★
// 378
// Kth Smallest Element in a Sorted Matrix
// ★★★★	668							kth + matrix
// 719	Find K-th Smallest Pair Distance	★★★★	786							kth + two pointers
/* --- end Binary Search --- */

/* --- end Divide and conquer ---*/
