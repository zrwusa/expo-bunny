export type PropertyName = 'id' | 'val' | 'count' | 'allLesserSum';
export type NodeOrPropertyName = 'node' | PropertyName;
export type DFSOrderPattern = 'in' | 'pre' | 'post';
export type BinaryTreeNodeId = number;

class BinaryTreeNode<V, N> {
    protected _id: BinaryTreeNodeId;
    public get id(): BinaryTreeNodeId {
        return this._id;
    }

    public set id(v: BinaryTreeNodeId) {
        this._id = v;
    }

    protected _val: V | null = null;
    public get val(): V | null {
        return this._val;
    }

    public set val(v: V | null) {
        this._val = v;
    }

    protected _left: N | null = null;
    public get left(): N | null {
        return this._left;
    }

    public set left(v: N | null) {
        this._left = v;
    }

    protected _right: N | null = null;
    public get right(): N | null {
        return this._right;
    }

    public set right(v: N | null) {
        this._right = v;
    }

    protected _parent: N | null = null;
    public get parent(): N | null {
        return this._parent;
    }

    public set parent(v: N | null) {
        this._parent = v;
    }

    protected _isLeftChild: boolean | null = null;
    public get isLeftChild(): boolean | null {
        return this._isLeftChild;
    }

    public set isLeftChild(v: boolean | null) {
        this._isLeftChild = v;
    }

    protected _count: number = 1;
    public get count(): number {
        return this._count;
    }

    public set count(v: number) {
        this._count = v;
    }

    protected _height: number = 0;

    public get height(): number {
        return this._height;
    }

    public set height(v: number) {
        this._height = v;
    }

    protected _allLesserSum: number = 0;
    public get allLesserSum(): number {
        return this._allLesserSum;
    }

    public set allLesserSum(v: number) {
        this._allLesserSum = v;
    }

    constructor(id: BinaryTreeNodeId, val?: V | null, count?: number) {
        if (val === undefined) {
            val = null;
        }
        if (count === undefined) {
            count = 1;
        }
        this._id = id;
        this._val = val;
        this._count = count;
    }
}

export abstract class AbstractBSTNode<V, N extends AbstractBSTNode<V, N>> extends BinaryTreeNode<V, N> {
    constructor(id: BinaryTreeNodeId, val?: V | null, count?: number) {
        super(id, val, count);
    }
}

interface I_BinaryTree<T, N extends BinaryTreeNode<T, N>> {
    clear(): void;

    isEmpty(): boolean;

    getDepth(node: N): number;

    getHeight(beginRoot?: N): number;

    getNodes(nodeProperty: T | BinaryTreeNodeId, propertyName ?: PropertyName, onlyOne ?: boolean): N[];

    getNode(nodeProperty: T | BinaryTreeNodeId, propertyName ?: PropertyName): N | null;

    getPathToRoot(node: N): N[];

    BFS(): BinaryTreeNodeId[];

    BFS(nodeOrPropertyName: 'id'): BinaryTreeNodeId[];

    BFS(nodeOrPropertyName: 'val'): (T | null)[];

    BFS(nodeOrPropertyName: 'node'): N[];

    BFS(nodeOrPropertyName: 'count'): number[];

    BFS(nodeOrPropertyName: 'allLesserSum'): number[];

    BFS(nodeOrPropertyName ?: NodeOrPropertyName): Array<T | null> | N [] | number[] | BinaryTreeNodeId[];

    DFS(): BinaryTreeNodeId[];

    DFS(pattern?: DFSOrderPattern, nodeOrPropertyName?: 'id'): BinaryTreeNodeId[];

    DFS(pattern?: DFSOrderPattern, nodeOrPropertyName?: 'val'): (T | null)[];

    DFS(pattern?: DFSOrderPattern, nodeOrPropertyName?: 'node'): N[];

    DFS(pattern?: DFSOrderPattern, nodeOrPropertyName?: 'count'): number[];

    DFS(pattern?: DFSOrderPattern, nodeOrPropertyName?: 'allLesserSum'): number[];

    DFS(pattern ?: 'in' | 'pre' | 'post', nodeOrPropertyName ?: NodeOrPropertyName): Array<T | null> | N [] | number[] | BinaryTreeNodeId[];

    subTreeSum(subTreeRoot: N, propertyName ?: PropertyName): number;
}

abstract class BinaryTree<T, N extends BinaryTreeNode<T, N>> implements I_BinaryTree<T, N> {
    protected _root: N | null = null;
    public get root(): N | null {
        return this._root;
    }

    public set root(v: N | null) {
        this._root = v;
    }

    protected _size: number = 0;
    public get size(): number {
        return this.size;
    }

