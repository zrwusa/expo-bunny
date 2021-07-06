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
import {wait} from "../../utils";

function deleteNode(root: BinarySearchTreeNode<number> | null, key: number): BinarySearchTreeNode<number> | null {
    return null;
}

export async function genBST(arr: number[], proxyHandler: TProxyHandler) {
    const arrCopy = [...arr];
    const rest = arrCopy.splice(1);
    const proxyVariables: { bst: BinarySearchTree<number> } = new DeepProxy({bst: new BinarySearchTree<number>(arrCopy[0], true)}, proxyHandler);
    for (let i of rest) {
        proxyVariables.bst.insert(i)
    }
    proxyVariables.bst.deleteNode(proxyVariables.bst.root!,5);
    proxyVariables.bst.deleteNode(proxyVariables.bst.root!,1);
    proxyVariables.bst.deleteNode(proxyVariables.bst.root!,4);
    proxyVariables.bst.deleteNode(proxyVariables.bst.root!,10);
    proxyVariables.bst.deleteNode(proxyVariables.bst.root!,15);
    proxyVariables.bst.deleteNode(proxyVariables.bst.root!,11);
    proxyVariables.bst.deleteNode(proxyVariables.bst.root!,13);
    proxyVariables.bst.deleteNode(proxyVariables.bst.root!,3);
    proxyVariables.bst.deleteNode(proxyVariables.bst.root!,8);
    proxyVariables.bst.deleteNode(proxyVariables.bst.root!,6);
    proxyVariables.bst.deleteNode(proxyVariables.bst.root!,7);
    proxyVariables.bst.deleteNode(proxyVariables.bst.root!,9);
    proxyVariables.bst.deleteNode(proxyVariables.bst.root!,14);
    console.log(proxyVariables.bst.BFS())
    return null;
}

/* --- end BST --- */

export {}
