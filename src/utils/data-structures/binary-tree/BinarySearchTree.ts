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

    constructor(value: T) {
        this._value = value;
        this._left = undefined;
        this._right = undefined;
        this._count = 0;
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

    constructor(root?: BinarySearchTreeNode<T> | T) {
        if (!root) {
            this._root = undefined;
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
                    //Duplicates are not accepted.
                    traversing = false;
                    cur.count++;
                    return cur;
                } else if (newValue < cur.value) {
                    // Traverse left of the node
                    if (cur.left === undefined) {
                        //Add to the left of the current node
                        cur.left = newNode;
                        traversing = false;
                        cur.left.count++;
                        return cur.left;
                    } else {
                        //Traverse the left of the current node
                        cur = cur.left;
                    }
                } else if (newValue > cur.value) {
                    // Traverse right of the node
                    if (cur.right === undefined) {
                        //Add to the right of the current node
                        cur.right = newNode;
                        traversing = false;
                        cur.right.count++;
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

    /**
     * Traverse the tree in Breath-First-Search pattern and returns th array of values in BFS order
     */
    BFS(valueType?: 'value' | 'node' | 'count'): T[] | BinarySearchTreeNode<T>[] | number[] {
        if (valueType === undefined) {
            valueType = 'value';
        }
        let visited;
        switch (valueType) {
            case 'value':
                visited = new Array<T>();
                break;
            case 'node':
                visited = new Array<BinarySearchTreeNode<T>>();
                break;
            case 'count':
                visited = new Array<number>();
                break;
        }

        function pushByValueType(node: BinarySearchTreeNode<T>) {
            switch (valueType) {
                case 'value':
                    visited.push(node.value);
                    break;
                case 'node':
                    visited.push(node);
                    break;
                case 'count':
                    visited.push(node.count);
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
    DFS(pattern?: 'in' | 'pre' | 'post', valueType?: 'value' | 'node' | 'count'): T[] | BinarySearchTreeNode<T>[] | number[] {
        if (pattern === undefined) {
            pattern = 'in';
        }
        if (valueType === undefined) {
            valueType = 'value';
        }
        let visited;
        switch (valueType) {
            case 'value':
                visited = new Array<T>();
                break;
            case 'node':
                visited = new Array<BinarySearchTreeNode<T>>();
                break;
            case 'count':
                visited = new Array<number>();
                break;
        }

        function pushByValueType(node: BinarySearchTreeNode<T>) {
            switch (valueType) {
                case 'value':
                    visited.push(node.value);
                    break;
                case 'node':
                    visited.push(node);
                    break;
                case 'count':
                    visited.push(node.count);
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

    getNode(value: T | number, valueType?: 'value' | 'count', onlyOne?: boolean): BinarySearchTreeNode<T> | BinarySearchTreeNode<T>[] | undefined {
        if (valueType === undefined) {
            valueType = 'value';
        }

        if (onlyOne === undefined) {
            onlyOne = true;
        }

        const result:BinarySearchTreeNode<T>[] = [];

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

    leftSum(node: BinarySearchTreeNode<T>, isSumCount?: boolean): number {
        let sum = 0;

        function _traverse(cur: BinarySearchTreeNode<T>): void {
            const needSum: number = isSumCount ? cur.count : cur.value as unknown as number;
            sum += needSum;
            if (!cur.left && !cur.right) return
            cur.left && _traverse(cur.left);
            cur.right && _traverse(cur.right);
        }

        node && node.left && _traverse(node.left);
        return sum;
    }

    prefixSum(target: number, isSumCount?: boolean): number {
        let sum = 0;
        const _traverse = (cur: BinarySearchTreeNode<T>): void => {
            const needSum: number = isSumCount ? cur.count : cur.value as unknown as number;
            const curValue = cur.value as unknown as number;

            if (target === curValue) {
                sum += this.leftSum(cur, isSumCount);
                return;
            }

            if (target > curValue) {
                sum += this.leftSum(cur, isSumCount);
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

// /**
//  *                   10
//  *           6               15
//  *      3        8      11       20
//  *   0
//  */
// let myBST = new BinarySearchTree<number>();
// myBST.insert(10);
// myBST.insert(6);
// myBST.insert(15);
// myBST.insert(3);
// myBST.insert(8);
// myBST.insert(11);
// myBST.insert(20);
// myBST.insert(0);
// console.log("BFS: " + myBST.BFS());
// console.log("DFS-PreOrder: " + myBST.DFSPreOrder());
// console.log("DFS-PostOrder: " + myBST.DFSPostOrder());
// console.log("DFS-InOrder: " + myBST.DFSInOrder());