    public set size(v: number) {
        this._size = v;
    }

    constructor(id?: BinaryTreeNodeId, val?: T | null, count?: number) {
        if (id !== undefined) {
            this._root = this.createNode(id, val, count);
            this._size = 1;
        }
    }

    abstract createNode(id: BinaryTreeNodeId, val?: T | null, count?: number): N;

    protected _replaceWithASubTree(node1: N, node2: N | null): N | null {
        if (node1 && !node2) {
            if (node1.parent) {
                if (node1.isLeftChild === true) {
                    node1.parent.left = null;
                    return node1;
                } else if (node1.isLeftChild === false) {
                    node1.parent.right = null;
                    return node1;
                } else {
                    return null;
                }
            } else {
                this._root = null
                return this._root;
            }
        } else if (node1 && node2) {
            if (node1.parent) {
                const _isLeftChild = node1.isLeftChild;
                if (_isLeftChild === true) {
                    node2.isLeftChild = _isLeftChild;
                    node2.parent = node1.parent;
                    node1.parent.left = node2;
                    return node2;
                } else if (_isLeftChild === false) {
                    node2.isLeftChild = _isLeftChild;
                    node2.parent = node1.parent;
                    node1.parent.right = node2;
                    return node2;
                } else {
                    return null;
                }
            } else {
                node2.isLeftChild = null;
                node2.parent = null;
                this._root = node2;
                return this._root;
            }
        } else {
            return null
        }
    }

    protected _swap(node1: N, node2: N): N | null {
        if (node1.left) {
            node2.left = node1.left;
            node1.left.parent = node2;
        }

        if (node1.right) {
            node2.right = node1.right;
            node1.right.parent = node2;
        }
        return this._replaceWithASubTree(node1, node2);
    }

    clear() {
        this._root = null;
        this._size = 0;
    }

    isEmpty(): boolean {
        return this._size === 0;
    }

    getDepth(node: N): number {
        let depth = 0;
        while (node.parent !== null) {
            depth++;
            node = node.parent;
        }
        return depth;
    }

    getHeight(beginRoot?: N): number {
        const _beginRoot = beginRoot || this._root;
        const _getMaxHeight = (cur: N | null): number => {
            if (!cur) return 0;
            if (!cur.left && !cur.right) return 0;
            let leftHeight = _getMaxHeight(cur.left);
            let rightHeight = _getMaxHeight(cur.right);
            return Math.max(leftHeight, rightHeight) + 1;
        }

        if (_beginRoot) {
            return _getMaxHeight(_beginRoot);
        } else {
            return 0;
        }
    }

    getNodes(nodeProperty: T | BinaryTreeNodeId, propertyName ?: PropertyName, onlyOne ?: boolean) {
        if (propertyName === undefined) {
            propertyName = 'id';
        }

        const result: N[] = [];

        function _traverse(cur: N) {
            switch (propertyName) {
                case 'id':
                    if (cur.id === nodeProperty) {
                        result.push(cur);
                        if (onlyOne) return;
                    }
                    break;
                case 'count':
                    if (cur.count === nodeProperty) {
                        result.push(cur);
                        if (onlyOne) return;
                    }
                    break;
                case 'val':
                    if (cur.val === nodeProperty) {
                        result.push(cur);
                        if (onlyOne) return;
                    }
                    break;
                case 'allLesserSum':
                    if (cur.allLesserSum === nodeProperty) {
                        result.push(cur);
                        if (onlyOne) return;
                    }
                    break;
                default:
                    if (cur.id === nodeProperty) {
                        result.push(cur);
                        if (onlyOne) return;
                    }
                    break;
            }

            if (!cur.left && !cur.right) return null;
            if (propertyName === 'id') {
                if (nodeProperty < cur.id) {
                    cur.left ? _traverse(cur.left) : null;
                }
                if (nodeProperty > cur.id) {
                    cur.right ? _traverse(cur.right) : null;
                }
            } else {
                cur.left ? _traverse(cur.left) : null;
                cur.right ? _traverse(cur.right) : null;
            }

        }

        this._root && _traverse(this._root);
        return result;
    }

    getNode(nodeProperty: T | BinaryTreeNodeId, propertyName ?: PropertyName): N | null {
        if (propertyName === undefined) {
            propertyName = 'id';
        }
        const node = this.getNodes(nodeProperty, propertyName, true)[0]
        if (node) {
            return node;
        } else {
            return null;
        }

    }

    getPathToRoot(node: N): N[] {
        const result: N[] = [];
        while (node.parent !== null) {
            result.unshift(node);
            node = node.parent;
        }
        result.unshift(node);
        return result;
    }

