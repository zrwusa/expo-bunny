export type PropertyName = 'id' | 'val' | 'count' | 'allLesserSum';
export type NodeOrPropertyName = 'node' | PropertyName;
export type DFSOrderPattern = 'in' | 'pre' | 'post';
export type BSTNodeId = number;
export type BSTNodeVal<T extends BSTNode<any>> = T extends BSTNode<infer U>
    ? U
    : any;

export class BSTNode<V> {
    private _id: BSTNodeId;
    public get id(): BSTNodeId {
        return this._id;
    }

    public set id(v: BSTNodeId) {
        this._id = v;
    }

    private _val: V | null;
    public get val(): V | null {
        return this._val;
    }

    public set val(v: V | null) {
        this._val = v;
    }

    private _left: BSTNode<V> | null;
    public get left(): BSTNode<V> | null {
        return this._left;
    }

    public set left(v: BSTNode<V> | null) {
        this._left = v;
    }

    private _right: BSTNode<V> | null;
    public get right(): BSTNode<V> | null {
        return this._right;
    }

    public set right(v: BSTNode<V> | null) {
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

    private _parent: BSTNode<V> | null;
    public get parent(): BSTNode<V> | null {
        return this._parent;
    }

    public set parent(v: BSTNode<V> | null) {
        this._parent = v;
    }

    private _isLeftChild: boolean | null;
    public get isLeftChild(): boolean | null {
        return this._isLeftChild;
    }

    public set isLeftChild(v: boolean | null) {
        this._isLeftChild = v;
    }

    constructor(id: BSTNodeId, val?: V | null, count?: number) {
        if (val === undefined) {
            val = null;
        }
        if (count === undefined) {
            count = 1;
        }
        this._id = id;
        this._val = val || null;
        this._left = null;
        this._right = null;
        this._count = count;
        this._allLesserSum = 0;
        this._parent = null;
        this._isLeftChild = null;
    }
}

type BalanceFactor = number;

const AVL_BALANCED_FACTORS = [-1, 0, 1];

export class AVLTreeNode<V> extends BSTNode<V> {
    private _balanceFactor: BalanceFactor;

    public get balanceFactor(): BalanceFactor {
        return this._balanceFactor;
    }

    public set balanceFactor(v: BalanceFactor) {
        this._balanceFactor = v;
    }

    constructor(id: BSTNodeId, val?: V | null, count?: number) {
        super(id, val, count);
        this._balanceFactor = 0;
    }
}

interface I_BST<T> {
    isValid(): boolean;

    // insert(id: BSTNodeId, val?: T | null, count?: number): BSTNode<T> | null {
    insert(newNode: BSTNode<T>): BSTNode<T> | null;

    contains(node: BSTNode<T>): boolean;

    remove(id: BSTNodeId, isUpdateAllLeftSum?: boolean): BSTNode<T> | null;

    clear(): void;

    isEmpty(): boolean;

    // --- end basic functions

    // --- start additional functions
    getMinNode(node?: BSTNode<T> | null): BSTNode<T> | null;

    getMaxNode(node?: BSTNode<T> | null): BSTNode<T> | null;

    getNodes(nodeProperty: T | BSTNodeId, propertyName ?: PropertyName, onlyOne ?: boolean): BSTNode<T>[];

    getNode(nodeProperty: T | BSTNodeId, propertyName ?: PropertyName): BSTNode<T>;

    BFS(): BSTNodeId[];

    BFS(nodeOrPropertyName: 'id'): BSTNodeId[];

    BFS(nodeOrPropertyName: 'val'): (T | null)[];

    BFS(nodeOrPropertyName: 'node'): BSTNode<T>[];

    BFS(nodeOrPropertyName: 'count'): number[];

    BFS(nodeOrPropertyName: 'allLesserSum'): number[];

    BFS(nodeOrPropertyName ?: NodeOrPropertyName): Array<T | null> | BSTNode<T> [] | number[] | BSTNodeId[];

    DFS(): BSTNodeId[];

    DFS(pattern?: DFSOrderPattern, nodeOrPropertyName?: 'id'): BSTNodeId[];

    DFS(pattern?: DFSOrderPattern, nodeOrPropertyName?: 'val'): (T | null)[];

    DFS(pattern?: DFSOrderPattern, nodeOrPropertyName?: 'node'): BSTNode<T>[];

    DFS(pattern?: DFSOrderPattern, nodeOrPropertyName?: 'count'): number[];

    DFS(pattern?: DFSOrderPattern, nodeOrPropertyName?: 'allLesserSum'): number[];

    DFS(pattern ?: 'in' | 'pre' | 'post', nodeOrPropertyName ?: NodeOrPropertyName): Array<T | null> | BSTNode<T> [] | number[] | BSTNodeId[];


    subTreeSum(subTreeRoot: BSTNode<T>, propertyName ?: PropertyName): number;

