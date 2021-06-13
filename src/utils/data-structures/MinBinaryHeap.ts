export class MinBinaryHeap {

    private _values: number[];
    public get values(): number[] {
        return this._values;
    }

    public set values(v: number[]) {
        this._values = v;
    }

    constructor() {
        this._values = [];
    }

    /**
     * Adds a new element to the min binary heap. Returns the success of the operation.
     * @param n Value of an integer to be added to the heap
     */
    public insert(n: number): boolean {
        if (this.values.length === 0) {
            this._values.push(n);
            return true;
        }
        // Add the element to the end of the list
        this._values.push(n);
        // FInd the correct spot for the new node in the max heap
        return this.bubbleUp();
    }

    private bubbleUp(): boolean {
        // Index of the element we need to bubble up
        let index = this._values.length - 1;
        let parentIndex = Math.floor((index - 1) / 2); // Parent index of a child at index = n: Math.floor(n-1/2)

        let temp = 0;
        // Keep looping until the parent node is less than the child node
        while (parentIndex >= 0 && this._values[parentIndex] > this._values[index]) {
            // If parent < child, swap the nodes
            temp = this._values[index];
            this._values[index] = this._values[parentIndex];
            this._values[parentIndex] = temp;

            // Reset the indexes as we swapped the values
            index = parentIndex;
            parentIndex = Math.floor((index - 1) / 2);
        }
        return true;
    }

    /**
     * Return the minimum element in the heap and rebalances the heap.
     */
    public extractMin(): number | undefined {
        if (this._values.length === 0) {
            return undefined;
        }

        // First value in the list will always be the minimum one
        let min = this._values[0];
        let end = this._values.pop();

        // Get the last element in the list to the front
        if (this._values.length > 0) {
            if (end) this._values[0] = end;

            // Re-balance the heap by sinking down the node to the correct spot
            this.sinkDown();
        }
        return min;
    }

    private sinkDown() {
        let parentIdx = 0;
        let leftChildIdx = 0;
        let rightChildIdx = 0;
        let heapLength = this._values.length;

        let nodeToSink = this._values[parentIdx];
        let idxToSwap = 0;
        let swap = false;
        // Keep looping through the nodes util you find the right spot
        while (true) {
            leftChildIdx = (2 * parentIdx) + 1;
            rightChildIdx = (2 * parentIdx) + 2;

            swap = false;
            let leftChild = undefined;
            let rightChild = undefined;

            // Check with the left child only if it is a valid index
            if (leftChildIdx < heapLength) {
                leftChild = this._values[leftChildIdx];
                // Compare with the node to sink down
                if (nodeToSink > leftChild) {
                    idxToSwap = leftChildIdx;
                    swap = true;
                }
            }

            // Check with the right child only if it is a valid index
            if (rightChildIdx < heapLength) {
                rightChild = this._values[rightChildIdx];

                if ((swap && leftChild && leftChild > rightChild) ||
                    (!swap && nodeToSink > rightChild)) {
                    idxToSwap = rightChildIdx;
                    swap = true;
                }
            }

            if (!swap) {
                // If there is no swap required, we found the correct spot for the element
                return;
            } else {
                // Swap the elements
                this._values[parentIdx] = this._values[idxToSwap];
                this._values[idxToSwap] = nodeToSink;

                // Set the reference to index to its new value
                parentIdx = idxToSwap;
            }

        }
    }
}

// /**
//  *                   12
//  *                 /    \
//  *               27     18
//  *             /   \   /
//  *           39   33  41
//  */
// let minHeap = new MinBinaryHeap();
// minHeap.insert(18);
// minHeap.insert(27);
// minHeap.insert(12);
// minHeap.insert(39);
// minHeap.insert(33);
// minHeap.insert(41);
// console.log(minHeap.values);
// console.log(minHeap.extractMin());
// console.log(minHeap.extractMin());
// console.log(minHeap.extractMin());
// console.log(minHeap.extractMin());
// console.log(minHeap.extractMin());
// console.log(minHeap.extractMin());
// console.log(minHeap.extractMin());
