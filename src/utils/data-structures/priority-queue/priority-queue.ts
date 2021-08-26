import {Heap, HeapNode} from '../heap';

export interface PriorityQueueOptions<T> {
    priority?: (element: T) => number;
}

export interface PriorityQueueItem<T> {
    priority: number | string;
    element: T | null;
}

/**
 * @copyright 2020 Eyas Ranjous <eyas.ranjous@gmail.com>
 * @license MIT
 *
 * @abstract
 * @class PriorityQueue
 */
export abstract class PriorityQueue<T> {
    protected abstract _heap: Heap<HeapNode<T>, T>;
    protected _priorityCb: (element: T) => number;

    /**
     * Creates a priority queue
     * @public
     * @params {object} [options]
     */
    protected constructor(options?: PriorityQueueOptions<T>) {
        if (options) {
            const {priority} = options;
            if (priority !== undefined && typeof priority !== 'function') {
                throw new Error('.constructor expects a valid priority function');
            }
            this._priorityCb = priority || ((el) => +el);
        } else {
            this._priorityCb = (el) => +el;
        }

    }

    /**
     * @private
     * @returns {object}
     */
    _getElementWithPriority(node: HeapNode<T>): PriorityQueueItem<T> {
        return {
            priority: node.id,
            element: node.val
        };
    }

    /**
     * @public
     * @returns {number}
     */
    size(): number {
        return this._heap.size();
    }

    /**
     * @public
     * @returns {boolean}
     */
    isEmpty(): boolean {
        return this._heap.isEmpty();
    }

    /**
     * Returns an element with highest priority in the queue
     * @public
     * @returns {object}
     */
    front(): PriorityQueueItem<T> | null {
        const peek = this._heap.peek();
        if (!peek) {
            return null;
        }
        return this._getElementWithPriority(peek);
    }

    /**
     * Returns an element with lowest priority in the queue
     * @public
     * @returns {object}
     */
    back(): PriorityQueueItem<T> | null {
        const leaf = this._heap.leaf();
        if (!leaf) {
            return null;
        }
        return this._getElementWithPriority(leaf);
    }

    /**
     * Adds an element to the queue
     * @public
     * @param {any} element
     * @param priority
     * @throws {Error} if priority is not a valid number
     */
    enqueue(element: T, priority?: number | string): PriorityQueue<T> {
        if (typeof element === 'number' || typeof element === 'string') {
            priority = element;
        }

        if (priority === undefined) {
            throw new Error('.enqueue expects a numeric priority');
        }
        if (priority && Number.isNaN(+priority)) {
            throw new Error('.enqueue expects a numeric priority');
        }

        if (Number.isNaN(+priority) && Number.isNaN(this._priorityCb(element))) {
            throw new Error(
                '.enqueue expects a numeric priority '
                + 'or a constructor callback that returns a number'
            );
        }

        const _priority = !Number.isNaN(+priority) ? priority : this._priorityCb(element);
        this._heap.insert(new HeapNode<T>(_priority, element));
        return this;
    }

    /**
     * Removes and returns an element with highest priority in the queue
     * @public
     * @returns {object}
     */
    dequeue(): PriorityQueueItem<T> | null {
        const top = this._heap.poll();
        if (!top) {
            return null;
        }
        return this._getElementWithPriority(top);
    }

    /**
     * Returns a sorted list of elements from highest to lowest priority
     * @public
     * @returns {array}
     */
    toArray(): PriorityQueueItem<T>[] {
        return this._heap
            .clone()
            .sort('node')
            .map((n) => this._getElementWithPriority(n))
            .reverse();
    }

    /**
     * Clears the queue
     * @public
     */
    clear(): void {
        this._heap.clear();
    }
}
