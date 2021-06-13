import {IStack} from "../../types";

export class Stack<T> implements IStack<T> {
    public items: T[] = [];
    private readonly capacity: number = Infinity;

    constructor(capacity?: number) {
        if (capacity) {
            this.capacity = capacity;
        }
    }

    public push(item: T): void {
        if (this.size() === this.capacity) {
            throw Error("Stack has reached max capacity, you cannot add more items");
        }
        this.items.push(item);
    }

    public pop(): T | undefined {
        return this.items.pop();
    }

    public peek(): T | undefined {
        return this.items[this.size() - 1];
    }

    public size(): number {
        return this.items.length;
    }

    public getItems(): T[] {
        return this.items;
    }
}
