/**
 * @copyright 2020 Eyas Ranjous <eyas.ranjous@gmail.com>
 * @license MIT
 */

import {MaxHeap} from "../heap/max-heap";

const {PriorityQueue} = require('./priority-queue');

/**
 * @class MaxPriorityQueue
 * @extends PriorityQueue
 */
export class MaxPriorityQueue extends PriorityQueue {
    constructor(options) {
        super(options);
        this._heap = new MaxHeap();
    }
}
