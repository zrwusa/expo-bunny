type PropertyType = 'id' | 'val' | 'count' | 'allLesserSum';
type NodeOrPropertyType = 'node' | PropertyType;

// Node for class for BinaryTree
export class BinarySearchTreeNode<T> {
    private _id: number;
    public get id(): number {
        return this._id;
    }

    public set id(v: number) {
        this._id = v;
    }

    private _val: T | null;
    public get val(): T | null {
        return this._val;
    }

    public set val(v: T | null) {
        this._val = v;
    }

    private _left: BinarySearchTreeNode<T> | null;
    public get left(): BinarySearchTreeNode<T> | null {
        return this._left;
    }

    public set left(v: BinarySearchTreeNode<T> | null) {
        this._left = v;
    }

    private _right: BinarySearchTreeNode<T> | null;
    public get right(): BinarySearchTreeNode<T> | null {
        return this._right;
    }

    public set right(v: BinarySearchTreeNode<T> | null) {
        this._right = v;
    }

    private _count: number;
    public get count(): number {
        return this._count;
    }

    public set count(v: number) {
        this._count = v;
    }

    private _allLesserSum: number;
    public get allLesserSum(): number {
        return this._allLesserSum;
    }

    public set allLesserSum(v: number) {
        this._allLesserSum = v;
    }

    private _parent: BinarySearchTreeNode<T> | null;
    public get parent(): BinarySearchTreeNode<T> | null {
        return this._parent;
    }

    public set parent(v: BinarySearchTreeNode<T> | null) {
        this._parent = v;
    }

    private _isLeftChild: boolean | null;
    public get isLeftChild(): boolean | null {
        return this._isLeftChild;
    }

    public set isLeftChild(v: boolean | null) {
        this._isLeftChild = v;
    }

    constructor(id: number, val?: T) {
        this._id = id;
        this._val = val || null;
        this._left = null;
        this._right = null;
        this._count = 0;
        this._allLesserSum = 0;
        this._parent = null;
        this._isLeftChild = null;
    }
}

export class BinarySearchTree<T> {
    private _root: BinarySearchTreeNode<T> | null;
    public get root(): BinarySearchTreeNode<T> | null {
        return this._root;
    }

    public set root(v: BinarySearchTreeNode<T> | null) {
        this._root = v;
    }

    private readonly _autoAllLesserSum: boolean = false;

    constructor(root?: BinarySearchTreeNode<T> | number, val?: T, autoPrefixSum?: boolean) {
        if (!root) {
            this._root = null;
        }
        if (autoPrefixSum) {
            this._autoAllLesserSum = true;
        }
        if (root instanceof BinarySearchTreeNode) {
            root.count = 1;
            if (val !== undefined) root.val = val;
            this._root = root;
        } else {
            const nodeRoot = root ? new BinarySearchTreeNode<T>(root, val) : null;
            if (nodeRoot) nodeRoot.count = 1;
            this._root = nodeRoot;
        }
    }

