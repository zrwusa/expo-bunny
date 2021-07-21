export type BinaryTreeNodePropertyName = 'id' | 'val' | 'count' | 'allLesserSum';
export type BinaryTreeNodeOrPropertyName = 'node' | BinaryTreeNodePropertyName;
export type DFSOrderPattern = 'in' | 'pre' | 'post';
export type BinaryTreeNodeId = number;
export type FamilyPosition = 0 | 1 | 2;
export type BinaryTreeDeletedResult<T> = { deleted: BinaryTreeNode<T> | null, needBalanced: BinaryTreeNode<T> | null };

export interface I_BinaryTree<T> {
    clear(): void;

    isEmpty(): boolean;

    insert(id: BinaryTreeNodeId, val?: T | null, count?: number): (BinaryTreeNode<T> | null)[];

    getDepth(node: BinaryTreeNode<T>): number;

    getHeight(beginRoot?: BinaryTreeNode<T>): number;

    getNodes(nodeProperty: BinaryTreeNodeId | number | T, propertyName ?: BinaryTreeNodePropertyName, onlyOne ?: boolean): BinaryTreeNode<T>[];

    getNode(nodeProperty: BinaryTreeNodeId | number | T, propertyName ?: BinaryTreeNodePropertyName): BinaryTreeNode<T> | null;

    getPathToRoot(node: BinaryTreeNode<T>): BinaryTreeNode<T>[];

    BFS(): BinaryTreeNodeId[];

    BFS(nodeOrPropertyName: 'id'): BinaryTreeNodeId[];

    BFS(nodeOrPropertyName: 'val'): (T | null)[];

    BFS(nodeOrPropertyName: 'node'): BinaryTreeNode<T>[];

    BFS(nodeOrPropertyName: 'count'): number[];

    BFS(nodeOrPropertyName: 'allLesserSum'): number[];

    BFS(nodeOrPropertyName ?: BinaryTreeNodeOrPropertyName): Array<T | null> | BinaryTreeNode<T> [] | number[] | BinaryTreeNodeId[];

    DFS(): BinaryTreeNodeId[];

    DFS(pattern?: DFSOrderPattern, nodeOrPropertyName?: 'id'): BinaryTreeNodeId[];

    DFS(pattern?: DFSOrderPattern, nodeOrPropertyName?: 'val'): (T | null)[];

    DFS(pattern?: DFSOrderPattern, nodeOrPropertyName?: 'node'): BinaryTreeNode<T>[];

    DFS(pattern?: DFSOrderPattern, nodeOrPropertyName?: 'count'): number[];

    DFS(pattern?: DFSOrderPattern, nodeOrPropertyName?: 'allLesserSum'): number[];

    DFS(pattern ?: 'in' | 'pre' | 'post', nodeOrPropertyName ?: BinaryTreeNodeOrPropertyName): Array<T | null> | BinaryTreeNode<T> [] | number[] | BinaryTreeNodeId[];

    subTreeSum(subTreeRoot: BinaryTreeNode<T>, propertyName ?: BinaryTreeNodePropertyName): number;
}

export abstract class AbstractBinaryTree<T> implements I_BinaryTree<T> {
    protected _root: BinaryTreeNode<T> | null = null;
    public get root(): BinaryTreeNode<T> | null {
        return this._root;
    }

    public set root(v: BinaryTreeNode<T> | null) {
        if (v) {
            v.parent = null;
            v.familyPosition = 0;
        }
        this._root = v;
    }

    protected _size: number = 0;
    public get size(): number {
        return this.size;
    }

    public set size(v: number) {
        this._size = v;
    }

    protected _allowDuplicate: boolean = true;
    public get allowDuplicate(): boolean {
        return this._allowDuplicate;
    }

    public set allowDuplicate(v: boolean) {
        this._allowDuplicate = v;
    }

    constructor(idOrNode?: BinaryTreeNodeId | BinaryTreeNode<T>, val?: T | null, count?: number, allowDuplicate?: boolean) {
        if (allowDuplicate === undefined) {
            allowDuplicate = false;
        }
        this._allowDuplicate = allowDuplicate;
        if (idOrNode !== undefined) {
            if (typeof idOrNode === 'number') {
                this.root = this.createNode(idOrNode, val, count);
            } else {
                this.root = idOrNode;
            }
            this._size = 1;
        }
    }

    abstract createNode(id: BinaryTreeNodeId, val?: T | null, count?: number): BinaryTreeNode<T>;

    clear() {
        this.root = null;
        this._size = 0;
    }

    isEmpty(): boolean {
        return this._size === 0;
    }

