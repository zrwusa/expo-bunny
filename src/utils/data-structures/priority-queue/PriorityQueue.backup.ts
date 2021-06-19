// export class PriorityQueueNode {
//     value: string;
//     priority: number;
//
//     constructor(val: string, priority: number) {
//         this.value = val;
//         this.priority = priority;
//     }
//
// }
//
// /**
//  * We will implement priority queue based on MaxHeap and
//  * return the node with max priority element as the first element
//  */
// export class PriorityQueue {
//     values: PriorityQueueNode[];
//
//     constructor() {
//         this.values = [];
//     }
//
//     public enqueue(val: string, priority: number): boolean {
//         // Create a new node
//         let newNode = new PriorityQueueNode(val, priority);
//
//         //If length is zero, add the node to the list and return
//         if (this.values.length === 0) {
//             this.values.push(newNode);
//             return true;
//         }
//         this.values.push(newNode);
//
//         // Re-balance the list based on priority
//         return this.bubbleUp();
//     }
//
//     private bubbleUp(): boolean {
//         // Index of the element we need to bubble up
//         let index = this.values.length - 1;
//         let parentIndex = Math.floor((index - 1) / 2); // Parent index of a child at index n: Math.floor(n-1/2)
//         const element = this.values[index];
//
//         // Keep looping until the parent node priority is greater than the child node
//         while (parentIndex >= 0 && this.values[parentIndex].priority < element.priority) {
//             // If priority of parent < child, swap the nodes
//             this.values[index] = this.values[parentIndex];
//             this.values[parentIndex] = element;
//
//             // Reset the indexes as we swapped the values
//             index = parentIndex;
//             parentIndex = Math.floor((index - 1) / 2);
//         }
//         return true;
//     }
//
//     public dequeue(): PriorityQueueNode | undefined {
//         if (this.values.length === 0) {
//             return undefined;
//         }
//
//         let max = this.values[0];
//         let end = this.values.pop();
//         if (this.values.length > 0) {
//             if (end) this.values[0] = end;
//             this.sinkDown();
//         }
//         return max;
//     }
//
//     private sinkDown() {
//         let parentIndex = 0;
//         let swap: boolean = false;
//         let swapIndex: number = parentIndex;
//         const nodeToSink = this.values[parentIndex]; // PriorityQueueNode to sinkDown
//
//         let leftChildIndex: number;
//         let rightChildIndex: number;
//
//         let leftChildNode: PriorityQueueNode | undefined = undefined;
//         let rightChildNode: PriorityQueueNode | undefined = undefined;
//
//         // Keep looping through the nodes util you find the right spot
//         while (true) {
//             swap = false;
//             leftChildIndex = (2 * parentIndex) + 1;
//             rightChildIndex = (2 * parentIndex) + 2;
//
//             // Check with the left child only if it is a valid index
//             if (leftChildIndex < this.values.length) {
//                 leftChildNode = this.values[leftChildIndex];
//                 if (leftChildNode.priority > nodeToSink.priority) {
//                     swap = true;
//                     swapIndex = leftChildIndex;
//                 }
//             }
//
//             // Check with the right child only if it is a valid index
//             if (rightChildIndex < this.values.length) {
//                 rightChildNode = this.values[rightChildIndex];
//                 if ((!swap && rightChildNode.priority > nodeToSink.priority) ||
//                     (swap && leftChildNode && rightChildNode.priority > leftChildNode.priority)) {
//                     swap = true;
//                     swapIndex = rightChildIndex;
//                 }
//             }
//
//             if (!swap) {
//                 // If there is no swap required, we found the correct spot for the node
//                 return;
//             } else {
//                 // Swap the elements
//                 this.values[parentIndex] = this.values[swapIndex];
//                 this.values[swapIndex] = nodeToSink;
//
//                 // Set the reference to index to its new value
//                 parentIndex = swapIndex;
//             }
//         }
//
//     }
//
// }

// let queue = new PriorityQueue();
// queue.enqueue("common cold", 1);
// queue.enqueue("knife stab", 5);
// queue.enqueue("high fever", 3);
// queue.enqueue("dislocated arm", 4);
// queue.enqueue("flu", 2);
// console.log(queue);
// console.log(queue.dequeue());
// console.log(queue.dequeue());
// console.log(queue.dequeue());
// console.log(queue.dequeue());
// console.log(queue.dequeue());
// console.log(queue.dequeue());


