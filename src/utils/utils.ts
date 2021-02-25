import {TraversableNested} from "../types";

export const uuidV4 = function () {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

export const getValue = <T, K extends keyof T>(obj: T, names: K[]): Array<T[K]> => {
    return names.map(i => obj[i])
}

export const isObject = (object: string | object | boolean | Function | number) => {
    return object != null && typeof object === 'object';
}

export const looseEqual = (a: any, b: any): boolean => {
    return a == b
}

export const strictEqual = (a: any, b: any): boolean => {
    return a === b
}

export const strictObjectIsEqual = (a: any, b: any): boolean => {
    return Object.is(a, b)
}

export const deepObjectStrictEqual = (object1: TraversableNested, object2: TraversableNested) => {
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
            areObjects && !deepObjectStrictEqual(val1, val2) ||
            !areObjects && val1 !== val2
        ) {
            return false;
        }
    }
    return true;
}

export const isTypeEqual = <T>(obj: unknown) => {
    try {
        let m = obj as unknown as T
    } catch (e) {
    }
}

export const isServerSide = typeof window === "undefined";

export const wait = async (ms: number, resolveValue?: any) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const finalResolveValue = resolveValue || true;
            resolve(finalResolveValue)
        }, ms)
    })
}
type BunnyAPIProtocol = {
    "success_data": any,
    "created_at": number,
    "time_spend": number,
    "http_extra": {
        "code": number,
        "message": string,
        "des": string,
        "error_code": number,
        "error_message": string,
        "error_des": string,
        "error_stack": string
    },
    "business_logic": {
        "code": string,
        "message": string,
        "des": string,
        "error_code": string,
        "error_message": string,
        "error_des": string,
        "error_stack": string
    }
}

export class BunnyAPIError extends Error {
    protected serverErrorStack;
    protected serverErrorCode;

    constructor(serverErrorMessage: string, serverErrorCode?:string,serverErrorStack?:string) {
        super(serverErrorMessage);
        if (serverErrorStack) {
            this.serverErrorStack = serverErrorStack;
        }
        if (serverErrorCode) {
            this.serverErrorCode = serverErrorCode;
        }
        this.name = new.target.name;
        if (typeof (Error as any).captureStackTrace === 'function') {
            (Error as any).captureStackTrace(this, new.target);
        }
        if (typeof Object.setPrototypeOf === 'function') {
            Object.setPrototypeOf(this, new.target.prototype);
        } else {
            (this as any).__proto__ = new.target.prototype;
        }
    }

    toJson() {
        if (this.serverErrorStack) {
            return this.serverErrorStack
        }
    }
}