    /**
     * Adds a new BinarySearchTreeNode to BST.
     * @param id Id of the Tree node to be added to BST
     * @param val Value
     */
    insertNode(id: number, val?: T): BinarySearchTreeNode<T> | null {
        const newNode = new BinarySearchTreeNode<T>(id, val);
        const newValue = newNode.id;
        if (this._root === null) {
            this._root = newNode;
            return this._root;
        } else {
            let cur = this._root;
            let traversing = true;
            while (traversing) {
                if (cur.id === newValue) {
                    this._autoAllLesserSum && cur.right && this.subTreeAdd(cur.right, 1, 'allLesserSum');
                    cur.count++;
                    //Duplicates are not accepted.
                    traversing = false;
                    return cur;
                } else if (newValue < cur.id) {
                    this._autoAllLesserSum && cur.right && this.subTreeAdd(cur.right, 1, 'allLesserSum');
                    this._autoAllLesserSum && cur.allLesserSum++;
                    // Traverse left of the node
                    if (cur.left === null) {
                        if (this._autoAllLesserSum) newNode.allLesserSum = cur.allLesserSum - 1;
                        newNode.count++;
                        newNode.parent = cur;
                        newNode.isLeftChild = true;
                        //Add to the left of the current node
                        cur.left = newNode;
                        traversing = false;
                        return cur.left;
                    } else {
                        //Traverse the left of the current node
                        cur = cur.left;
                    }
                } else if (newValue > cur.id) {
                    // Traverse right of the node
                    if (cur.right === null) {
                        if (this._autoAllLesserSum) newNode.allLesserSum = cur.allLesserSum + cur.count;
                        newNode.count++;
                        newNode.parent = cur;
                        newNode.isLeftChild = false;
                        //Add to the right of the current node
                        cur.right = newNode;
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

    deleteNode(key: number, isUpdateAllLeftSum?: boolean): BinarySearchTreeNode<T> | null {
        if (isUpdateAllLeftSum === undefined) {
            isUpdateAllLeftSum = true;
        }
        let cur: BinarySearchTreeNode<T> | null = this.getNode(key, 'id');
        if (!cur) return null;
        this._autoAllLesserSum && isUpdateAllLeftSum && this.allGreaterNodesAdd(cur, -cur.count, 'allLesserSum');
        if (!cur.left && !cur.right) {
            if (cur.parent) {
                if (cur.isLeftChild === true) {
                    cur.parent.left = null;
                    return null;
                } else if (cur.isLeftChild === false) {
                    cur.parent.right = null;
                    return null;
                }
            } else {
                this._root = null;
                return null;
            }
        } else if (cur.left && !cur.right) {
            if (cur.parent) {
                const _isLeftChild = cur.isLeftChild;
                if (_isLeftChild === true) {
                    cur.left.isLeftChild = _isLeftChild;
                    cur.left.parent = cur.parent;
                    cur.parent.left = cur.left;
                    return null;
                } else if (cur.isLeftChild === false) {
                    cur.left.isLeftChild = _isLeftChild;
                    cur.left.parent = cur.parent;
                    cur.parent.right = cur.left;
                    return null;
                }
            } else {
                cur.left.isLeftChild = null;
                cur.left.parent = null;
                this._root = cur.left;
                return null;
            }
        } else if (cur.right && !cur.left) {
            if (cur.parent) {
                const _isLeftChild = cur.isLeftChild;
                if (cur.isLeftChild === true) {
                    cur.right.isLeftChild = _isLeftChild;
                    cur.right.parent = cur.parent;
                    cur.parent.left = cur.right;
                    return null;
                } else if (cur.isLeftChild === false) {
                    cur.right.isLeftChild = _isLeftChild;
                    cur.right.parent = cur.parent;
                    cur.parent.right = cur.right;
                    return null;
                }
            } else {
                cur.right.isLeftChild = null;
                cur.right.parent = null;
                this._root = cur.right;
                return null;
            }
        } else if (cur.left && cur.right) {
            const minNode = this.getMinNode(cur.right);
            this.deleteNode(minNode!.id, false);
            if (cur.left) {
                minNode!.left = cur.left;
                cur.left.parent = minNode;
            }

            if (cur.right) {
                minNode!.right = cur.right;
                cur.right.parent = minNode;
            }

            if (cur.parent) {
                const _isLeftChild = cur.isLeftChild;
                if (cur.isLeftChild === true) {
                    minNode!.isLeftChild = _isLeftChild;
                    minNode!.parent = cur.parent;
                    cur.parent!.left = minNode;
                    return null;
                } else if (cur.isLeftChild === false) {
                    minNode!.isLeftChild = _isLeftChild;
                    minNode!.parent = cur.parent;
                    cur.parent!.right = minNode;
                    return null;
                }
            } else {
                minNode!.isLeftChild = null;
                minNode!.parent = null;
                this._root = minNode;
                return null;
            }

        }

        return null;
    }

    getMinNode(node?: BinarySearchTreeNode<T> | null): BinarySearchTreeNode<T> | null {
        if (!node) {
            node = this._root;
        }

        function _traverse(cur: BinarySearchTreeNode<T>): BinarySearchTreeNode<T> {
            if (!cur.left) return cur;
            return _traverse(cur.left);
        }

        return node ? _traverse(node) : null;
    }

    /**
     * Traverse the tree in Breath-First-Search pattern and returns th array of values in BFS order
     */
    BFS(nodeOrPropertyType ?: NodeOrPropertyType): Array<T | null> | BinarySearchTreeNode<T> [] | number[] {
        if (nodeOrPropertyType === undefined) {
            nodeOrPropertyType = 'id';
        }
        let visitedId: number[] = [],
            visitedVal: Array<T | null> = [],
            visitedNode: BinarySearchTreeNode<T>[] = [],
            visitedCount: number[] = [],
            visitedLeftSum: number[] = [];

        function pushByValueType(node: BinarySearchTreeNode<T>) {
            switch (nodeOrPropertyType) {
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

        let queue = new Array<BinarySearchTreeNode<T> | null>();
        queue.push(this.root);
        while (queue.length !== 0) {
            let cur = queue.shift();
            if (cur) {
                pushByValueType(cur);
                if (cur?.left !== null) queue.push(cur.left);
                if (cur?.right !== null) queue.push(cur.right);
            }
        }
        switch (nodeOrPropertyType) {
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

    /**
     * Traverse the tree in Depth-First-Search InOrder or PreOrder or PostOrder pattern and returns th
     * array of values in the same order
     */
    DFS(pattern ?: 'in' | 'pre' | 'post', nodeOrPropertyType ?: NodeOrPropertyType): Array<T | null> | BinarySearchTreeNode<T> [] | number[] {
        if (pattern === undefined) {
            pattern = 'in';
        }
        if (nodeOrPropertyType === undefined) {
            nodeOrPropertyType = 'id';
        }
        let visitedId: number[] = [],
            visitedVal: Array<T | null> = [],
            visitedNode: BinarySearchTreeNode<T>[] = [],
            visitedCount: number[] = [],
            visitedLeftSum: number[] = [];

        function pushByValueType(node: BinarySearchTreeNode<T>) {
            switch (nodeOrPropertyType) {
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

        function _traverse(node: BinarySearchTreeNode<T>) {
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
        switch (nodeOrPropertyType) {
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

    getNodes(nodeProperty: T | number, propertyType ?: PropertyType, onlyOne ?: boolean) {
        if (propertyType === undefined) {
            propertyType = 'id';
        }

        const result: BinarySearchTreeNode<T>[] = [];

        function _traverse(cur: BinarySearchTreeNode<T>) {
            switch (propertyType) {
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
            if (propertyType === 'id') {
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

    getNode(nodeProperty: T | number, propertyType ?: PropertyType) {
        if (propertyType === undefined) {
            propertyType = 'id';
        }
        return this.getNodes(nodeProperty, propertyType, true)[0]
    }

    subTreeSum(subTreeRoot: BinarySearchTreeNode<T>, propertyType ?: PropertyType): number {
        if (propertyType === undefined) {
            propertyType = 'id'
        }
        let sum = 0;

        function _traverse(cur: BinarySearchTreeNode<T>): void {
            let needSum: number;
            switch (propertyType) {
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

    lesserSum(id: number, propertyType ?: PropertyType): number {
        if (propertyType === undefined) {
            propertyType = 'id'
        }
        let sum = 0;
        const _traverse = (cur: BinarySearchTreeNode<T>): void => {
            let needSum: number;
            switch (propertyType) {
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
                    sum += this.subTreeSum(cur.right, propertyType);
                }
                return;
            }

            if (id > curId) {
                if (cur.left) {
                    sum += this.subTreeSum(cur.left, propertyType);
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

    subTreeAdd(subTreeRoot: BinarySearchTreeNode<T>, delta: number, propertyType ?: PropertyType): boolean {
        if (propertyType === undefined) {
            propertyType = 'id';
        }

        const _traverse = (cur: BinarySearchTreeNode<T>) => {
            switch (propertyType) {
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

    allGreaterNodesAdd(node: BinarySearchTreeNode<T>, delta: number, propertyType ?: PropertyType): boolean {
        if (propertyType === undefined) {
            propertyType = 'id';
        }

        const _traverse = (cur: BinarySearchTreeNode<T>) => {
            if (cur.id > node.id) {
                switch (propertyType) {
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

    // TODO need to be optimized, it is O(n)
    getMaxDepth = (node?: BinarySearchTreeNode<T>) => {
        const beginRoot = node || this._root;
        if (!beginRoot) {
            return 0;
        }
        let maxDepth = 1;
        const bfs = (node: BinarySearchTreeNode<T>, level: number) => {
            if (level > maxDepth) {
                maxDepth = level;
            }
            const children = [];
            node.left && children.push(node.left);
            node.right && children.push(node.right);
            if (children.length < 1) return;
            for (let i = 0, len = children.length; i < len; i++) {
                bfs(children[i], level + 1);
                // TODO not correct
                // setTimeout(bfs, 0, children[i], level + 1);
            }
        }
        bfs(beginRoot, 1);
        return maxDepth;
    }
}
