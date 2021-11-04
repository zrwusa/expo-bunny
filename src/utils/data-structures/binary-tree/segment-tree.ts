export type SegmentTreeNodeVal = number;

export class SegmentTreeNode {
    protected _start: number = 0;
    get start(): number {
        return this._start;
    }

    set start(v: number) {
        this._start = v;
    }

    protected _end: number = 0;
    get end(): number {
        return this._end;
    }

    set end(v: number) {
        this._end = v;
    }

    protected _val: SegmentTreeNodeVal | null = null;
    get val(): SegmentTreeNodeVal | null {
        return this._val;
    }

    set val(v: SegmentTreeNodeVal | null) {
        this._val = v;
    }

    protected _sum: number = 0;
    get sum(): number {
        return this._sum;
    }

    set sum(v: number) {
        this._sum = v;
    }

    protected _left: SegmentTreeNode | null = null;
    get left(): SegmentTreeNode | null {
        return this._left;
    }

    set left(v: SegmentTreeNode | null) {
        this._left = v;
    }

    protected _right: SegmentTreeNode | null = null;
    get right(): SegmentTreeNode | null {
        return this._right;
    }

    set right(v: SegmentTreeNode | null) {
        this._right = v;
    }

    constructor(start: number, end: number, sum: number, val?: SegmentTreeNodeVal | null) {
        this._start = start;
        this._end = end;
        this._sum = sum;
        this._val = val || null;
    }
}

export class SegmentTree {
    protected _values: number[] = [];
    protected _start: number = 0;
    protected _end: number;
    protected _root: SegmentTreeNode | null;
    get root(): SegmentTreeNode | null {
        return this._root;
    }

    constructor(values: number[], start?: number, end?: number) {
        start = start || 0;
        end = end || values.length - 1;
        this._values = values;
        this._start = start;
        this._end = end;
        this._root = this.build(start, end);
    }

    build(start: number, end: number): SegmentTreeNode {
        if (start === end) {
            return new SegmentTreeNode(start, end, this._values[start]);
        }
        const mid = start + Math.floor((end - start) / 2);
        const left = this.build(start, mid);
        const right = this.build(mid + 1, end);
        const cur = new SegmentTreeNode(start, end, left.sum + right.sum);
        cur.left = left;
        cur.right = right;
        return cur;
    }

    updateNode(index: number, sum: number, val?: SegmentTreeNodeVal) {
        const root = this._root || null;
        if (!root) {
            return;
        }
        const dfs = (cur: SegmentTreeNode, index: number, sum: number, val?: SegmentTreeNodeVal) => {
            if (cur.start === cur.end && cur.start === index) {
                cur.sum = sum;
                // cur.val = val;
                return;
            }
            const mid = cur.start + Math.floor((cur.end - cur.start) / 2);
            if (index <= mid) {
                dfs(cur.left!, index, sum, val);
            } else {
                dfs(cur.right!, index, sum, val);
            }
            cur.sum = cur.left!.sum + cur.right!.sum;
        };

        dfs(root, index, sum);
    }

    querySumByRange(indexA: number, indexB: number): number {
        const root = this._root || null;
        if (!root) {
            return 0;
        }

        const dfs = (cur: SegmentTreeNode, i: number, j: number): number => {
            if (cur.start === i && cur.end === j) {
                return cur.sum;
            }
            const mid = cur.start + Math.floor((cur.end - cur.start) / 2);
            if (j <= mid) {
                return dfs(cur.left!, i, j);
            } else if (i > mid) {
                return dfs(cur.right!, i, j);
            } else {
                return dfs(cur.left!, i, mid) + dfs(cur.right!, mid + 1, j);
            }
        };
        return dfs(root, indexA, indexB);
    }
}
