import {AVLTreeNode, BST, BSTNode} from "../../data-structures/binary-tree";
import {DeepProxy, TProxyHandler} from "@qiwi/deep-proxy";
import {testBSTCase1} from "./cases";
import {runAlgorithm} from "../helpers";
import {wait} from "../../utils";
import {AVLTree} from "../../data-structures/binary-tree/avl-tree";
/* --- start BST --- */
//98	Validate Binary Search Tree	★★	530					DFS/inorder
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
// 108  Convert Sorted Array to Binary Search Tree ★★★				build BST
function sortedArrayToBST(nums: number[]): BSTNode<number> | null {
    const buildTree = (l: number, r: number) => {
        if (l > r) return null;
        const m = l + Math.floor((r - l) / 2);
        const root = new BSTNode<number>(nums[m]);
        const left = buildTree(l, m - 1);
        const right = buildTree(m + 1, r);
        root.left = left;
        root.right = right;
        return root;
    }

    return buildTree(0, nums.length - 1);
}

// 501	Find Mode in Binary Search Tree	★★★						inorder
function findMode(root: BSTNode<number> | null): number[] {
    if (!root) return [];
    const map: { [key in string]: number } = {};
    let max: number = 0;
    const dfsInOrder = (cur: BSTNode<number>) => {
        cur.left && dfsInOrder(cur.left);

        map[cur.id] ? map[cur.id]++ : map[cur.id] = 1;

        max = Math.max(max, map[cur.id]);

        cur.right && dfsInOrder(cur.right);
        if (!cur.left && !cur.right) return;
    }
    root && dfsInOrder(root);
    const ans: number[] = [];
    for (let i in map) {
        if (map[i] === max) {
            ans.push(Number.parseInt(i, 10));
        }
    }
    return ans;
}

// 450	Delete Node in a BST	★★★★						binary search


