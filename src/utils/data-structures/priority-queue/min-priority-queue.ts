/**
 * @copyright 2020 Eyas Ranjous <eyas.ranjous@gmail.com>
 * @license MIT
 */


import {PriorityQueue, PriorityQueueOptions} from './priority-queue';
import {HeapNode, MinHeap} from '../heap';

/**
 * @class MinPriorityQueue
 * @extends PriorityQueue
 */
export class MinPriorityQueue<T> extends PriorityQueue<T> {
    protected _heap: MinHeap<HeapNode<T>, T>;

    constructor(options?: PriorityQueueOptions<T>) {
        super(options);
        this._heap = new MinHeap();
    }
}


