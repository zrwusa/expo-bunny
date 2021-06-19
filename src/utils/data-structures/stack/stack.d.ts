export class Stack<T> {
    constructor(elements?: T[]);

    isEmpty(): boolean;

    size(): number;

    peek(): T;

    push(element: T): Stack<T>;

    pop(): T;

    toArray(): T[];

    clear(): void;

    clone(): Stack<T>;

    static fromArray<T>(elements: T[]): Stack<T>;
}
