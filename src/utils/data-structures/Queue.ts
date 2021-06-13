/*
A queue that can be of type T
Generics are great in any language
*/

export class Queue<T> {
    private items: T[] = [];

    /* Add and pop do the same thing
    One has the fat arrow syntax
    */
    constructor(items?: T[]) {
        if (items) {
            this.items = items
        }
    }

    public add = (item: T) => this.items.push(item);

    public pop(): T | undefined {
        if (this.isEmpty()) {
            return;
        } else {
            return this.items.shift() as T;
        }
    }

    public isEmpty(): boolean {
        return this.items.length === 0;
    }
}

