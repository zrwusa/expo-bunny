import {BinaryTree, BinaryTreeNode, BinaryTreeNodeId, BinaryTreeNodePropertyName} from "./binary-tree";

export class BSTNode<V> extends BinaryTreeNode<V> {

}

export interface I_BST<T> {
    // --- start basic functions
    isValid(): boolean;

    insert(id: BinaryTreeNodeId, val?: T | null, count?: number): BSTNode<T> | null;

    contains(node: BSTNode<T>): boolean;

    remove(id: BinaryTreeNodeId, isUpdateAllLeftSum?: boolean): { deleted: BSTNode<T> | null, needBalanced: BSTNode<T> | null };

    // --- end basic functions

    // --- start additional functions
    getMinNode(node?: BSTNode<T> | null): BSTNode<T> | null;

    getMaxNode(node?: BSTNode<T> | null): BSTNode<T> | null;

    lesserSum(id: BinaryTreeNodeId, propertyName ?: BinaryTreeNodePropertyName): number;

    subTreeAdd(subTreeRoot: BSTNode<T>, delta: number, propertyName ?: BinaryTreeNodePropertyName): boolean;

    allGreaterNodesAdd(node: BSTNode<T>, delta: number, propertyName ?: BinaryTreeNodePropertyName): boolean;

    balance(): boolean;

    isAVLBalanced(): boolean;

    // --- end additional functions
}

export class BST<T> extends BinaryTree<T> implements I_BST<T> {

    protected readonly _autoAllLesserSum: boolean = false;

    constructor(autoPrefixSum?: boolean, id?: BinaryTreeNodeId, val?: T | null, count?: number) {
        super(id, val, count);
        if (autoPrefixSum) {
            this._autoAllLesserSum = true;
        }
    }

    // --- start basic functions
    createNode(id: BinaryTreeNodeId, val?: T | null, count?: number): BinaryTreeNode<T> {
        return new BSTNode<T>(id, val, count);
    }

