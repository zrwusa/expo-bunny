import {
    AbstractBST,
    AVLTreeNode,
    BST,
    BSTNode,
    BSTNodeId,
    DFSOrderPattern,
    NodeOrPropertyName,
    PropertyName
} from "./bst";



export class AVLTree<T> extends AbstractBST<T> {
    constructor(rootNode?: AVLTreeNode<T> | null, autoPrefixSum?: boolean) {
        super(rootNode, autoPrefixSum);
    }

    insert(newNode: AVLTreeNode<T>): AVLTreeNode<T> | null {
        return null
    }
}


