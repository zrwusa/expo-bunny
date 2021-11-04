// TODO Consider whether to discard
export class Matrix<T> {
    private readonly _elements: T[][];

    constructor(array: T[][]) {
        this._elements = array;
    }

    toArray(): T[][] {
        return this._elements;
    }
}
