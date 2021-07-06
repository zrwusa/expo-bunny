export class BinaryTreeNode<T> {
    private _id: number;
    public get id(): number {
        return this._id;
    }

    public set id(v: number) {
        this._id = v;
    }

    private _count: number;
    public get count(): number {
        return this._count;
    }

    public set count(count: number) {
        this._count = count;
    }

    private _left: BinaryTreeNode<T> | undefined;
    public get left(): BinaryTreeNode<T> | undefined {
        return this._left;
    }

    public set left(node: BinaryTreeNode<T> | undefined) {
        this._left = node;
    }

    private _right: BinaryTreeNode<T> | undefined;
    public get right(): BinaryTreeNode<T> | undefined {
        return this._right;
    }

    public set right(v: BinaryTreeNode<T> | undefined) {
        this._right = v;
    }

    constructor(id?: number, left?: BinaryTreeNode<T> | undefined, right?: BinaryTreeNode<T> | undefined) {
        this._id = (id === undefined ? -Infinity : id)
        this._left = (left === undefined ? undefined : left)
        this._right = (right === undefined ? undefined : right)
        this._count = 0;
    }
}
