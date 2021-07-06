type ResultType = 'node' | 'value' | 'count' | 'leftSum';
type ResultTypeOmitNode = 'value' | 'count' | 'leftSum';

// Node for class for BinaryTree
export class BinarySearchTreeNode<T> {
    private _value: T;
    public get value(): T {
        return this._value;
    }

    public set value(v: T) {
        this._value = v;
    }

    private _left: BinarySearchTreeNode<T> | undefined;
    public get left(): BinarySearchTreeNode<T> | undefined {
        return this._left;
    }

    public set left(v: BinarySearchTreeNode<T> | undefined) {
        this._left = v;
    }

    private _right: BinarySearchTreeNode<T> | undefined;
    public get right(): BinarySearchTreeNode<T> | undefined {
        return this._right;
    }

    public set right(v: BinarySearchTreeNode<T> | undefined) {
        this._right = v;
    }

    private _count: number;
    public get count(): number {
        return this._count;
    }

    public set count(v: number) {
        this._count = v;
    }

    private _leftSum: number;
    public get leftSum(): number {
        return this._leftSum;
    }

    public set leftSum(v: number) {
        this._leftSum = v;
    }

    private _parent: BinarySearchTreeNode<T> | undefined;
    public get parent(): BinarySearchTreeNode<T> | undefined {
        return this._parent;
    }

    public set parent(v: BinarySearchTreeNode<T> | undefined) {
        this._parent = v;
    }

    private _isLeftChild: boolean | undefined;
    public get isLeftChild(): boolean | undefined {
        return this._isLeftChild;
    }

    public set isLeftChild(v: boolean | undefined) {
        this._isLeftChild = v;
    }

    constructor(value: T) {
        this._value = value;
        this._left = undefined;
        this._right = undefined;
        this._count = 0;
        this._leftSum = 0;
        this._parent = undefined;
        this._isLeftChild = undefined;
    }
}

export class BinarySearchTree<T> {
    private _root: BinarySearchTreeNode<T> | undefined;
    public get root(): BinarySearchTreeNode<T> | undefined {
        return this._root;
    }

    public set root(v: BinarySearchTreeNode<T> | undefined) {
        this._root = v;
    }

    private readonly _autoPrefixSum: boolean = false;

    constructor(root?: BinarySearchTreeNode<T> | T, autoPrefixSum?: boolean) {
        if (!root) {
            this._root = undefined;
        }
        if (autoPrefixSum) {
            this._autoPrefixSum = true;
        }
        if (root instanceof BinarySearchTreeNode) {
            root.count = 1;
            this._root = root;
        } else {
            const nodeRoot = new BinarySearchTreeNode<T>(root!);
            nodeRoot.count = 1;
            this._root = nodeRoot;
        }
    }

