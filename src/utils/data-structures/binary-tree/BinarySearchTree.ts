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

    public set left(node: BinarySearchTreeNode<T> | undefined) {
        this._left = node;
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

    public set count(count: number) {
        this._count = count;
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
        if (this._root == undefined) {
            this._root = newNode;
            return newNode;
        } else {
            let currentNode = this._root;
            let traversing = true;
            while (traversing) {
                if (currentNode.value == newNode.value) {
                    //Duplicates are not accepted.
                    traversing = false;
                    currentNode.count++;
                    return currentNode;
                } else if (newNode.value < currentNode.value) {
                    // Traverse left of the node
                    if (currentNode.left == undefined) {
                        //Add to the left of the current node
                        currentNode.left = newNode;
                        traversing = false;
                        newNode.count++;
                        return newNode;
                    } else {
                        //Traverse the left of the current node
                        currentNode = currentNode.left;
                    }
                } else if (newNode.value > currentNode.value) {
                    // Traverse right of the node
                    if (currentNode.right == undefined) {
                        //Add to the right of the current node
                        currentNode.right = newNode;
                        traversing = false;
                        newNode.count++;
                        return newNode;
                    } else {
                        //Traverse the left of the current node
                        currentNode = currentNode.right;
                    }
                }
            }
        }
        return undefined
    }

    /**
     * Traverse the tree in Breath-First-Search pattern and returns th array of values in BFS order
     */
    BFS(): T[] {
        let queue = new Array<BinarySearchTreeNode<T> | undefined>();
        let visited = new Array<T>();
        queue.push(this.root);
        while (queue.length !== 0) {
            let current = queue.shift();
            current && visited.push(current.value);
            if (current?.left !== undefined) queue.push(current.left);
            if (current?.right !== undefined) queue.push(current.right);
        }
        return visited;
    }

    /**
     * Traverse the tree in Depth-First-Search PreOrder pattern and returns th array of values in the same order
     */
    DFSPreOrder(): T[] {
        let visited = new Array<T>();
        let current = this._root;

        function _traverse(node: BinarySearchTreeNode<T>) {
            visited.push(node.value);
            if (node.left) _traverse(node.left);
            if (node.right) _traverse(node.right);
        }

        current && _traverse(current);
        return visited;
    }

    /**
     * Traverse the tree in Depth-First-Search PostOrder pattern and returns th array of values in the same order
     */
    DFSPostOrder(): T[] {
        let visited = new Array<T>();
        let current = this._root;

        function _traverse(node: BinarySearchTreeNode<T>) {
            if (node.left) _traverse(node.left);
            if (node.right) _traverse(node.right);
            visited.push(node.value);
        }

        current && _traverse(current);
        return visited;
    }

    /**
     * Traverse the tree in Depth-First-Search InOrder pattern and returns th array of values in the same order
     */
    DFSInOrder(): T[] {
        let visited = new Array<T>();
        let current = this._root;

        function _traverse(node: BinarySearchTreeNode<T>) {
            if (node.left) _traverse(node.left);
            visited.push(node.value);
            if (node.right) _traverse(node.right);
        }

        current && _traverse(current);
        return visited;
    }

    getNodeByValue(value: T): BinarySearchTreeNode<T> | undefined {
        let _root = this._root;

        function _traverse(cur: BinarySearchTreeNode<T>): BinarySearchTreeNode<T> | undefined {
            if (cur.value === value) return cur;
            if (!cur.left && !cur.right) return undefined;
            if (value < cur.value) {
                return cur.left ? _traverse(cur.left) : undefined;
            }
            if (value > cur.value) {
                return cur.right ? _traverse(cur.right) : undefined;
            }
        }

        return _root ? _traverse(_root) : undefined;
    }

    getLeftSum(node: BinarySearchTreeNode<T>, isSumCount?: boolean): number {
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

    getLessSum(target: number, isSumCount?: boolean): number {
        let sum = 0;
        const _traverse = (cur: BinarySearchTreeNode<T>): void => {
            const needSum: number = isSumCount ? cur.count : cur.value as unknown as number;
            const curValue = cur.value as unknown as number;

            if (target === curValue) {
                sum += this.getLeftSum(cur, isSumCount);
                return;
            }

            if (target > curValue) {
                sum += this.getLeftSum(cur, isSumCount);
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
