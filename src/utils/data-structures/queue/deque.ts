import {Queue} from './queue';

// TODO not perfect
export class Deque<T> extends Queue<T> {

    add(element: T): Deque<T> {
        this.enqueue(element);
        return this;
    }

    addFirst(element: T) {
        this.enqueue(element);
        return this;
    }

    addLast(element: T) {
        this._elements.unshift(element);
    }

    contains(element: T) {
        return this._elements.indexOf(element) > -1;
    }

    element(): T | null {
        return null;
    }

    getFirst(): T | null {
        return this.peekFirst();
    }

    getLast(): T | null {
        return this.peekLast();
    }

    offer(element: T) {
        return this.addFirst(element);
    }

    offerFirst(element: T) {
        return this.addFirst(element);
    }

    offerLast(element: T) {
        return this.addLast(element);
    }

    peekFirst(): T | null {
        return super.front();
    }

    peekLast(): T | null {
        return super.back();
    }

    poll(): T | null {
        return super.dequeue();
    }

    pollFirst(): T | null {
        return this.poll();
    }

    pollLast(): T | null {
        if (this.size() === 0) return null;

        const last = this.back();
        this._offset = this._elements.length - 1;

        // only remove dequeued elements when reaching half size
        // to decrease latency of shifting elements.
        this._elements = this._elements.slice(0, this._offset);
        this._offset = 0;
        return last;
    }

    pop(): T | null {
        return this.dequeue();
    }

    push(element: T): number {
        return this._elements.unshift(element);
    }

    removeFirst() {
        this.poll();
    }

    removeLast() {
        this.pollLast();
    }
}
