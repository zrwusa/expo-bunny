import {bunnyConsole} from "../utils";
import {TreeNode} from "../../types";

export const runAlgorithm = async (algorithm: Function, isStringify: boolean = false, ...args: any) => {
    const startTime = new Date().getTime();
    const result = await algorithm(...args);
    const timeSpent = new Date().getTime() - startTime;
    bunnyConsole.log(algorithm.name, 'result -> ', isStringify ? JSON.stringify(result) : result, 'time spent -> ', timeSpent + 'ms');
}

export const isOneDiffOrdered = (wordA: string, wordB: string) => {
    let diffCount = 0;
    for (let i = 0, len = wordA.length; i < len; i++) {
        if (wordA[i] !== wordB[i]) {
            diffCount++;
            if (diffCount > 1) {
                return false;
            }
        }
    }
    return true;
}

export const isOneDiffOrderedPieced = (wordA: string, wordB: string) => {
    for (let i = 0, len = wordA.length; i < len; i++) {
        for (let j = 0; j < 26; j++) {
            const piecedWord = wordA.substr(0, i) + String.fromCharCode(97 + j) + wordA.substr(i + 1);
            if (piecedWord === wordB) {
                return true;
            }
        }
    }
    return false;
}

// export const genOneDiffOrderedPieced = (wordA: string) => {
//     const result = [];
//     let temp = [wordA];
//
//
//     while (temp.length > 0) {
//         const top = temp.shift();
//         // const indexes = [Math.floor(Math.random() * wordA.length), Math.floor(Math.random() * wordA.length), Math.floor(Math.random() * wordA.length)];
//         let indexes = top!
//         for (let i = 0, len = indexes.length; i < len; i++) {
//             const candidates = [Math.floor(Math.random() * 26), Math.floor(Math.random() * 26), Math.floor(Math.random() * 26)];
//             for (let j of candidates) {
//                 const piecedWord = top!.substr(0, i) + String.fromCharCode(97 + j) + top!.substr(i + 1);
//                 result.push(piecedWord);
//                 if (i === indexes.length - 1 && j === candidates.length - 1) {
//                     temp.push(piecedWord);
//                     break;
//                 }
//                 if (result.length > 99) {
//                     return result;
//                 }
//             }
//         }
//
//     }
//
//     return result;
// }
// runAlgorithm(genOneDiffOrderedPieced,true, 'hit').then()

export const isOneDiff = (word1: string, word2: string) => {
    let diffCount = 0;
    for (let c1 of word1) {
        if (!word2.includes(c1)) {
            diffCount++;
            if (diffCount > 1) {
                return false;
            }
        }
    }
    diffCount = 0;
    for (let c2 of word2) {
        if (!word1.includes(c2)) {
            diffCount++;
            if (diffCount > 1) {
                return false;
            }
        }
    }
    return true;
}


export const treeData: TreeNode<number> = new TreeNode('1', '1', 0, [
    new TreeNode('1-1', '2', 0, [
            new TreeNode('1-1-1', '3', 0, [
                    new TreeNode('1-1-1-1', '4'),
                    new TreeNode('1-1-1-2', '5', 0, []
                    )
                ]
            ),
            new TreeNode('1-1-2', '4', 0, [
                    new TreeNode('1-1-2-1', '6'),
                    new TreeNode('1-1-2-2', '7')
                ]
            )
        ]
    ),
    new TreeNode('1-2', '8', 0, [
            new TreeNode('1-2-1', '9', 0, [
                    new TreeNode('1-2-1-1', '10'),
                    new TreeNode('1-2-1-2', '11')
                ]
            ),
            new TreeNode('1-2-2', '12', 0, [
                    new TreeNode('1-2-2-1', '13'),
                    new TreeNode('1-2-2-2', '14', 0, [
                            new TreeNode('1-2-2-2-1', '15')
                        ]
                    )
                ]
            )
        ]
    )
])


const searchInSortedArray = function (nums: number[], target: number) {
    let left = 0, right = nums.length - 1;
    while (left <= right) {
        // const mid = Math.floor(left + right / 2);
        const mid = left + Math.floor((right - left) / 2);
        const midEle = nums[mid];
        const leftEle = nums[left];

        if (target === midEle) return mid;

        if (target < leftEle) {
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    return -1;
}


