    lesserSum(id: BSTNodeId, propertyName ?: PropertyName): number;

    subTreeAdd(subTreeRoot: BSTNode<T>, delta: number, propertyName ?: PropertyName): boolean;

    allGreaterNodesAdd(node: BSTNode<T>, delta: number, propertyName ?: PropertyName): boolean;

    // TODO need to be optimized, it is O(n)
    getMaxDepth(beginRoot?: BSTNode<T>): number;

    balance(): boolean;

    isAVLBalanced(): boolean;

}

export abstract class AbstractBST<T> implements I_BST<T> {
    protected _root: BSTNode<T> | null;
    public get root(): BSTNode<T> | null {
        return this._root;
    }

    public set root(v: BSTNode<T> | null) {
        this._root = v;
    }

    protected _size: number;
    public get size(): number {
        return this.size;
    }

    public set size(v: number) {
        this._size = v;
    }

    protected readonly _autoAllLesserSum: boolean = false;

    constructor(rootNode?: BSTNode<T> | null, autoPrefixSum?: boolean) {
        if (rootNode === undefined) {
            this._root = null;
            this._size = 0;
        } else {
            this._root = rootNode;
            this._size = 1;
        }
        if (autoPrefixSum) {
            this._autoAllLesserSum = true;
        }
    }

    private _replaceWithASubTree(node1: BSTNode<T>, node2: BSTNode<T> | null) {
        if (node1 && !node2) {
            if (node1.parent) {
                if (node1.isLeftChild === true) {
                    node1.parent.left = null;
                    return null;
                } else if (node1.isLeftChild === false) {
                    node1.parent.right = null;
                    return null;
                }
            } else {
                this._root = null
                return null;
            }
        } else if (node1 && node2) {
            if (node1.parent) {
                const _isLeftChild = node1.isLeftChild;
                if (_isLeftChild === true) {
                    node2.isLeftChild = _isLeftChild;
                    node2.parent = node1.parent;
                    node1.parent.left = node2;
                    return null;
                } else if (_isLeftChild === false) {
                    node2.isLeftChild = _isLeftChild;
                    node2.parent = node1.parent;
                    node1.parent.right = node2;
                    return null;
                }
            } else {
                node2.isLeftChild = null;
                node2.parent = null;
                this._root = node2;
                return null;
            }
        }
    }

    private _swap(node1: BSTNode<T>, node2: BSTNode<T>) {
        if (node1.left) {
            node2.left = node1.left;
            node1.left.parent = node2;
        }

        if (node1.right) {
            node2.right = node1.right;
            node1.right.parent = node2;
        }
        this._replaceWithASubTree(node1, node2);
    }

