import {bunnyConsole, wait} from "./utils";
import {BinaryTreeNode, OrderType, TreeNode} from "../types";
import {DeepProxy} from '@qiwi/deep-proxy'
import {TProxyHandler} from "@qiwi/deep-proxy/typings/interface";
import {Queue, SinglyLinkedListNode, Stack} from "./data-structures";

export const runAlgorithm = async (algorithm: Function, ...args: any) => {
    const startTime = new Date().getTime();
    const result = await algorithm(...args);
    const timeSpent = new Date().getTime() - startTime;
    bunnyConsole.log(algorithm.name, 'result -> ', result, 'time spent -> ', timeSpent + 'ms');
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

/* --- start tree --- */


// 94 Binary Tree Inorder Traversal	★ 144 145 429 589 590 987 1302 traversal
export async function binaryTreeInorderTraversal(root: BinaryTreeNode | null, proxyHandler: TProxyHandler): Promise<number[]> {
    type Variables = {
        node: BinaryTreeNode | null
    }

    let proxyVariables = new DeepProxy<Variables>({node: null}, proxyHandler);

    if (!root) {
        return []
    }

    const leftResult = await binaryTreeInorderTraversal(root.left, proxyHandler);

    proxyVariables.node = root.left;

    proxyVariables.node = root;

    const rightResult = await binaryTreeInorderTraversal(root.right, proxyHandler);
    proxyVariables.node = root.right;

    await wait(500);

    return [
        ...leftResult,
        root.val,
        ...rightResult
    ]
}

export const DFS = async (node: TreeNode<number>, type: OrderType, proxyHandler: TProxyHandler) => {
    type Variables = { current: TreeNode<number>, nodeNeedPrint: TreeNode<number> | undefined }

    let variablesProxy = new DeepProxy<Variables>({
        current: node,
        nodeNeedPrint: node
    }, proxyHandler);

    if (!variablesProxy.current) {
        return;
    }

    const {children} = variablesProxy.current;
    if (children && children.length > 0) {
        const left = children[0];
        const right = children[1];
        switch (type) {
            case 'InOrder':
                await DFS(left, type, proxyHandler);
                // console.log(node.id);
                variablesProxy.nodeNeedPrint = node;
                await wait(500)

                await DFS(right, type, proxyHandler);
                break;
            case 'PreOrder':
                // console.log(node.id);
                variablesProxy.nodeNeedPrint = node;
                await wait(500)

                await DFS(left, type, proxyHandler);
                await DFS(right, type, proxyHandler);
                break;
            case 'PostOrder':
                await DFS(left, type, proxyHandler);
                await DFS(right, type, proxyHandler);
                // console.log(node.id);
                variablesProxy.nodeNeedPrint = node;
                await wait(500)

                break;
        }
    }
}

// 102	Binary Tree Level Order Traversal	★★	107	429	872			collecting nodes
export const BFS = async (node: TreeNode<number>, proxyHandler: TProxyHandler) => {
    type Variables = { node: TreeNode<number> }

    let nodes: TreeNode<number>[] = [];

    let variablesProxy = new DeepProxy<Variables>({node: node,}, proxyHandler);

    if (node) {
        let queue = new Queue<TreeNode<number>>();
        queue.add(node);
        while (!queue.isEmpty()) {
            let item = queue.pop() as TreeNode<number>;
            nodes.push(item);
            variablesProxy.node = item;
            await wait(500);
            const {children} = item;
            if (children) {
                for (let i = 0; i < children.length; i++) {
                    queue.add(children[i]);
                }
            }
        }
    }
    return nodes;
}

/* --- start Search (BFS/DFS) ---*/

// 17	Letter Combinations of a Phone Number	★★	39	40	77	78	90	216
export async function letterCombinations(digits: string, proxyHandler: TProxyHandler): Promise<string[]> {
    // corner case
    if (digits.length === 0) return [];

    type PhoneKeys = '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';

    let proxyVariables = new DeepProxy<{ accumulated: string, result: string[] }>({accumulated: '', result: []}, proxyHandler)

    const digitsMap: { [key in PhoneKeys]: string } = {
        '2': 'abc',
        '3': 'def',
        '4': 'ghi',
        '5': 'jkl',
        '6': 'mno',
        '7': 'pqrs',
        '8': 'tuv',
        '9': 'wxyz'
    };

    const dfs = async (level: number, accumulated: Stack<string>) => {
        // base case
        if (digits.length === level) {
            proxyVariables.result.push(accumulated.toArray().join('').toString());
            return;
        }

        for (const char of digitsMap[digits[level] as PhoneKeys]) {
            // recursive rule
            accumulated.push(char);
            await dfs(level + 1, accumulated);
            await wait(500);
            accumulated.pop();
        }
    }

    await dfs(0, new Stack<string>());

    return proxyVariables.result;
}


// 46	Permutations	★★	47	784	943	996				Permutation
const permute = function <T>(nums: T[]) {
    if (nums.length === 1) {
        return [nums];
    }

    let result: T[][] = [];

    const dfs = (accumulated: T[], rest: T[]) => {
        if (accumulated.length === nums.length) {
            result.push([...accumulated]);
            return;
        }

        for (let i = 0, len = rest.length; i < len; i++) {
            accumulated.push(rest[i]);
            const restBacktrack = [...rest];
            rest.splice(i, 1); // delete ith element to generate rest,then pass in next recursion
            dfs(accumulated, rest);
            rest = restBacktrack;
            accumulated.pop();
        }
    }

    dfs([], [...nums]);

    return result;
};

const permuteMN = function <T>(nums: T[], n: number, excludeSelf: boolean = true) {
    if (n > nums.length) {
        return [];
    }
    if (nums.length === 1 && n === 1) {
        return [nums];
    }

    let result: T[][] = [];

    const dfs = (accumulated: T[], rest: T[], level: number) => {
        if (level === n) {
            result.push([...accumulated]);
            return;
        }

        for (let i = 0, len = rest.length; i < len; i++) {
            accumulated.push(rest[i]);

            let restBackTrack: T[] = [];
            if (excludeSelf) {
                restBackTrack = [...rest];
                rest.splice(i, 1);
            }

            dfs(accumulated, rest, level + 1);

            accumulated.pop();
            if (excludeSelf) {
                rest = restBackTrack;
            }
        }
    }
    dfs([], nums, 0);
    return result;
};


// Combination
const combineMN = function <T>(nums: T[], n: number, excludeSelf: boolean = true) {
    if (n > nums.length) {
        return [];
    }
    if (nums.length === 1 && n === 1) {
        return [nums];
    }

    let result: T[][] = [];
    let hash: { [key in string]: 'exist' } = {};
    const dfs = (accumulated: T[], rest: T[], level: number) => {
        if (level === n) {
            const key = [...accumulated].sort().join('');
            if (!hash[key]) {
                hash[key] = 'exist';
                result.push([...accumulated]);
            }
            return;
        }

        for (let i = 0, len = rest.length; i < len; i++) {
            accumulated.push(rest[i]);

            let restBackTrack: T[] = [];
            if (excludeSelf) {
                restBackTrack = [...rest];
                rest.splice(i, 1);
            }

            dfs(accumulated, rest, level + 1);
            accumulated.pop();

            if (excludeSelf) {
                rest = restBackTrack;
            }
        }
    }
    dfs([], nums, 0);
    return result;
};

// console.log(combineMN(['(','(',')',')'], 4, false))

// 22	Generate Parentheses	★★★	301							DFS
function generateParenthesis(n: number): string[] {
    // corner case
    if (n === 1) {
        return ['()']
    }

    let result: string[] = [];

    let openCount = 0, closeCount = 0;

    const dfs = (accumulated: string, level: number) => {
        // base case
        if (level === 2 * n) {
            result.push(accumulated);
            return;
        }

        // recursion rule
        if (openCount < n) {
            accumulated += '(';
            openCount++;
            dfs(accumulated, level + 1);
            openCount--;
            accumulated = accumulated.substr(0, accumulated.length - 1);
        }

        if (level != 0) {
            if (openCount > closeCount) {
                accumulated += ')';
                closeCount++;
                dfs(accumulated, level + 1);
                closeCount--;
                accumulated = accumulated.substr(0, accumulated.length - 1);
            }
        }
    }

    dfs('', 0);

    return result;
}

// 37	Sudoku Solver	★★★	51	52						DFS
// 79	Word Search	★★★	212							DFS
// 127	Word Ladder	★★★★	126	752	818					BFS
export function ladderLength(beginWord: string, endWord: string, wordList: string[], proxyHandler: TProxyHandler): number {

    let proxyVariables = new DeepProxy<{ tree: TreeNode<string> }>({tree: new TreeNode(beginWord, beginWord, beginWord)}, proxyHandler)

    const wordListLength = wordList.length;
    // corner case
    if (wordListLength < 1) {
        return 0;
    }
    if (!wordList.includes(endWord)) {
        return 0;
    }

    // assume all words are the same length
    // const isDiffMoreThanOne = (wordA: string, wordB: string) => {
    //     let diffCount = 0;
    //     for (let i = 0, len = wordA.length; i < len; i++) {
    //         if (wordA[i] !== wordB[i]) {
    //             diffCount++;
    //             if (diffCount > 1) {
    //                 return true;
    //             }
    //         }
    //     }
    //     return false;
    // }

    // Wrong Answer
    // "leet"
    // "code"
    // ["lest","leet","lose","code","lode","robe","lost"]
    let isFriendWords = (word1: string, word2: string) => {
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

    let shortest = 0;

    const dfs = (accumulated: string[], rest: string[], level: number, parentNode: TreeNode<string>) => {
        // base case
        if (accumulated[accumulated.length - 1] === endWord) {
            if (shortest === 0 || accumulated.length < shortest) {
                shortest = accumulated.length;
            }
            return;
        }

        if (level === wordListLength) {
            return;
        }

        if (level === 0) {
            accumulated.push(beginWord);
        }

        for (let i = 0, len = rest.length; i < len; i++) {
            if (isFriendWords(rest[i], accumulated[accumulated.length - 1])) {
                accumulated.push(rest[i]);
                let newNode = new TreeNode(accumulated.join(), accumulated.join(), accumulated.join());
                parentNode.addChildren(newNode);
                const backTrackRest = [...rest];
                rest.splice(i, 1);
                dfs(accumulated, rest, level + 1, newNode);
                accumulated.pop();
                rest = backTrackRest;
            }
        }
    }

    dfs([], wordList, 0, proxyVariables.tree);

    return shortest;
}


// runAlgorithm(ladderLength, "qa","sq",["si","go","se","cm","so","ph","mt","db","mb","sb","kr","ln","tm","le","ti","ba","to","ra","fa","yo","ow","sn","ya","cr","po","he","lr","sq","ye"]).then()
runAlgorithm(ladderLength, "hit", "cog", ["hot", "dot", "dog", "lot", "log", "cog"]).then()

// 542	01 Matrix	★★★	675	934						BFS
// 698	Partition to K Equal Sum Subsets	★★★	93	131	241	282	842			Partition
/* --- end Search (BFS/DFS) ---*/

// 100	Same Tree ★★	101	104	110	111	572	965
// 814	Binary Tree Pruning	★★★	669	1325
// 112	Path Sum	★★★	113	437
// 129	Sum Root to Leaf Numbers	★★★	257
// 236 Lowest Common Ancestor of a Binary Tree ★★★	235
// 297	Serialize and Deserialize Binary Tree	★★★	449
// 508	Most Frequent Subtree Sum	★★★
// 124	Binary Tree Maximum Path Sum	★★★	543	687	Use both children, return one
// 968	Binary Tree Cameras	★★★★	337	979


export const treeMaxDepth = (node: TreeNode<number>): number => {
    if (!node) {
        return 0;
    }
    const {children} = node;
    if (children && children.length > 0) {
        const left = children[0];
        const right = children[1];
        const maxLeft = treeMaxDepth(left);
        console.log(node.id);
        const maxRight = treeMaxDepth(right);
        return Math.max(maxLeft, maxRight) + 1;
    } else {
        return 1
    }
}
/* --- end tree ---*/


/* --- start stack --- */
type HashKey = '(' | '{' | '[';
// Matching Parenthesis problem
// 20. Valid Parentheses

export const isValidParenthesis = async function (input: string, proxyHandler: TProxyHandler): Promise<boolean> {
    type IsValidParenthesisVariables = {
        stack: Stack<HashKey>,
        char: string,
    }
    const onlyHashKey = input.match(/[{}\[\]()]/g)?.join('');

    if (!onlyHashKey) {
        return false;
    }

    let variablesProxy = new DeepProxy<IsValidParenthesisVariables>({
        stack: new Stack<HashKey>(),
        char: ''
    }, proxyHandler)

    const hash: { [key in HashKey]: string } = {
        '(': ')',
        '{': '}',
        '[': ']',
    };

    for (const char of onlyHashKey) {
        await wait(500)
        if (char in hash) {
            variablesProxy.stack.push(char as HashKey);
        } else {
            const top = variablesProxy.stack.pop();
            if (top === undefined || hash[top] !== char) {
                return false;
            }
        }
    }

    return !variablesProxy.stack.size();
};
/* --- end stack --- */


/* --- start hash table --- */

// Using Hash Tables TODO
// 3. Longest Substring Without Repeating Characters
export const lengthOfLongestSubstring = async function (input: string, proxyHandler: TProxyHandler) {
    type LengthOfLongestSubstringVariables = {
        maxLen: number,
        curr: number,
        map: Map<string, number>
    }

    let variablesProxy = new DeepProxy<LengthOfLongestSubstringVariables>({
        maxLen: 0,
        curr: 0,
        map: new Map<string, number>(),
    }, proxyHandler);

    if (input.length < 2) {
        return input.length;
    }

    for (let i = 0; i < input.length; i++) {
        variablesProxy.curr = i;
        await wait(500);
        const mapped = variablesProxy.map.get(input[i]);
        if (mapped === undefined) {
            variablesProxy.curr++;
        } else {
            variablesProxy.curr = Math.min(i - mapped, variablesProxy.curr + 1);
        }
        variablesProxy.maxLen = Math.max(variablesProxy.maxLen, variablesProxy.curr);
        variablesProxy.map.set(input[i], i);
    }

    return variablesProxy.maxLen;
};
/* --- end hash table --- */


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

/* --- start Divide and conquer ---*/
// Binary Search
// 33 Search in Rotated Sorted Array
const searchInRotatedSortedArray = function (nums: number[], target: number) {
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


/* --- start Linked List ---*/
// 2	Add Two Numbers	★★	445							traversal
// 24	Swap Nodes in Pairs	★★								reverse
// 206	Reverse Linked List	★★								reverse
// 141	Linked List Cycle	★★	142							fast/slow
// 23	Merge k Sorted Lists	★★★	21							priority_queue / mergesort
// 147	Insertion Sort List	★★★								insertion sort
// 148	Sort List	★★★★								merge sort O(1) space
// 707	Design Linked List	★★★★

//206. Reverse Linked List
export type ReverseLinkedListVariables = {
    pre: SinglyLinkedListNode | null
}

export async function reverseLinkedList(head: SinglyLinkedListNode | null, proxyHandler: TProxyHandler): Promise<SinglyLinkedListNode | null> {
    let pre = null
    let variables: ReverseLinkedListVariables = {
        pre: null
    }
    let variablesProxy = new DeepProxy<ReverseLinkedListVariables>(variables, proxyHandler);
    while (head) {
        await wait(500)
        const next = head.next
        head.next = variablesProxy.pre
        variablesProxy.pre = head
        head = next
    }
    return pre
}

/* --- end Linked List ---*/


/* --- start BST --- */
//98	Validate Binary Search Tree	★★	530					inorder
// 700	Search in a Binary Search Tree	★★	701					binary search
// 230	Kth Smallest Element in a BST	★★★						inorder
// 99	Recover Binary Search Tree	★★★						inorder
// 108
// Convert Sorted Array to Binary Search Tree
// ★★★						build BST
// 501	Find Mode in Binary Search Tree	★★★						inorder
// 450	Delete Node in a BST	★★★★						binary search
/* --- end BST --- */


/* --- start Graph --- */
// 133	Clone Graph	★★	138					queue + hashtable
// 200	Number of Islands	★★	547	695	733	827	1162
// grid + connected components
// 841	Keys and Rooms	★★	1202					DFS, connected components
// 207	Course Schedule	★★★	210	802				topology sorting
// 399	Evaluate Division	★★★	839	952	990	721	737	union find
// 785	Is Graph Bipartite?	★★★	886	1042				bipartition, graph coloring
// 997	Find the Town Judge	★★★						in/out degrees
// 433	Minimum Genetic Mutation	★★★	815	863	1129	1263
// unweighted shortest path / BFS
// 684	Redundant Connection	★★★★	685	1319				cycle, union find
// 743	Network Delay Time	★★★★	787	882	924	1334		weighted shortest path
// 847
// Shortest Path Visiting All Nodes
// ★★★★	864	1298				BFS
// 332	Reconstruct Itinerary	★★★★						Eulerian path
// 1192
// Critical Connections in a Network
// ★★★★						Tarjan
// 943	Find the Shortest Superstring	★★★★★	980	996				Hamiltonian path (DFS / DP)
// 959	Regions Cut By Slashes	★★★★★						union find / grid + CCs
/* --- end Graph --- */

/* --- start Two Pointers --- */
// 11	Container With Most Water	★★	42
// 125	Valid Palindrome	★★	455
// 917	Reverse Only Letters	★★	925	986	855
// 167
// Two Sum II – Input array is sorted
// ★★★	15	16
// 977	Squares of a Sorted Array	★★
// merge sort
// 992
// Subarrays with K Different Integers
// ★★★★
/* --- end Two Pointers --- */

/* --- start Advanced --- */
// 208
// Implement Trie (Prefix Tree)
// ★★★	648	676	677	720	745	211	Trie
// 307
// Range Sum Query – Mutable
// ★★★							BIT/Segment Tree
// 901	Online Stock Span	★★★	907	1019					monotonic stack
// 239	Sliding Window Maximum	★★★							monotonic queue
/* --- end Advanced --- */