// import {MaxHeap} from "./MaxHeap";
// import {MinHeap} from "./MinHeap";
// import {Heap, HeapNode} from "./Heap";
//
// export interface PriorityQueueOptions<T> {
//     priority?: (element: T) => number;
// }
//
// export interface PriorityQueueItem<T> {
//     priority: number;
//     element: T;
// }
//
// // export abstract class PriorityQueue<T> {
// //     constructor(options?: PriorityQueueOptions<T>);
// //     size(): number;
// //     isEmpty(): boolean;
// //     front(): PriorityQueueItem<T>;
// //     back(): PriorityQueueItem<T>;
// //     enqueue(element: T, priority?: number): PriorityQueue<T>;
// //     dequeue(): PriorityQueueItem<T>;
// //     toArray(): PriorityQueueItem<T>[];
// //     clear(): void;
// // }
//
// /**
//  * @copyright 2020 Eyas Ranjous <eyas.ranjous@gmail.com>
//  * @license MIT
//  *
//  * @abstract
//  * @class PriorityQueue
//  */
// export abstract class PriorityQueue<T extends number | string, U = undefined> {
//     protected _heap: Heap<T, U>;
//     private _priorityCb: (element: T) => number;
//
//     /**
//      * Creates a priority queue
//      * @public
//      * @params {object} [options]
//      */
//     constructor(options: PriorityQueueOptions<T>) {
//         const {priority} = options;
//         if (priority !== undefined && typeof priority !== 'function') {
//             throw new Error('.constructor expects a valid priority function');
//         }
//         this._priorityCb = priority || ((el) => +el);
//     }
//
//     /**
//      * @private
//      * @returns {object}
//      */
//     private _getElementWithPriority(node: HeapNode<T, U> ) {
//         return {
//             priority: node.key,
//             element: node.value
//         };
//     }
//
//     /**
//      * @public
//      * @returns {number}
//      */
//     size(): number {
//         return this._heap.size();
//     }
//
//     /**
//      * @public
//      * @returns {boolean}
//      */
//     isEmpty(): boolean {
//         return this._heap.isEmpty();
//     }
//
//     /**
//      * Returns an element with highest priority in the queue
//      * @public
//      * @returns {object}
//      */
//     front(): PriorityQueueItem<T> | null {
//         if (this.isEmpty()) return null;
//         const root = this._heap.root()
//         if(!root) return null;
//         return this._getElementWithPriority(root);
//     }
//
//     /**
//      * Returns an element with lowest priority in the queue
//      * @public
//      * @returns {object}
//      */
//     back(): PriorityQueueItem<T> | null {
//         if (this.isEmpty()) return null;
//         return this._getElementWithPriority(this._heap.leaf());
//     }
//
//     /**
//      * Adds an element to the queue
//      * @public
//      * @param {any} element
//      * @param {number} p - priority
//      * @throws {Error} if priority is not a valid number
//      */
//     enqueue(element: T, p?: number): PriorityQueue<T> {
//         if (p && Number.isNaN(+p)) {
//             throw new Error('.enqueue expects a numeric priority');
//         }
//
//         if (Number.isNaN(+p!) && Number.isNaN(this._priorityCb(element))) {
//             throw new Error(
//                 '.enqueue expects a numeric priority '
//                 + 'or a constructor callback that returns a number'
//             );
//         }
//
//         const priority = !Number.isNaN(+p!) ? p : this._priorityCb(element);
//         this._heap.insert(+p!, element);
//         return this;
//     }
//
//     /**
//      * Removes and returns an element with highest priority in the queue
//      * @public
//      * @returns {object}
//      */
//     dequeue(): PriorityQueueItem<T> | null {
//         if (this.isEmpty()) return null;
//         return this._getElementWithPriority(this._heap.extractRoot());
//     }
//
//     /**
//      * Returns a sorted list of elements from highest to lowest priority
//      * @public
//      * @returns {array}
//      */
//     toArray(): PriorityQueueItem<T>[] {
//         return this._heap
//             .clone()
//             .sort()
//             .map((n) => this._getElementWithPriority(n))
//             .reverse();
//     }
//
//     /**
//      * Clears the queue
//      * @public
//      */
//     clear(): void {
//         this._heap.clear();
//     }
// }

export {}
