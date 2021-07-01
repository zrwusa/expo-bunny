/* --- start Two Pointers --- */

// 11	Container With Most Water	★★	42
import {runAlgorithm} from "../helpers";
import {subarraysWithKDistinctCase6} from "./cases";

function maxArea(height: number[]): number {
    let l = 0, r = height.length - 1;
    let ans = 0;
    while (l < r) {
        const lh = height[l], rh = height[r];
        if (lh < rh) {
            ans = Math.max(ans, lh * (r - l));
            l++;
        } else {
            ans = Math.max(ans, rh * (r - l));
            r--;
        }
    }
    return ans;
}

// 125	Valid Palindrome	★★	455
// 917	Reverse Only Letters	★★	925	986	855
// 167 Two Sum II – Input array is sorted ★★★	15	16
function twoSum(numbers: number[], target: number): number[] {
    let l = 1, r = numbers.length, numbersLength = r;

    while (l < r) {
        let ln = numbers[l - 1], rn = numbers[r - 1];
        let sum = ln + rn;
        if (sum === target) {
            return [l, r];
        }
        if (sum > target) {
            r--;
        } else {
            l++;
        }
    }

    return [0, 0];
}

// 977	Squares of a Sorted Array	★★
// merge sort
// 992 Subarrays with K Different Integers ★★★★
// time complexity is O(n^2),not pass the big data case
function subarraysWithKDistinct(nums: number[], k: number): number {
    const l = nums.length;
    let p = 0, ans = 0;

    while (p <= l - k) {
        let subP = p;
        const map: Map<number, boolean> = new Map<number, boolean>();
        // const map: { [key in string]: boolean } = {};
        while (map.size <= k && subP <= l - 1) {
            // while (Object.keys(map).length <= k && subP <= l - 1) {
            map.set(nums[subP], true);
            // map[nums[subP].toString()] = true;
            if (map.size === k) {
                // if (Object.keys(map).length === k) {
                ans++;
            }
            subP++;
        }
        p++;
    }
    return ans;
}

const runAllSubarraysWithKDistinct = async () => {
    await runAlgorithm(subarraysWithKDistinct, false, ...subarraysWithKDistinctCase6);
}

// runAllSubarraysWithKDistinct().then();
/* --- end Two Pointers --- */
export {}
