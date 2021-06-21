/* --- start Divide and conquer ---*/
// Binary Search
// 33 Search in Rotated Sorted Array
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
// 153	Find Minimum in Rotated Sorted Array	★★	154
// 912	Sort and Array	★★★						merge sort
// 315	Count of Smaller Numbers After Self	★★★★						merge sort / BIT
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