    insert(id: BinaryTreeNodeId, val?: T | null, count?: number): BSTNode<T> | null {
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

    remove(id: BinaryTreeNodeId, isUpdateAllLeftSum?: boolean): { deleted: BSTNode<T> | null, needBalanced: BSTNode<T> | null } {

        if (isUpdateAllLeftSum === undefined) {
            isUpdateAllLeftSum = true;
        }

        if (this._root === null) return {deleted: null, needBalanced: null}; // Element is not in the tree

        // Locate the node to be deleted and also locate its parent node
        let parent: BSTNode<T> | null = null;
        let current: BSTNode<T> | null = this._root;
        let needBalanced: BSTNode<T> | null = null;
        while (current !== null) {
            if (id < current.id) {
                parent = current;
                current = current.left;
            } else if (id > current.id) {
                parent = current;
                current = current.right;
            } else
                break; // Element is in the tree pointed by current
        }

        if (current === null) return {deleted: null, needBalanced: null}; // Element is not in the tree

        // Case 1: current has no left children (See Figure 23.6)
        if (current.left === null) {
            // Connect the parent with the right child of the current node
            if (parent == null) {
                this._root = current.right;
            } else {
                if (id < parent.id)
                    parent.left = current.right;
                else
                    parent.right = current.right;
                needBalanced = parent;
            }
        } else {
            // Case 2: The current node has a left child
            // Locate the rightmost node in the left subtree of
            // the current node and also its parent
            let parentOfRightMost = current;
            let rightMost = current.left;

            while (rightMost.right != null) {
                parentOfRightMost = rightMost;
                rightMost = rightMost.right; // Keep going to the right
            }

            // Replace the element in current by the element in rightMost
            current.id = rightMost.id;

            // Eliminate rightmost node
            if (parentOfRightMost.right == rightMost)
                parentOfRightMost.right = rightMost.left;
            else {
                // Special case: parentOfRightMost is current
                parentOfRightMost.left = rightMost.left;
                needBalanced = parentOfRightMost;
            }
        }

        this._size--;
        this._autoAllLesserSum && isUpdateAllLeftSum && this.allGreaterNodesAdd(current, -current.count, 'allLesserSum');
        return {deleted: current, needBalanced};
    }

    isValid(): boolean {
        if (!this._root) return true;

        function dfs(cur: BSTNode<T> | null, min: BinaryTreeNodeId, max: BinaryTreeNodeId): boolean {
            if (!cur) return true;
            if ((cur.id <= min) || (cur.id >= max)) return false;
            return dfs(cur.left, min, cur.id) && dfs(cur.right, cur.id, max);
        }

        return dfs(this._root!, Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
    }

    contains(node: BSTNode<T>): boolean {
        return false;
    }

    // --- end basic functions

    // --- start additional functions
    getMinNode(node?: BSTNode<T> | null): BSTNode<T> | null {
        if (!node) {
            node = this._root;
        }

        function _traverse(cur: BSTNode<T>): BSTNode<T> {
            if (!cur.left) return cur;
            return _traverse(cur.left);
        }

        return node ? _traverse(node) : null;
    }

    getMaxNode(node?: BSTNode<T> | null): BSTNode<T> | null {
        if (!node) {
            node = this._root;
        }

        function _traverse(cur: BSTNode<T>): BSTNode<T> {
            if (!cur.right) return cur;
            return _traverse(cur.right);
        }

        return node ? _traverse(node) : null;
    }

    lesserSum(id: BinaryTreeNodeId, propertyName ?: BinaryTreeNodePropertyName): number {
        if (propertyName === undefined) {
            propertyName = 'id'
        }
        let sum = 0;
        const _traverse = (cur: BSTNode<T>): void => {
            let needSum: number;
            switch (propertyName) {
                case 'id':
                    needSum = cur.id;
                    break;
                case 'count':
                    needSum = cur.count;
                    break;
                case 'allLesserSum':
                    needSum = cur.allLesserSum;
                    break;
                default:
                    needSum = cur.id;
                    break;
            }
            const curId = cur.id;

            if (id === curId) {
                if (cur.right) {
                    sum += this.subTreeSum(cur.right, propertyName);
                }
                return;
            }

            if (id > curId) {
                if (cur.left) {
                    sum += this.subTreeSum(cur.left, propertyName);
                }
                sum += needSum;
                if (cur.right) {
                    _traverse(cur.right);
                } else {
                    return;
                }
            }

            if (id < curId) {
                if (cur.left) {
                    _traverse(cur.left);
                } else {
                    return;
                }
            }
        }

        this._root && _traverse(this._root);
        return sum;
    }

    subTreeAdd(subTreeRoot: BSTNode<T>, delta: number, propertyName ?: BinaryTreeNodePropertyName): boolean {
        if (propertyName === undefined) {
            propertyName = 'id';
        }

        const _traverse = (cur: BSTNode<T>) => {
            switch (propertyName) {
                case 'id':
                    cur.id += delta;
                    break;
                case 'count':
                    cur.count += delta;
                    this._autoAllLesserSum && this.allGreaterNodesAdd(cur, delta, 'allLesserSum');
                    break;
                case 'allLesserSum':
                    cur.allLesserSum += delta;
                    break;
                default:
                    cur.id += delta;
                    break;
            }
            if (!cur.left && !cur.right) return;
            cur.left && _traverse(cur.left);
            cur.right && _traverse(cur.right);
        }

        if (subTreeRoot) {
            _traverse(subTreeRoot);
            return true;
        }
        return false
    }

    allGreaterNodesAdd(node: BSTNode<T>, delta: number, propertyName ?: BinaryTreeNodePropertyName): boolean {
        if (propertyName === undefined) {
            propertyName = 'id';
        }

        const _traverse = (cur: BSTNode<T>) => {
            if (cur.id > node.id) {
                switch (propertyName) {
                    case 'id':
                        cur.id += delta;
                        break;
                    case 'count':
                        cur.count += delta;
                        this._autoAllLesserSum && this.allGreaterNodesAdd(cur, delta, 'allLesserSum');
                        break;
                    case 'allLesserSum':
                        cur.allLesserSum += delta;
                        break;
                    default:
                        cur.id += delta;
                        break;
                }
            }

            if (!cur.left && !cur.right) return;
            (cur.left && cur.id > node.id) && _traverse(cur.left);
            cur.right && _traverse(cur.right);
        }

        if (this._root) {
            _traverse(this._root);
            return true;
        }
        return false
    }


    balance(): boolean {
        const sorted = this.DFS('in', 'node');

        this.clear();
        const buildBalanceBST = (l: number, r: number) => {
            if (l > r) return;
            const m = Math.floor(l + (r - l) / 2);
            const midNode = sorted[Math.floor(l + (r - l) / 2)];
            // this.insert(midNode.id, midNode.val, midNode.count);
            this.insert(midNode.id, midNode.val, midNode.count);
            buildBalanceBST(l, m - 1);
            buildBalanceBST(m + 1, r);
        }

        if (sorted.length > 0) {
            buildBalanceBST(0, sorted.length - 1);
            return true;
        } else {
            return false;
        }
    }

    isAVLBalanced(): boolean {
        let balanced = true;
        const _height = (cur: BSTNode<T> | null): number => {
            if (!cur) return 0;
            let leftHeight = _height(cur.left);
            let rightHeight = _height(cur.right);
            if (Math.abs(leftHeight - rightHeight) > 1) {
                balanced = false;
                return Infinity;
            }
            return Math.max(leftHeight, rightHeight) + 1;
        }

        _height(this._root);
        return balanced;
    }
    // --- end additional functions
}