    insert(id: BinaryTreeNodeId, val?: T | null, count?: number): (BinaryTreeNode<T> | null)[] {
        if (count === undefined) {
            count = 1;
        }
        const _bfs = (root: BinaryTreeNode<T>, newNode: BinaryTreeNode<T>): BinaryTreeNode<T> | null => {
            const queue: BinaryTreeNode<T>[] = [root];
            while (queue.length > 0) {
                const cur = queue.shift();
                if (cur) {
                    if (!cur.left) {
                        newNode.parent = cur;
                        newNode.familyPosition = 1;
                        cur.left = newNode;
                        this._size++;
                        return cur.left;
                    }
                    if (!cur.right) {
                        newNode.parent = cur;
                        newNode.familyPosition = 2;
                        cur.right = newNode;
                        this._size++;
                        return cur.right;
                    }
                    cur.left && queue.push(cur.left);
                    cur.right && queue.push(cur.right);
                } else {
                    return null;
                }
            }
            return null;
        }
        const inserted: (BinaryTreeNode<T> | null)[] = [];
        if (this._allowDuplicate) {
            if (this.root) {
                for (let i = 0; i < count; i++) {
                    inserted.push(_bfs(this.root, new BinaryTreeNode<T>(id, val, 1)));
                }
            } else {
                this.root = new BinaryTreeNode<T>(id, val, 1);
                inserted.push(this.root);
                this._size = 1;
                for (let i = 0; i < count - 1; i++) {
                    inserted.push(_bfs(this.root, new BinaryTreeNode<T>(id, val, 1)));
                }
            }
        } else {
            const existNode = this.getNode(id);
            if (this.root) {
                if (existNode) {
                    existNode.count += count;
                    inserted.push(existNode);
                } else {
                    inserted.push(_bfs(this.root, new BinaryTreeNode<T>(id, val, count)));
                }
            } else {
                this.root = new BinaryTreeNode<T>(id, val, count);
                this._size = 1;
                inserted.push(this.root);
            }
        }
        return inserted;
    }

    remove(id: BinaryTreeNodeId): BinaryTreeDeletedResult<T>[] {
        let nodes: BinaryTreeNode<T>[] = [];
        nodes = this.getNodes(id);
        for (let node of nodes) {
            switch (node.familyPosition) {
                case 0:
                    if (node.left) {

                    } else if (node.right) {

                    }
                    break;
                case 1:
                    break;
                case 2:
                    break;
            }
        }
        return [{deleted: null, needBalanced: null}];
    }

    getDepth(node: BinaryTreeNode<T>): number {
        let depth = 0;
        while (node.parent !== null) {
            depth++;
            node = node.parent;
        }
        return depth;
    }

