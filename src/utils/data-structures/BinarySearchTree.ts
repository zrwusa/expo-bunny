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

    constructor(value: T) {
        this._value = value;
        this._left = undefined;
        this._right = undefined;
    }
}

class BinarySearchTree<T> {
    private _root: BinarySearchTreeNode<T> | undefined;
    public get root(): BinarySearchTreeNode<T> | undefined {
        return this._root;
    }

    public set root(v: BinarySearchTreeNode<T> | undefined) {
        this._root = v;
    }

    constructor() {
        this._root = undefined;
    }

    /**
     * Adds a new BinarySearchTreeNode to BST.
     * @param value Value of the Tree node to be added to BST
     */
    addToTree(value: T): boolean {
        const newNode = new BinarySearchTreeNode<T>(value);
        if (this._root == undefined) {
            this._root = newNode;
            return true;
        } else {
            let currentNode = this._root;
            let traversing = true;
            while (traversing) {
                if (currentNode.value == newNode.value) {
                    //Duplicates are not accepted.
                    traversing = false;
                    return false;
                } else if (newNode.value < currentNode.value) {
                    // Traverse left of the node
                    if (currentNode.left == undefined) {
                        //Add to the left of the current node
                        currentNode.left = newNode;
                        traversing = false;
                        return true;
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
                        return true;
                    } else {
                        //Traverse the left of the current node
                        currentNode = currentNode.right;
                    }
                }
            }
        }
        return false
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
}

// /**
//  *                   10
//  *           6               15
//  *      3        8      11       20
//  *   0
//  */
// let myBST = new BinarySearchTree<number>();
// myBST.addToTree(10);
// myBST.addToTree(6);
// myBST.addToTree(15);
// myBST.addToTree(3);
// myBST.addToTree(8);
// myBST.addToTree(11);
// myBST.addToTree(20);
// myBST.addToTree(0);
// console.log("BFS: " + myBST.BFS());
// console.log("DFS-PreOrder: " + myBST.DFSPreOrder());
// console.log("DFS-PostOrder: " + myBST.DFSPostOrder());
// console.log("DFS-InOrder: " + myBST.DFSInOrder());