    BFS(): BinaryTreeNodeId[];
    BFS(nodeOrPropertyName: 'id'): BinaryTreeNodeId[];
    BFS(nodeOrPropertyName: 'val'): (T | null)[];
    BFS(nodeOrPropertyName: 'node'): N[];
    BFS(nodeOrPropertyName: 'count'): number[];
    BFS(nodeOrPropertyName: 'allLesserSum'): number[];
    BFS(nodeOrPropertyName ?: NodeOrPropertyName): Array<T | null> | N [] | number[] | BinaryTreeNodeId[] {
        if (nodeOrPropertyName === undefined) {
            nodeOrPropertyName = 'id';
        }
        let visitedId: BinaryTreeNodeId[] = [],
            visitedVal: Array<T | null> = [],
            visitedNode: N[] = [],
            visitedCount: number[] = [],
            visitedLeftSum: number[] = [];

        function pushByValueType(node: N) {
            switch (nodeOrPropertyName) {
                case 'id':
                    visitedId.push(node.id);
                    break;
                case 'val':
                    visitedVal.push(node.val);
                    break;
                case 'node':
                    visitedNode.push(node);
                    break;
                case 'count':
                    visitedCount.push(node.count);
                    break;
                case 'allLesserSum':
                    visitedLeftSum.push(node.allLesserSum);
                    break;
                default:
                    visitedId.push(node.id);
                    break;
            }
        }

        let queue = new Array<N | null>();
        queue.push(this.root);
        while (queue.length !== 0) {
            let cur = queue.shift();
            if (cur) {
                pushByValueType(cur);
                if (cur?.left !== null) queue.push(cur.left);
                if (cur?.right !== null) queue.push(cur.right);
            }
        }
        switch (nodeOrPropertyName) {
            case 'id':
                return visitedId;
            case 'val':
                return visitedVal;
            case 'node':
                return visitedNode;
            case 'count':
                return visitedCount;
            case 'allLesserSum':
                return visitedLeftSum;
            default:
                return visitedId;
        }
    }

    DFS(): BinaryTreeNodeId[];
    DFS(pattern?: DFSOrderPattern, nodeOrPropertyName?: 'id'): BinaryTreeNodeId[];
    DFS(pattern?: DFSOrderPattern, nodeOrPropertyName?: 'val'): (T | null)[];
    DFS(pattern?: DFSOrderPattern, nodeOrPropertyName?: 'node'): N[];
    DFS(pattern?: DFSOrderPattern, nodeOrPropertyName?: 'count'): number[];
    DFS(pattern?: DFSOrderPattern, nodeOrPropertyName?: 'allLesserSum'): number[];
    DFS(pattern ?: 'in' | 'pre' | 'post', nodeOrPropertyName ?: NodeOrPropertyName): Array<T | null> | N [] | number[] | BinaryTreeNodeId[] {
        if (pattern === undefined) {
            pattern = 'in';
        }
        if (nodeOrPropertyName === undefined) {
            nodeOrPropertyName = 'id';
        }
        let visitedId: BinaryTreeNodeId[] = [],
            visitedVal: Array<T | null> = [],
            visitedNode: N[] = [],
            visitedCount: number[] = [],
            visitedLeftSum: number[] = [];

        function pushByValueType(node: N) {
            switch (nodeOrPropertyName) {
                case 'id':
                    visitedId.push(node.id);
                    break;
                case 'val':
                    visitedVal.push(node.val);
                    break;
                case 'node':
                    visitedNode.push(node);
                    break;
                case 'count':
                    visitedCount.push(node.count);
                    break;
                case 'allLesserSum':
                    visitedLeftSum.push(node.allLesserSum);
                    break;
                default:
                    visitedId.push(node.id);
                    break;
            }
        }

        function _traverse(node: N) {
            switch (pattern) {
                case 'in':
                    if (node.left) _traverse(node.left);
                    pushByValueType(node);
                    if (node.right) _traverse(node.right);
                    break;
                case 'pre':
                    pushByValueType(node);
                    if (node.left) _traverse(node.left);
                    if (node.right) _traverse(node.right);
                    break;
                case 'post':
                    if (node.left) _traverse(node.left);
                    if (node.right) _traverse(node.right);
                    pushByValueType(node);
                    break;
            }

        }

        this._root && _traverse(this._root);
        switch (nodeOrPropertyName) {
            case 'id':
                return visitedId;
            case 'val':
                return visitedVal;
            case 'node':
                return visitedNode;
            case 'count':
                return visitedCount;
            case 'allLesserSum':
                return visitedLeftSum;
            default:
                return visitedId;
        }
    }

