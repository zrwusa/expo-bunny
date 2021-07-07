import {BinarySearchTree, BinarySearchTreeNode} from "../../data-structures/binary-tree";
import {DeepProxy, TProxyHandler} from "@qiwi/deep-proxy";
import {testBSTCase1} from "./cases";
import {runAlgorithm} from "../helpers";
import {wait} from "../../utils";
/* --- start BST --- */
//98	Validate Binary Search Tree	★★	530					DFS/inorder
// 700	Search in a Binary Search Tree	★★	701				binary search
// 230	Kth Smallest Element in a BST	★★★					inorder
function kthSmallest(root: BinarySearchTreeNode<number> | null, k: number): number {
    let rank = 0, target = 0;
    const dfsInOrder = (cur: BinarySearchTreeNode<number>) => {
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
function sortedArrayToBST(nums: number[]): BinarySearchTreeNode<number> | null {
    const buildTree = (l: number, r: number) => {
        if (l > r) return null;
        const m = l + Math.floor((r - l) / 2);
        const root = new BinarySearchTreeNode<number>(nums[m]);
        const left = buildTree(l, m - 1);
        const right = buildTree(m + 1, r);
        root.left = left;
        root.right = right;
        return root;
    }

    return buildTree(0, nums.length - 1);
}
// 501	Find Mode in Binary Search Tree	★★★						inorder
function findMode(root: BinarySearchTreeNode<number> | null): number[] {
    if (!root) return [];
    const map: {[key in string]: number} = {};
    let max: number = 0;
    const dfsInOrder = (cur:  BinarySearchTreeNode<number>) => {
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
    const waitingMS = 300;
    const proxyVariables: { bst: BinarySearchTree<number> } = new DeepProxy({bst: new BinarySearchTree<number>(arrCopy[0], arrCopy[0], true)}, proxyHandler);
    for (let i of rest) {
        proxyVariables.bst.insertNode(i, i);
        await wait(waitingMS);
    }
    await wait(waitingMS);
    const getNodeByIdOne = proxyVariables.bst.getNode(10, 'id');
    console.log('getNodeByIdOne', getNodeByIdOne);

    await wait(waitingMS);
    const getNodesByCount = proxyVariables.bst.getNodes(1, 'count');
    console.log('getNodesByCount', getNodesByCount);

    await wait(waitingMS);
    const getNodesByLeftSum = proxyVariables.bst.getNodes(2, 'allLesserSum');
    console.log('getNodesByLeftSum', getNodesByLeftSum);

    await wait(waitingMS);
    const getMinNodeByRoot = proxyVariables.bst.getMinNode();
    console.log('getMinNodeByRoot', getMinNodeByRoot);

    await wait(waitingMS);
    const getMinNodeBySpecificNode = proxyVariables.bst.getMinNode(proxyVariables.bst.getNode(15));
    console.log('getMinNodeBySpecificNode', getMinNodeBySpecificNode);

    await wait(waitingMS);
    const subTreeSum = proxyVariables.bst.subTreeSum(proxyVariables.bst.getNode(15));
    console.log('subTreeSum', subTreeSum);

    await wait(waitingMS);
    const lesserSum = proxyVariables.bst.lesserSum(10);
    console.log('lesserSum', lesserSum);

    await wait(waitingMS);
    const subTreeAdd = proxyVariables.bst.subTreeAdd(proxyVariables.bst.getNode(15), 1, 'count');
    console.log('subTreeAdd', subTreeAdd);

    await wait(waitingMS);
    const allGreaterNodesAdd = proxyVariables.bst.allGreaterNodesAdd(proxyVariables.bst.getNode(15), 1, 'count')
    console.log('allGreaterNodesAdd', allGreaterNodesAdd);

    await wait(waitingMS);
    proxyVariables.bst.deleteNode(11);
    await wait(waitingMS);
    proxyVariables.bst.deleteNode(1);
    await wait(waitingMS);
    proxyVariables.bst.deleteNode(4);
    await wait(waitingMS);
    proxyVariables.bst.deleteNode(10);
    await wait(waitingMS);
    proxyVariables.bst.deleteNode(15);
    await wait(waitingMS);
    proxyVariables.bst.deleteNode(5);
    await wait(waitingMS);
    proxyVariables.bst.deleteNode(13);
    await wait(waitingMS);
    proxyVariables.bst.deleteNode(3);
    await wait(waitingMS);
    proxyVariables.bst.deleteNode(8);
    await wait(waitingMS);
    proxyVariables.bst.deleteNode(6);
    await wait(waitingMS);
    proxyVariables.bst.deleteNode(7);
    await wait(waitingMS);
    proxyVariables.bst.deleteNode(9);
    await wait(waitingMS);
    proxyVariables.bst.deleteNode(14);
    await wait(waitingMS);

    await wait(waitingMS);
    console.log(proxyVariables.bst.BFS());

    await wait(waitingMS);
    console.log(proxyVariables.bst.BFS('count'));

    return proxyVariables.bst;
}

const runTestBST = async () => {
    await runAlgorithm(testBST, false, ...testBSTCase1);
}

runTestBST().then()

/* --- end BST --- */

export {}
