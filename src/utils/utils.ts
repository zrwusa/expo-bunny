import {TraversableNested} from "../types/utils";

export function getValue<T, K extends keyof T>(obj: T, names: K[]): Array<T[K]> {
    return names.map(i => obj[i])
}

function isObject(object: string | object | boolean | Function | number) {
    return object != null && typeof object === 'object';
}

export function deepEqual(object1: TraversableNested, object2: TraversableNested) {
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);

    if (keys1.length !== keys2.length) {
        return false;
    }

    for (const key of keys1) {
        const val1 = object1[key];
        const val2 = object2[key];
        const areObjects = isObject(val1) && isObject(val2);
        if (
            areObjects && !deepEqual(val1, val2) ||
            !areObjects && val1 !== val2
        ) {
            return false;
        }
    }

    return true;
}

export function isEqualType<T>(obj: unknown) {
    try {
        let m = obj as unknown as T
    } catch (e) {
    }
}

export const isServerSide = typeof window === "undefined";