    /**
     * Adds a new BinarySearchTreeNode to BST.
     * @param value Value of the Tree node to be added to BST
     */
    insert(value: T): BinarySearchTreeNode<T> | undefined {
        const newNode = new BinarySearchTreeNode<T>(value);
        const newValue = newNode.value;
        if (this._root === undefined) {
            this._root = newNode;
            return this._root;
        } else {
            let cur = this._root;
            let traversing = true;
            while (traversing) {
                if (cur.value === newValue) {
                    this._autoPrefixSum && this.allRightNodesAdd(cur, 1, 'leftSum');
                    cur.count++;
                    //Duplicates are not accepted.
                    traversing = false;
                    return cur;
                } else if (newValue < cur.value) {
                    this._autoPrefixSum && this.allRightNodesAdd(cur, 1, 'leftSum');
                    this._autoPrefixSum && cur.leftSum++;
                    // Traverse left of the node
                    if (cur.left === undefined) {
                        if (this._autoPrefixSum) newNode.leftSum = cur.leftSum - 1;
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
                } else if (newValue > cur.value) {
                    // Traverse right of the node
                    if (cur.right === undefined) {
                        if (this._autoPrefixSum) newNode.leftSum = cur.leftSum + cur.count;
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
        return undefined
    }

    deleteNode(root: BinarySearchTreeNode<T> | null, key: number): BinarySearchTreeNode<T> | null {
        let cur: BinarySearchTreeNode<T> | undefined = this.getNode(key, 'value', true) as BinarySearchTreeNode<T>;
        if (!cur) return null;
        if (!cur.left && !cur.right) {
            if (cur.parent) {
                if (cur.isLeftChild === true) {
                    cur.parent.left = undefined;
                    return null;
                } else if (cur.isLeftChild === false) {
                    cur.parent.right = undefined;
                    return null;
                } else {
                    this._root = undefined;
                    return null;
                }
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
                cur.left.isLeftChild = undefined;
                cur.left.parent = undefined;
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
                cur.right.isLeftChild = undefined;
                cur.right.parent = undefined;
                this._root = cur.right;
                return null;
            }
        } else if (cur.left && cur.right) {
            const minNode = this.getMinNode(cur.right);
            this.deleteNode(cur, minNode!.value);
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
                minNode!.isLeftChild = undefined;
                minNode!.parent = undefined;
                this.root = minNode;
                return null;
            }

        }

        return null;
    }

    getMinNode(node ?: BinarySearchTreeNode<T>): BinarySearchTreeNode<T> | undefined {
        if (!node) {
            node = this._root;
        }

        function _traverse(cur: BinarySearchTreeNode<T>): BinarySearchTreeNode<T> {
            if (!cur.left) return cur;
            return _traverse(cur.left);
        }

        return node ? _traverse(node) : undefined;
    }

    /**
     * Traverse the tree in Breath-First-Search pattern and returns th array of values in BFS order
     */
    BFS(resultType ?: ResultType): T[] | BinarySearchTreeNode<T> [] | number[] {
        if (resultType === undefined) {
            resultType = 'value';
        }
        let visited;
        switch (resultType) {
            case 'value':
                visited = new Array<T>();
                break;
            case 'node':
                visited = new Array<BinarySearchTreeNode<T>>();
                break;
            case 'count':
                visited = new Array<number>();
                break;
            case 'leftSum':
                visited = new Array<number>();
                break;
        }

        function pushByValueType(node: BinarySearchTreeNode<T>) {
            switch (resultType) {
                case 'value':
                    visited.push(node.value);
                    break;
                case 'node':
                    visited.push(node);
                    break;
                case 'count':
                    visited.push(node.count);
                    break;
                case 'leftSum':
                    visited.push(node.leftSum);
                    break;
            }
        }

        let queue = new Array<BinarySearchTreeNode<T> | undefined>();
        queue.push(this.root);
        while (queue.length !== 0) {
            let current = queue.shift();
            current && pushByValueType(current);
            if (current?.left !== undefined) queue.push(current.left);
            if (current?.right !== undefined) queue.push(current.right);
        }
        return visited;
    }

    /**
     * Traverse the tree in Depth-First-Search InOrder or PreOrder or PostOrder pattern and returns th
     * array of values in the same order
     */
    DFS(pattern ?: 'in' | 'pre' | 'post', resultType ?: ResultType): T[] | BinarySearchTreeNode<T> [] | number[] {
        if (pattern === undefined) {
            pattern = 'in';
        }
        if (resultType === undefined) {
            resultType = 'value';
        }
        let visited;
        switch (resultType) {
            case 'value':
                visited = new Array<T>();
                break;
            case 'node':
                visited = new Array<BinarySearchTreeNode<T>>();
                break;
            case 'count':
                visited = new Array<number>();
                break;
            case 'leftSum':
                visited = new Array<number>();
                break;
        }

        function pushByValueType(node: BinarySearchTreeNode<T>) {
            switch (resultType) {
                case 'value':
                    visited.push(node.value);
                    break;
                case 'node':
                    visited.push(node);
                    break;
                case 'count':
                    visited.push(node.count);
                    break;
                case 'leftSum':
                    visited.push(node.leftSum);
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
        return visited;
    }

    getNode(value: T | number, valueType ?: ResultTypeOmitNode, onlyOne ?: boolean): BinarySearchTreeNode<T> | BinarySearchTreeNode<T> [] | undefined {
        if (valueType === undefined) {
            valueType = 'value';
        }

        if (onlyOne === undefined) {
            onlyOne = true;
        }

        const result: BinarySearchTreeNode<T>[] = [];

        function _traverse(cur: BinarySearchTreeNode<T>) {
            switch (valueType) {
                case 'value':
                    if (cur.value === value) {
                        result.push(cur);
                        if (onlyOne) return;
                    }
                    break;
                case 'count':
                    if (cur.count === value) {
                        result.push(cur);
                        if (onlyOne) return;
                    }
                    break;
                case 'leftSum':
                    if (cur.leftSum === value) {
                        result.push(cur);
                        if (onlyOne) return;
                    }
                    break;
            }

            if (!cur.left && !cur.right) return undefined;
            if (value < cur.value) {
                cur.left ? _traverse(cur.left) : undefined;
            }
            if (value > cur.value) {
                cur.right ? _traverse(cur.right) : undefined;
            }
        }

        this._root && _traverse(this._root);
        return onlyOne ? result[0] : result;
    }

    sumLeftOrRight(node: BinarySearchTreeNode<T>, leftOrRight ?: 'left' | 'right', resultType ?: ResultTypeOmitNode): number {
        if (leftOrRight === undefined) {
            leftOrRight = 'left';
        }
        if (resultType === undefined) {
            resultType = 'value'
        }
        let sum = 0;

        function _traverse(cur: BinarySearchTreeNode<T>): void {
            let needSum: number;
            switch (resultType) {
                case 'value':
                    needSum = cur.value as unknown as number;
                    break;
                case 'count':
                    needSum = cur.count;
                    break;
                case 'leftSum':
                    needSum = cur.leftSum;
                    break;
                default:
                    needSum = cur.value as unknown as number;
                    break;
            }
            sum += needSum;
            if (!cur.left && !cur.right) return
            cur.left && _traverse(cur.left);
            cur.right && _traverse(cur.right);
        }

        if (node) {
            switch (leftOrRight) {
                case 'left':
                    node.left && _traverse(node.left);
                    break;
                case 'right':
                    node.right && _traverse(node.right);
                    break;
            }
        }

        return sum;
    }

    prefixSum(target: number, resultType ?: ResultTypeOmitNode): number {
        if (resultType === undefined) {
            resultType = 'value'
        }
        let sum = 0;
        const _traverse = (cur: BinarySearchTreeNode<T>): void => {
            let needSum: number;
            switch (resultType) {
                case 'value':
                    needSum = cur.value as unknown as number;
                    break;
                case 'count':
                    needSum = cur.count;
                    break;
                case 'leftSum':
                    needSum = cur.leftSum;
                    break;
                default:
                    needSum = cur.value as unknown as number;
                    break;
            }
            const curValue = cur.value as unknown as number;

            if (target === curValue) {
                sum += this.sumLeftOrRight(cur, 'left', resultType);
                return;
            }

            if (target > curValue) {
                sum += this.sumLeftOrRight(cur, 'left', resultType);
                sum += needSum;
                if (cur.right) {
                    _traverse(cur.right);
                } else {
                    return;
                }
            }

            if (target < curValue) {
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

    allRightNodesAdd(node: BinarySearchTreeNode<T>, delta: number, resultType ?: ResultTypeOmitNode): boolean {
        if (resultType === undefined) {
            resultType = 'value';
        }

        function _traverse(cur: BinarySearchTreeNode<T>) {
            switch (resultType) {
                case 'value':
                    // @ts-ignore
                    cur.value += delta;
                    break;
                case 'count':
                    cur.count += delta;
                    break;
                case 'leftSum':
                    cur.leftSum += delta;
                    break;
                default:
                    // @ts-ignore
                    cur.value += delta;
                    break;
            }
            if (!cur.left && !cur.right) return;
            cur.left && _traverse(cur.left);
            cur.right && _traverse(cur.right);
        }

        node.right && _traverse(node.right);
        return true
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
