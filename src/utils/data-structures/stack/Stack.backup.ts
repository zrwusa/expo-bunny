// import {IStack} from "../../types";
//
// export class Stack<T> implements IStack<T> {
//     public items: T[] = [];
//     private readonly capacity: number = Infinity;
//
//     constructor(items?: T[], capacity?: number) {
//         if (items && items.length > 0) {
//             this.items = items;
//         }
//         if (capacity) {
//             this.capacity = capacity;
//         }
//     }
//
//     public push(item: T): void {
//         if (this.size() === this.capacity) {
//             throw Error("Stack has reached max capacity, you cannot add more items");
//         }
//         this.items.push(item);
//     }
//
//     public pop(): T | undefined {
//         return this.items.pop();
//     }
//
//     public peek(): T | undefined {
//         return this.items[this.size() - 1];
//     }
//
//     public size(): number {
//         return this.items.length;
//     }
//
//     public toArray(): T[] {
//         return this.items;
//     }
// }


// /**
//  * @license MIT
//  * @copyright 2020 Eyas Ranjous <eyas.ranjous@gmail.com>
//  *
//  * @class
//  */
// export class Stack<T> {
//     private _elements: T[];
//     /**
//      * Creates a stack.
//      * @param {array} [elements]
//      */
//     constructor(elements?: T[]) {
//         this._elements = Array.isArray(elements) ? elements : [];
//     }
//
//     /**
//      * Checks if the stack is empty.
//      * @public
//      * @returns {boolean}
//      */
//     isEmpty(): boolean {
//         return this._elements.length === 0;
//     }
//
//     /**
//      * Returns the number of elements in the stack.
//      * @public
//      * @returns {number}
//      */
//     size(): number {
//         return this._elements.length;
//     }
//
//     /**
//      * Returns the top element in the stack.
//      * @public
//      * @returns {object}
//      */
//     peek(): T | null {
//         if (this.isEmpty()) return null;
//
//         return this._elements[this._elements.length - 1];
//     }
//
//     /**
//      * Adds an element to the top of the stack.
//      * @public
//      * @param {object} element
//      */
//     push(element: T): Stack<T> {
//         this._elements.push(element);
//         return this;
//     }
//
//     /**
//      * Removes and returns the top element in the stack.
//      * @public
//      * @returns {object}
//      */
//     pop(): T | null {
//         if (this.isEmpty()) return null;
//
//         return this._elements.pop() as T;
//     }
//
//     /**
//      * Returns the remaining elements as an array.
//      * @public
//      * @returns {array}
//      */
//     toArray(): T[] {
//         return this._elements.slice();
//     }
//
//     /**
//      * Clears all elements from the stack.
//      * @public
//      */
//     clear(): void {
//         this._elements = [];
//     }
//
//     /**
//      * Creates a shallow copy from the stack.
//      * @public
//      * @return {Stack}
//      */
//     clone(): Stack<T> {
//         return new Stack(this._elements.slice());
//     }
//
//     /**
//      * Creates a stack from an existing array
//      * @public
//      * @static
//      * @param {array} [elements]
//      * @return {Stack}
//      */
//     static fromArray<T>(elements: T[]): Stack<T> {
//         return new Stack(elements);
//     }
// }
export {}
