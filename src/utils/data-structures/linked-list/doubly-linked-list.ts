export class DoublyLinkedListNode<T> {
    private _value: T;
    public get value(): T {
        return this._value;
    }

    public set value(v: T) {
        this._value = v;
    }

    private _next: DoublyLinkedListNode<T> | undefined;
    public get next(): DoublyLinkedListNode<T> | undefined {
        return this._next;
    }

    public set next(v: DoublyLinkedListNode<T> | undefined) {
        this._next = v;
    }

    private _prev: DoublyLinkedListNode<T> | undefined;

    public get previous(): DoublyLinkedListNode<T> | undefined {
        return this._prev;
    }

    public set previous(v: DoublyLinkedListNode<T> | undefined) {
        this._prev = v;
    }

    constructor(nodeValue: T) {
        this._value = nodeValue;
        this._next = undefined;
        this._prev = undefined;
    }
}

export class DoublyLinkedList<T> {
    //#region " Properties "

    private _head: DoublyLinkedListNode<T> | undefined;
    public get head(): DoublyLinkedListNode<T> | undefined {
        return this._head;
    }

    public set head(node: DoublyLinkedListNode<T> | undefined) {
        this._head = node;
    }

    private _tail: DoublyLinkedListNode<T> | undefined;
    public get tail(): DoublyLinkedListNode<T> | undefined {
        return this._tail;
    }

    public set tail(node: DoublyLinkedListNode<T> | undefined) {
        this._tail = node;
    }

    private _length: number = 0;
    public get length(): number {
        return this._length;
    }

    public set length(v: number) {
        this._length = v;
    }

    //#endregion

    constructor() {
        this.head = undefined;
        this.tail = undefined;
        this.length = 0;
    }

    /**
     * Adds a node to the end of the linked list
     * @param value Value to be stored in the Doubly linked list node
     */
    push(value: T): boolean {
        let newNode = new DoublyLinkedListNode(value);
        if (this.length === 0) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            if (this.tail) this.tail.next = newNode;
            newNode.previous = this.tail;
            this.tail = newNode;
        }
        this.length++;
        return true;
    }

    /**
     * Removes a node at the end of the linked list and will return the node value
     */
    pop(): DoublyLinkedListNode<T> | undefined {
        if (this.length === 0) return undefined;
        let poppedNode = this.tail;
        if (this.length === 1) {
            this.head = undefined;
            this.tail = undefined;
        } else {
            this.tail = poppedNode?.previous;
            if (this.tail) this.tail.next = undefined;
            if (poppedNode) poppedNode.previous = undefined;
        }
        this.length--;
        return poppedNode;
    }

    /**
     * Removes a node form the beginning of the linked list and will return the node value
     */
    shift(): T | undefined {
        if (this.length === 0) return undefined;
        let oldHead = this.head;
        if (this.length === 1) {
            this.head = undefined;
            this.tail = undefined;
        } else {
            this.head = oldHead?.next;
            if (this.head) this.head.previous = undefined;
            if (oldHead) oldHead.next = undefined;
        }
        this.length--;
        return oldHead?.value;
    }

    /**
     * Adds a node at the beginning of the linked list
     * @param value Value to be stored at the beginning of the linked list
     */
    unshift(value: T): boolean {
        let newNode = new DoublyLinkedListNode(value);
        if (this.length === 0) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            if (this.head) this.head.previous = newNode;
            newNode.next = this.head;
            this.head = newNode;
        }
        this.length++;
        return true;
    }

    /**
     * Returns the node at the specified index of the linked list.
     * If index = 0; first element in the list is returned.
     * If index = 3; fourth element in the list is returned.
     * @param index Index of the node to be retrieved
     */
    get(index: number): DoublyLinkedListNode<T> | undefined {
        if (index < 0 || index >= this.length) return undefined;
        let count, current;
        if (index <= this.length / 2) {
            count = 0;
            current = this.head;
            while (count !== index) {
                current = current?.next;
                count++;
            }
        } else {
            count = this.length - 1;
            current = this.tail;
            while (count !== index) {
                current = current?.previous;
                count--;
            }
        }
        return current;
    }

    /**
     * Updates the value of the node at the specified index.
     * If index = 0; Value of the first element in the list is updated.
     * If index = 3; Value of the fourth element in the list is updated.
     * @param index Index of the node to be updated
     * @param value New value of the node
     */
    set(index: number, value: T): boolean {
        let foundNode = this.get(index);
        if (foundNode != null) {
            foundNode.value = value;
            return true;
        }
        return false;
    }

    /**
     * Inserts a new node at the specified index.
     * @param index Index at which the new node has to be inserted
     * @param value Value of the new node to be inserted
     */
    insert(index: number, value: T): boolean {
        if (index < 0 || index > this.length) return false;
        if (index === 0) return !!this.unshift(value);
        if (index === this.length) return !!this.push(value);

        let newNode = new DoublyLinkedListNode(value);
        let prevNode = this.get(index - 1);
        let nextNode = prevNode?.next;

        if (prevNode) prevNode.next = newNode;
        newNode.previous = prevNode;

        newNode.next = nextNode;
        if (nextNode) nextNode.previous = newNode;
        this.length++;
        return true;
    }

    /**
     * Removes a node at the specified index and returns its value.
     * @param index Index at which the node has to be removed.
     */
    remove(index: number): T | undefined {
        if (index < 0 || index > this._length - 1) {
            return undefined;
        } else if (index === 0) {
            return this.shift();
        } else if (index === this._length - 1) {
            return this.pop()?.value;
        } else {
            const prevNode = this.get(index - 1);
            const removeNode = prevNode?.next;
            const nextNode = removeNode?.next;

            if (prevNode) prevNode.next = nextNode;
            if (nextNode) nextNode.previous = prevNode;

            if (removeNode) removeNode.next = undefined;
            if (removeNode) removeNode.previous = undefined;

            this._length--;
            return removeNode?.value;
        }
    }
}
