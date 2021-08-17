import {BinaryTreeNodeId, BST, BSTNode} from '../../../data-structures/binary-tree';
import {DeepProxy, TProxyHandler} from '@qiwi/deep-proxy';
import {testBSTCase1} from './cases';
import {runAlgorithm} from '../../helpers';
import {wait, WaitManager} from '../../../utils';

/** --- start BST --- **/

//98	Validate Binary Search Tree	★★	530					DFS/inorder
const isValidBST = (root: BSTNode<number> | null): boolean => {
    if (!root) return true;

    function dfs(cur: BSTNode<number> | null, min: BinaryTreeNodeId, max: BinaryTreeNodeId): boolean {
        if (!cur) return true;
        if ((cur.id <= min) || (cur.id >= max)) return false;
        return dfs(cur.left, min, cur.id) && dfs(cur.right, cur.id, max);
    }

    return dfs(root, Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
}

// 700	Search in a Binary Search Tree	★★	701				binary search
function searchBST(root: BSTNode<number> | null, id: number): BSTNode<number> | null {
    let ans = null;
    if (root === null) return ans;
    const dfs = (cur: BSTNode<number>) => {
        if (cur.id === id) {
            ans = cur;
        }
        if (!cur.left && !cur.right) return;
        if ((id < cur.id) && cur.left) dfs(cur.left);
        if ((id > cur.id) && cur.right) dfs(cur.right);
    }

    dfs(root);
    return ans;
}

// 230	Kth Smallest Element in a BST	★★★					inorder
function kthSmallest(root: BSTNode<number> | null, k: number): number {
    let rank = 0, target = 0;
    const dfsInOrder = (cur: BSTNode<number>) => {
        cur.left && dfsInOrder(cur.left);
        if (++rank === k) {
            target = cur.id;
            return;
        }
        cur.right && dfsInOrder(cur.right);
        if (!cur.left && !cur.right) return;
    }
    root && dfsInOrder(root);
    return target;
}

// 99	Recover Binary Search Tree	★★★						inorder
function recoverTree(root: BSTNode<number> | null): void {

    const swap = (nodeA: BSTNode<number>, nodeB: BSTNode<number>) => {
        const tempVal = nodeA.val;
        nodeA.val = nodeB.val;
        nodeB.val = tempVal;
    }

    let firstBad: BSTNode<number> | null = null;
    let secondBad: BSTNode<number> | null = null;
    let prev: BSTNode<number> | null = null;
    let cur = root;

    // Morris Traversal, space complexity is O(1)
    while (cur) {
        if (cur.left) {
            let pred = cur.left; // predecessor
            while (pred.right && pred.right !== cur) {
                pred = pred.right;
            }
            if (!pred.right) {
                pred.right = cur;
                cur = cur.left;
                continue;
            } else {
                pred.right = null;
            }
        }

        if (prev && prev.val! > cur.val!) {
            if (!firstBad) {
                firstBad = prev;
                secondBad = cur;
            } else {
                secondBad = cur;
            }
        }

        prev = cur;
        cur = cur.right;
    }

    swap(firstBad!, secondBad!);
}

// 108  Convert Sorted Array to Binary Search Tree ★★★				build BST
function sortedArrayToBST(nums: number[]): BSTNode<number> | null {
    const dfs = (left: number, right: number): BSTNode<number> | null => {
        if (left > right) return null;
        const mid = left + Math.floor((right - left) / 2);
        const cur = new BSTNode<number>(nums[mid]);
        cur.left = dfs(left, mid - 1);
        cur.right = dfs(mid + 1, right);
        return cur;
    }

    return dfs(0, nums.length - 1);
}

// 501	Find Mode in Binary Search Tree	★★★						inorder
function findMode(root: BSTNode<number> | null): number[] {
    let max = 0;
    let count = 0;
    let prev = -Infinity;
    let modes: number[] = [];

    const inorderDFS = (cur: BSTNode<number> | null) => {
        if (!cur) return;
        inorderDFS(cur.left);
        count = prev === cur.id ? count + 1 : 1;
        if (count > max) {
            modes = [cur.id];
            max = count;
        } else if (count === max) {
            modes.push(cur.id);
        }
        prev = cur.id;
        inorderDFS(cur.right);
    }

    inorderDFS(root);

    return modes;
}

const waitManager = new WaitManager(10);
const {time1, time2, time3} = waitManager;

// 450	Delete Node in a BST	★★★★						binary search


export async function testBST(arr: number[], proxyHandler?: TProxyHandler) {
    const arrCopy = [...arr];
    const rest = arrCopy.splice(1);
    const proxyVariables: { bst: BST<number> } = new DeepProxy({bst: new BST<number>(true, arrCopy[0], arrCopy[0])}, proxyHandler);

    for (let i of rest) {
        proxyVariables.bst.insert(i, i);
        await wait(time1);
    }

    const node6 = proxyVariables.bst.getNode(6);
    console.log('getHeight(getNode 6)', node6 && proxyVariables.bst.getHeight(node6))
    console.log('getDepth(getNode 6)', node6 && proxyVariables.bst.getDepth(node6))
    await wait(time2);
    const getNodeById = proxyVariables.bst.getNode(10, 'id');
    console.log('getNode, 10, id', getNodeById);

    await wait(time2);
    const getNodesByCount = proxyVariables.bst.getNodes(1, 'count');
    console.log('getNodes, 1, count', getNodesByCount);

    await wait(time2);
    const getNodesByLeftSum = proxyVariables.bst.getNodes(2, 'allLesserSum');
    console.log('getNodes, 2, allLesserSum', getNodesByLeftSum);

    await wait(time2);
    const getMinNodeByRoot = proxyVariables.bst.getMinNode();
    console.log('getMinNode', getMinNodeByRoot);

    await wait(time2);
    const node15 = proxyVariables.bst.getNode(15)
    const getMinNodeBySpecificNode = node15 && proxyVariables.bst.getMinNode(node15);
    console.log('getMinNode, 15', getMinNodeBySpecificNode);

    await wait(time2);
    const subTreeSum = node15 && proxyVariables.bst.subTreeSum(node15);
    console.log('subTreeSum, 15', subTreeSum);

    await wait(time2);
    const lesserSum = proxyVariables.bst.lesserSum(10);
    console.log('lesserSum, 10', lesserSum);

    await wait(time2);
    const subTreeAdd = node15 && proxyVariables.bst.subTreeAdd(node15, 1, 'count');
    console.log('subTreeAdd, getNode(15)', subTreeAdd);

    await wait(time3);
    const node11 = proxyVariables.bst.getNode(11);
    const allGreaterNodesAdd = node11 && proxyVariables.bst.allGreaterNodesAdd(node11, 2, 'count')
    console.log('allGreaterNodesAdd, getNode(11), 2, count', allGreaterNodesAdd);

    await wait(time3);
    console.log('DFS ,in, node', proxyVariables.bst.DFS('in', 'node'))
    console.log('waiting for balancing')
    await wait(time3);
    proxyVariables.bst.balance();
    console.log('balanced BFS, node', proxyVariables.bst.BFS('node'))

    await wait(time3);
    console.log('remove, 11', proxyVariables.bst.remove(11));
    console.log('isBalance', proxyVariables.bst.isAVLBalanced());
    console.log('getHeight, getNode(15)', node15 && proxyVariables.bst.getHeight(node15));
    await wait(time3);
    console.log('remove, 1', proxyVariables.bst.remove(1))
    console.log('isAVLBalanced', proxyVariables.bst.isAVLBalanced())
    console.log('getHeight', proxyVariables.bst.getHeight());
    await wait(time3);
    console.log('remove, 4', proxyVariables.bst.remove(4))
    console.log('isAVLBalanced', proxyVariables.bst.isAVLBalanced())
    console.log('getHeight', proxyVariables.bst.getHeight());
    await wait(time3);
    console.log('remove, 10', proxyVariables.bst.remove(10))
    console.log('isAVLBalanced', proxyVariables.bst.isAVLBalanced())
    console.log('getHeight', proxyVariables.bst.getHeight());
    await wait(time3);
    console.log('remove, 15', proxyVariables.bst.remove(15))
    console.log('isAVLBalanced', proxyVariables.bst.isAVLBalanced())
    console.log('getHeight', proxyVariables.bst.getHeight());
    await wait(time3);
    console.log('remove, 5', proxyVariables.bst.remove(5))
    console.log('isAVLBalanced', proxyVariables.bst.isAVLBalanced())
    console.log('getHeight', proxyVariables.bst.getHeight());
    await wait(time3);
    console.log('remove, 13', proxyVariables.bst.remove(13))
    console.log('isAVLBalanced', proxyVariables.bst.isAVLBalanced())
    console.log('getHeight', proxyVariables.bst.getHeight());
    await wait(time3);
    console.log('remove, 3', proxyVariables.bst.remove(3))
    console.log('isAVLBalanced', proxyVariables.bst.isAVLBalanced())
    console.log('getHeight', proxyVariables.bst.getHeight());
    await wait(time3);
    console.log('remove, 8', proxyVariables.bst.remove(8))
    console.log('isAVLBalanced', proxyVariables.bst.isAVLBalanced())
    console.log('getHeight', proxyVariables.bst.getHeight());
    await wait(time3);
    console.log('remove, 6', proxyVariables.bst.remove(6))
    console.log('isAVLBalanced', proxyVariables.bst.isAVLBalanced())
    console.log('getHeight', proxyVariables.bst.getHeight());
    await wait(time3);
    console.log('remove, 7', proxyVariables.bst.remove(7))
    console.log('isAVLBalanced', proxyVariables.bst.isAVLBalanced())
    console.log('getHeight', proxyVariables.bst.getHeight());
    await wait(time3);
    console.log('remove, 9', proxyVariables.bst.remove(9))
    console.log('isAVLBalanced', proxyVariables.bst.isAVLBalanced())
    console.log('getHeight', proxyVariables.bst.getHeight());
    await wait(time3);
    console.log('remove, 14', proxyVariables.bst.remove(14))
    console.log('isAVLBalanced', proxyVariables.bst.isAVLBalanced())
    console.log('getHeight', proxyVariables.bst.getHeight());
    await wait(time3);

    await wait(time1);
    console.log('isAVLBalanced()', proxyVariables.bst.isAVLBalanced())
    await wait(time1);
    console.log('BFS', proxyVariables.bst.BFS());

    await wait(time1);
    console.log('BFS, node', proxyVariables.bst.BFS('node'));

    return proxyVariables.bst;
}

const runTestBST = async () => {
    await runAlgorithm(testBST, false, ...testBSTCase1);
}

// runTestBST().then()

/** --- end BST --- **/
