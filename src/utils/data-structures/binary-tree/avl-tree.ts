import {AbstractBST, AVLTreeNode, BSTNode, BSTNodeId} from "./bst";


export class AVLTree<T> extends AbstractBST<T, AVLTreeNode<T>> {

    createNode(id: BSTNodeId, val?: T | null, count?: number): AVLTreeNode<T> {
        return new AVLTreeNode<T>(id, val, count);
    }

    insert(id: BSTNodeId, val?: T | null, count?: number): AVLTreeNode<T> | null {
        const newNode = this.createNode(id, val, count);
        const newId = newNode.id;
        if (this._root === null) {
            this._root = newNode;
            this._size++;
            return this._root;
        } else {
            let cur = this._root;
            let traversing = true;
            while (traversing) {
                if (cur.id === newId) {
                    this._autoAllLesserSum && cur.right && this.subTreeAdd(cur.right, newNode.count, 'allLesserSum');
                    cur.count += newNode.count;
                    //Duplicates are not accepted.
                    traversing = false;
                    return cur;
                } else if (newId < cur.id) {
                    this._autoAllLesserSum && cur.right && this.subTreeAdd(cur.right, newNode.count, 'allLesserSum');
                    if (this._autoAllLesserSum) cur.allLesserSum += newNode.count;
                    // Traverse left of the node
                    if (cur.left === null) {
                        if (this._autoAllLesserSum) newNode.allLesserSum = cur.allLesserSum - newNode.count;
                        newNode.parent = cur;
                        newNode.isLeftChild = true;
                        //Add to the left of the current node
                        cur.left = newNode;
                        this._size++;
                        traversing = false;
                        return cur.left;
                    } else {
                        //Traverse the left of the current node
                        cur = cur.left;
                    }
                } else if (newId > cur.id) {
                    // Traverse right of the node
                    if (cur.right === null) {
                        if (this._autoAllLesserSum) newNode.allLesserSum = cur.allLesserSum + cur.count;
                        newNode.parent = cur;
                        newNode.isLeftChild = false;
                        //Add to the right of the current node
                        cur.right = newNode;
                        this._size++;
                        traversing = false;
                        return cur.right;
                    } else {
                        //Traverse the left of the current node
                        cur = cur.right;
                    }
                }
            }
        }
        return null
    }

    remove(id: BSTNodeId, isUpdateAllLeftSum?: boolean): AVLTreeNode<T> | null {
        if (isUpdateAllLeftSum === undefined) {
            isUpdateAllLeftSum = true;
        }
        let cur: AVLTreeNode<T> | null = this.getNode(id, 'id');

        if (!cur) return null;

        this._autoAllLesserSum && isUpdateAllLeftSum && this.allGreaterNodesAdd(cur, -cur.count, 'allLesserSum');

        if (!cur.left && !cur.right) {
            this._replaceWithASubTree(cur, null);
        } else if (cur.left && !cur.right) {
            this._replaceWithASubTree(cur, cur.left)
        } else if (!cur.left && cur.right) {
            this._replaceWithASubTree(cur, cur.right);
        } else if (cur.left && cur.right) {
            const minNode = this.getMinNode(cur.right);
            if (minNode) {
                this.remove(minNode.id, false);
                this._swap(cur, minNode);
            }
        }

        return cur;
    }
}


