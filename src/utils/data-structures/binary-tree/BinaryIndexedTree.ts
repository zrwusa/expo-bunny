// const lowBit = (x: number) => x & (-x)
// const bitUpdateParent = (node: number) => node += lowBit(node)
// const bitQueryParent = (node: number) => node -= lowBit(node)
// export class BinaryIndexedTree {
//     private readonly _sums: number[] = [];
//     constructor(n: number) {
//         this._sums = new Array(n + 1).fill(0);
//     }
//
//     update (index: number, delta: number) {
//         // while (i < this._sums.length) {
//         //     debugger
//         //     this._sums[i] += delta;
//         //     i += BinaryIndexedTree.lowBit(i);
//         // }
//     }
//
//     query (index: number) {
//         // let sum = 0;
//         // while (i > 0) {
//         //     debugger
//         //     sum += this._sums[i];
//         //     i -= BinaryIndexedTree.lowBit(i);
//         // }
//         // return sum;
//     }
//
//     static lowBit (x: number) {
//         return x & (-x);
//     }
// }


export class BinaryIndexedTree {

    private readonly sumTree: Array<number>;

    public constructor(arg: number | Array<number>) {
        if (typeof arg === "number") {
            if (arg < 0 || Math.floor(arg) != arg)
                throw "Illegal argument";
            this.sumTree = [];
            for (let i = 0; i < arg; i++)
                this.sumTree.push(0);

        } else if (arg instanceof Array) {
            this.sumTree = arg.slice();
            this.sumTree.forEach((val: number, i: number) => {
                // For each consecutive 1 in the lowest order bits of i
                for (let j = 1; (i & j) != 0; j <<= 1)
                    val += this.sumTree[i ^ j];
                this.sumTree[i] = val;
            });

        } else
            throw "Illegal argument";
    }

    public update(index: number, delta: number): void {
        if (!(0 <= index && index < this.length))
            throw "Index out of bounds";
        do {
            this.sumTree[index] += delta;
            index |= index + 1;  // Set lowest 0 bit; strictly increasing
        } while (index < this.length);
    }

    public getPrefixSum(end: number): number {
        if (!(0 <= end && end <= this.length))
            throw "Index out of bounds";
        let result: number = 0;
        while (end > 0) {
            result += this.sumTree[end - 1];
            end &= end - 1;  // Clear lowest 1 bit; strictly decreasing
        }
        return result;
    }

    public getRangeSum(start: number, end: number): number {
        if (!(0 <= start && start <= end && end <= this.length))
            throw "Index out of bounds";
        return this.getPrefixSum(end) - this.getPrefixSum(start);
    }

    public get(index: number): number {
        if (!(0 <= index && index < this.length))
            throw "Index out of bounds";
        let result: number = this.sumTree[index];
        // For each consecutive 1 in the lowest order bits of index
        for (let i = 1; (index & i) != 0; i <<= 1)
            result -= this.sumTree[index ^ i];
        return result;
    }

    public set(index: number, val: number): void {
        if (!(0 <= index && index < this.length))
            throw "Index out of bounds";
        this.update(index, val - this.get(index));
    }

    public get length(): number {
        return this.sumTree.length;
    }

    public getTotal(): number {
        return this.getPrefixSum(this.length);
    }
}
