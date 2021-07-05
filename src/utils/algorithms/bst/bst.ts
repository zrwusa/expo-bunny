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

function deleteNode(root: BinarySearchTreeNode<number> | null, key: number): BinarySearchTreeNode<number> | null {
    return null;
}

export async function genBST(arr: number[], proxyHandler: TProxyHandler) {
    const rest = arr.splice(1);
    const proxyVariables: { bst: BinarySearchTree<number> } = new DeepProxy({bst: new BinarySearchTree<number>(arr[0])}, proxyHandler);
    for (let i of rest) {
        proxyVariables.bst.insert(i)
    }
    return null;
}

/* --- end BST --- */

export {}
