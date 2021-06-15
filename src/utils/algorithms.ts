import {wait} from "./utils";
import {OrderType, TreeNode} from "../types";
import {DeepProxy} from '@qiwi/deep-proxy'
import {TProxyHandler} from "@qiwi/deep-proxy/typings/interface";
import {Queue, SinglyLinkedListNode, Stack} from "./data-structures";

export const treeData: TreeNode = new TreeNode('1', '1', 0, [
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

export class BinaryTreeNode {
    val: number
    left: BinaryTreeNode | null
    right: BinaryTreeNode | null

    constructor(val?: number, left?: BinaryTreeNode | null, right?: BinaryTreeNode | null) {
        this.val = (val === undefined ? 0 : val)
        this.left = (left === undefined ? null : left)
        this.right = (right === undefined ? null : right)
    }
}


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

export const DFS = async (node: TreeNode, type: OrderType, proxyHandler: TProxyHandler) => {
    type Variables = { current: TreeNode, nodeNeedPrint: TreeNode | undefined }

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
export const BFS = async (node: TreeNode, proxyHandler: TProxyHandler) => {
    type Variables = { node: TreeNode }

    let nodes: TreeNode[] = [];

    let variablesProxy = new DeepProxy<Variables>({node: node,}, proxyHandler);

    if (node) {
        let queue = new Queue<TreeNode>();
        queue.add(node);
        while (!queue.isEmpty()) {
            let item = queue.pop() as TreeNode;
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
// Combination
// 46	Permutations	★★	47	784	943	996				Permutation
// 22	Generate Parentheses	★★★	301							DFS
// 37	Sudoku Solver	★★★	51	52						DFS
// 79	Word Search	★★★	212							DFS
// 127	Word Ladder	★★★★	126	752	818					BFS
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


export const treeMaxDepth = (node: TreeNode): number => {
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



