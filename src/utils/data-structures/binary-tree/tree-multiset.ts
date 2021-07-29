import {BST, BSTNode, I_BST} from "./bst";
import {BinaryTreeNodeId} from "./binary-tree";

export type TreeMultiSetDeletedResult<T> = { deleted: TreeMultiSetNode<T> | null, needBalanced: TreeMultiSetNode<T> | null };

export interface I_TreeMultiSet<T> extends I_BST<T> {
}

export class TreeMultiSetNode<T> extends BSTNode<T> {
}

export class TreeMultiSet<T> extends BST<T> implements I_TreeMultiSet<T> {
    createNode(id: BinaryTreeNodeId, val?: T | null, count?: number): TreeMultiSetNode<T> {
        return new TreeMultiSetNode<T>(id, val, count);
    }

    insert(id: BinaryTreeNodeId, val?: T | null, count?: number): (TreeMultiSetNode<T> | null)[] {
        const inserted = super.insert(id, val, count);
        return inserted;
    }

    remove(id: BinaryTreeNodeId, isUpdateAllLeftSum?: boolean): TreeMultiSetDeletedResult<T>[] {
        const deletedResults = super.remove(id, isUpdateAllLeftSum);
        return deletedResults;
    }
}