    getHeight(beginRoot?: BinaryTreeNode<T>): number {
        const _beginRoot = beginRoot || this.root;
        const _getMaxHeight = (cur: BinaryTreeNode<T> | null): number => {
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

    getNodes(nodeProperty: BinaryTreeNodeId | number | T, propertyName ?: BinaryTreeNodePropertyName, onlyOne ?: boolean) {
        if (propertyName === undefined) {
            propertyName = 'id';
        }

        const result: BinaryTreeNode<T>[] = [];

        function _traverse(cur: BinaryTreeNode<T>) {
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
            cur.left ? _traverse(cur.left) : null;
            cur.right ? _traverse(cur.right) : null;
        }

        this.root && _traverse(this.root);
        return result;
    }

    getNode(nodeProperty: BinaryTreeNodeId | number | T, propertyName ?: BinaryTreeNodePropertyName): BinaryTreeNode<T> | null {
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

    getPathToRoot(node: BinaryTreeNode<T>): BinaryTreeNode<T>[] {
        const result: BinaryTreeNode<T>[] = [];
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
    BFS(nodeOrPropertyName: 'node'): BinaryTreeNode<T>[];
    BFS(nodeOrPropertyName: 'count'): number[];
    BFS(nodeOrPropertyName: 'allLesserSum'): number[];
    BFS(nodeOrPropertyName ?: BinaryTreeNodeOrPropertyName): Array<T | null> | BinaryTreeNode<T> [] | number[] | BinaryTreeNodeId[] {
        if (nodeOrPropertyName === undefined) {
            nodeOrPropertyName = 'id';
        }
        let visitedId: BinaryTreeNodeId[] = [],
            visitedVal: Array<T | null> = [],
            visitedNode: BinaryTreeNode<T>[] = [],
            visitedCount: number[] = [],
            visitedLeftSum: number[] = [];

        function pushByValueType(node: BinaryTreeNode<T>) {
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

        let queue = new Array<BinaryTreeNode<T> | null>();
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
    DFS(pattern?: DFSOrderPattern, nodeOrPropertyName?: 'node'): BinaryTreeNode<T>[];
    DFS(pattern?: DFSOrderPattern, nodeOrPropertyName?: 'count'): number[];
    DFS(pattern?: DFSOrderPattern, nodeOrPropertyName?: 'allLesserSum'): number[];
    DFS(pattern ?: 'in' | 'pre' | 'post', nodeOrPropertyName ?: BinaryTreeNodeOrPropertyName): Array<T | null> | BinaryTreeNode<T> [] | number[] | BinaryTreeNodeId[] {
        if (pattern === undefined) {
            pattern = 'in';
        }
        if (nodeOrPropertyName === undefined) {
            nodeOrPropertyName = 'id';
        }
        let visitedId: BinaryTreeNodeId[] = [],
            visitedVal: Array<T | null> = [],
            visitedNode: BinaryTreeNode<T>[] = [],
            visitedCount: number[] = [],
            visitedLeftSum: number[] = [];

        function pushByValueType(node: BinaryTreeNode<T>) {
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

        function _traverse(node: BinaryTreeNode<T>) {
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

        this.root && _traverse(this.root);
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

    subTreeSum(subTreeRoot: BinaryTreeNode<T>, propertyName ?: BinaryTreeNodePropertyName): number {
        if (propertyName === undefined) {
            propertyName = 'id'
        }
        let sum = 0;

        function _traverse(cur: BinaryTreeNode<T>): void {
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

export class BinaryTreeNode<T> {
    protected _id: BinaryTreeNodeId;
    public get id(): BinaryTreeNodeId {
        return this._id;
    }

    public set id(v: BinaryTreeNodeId) {
        this._id = v;
    }

    protected _val: T | null = null;
    public get val(): T | null {
        return this._val;
    }

    public set val(v: T | null) {
        this._val = v;
    }

    protected _left: BinaryTreeNode<T> | null = null;
    public get left(): BinaryTreeNode<T> | null {
        return this._left;
    }

    public set left(v: BinaryTreeNode<T> | null) {
        if (v) {
            v.parent = this;
            v.familyPosition = 1;
        }
        this._left = v;
    }

    protected _right: BinaryTreeNode<T> | null = null;
    public get right(): BinaryTreeNode<T> | null {
        return this._right;
    }

    public set right(v: BinaryTreeNode<T> | null) {
        if (v) {
            v.parent = this;
            v.familyPosition = 2;
        }
        this._right = v;
    }

    protected _parent: BinaryTreeNode<T> | null = null;
    public get parent(): BinaryTreeNode<T> | null {
        return this._parent;
    }

    public set parent(v: BinaryTreeNode<T> | null) {
        this._parent = v;
    }

    protected _familyPosition: FamilyPosition = 0;
    public get familyPosition(): FamilyPosition {
        return this._familyPosition;
    }

    public set familyPosition(v: FamilyPosition) {
        this._familyPosition = v;
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

    constructor(id: BinaryTreeNodeId, val?: T | null, count?: number) {
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

    replaceLocation(replaceNode: BinaryTreeNode<T>): boolean {
        this._id = replaceNode.id;
        this._val = replaceNode.val;
        this._count = replaceNode.count;
        this._allLesserSum = replaceNode.allLesserSum;
        this._height = replaceNode.height;
        return true;
    }

    swapLocation(swapNode: BinaryTreeNode<T>): BinaryTreeNode<T> {
        const tempNode = new BinaryTreeNode<T>(swapNode.id);
        const { val, count, height, allLesserSum } = swapNode;
        tempNode.val = val;
        tempNode.count = count;
        tempNode.height = height;
        tempNode.allLesserSum = allLesserSum;

        swapNode.id = this._id;
        swapNode.val = this._val;
        swapNode.count = this._count;
        swapNode.height = this._height;
        swapNode.allLesserSum = this._allLesserSum;

        this._id = tempNode.id;
        this._val = tempNode.val;
        this._count = tempNode.count;
        this._height = tempNode.height;
        this._allLesserSum = tempNode.allLesserSum;
        return swapNode;
    }

    clone(): BinaryTreeNode<T> {
        return new BinaryTreeNode<T>(this._id, this._val, this._count);
    }
}

export class BinaryTree<T> extends AbstractBinaryTree<T> {
    createNode(id: BinaryTreeNodeId, val?: T | null, count?: number): BinaryTreeNode<T> {
        return new BinaryTreeNode(id, val, count)
    }
}
