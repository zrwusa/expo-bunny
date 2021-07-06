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
import {BinarySearchTree, BinarySearchTreeNode} from "../../data-structures/binary-tree";
import {DeepProxy, TProxyHandler} from "@qiwi/deep-proxy";
import {deleteNodeGenTree} from "./cases";
import {runAlgorithm} from "../helpers";

function deleteNode(root: BinarySearchTreeNode<number> | null, key: number): BinarySearchTreeNode<number> | null {
    return null;
}

export async function genBST(arr: number[], proxyHandler?: TProxyHandler) {
    const arrCopy = [...arr];
    const rest = arrCopy.splice(1);
    const proxyVariables: { bst: BinarySearchTree<number> } = new DeepProxy({bst: new BinarySearchTree<number>(arrCopy[0], true)}, proxyHandler);
    for (let i of rest) {
        proxyVariables.bst.insert(i, i)
    }

    return proxyVariables.bst;
}

const runAllDeleteNode = async () => {
    const bst:BinarySearchTree<number> = await runAlgorithm(genBST, false, ...deleteNodeGenTree);
    const getNodeByIdOne = bst.getNode(10, 'id', true);
    const getNodeByCountMultiple = bst.getNode(1, 'count', false);
    const getNodeByLeftSumMultiple = bst.getNode(2, 'leftSum', false);
    const getMinNodeByRoot = bst.getMinNode();
    const getMinNodeBySpecificNode = bst.getMinNode(bst.getNode(15));
    const subTreeSum = bst.subTreeSum(bst.getNode(15));
    const subTreeAdd = bst.subTreeAdd(bst.getNode(15), 1, 'count');
    const prefixSum = bst.prefixSum(10);
    const allGreaterNodesAdd = bst.allGreaterNodesAdd(bst.getNode(11), -1, 'count')
    console.log(getNodeByIdOne);
    console.log(getNodeByCountMultiple);
    console.log(getNodeByLeftSumMultiple);
    console.log(getMinNodeByRoot);
    console.log(getMinNodeBySpecificNode);
    console.log(subTreeSum);
    console.log(subTreeAdd);
    console.log(prefixSum);
    console.log(allGreaterNodesAdd);
    bst.deleteNode(5);
    bst.deleteNode(1);
    bst.deleteNode(4);
    bst.deleteNode(10);
    bst.deleteNode(15);
    bst.deleteNode(11);
    bst.deleteNode(13);
    bst.deleteNode(3);
    bst.deleteNode(8);
    bst.deleteNode(6);
    bst.deleteNode(7);
    bst.deleteNode(9);
    bst.deleteNode(14);
    console.log(bst.BFS());
    console.log(bst.BFS('count'));
}

// runAllDeleteNode().then()

/* --- end BST --- */

export {}