export async function testBST(arr: number[], proxyHandler?: TProxyHandler) {
    const arrCopy = [...arr];
    const rest = arrCopy.splice(1);
    const waitingMS = 100;
    const waitingMS1 = 200;
    const waitingMS2 = 300;
    const proxyVariables: { bst: BST<number> } = new DeepProxy({bst: new BST<number>(new BSTNode<number>(arrCopy[0], arrCopy[0]), true)}, proxyHandler);

    for (let i of rest) {
        proxyVariables.bst.insert(new BSTNode<number>(i, i));
        await wait(waitingMS);
    }

    await wait(waitingMS1);
    const getNodeById = proxyVariables.bst.getNode(10, 'id');
    console.log('getNode, 10, id', getNodeById);

    await wait(waitingMS1);
    const getNodesByCount = proxyVariables.bst.getNodes(1, 'count');
    console.log('getNodes, 1, count', getNodesByCount);

    await wait(waitingMS1);
    const getNodesByLeftSum = proxyVariables.bst.getNodes(2, 'allLesserSum');
    console.log('getNodes, 2, allLesserSum', getNodesByLeftSum);

    await wait(waitingMS1);
    const getMinNodeByRoot = proxyVariables.bst.getMinNode();
    console.log('getMinNode', getMinNodeByRoot);

    await wait(waitingMS1);
    const getMinNodeBySpecificNode = proxyVariables.bst.getMinNode(proxyVariables.bst.getNode(15));
    console.log('getMinNode, 15', getMinNodeBySpecificNode);

    await wait(waitingMS1);
    const subTreeSum = proxyVariables.bst.subTreeSum(proxyVariables.bst.getNode(15));
    console.log('subTreeSum, 15', subTreeSum);

    await wait(waitingMS1);
    const lesserSum = proxyVariables.bst.lesserSum(10);
    console.log('lesserSum, 10', lesserSum);

    await wait(waitingMS1);
    const subTreeAdd = proxyVariables.bst.subTreeAdd(proxyVariables.bst.getNode(15), 1, 'count');
    console.log('subTreeAdd, getNode(15)', subTreeAdd);

    await wait(waitingMS2);
    const allGreaterNodesAdd = proxyVariables.bst.allGreaterNodesAdd(proxyVariables.bst.getNode(11), 2, 'count')
    console.log('allGreaterNodesAdd, getNode(11), 2, count', allGreaterNodesAdd);

    await wait(waitingMS2);
    console.log('DFS ,in, node', proxyVariables.bst.DFS('in', 'node'))
    console.log('waiting for balancing')
    await wait(waitingMS2);
    proxyVariables.bst.balance();
    console.log('balanced BFS, node', proxyVariables.bst.BFS('node'))

    await wait(waitingMS2);
    console.log('remove, 11', proxyVariables.bst.remove(11));
    console.log('isBalance', proxyVariables.bst.isAVLBalanced());
    console.log('getMaxDepth, getNode(15)', proxyVariables.bst.getMaxDepth(proxyVariables.bst.getNode(15)));
    await wait(waitingMS2);
    console.log('remove, 1', proxyVariables.bst.remove(1))
    console.log('isAVLBalanced', proxyVariables.bst.isAVLBalanced())
    console.log('getMaxDepth', proxyVariables.bst.getMaxDepth());
    await wait(waitingMS2);
    console.log('remove, 4', proxyVariables.bst.remove(4))
    console.log('isAVLBalanced', proxyVariables.bst.isAVLBalanced())
    console.log('getMaxDepth', proxyVariables.bst.getMaxDepth());
    await wait(waitingMS2);
    console.log('remove, 10', proxyVariables.bst.remove(10))
    console.log('isAVLBalanced', proxyVariables.bst.isAVLBalanced())
    console.log('getMaxDepth', proxyVariables.bst.getMaxDepth());
    await wait(waitingMS2);
    console.log('remove, 15', proxyVariables.bst.remove(15))
    console.log('isAVLBalanced', proxyVariables.bst.isAVLBalanced())
    console.log('getMaxDepth', proxyVariables.bst.getMaxDepth());
    await wait(waitingMS2);
    console.log('remove, 5', proxyVariables.bst.remove(5))
    console.log('isAVLBalanced', proxyVariables.bst.isAVLBalanced())
    console.log('getMaxDepth', proxyVariables.bst.getMaxDepth());
    await wait(waitingMS2);
    console.log('remove, 13', proxyVariables.bst.remove(13))
    console.log('isAVLBalanced', proxyVariables.bst.isAVLBalanced())
    console.log('getMaxDepth', proxyVariables.bst.getMaxDepth());
    await wait(waitingMS2);
    console.log('remove, 3', proxyVariables.bst.remove(3))
    console.log('isAVLBalanced', proxyVariables.bst.isAVLBalanced())
    console.log('getMaxDepth', proxyVariables.bst.getMaxDepth());
    await wait(waitingMS2);
    console.log('remove, 8', proxyVariables.bst.remove(8))
    console.log('isAVLBalanced', proxyVariables.bst.isAVLBalanced())
    console.log('getMaxDepth', proxyVariables.bst.getMaxDepth());
    await wait(waitingMS2);
    console.log('remove, 6', proxyVariables.bst.remove(6))
    console.log('isAVLBalanced', proxyVariables.bst.isAVLBalanced())
    console.log('getMaxDepth', proxyVariables.bst.getMaxDepth());
    await wait(waitingMS2);
    console.log('remove, 7', proxyVariables.bst.remove(7))
    console.log('isAVLBalanced', proxyVariables.bst.isAVLBalanced())
    console.log('getMaxDepth', proxyVariables.bst.getMaxDepth());
    await wait(waitingMS2);
    console.log('remove, 9', proxyVariables.bst.remove(9))
    console.log('isAVLBalanced', proxyVariables.bst.isAVLBalanced())
    console.log('getMaxDepth', proxyVariables.bst.getMaxDepth());
    await wait(waitingMS2);
    console.log('remove, 14', proxyVariables.bst.remove(14))
    console.log('isAVLBalanced', proxyVariables.bst.isAVLBalanced())
    console.log('getMaxDepth', proxyVariables.bst.getMaxDepth());
    await wait(waitingMS2);

    await wait(waitingMS);
    console.log('BFS', proxyVariables.bst.BFS());

    await wait(waitingMS);
    console.log('BFS, count', proxyVariables.bst.BFS('count'));

    return proxyVariables.bst;
}

const runTestBST = async () => {
    await runAlgorithm(testBST, false, ...testBSTCase1);
}

runTestBST().then()

const testAVLTree = async (arr: number[], proxyHandler?: TProxyHandler) => {
    const arrCopy = [...arr];
    const rest = arrCopy.splice(1);
    const proxyObj: { avlTree: AVLTree<number> } = new DeepProxy({avlTree: new AVLTree<number>(new AVLTreeNode<number>(arrCopy[0], arrCopy[0]), true)}, proxyHandler);
    const waitingMS = 100;
    const waitingMS1 = 200;
    const waitingMS2 = 300;

}
const runTestAVLTree = async () => {
    await runAlgorithm(testAVLTree, false, ...testBSTCase1);
}

// runTestAVLTree().then();
/* --- end BST --- */