    // --- start basic functions
    isValid(): boolean {
        if (!this._root) return true;

        function dfs(cur: BSTNode<T> | null, min: BSTNodeId, max: BSTNodeId): boolean {
            if (!cur) return true;
            if ((cur.id <= min) || (cur.id >= max)) return false;
            return dfs(cur.left, min, cur.id) && dfs(cur.right, cur.id, max);
        }

        return dfs(this._root!, Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
    }

    // insert(id: BSTNodeId, val?: T | null, count?: number): BSTNode<T> | null {
    abstract insert(newNode: BSTNode<T>): BSTNode<T> | null;

    contains(node: BSTNode<T>): boolean {
        return false;
    }

    remove(id: BSTNodeId, isUpdateAllLeftSum?: boolean): BSTNode<T> | null {
        if (isUpdateAllLeftSum === undefined) {
            isUpdateAllLeftSum = true;
        }
        let cur: BSTNode<T> | null = this.getNode(id, 'id');

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

    clear() {
        this._root = null;
        this._size = 0;
    }

    isEmpty(): boolean {
        return this._size === 0;
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

    getNodes(nodeProperty: T | BSTNodeId, propertyName ?: PropertyName, onlyOne ?: boolean) {
        if (propertyName === undefined) {
            propertyName = 'id';
        }

        const result: BSTNode<T>[] = [];

        // const _isEqual = (property1: any, property2: any) => {
        //     if (typeof property1 === typeof property2) {
        //         switch (typeof property2) {
        //             case 'object':
        //                 return JSON.stringify(property1) === JSON.stringify(property2);
        //             case 'number':
        //                 return property1 === property2;
        //             case 'bigint':
        //                 return property1 === property2;
        //             case 'boolean':
        //                 return property1 === property2;
        //             case 'function':
        //                 return JSON.stringify(property1) === JSON.stringify(property2);
        //             case 'string':
        //                 return property1 === property2;
        //             case 'symbol':
        //                 return property1 === property2;
        //             case 'undefined':
        //                 return property1 === property2;
        //             default:
        //                 return property1 === property2;
        //         }
        //     }
        //     return false;
        // }

        function _traverse(cur: BSTNode<T>) {
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

    getNode(nodeProperty: T | BSTNodeId, propertyName ?: PropertyName) {
        if (propertyName === undefined) {
            propertyName = 'id';
        }
        return this.getNodes(nodeProperty, propertyName, true)[0]
    }

    BFS(): BSTNodeId[];
    BFS(nodeOrPropertyName: 'id'): BSTNodeId[];
    BFS(nodeOrPropertyName: 'val'): (T | null)[];
    BFS(nodeOrPropertyName: 'node'): BSTNode<T>[];
    BFS(nodeOrPropertyName: 'count'): number[];
    BFS(nodeOrPropertyName: 'allLesserSum'): number[];
    BFS(nodeOrPropertyName ?: NodeOrPropertyName): Array<T | null> | BSTNode<T> [] | number[] | BSTNodeId[] {
        if (nodeOrPropertyName === undefined) {
            nodeOrPropertyName = 'id';
        }
        let visitedId: BSTNodeId[] = [],
            visitedVal: Array<T | null> = [],
            visitedNode: BSTNode<T>[] = [],
            visitedCount: number[] = [],
            visitedLeftSum: number[] = [];

        function pushByValueType(node: BSTNode<T>) {
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

        let queue = new Array<BSTNode<T> | null>();
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

    DFS(): BSTNodeId[];
    DFS(pattern?: DFSOrderPattern, nodeOrPropertyName?: 'id'): BSTNodeId[];
    DFS(pattern?: DFSOrderPattern, nodeOrPropertyName?: 'val'): (T | null)[];
    DFS(pattern?: DFSOrderPattern, nodeOrPropertyName?: 'node'): BSTNode<T>[];
    DFS(pattern?: DFSOrderPattern, nodeOrPropertyName?: 'count'): number[];
    DFS(pattern?: DFSOrderPattern, nodeOrPropertyName?: 'allLesserSum'): number[];
    DFS(pattern ?: 'in' | 'pre' | 'post', nodeOrPropertyName ?: NodeOrPropertyName): Array<T | null> | BSTNode<T> [] | number[] | BSTNodeId[] {
        if (pattern === undefined) {
            pattern = 'in';
        }
        if (nodeOrPropertyName === undefined) {
            nodeOrPropertyName = 'id';
        }
        let visitedId: BSTNodeId[] = [],
            visitedVal: Array<T | null> = [],
            visitedNode: BSTNode<T>[] = [],
            visitedCount: number[] = [],
            visitedLeftSum: number[] = [];

        function pushByValueType(node: BSTNode<T>) {
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

        function _traverse(node: BSTNode<T>) {
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


    subTreeSum(subTreeRoot: BSTNode<T>, propertyName ?: PropertyName): number {
        if (propertyName === undefined) {
            propertyName = 'id'
        }
        let sum = 0;

        function _traverse(cur: BSTNode<T>): void {
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

    lesserSum(id: BSTNodeId, propertyName ?: PropertyName): number {
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

    subTreeAdd(subTreeRoot: BSTNode<T>, delta: number, propertyName ?: PropertyName): boolean {
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

    allGreaterNodesAdd(node: BSTNode<T>, delta: number, propertyName ?: PropertyName): boolean {
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

    // TODO need to be optimized, it is O(n)
    getMaxDepth(beginRoot?: BSTNode<T>): number {
        const _beginRoot = beginRoot || this._root;
        const _getMaxDepth = (cur: BSTNode<T> | null): number => {
            if (!cur) return 0;
            let leftHeight = _getMaxDepth(cur.left);
            let rightHeight = _getMaxDepth(cur.right);
            return Math.max(leftHeight, rightHeight) + 1;
        }

        if (_beginRoot) {
            return _getMaxDepth(_beginRoot);
        } else {
            return 0;
        }
    }

    balance(): boolean {
        const sorted = this.DFS('in', 'node');

        this.clear();
        const buildBalanceBST = (l: number, r: number) => {
            if (l > r) return;
            const m = Math.floor(l + (r - l) / 2);
            const midNode = sorted[Math.floor(l + (r - l) / 2)];
            // this.insert(midNode.id, midNode.val, midNode.count);
            this.insert(new BSTNode<T>(midNode.id, midNode.val, midNode.count));
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

export class BST<T> extends AbstractBST<T>{
    insert(newNode: BSTNode<T>): BSTNode<T> | null {
        const newValue = newNode.id;
        if (this._root === null) {
            this._root = newNode;
            this._size++;
            return this._root;
        } else {
            let cur = this._root;
            let traversing = true;
            while (traversing) {
                if (cur.id === newValue) {
                    this._autoAllLesserSum && cur.right && this.subTreeAdd(cur.right, newNode.count, 'allLesserSum');
                    cur.count += newNode.count;
                    //Duplicates are not accepted.
                    traversing = false;
                    return cur;
                } else if (newValue < cur.id) {
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
                } else if (newValue > cur.id) {
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
}