    subTreeSum(subTreeRoot: N, propertyName ?: PropertyName): number {
        if (propertyName === undefined) {
            propertyName = 'id'
        }
        let sum = 0;

        function _traverse(cur: N): void {
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
            sum += needSum;
            if (!cur.left && !cur.right) return;
            cur.left && _traverse(cur.left);
            cur.right && _traverse(cur.right);
        }

        subTreeRoot && _traverse(subTreeRoot);

        return sum;
    }
}

export class BSTNode<T> extends AbstractBSTNode<T, BSTNode<T>> {

}

export interface I_AbstractBST<T, N extends AbstractBSTNode<T, N>> {
    // --- start basic functions
    isValid(): boolean;

    insert(id: BinaryTreeNodeId, val?: T | null, count?: number): N | null;

    contains(node: N): boolean;

    remove(id: BinaryTreeNodeId, isUpdateAllLeftSum?: boolean): { deleted: N | null, needBalanced: N | null };

    // --- end basic functions

    // --- start additional functions
    getMinNode(node?: N | null): N | null;

    getMaxNode(node?: N | null): N | null;

    lesserSum(id: BinaryTreeNodeId, propertyName ?: PropertyName): number;

    subTreeAdd(subTreeRoot: N, delta: number, propertyName ?: PropertyName): boolean;

    allGreaterNodesAdd(node: N, delta: number, propertyName ?: PropertyName): boolean;

    balance(): boolean;

    isAVLBalanced(): boolean;

    // --- end additional functions
}

export abstract class AbstractBST<T, N extends AbstractBSTNode<T, N>> extends BinaryTree<T, N> implements I_AbstractBST<T, N> {

    protected readonly _autoAllLesserSum: boolean = false;

    constructor(autoPrefixSum?: boolean, id?: BinaryTreeNodeId, val?: T | null, count?: number) {
        super(id, val, count);
        if (autoPrefixSum) {
            this._autoAllLesserSum = true;
        }
    }

    // abstract insert(id: BinaryTreeNodeId, val?: T | null, count?: number): N | null;
    //
    // abstract remove(id: BinaryTreeNodeId, isUpdateAllLeftSum?: boolean): N | null;

    // --- start basic functions
    isValid(): boolean {
        if (!this._root) return true;

        function dfs(cur: N | null, min: BinaryTreeNodeId, max: BinaryTreeNodeId): boolean {
            if (!cur) return true;
            if ((cur.id <= min) || (cur.id >= max)) return false;
            return dfs(cur.left, min, cur.id) && dfs(cur.right, cur.id, max);
        }

        return dfs(this._root!, Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
    }

    contains(node: N): boolean {
        return false;
    }

    insert(id: BinaryTreeNodeId, val?: T | null, count?: number): N | null {
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

    remove(id: BinaryTreeNodeId, isUpdateAllLeftSum?: boolean): { deleted: N | null, needBalanced: N | null } {

        if (isUpdateAllLeftSum === undefined) {
            isUpdateAllLeftSum = true;
        }

        if (this._root === null) return {deleted: null, needBalanced: null}; // Element is not in the tree

        // Locate the node to be deleted and also locate its parent node
        let parent: N | null = null;
        let current: N | null = this._root;
        let needBalanced: N | null = null;
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

    // --- end basic functions

    // --- start additional functions
    getMinNode(node?: N | null): N | null {
        if (!node) {
            node = this._root;
        }

        function _traverse(cur: N): N {
            if (!cur.left) return cur;
            return _traverse(cur.left);
        }

        return node ? _traverse(node) : null;
    }

    getMaxNode(node?: N | null): N | null {
        if (!node) {
            node = this._root;
        }

        function _traverse(cur: N): N {
            if (!cur.right) return cur;
            return _traverse(cur.right);
        }

        return node ? _traverse(node) : null;
    }

    lesserSum(id: BinaryTreeNodeId, propertyName ?: PropertyName): number {
        if (propertyName === undefined) {
            propertyName = 'id'
        }
        let sum = 0;
        const _traverse = (cur: N): void => {
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

    subTreeAdd(subTreeRoot: N, delta: number, propertyName ?: PropertyName): boolean {
        if (propertyName === undefined) {
            propertyName = 'id';
        }

        const _traverse = (cur: N) => {
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

    allGreaterNodesAdd(node: N, delta: number, propertyName ?: PropertyName): boolean {
        if (propertyName === undefined) {
            propertyName = 'id';
        }

        const _traverse = (cur: N) => {
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
        const _height = (cur: N | null): number => {
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

export class BST<T> extends AbstractBST<T, BSTNode<T>> {
    createNode(id: BinaryTreeNodeId, val?: T | null, count?: number): BSTNode<T> {
        return new BSTNode<T>(id, val, count);
    }
}
