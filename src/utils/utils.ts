import {JSONSerializable} from "../types";

export const uuidV4 = function () {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

export class IncrementId {
    private _id: string
    private readonly _prefix: string

    constructor(prefix?: string) {
        this._prefix = prefix ? prefix : ''
        this._id = this._prefix + '0'
    }

    getId() {
        const {_id, _prefix} = this;
        if (!_id) {
            this._id = _prefix + '0'
        } else {
            let idNumStr = _id.substr(_prefix.length, _id.length - _prefix.length)
            let newIdNum = parseInt(idNumStr, 10) + 1
            this._id = _prefix + newIdNum.toString()
        }
        return this._id
    }
}

export function incrementId(prefix?: string) {
    let _prefix = prefix ? prefix : ''
    let _id = _prefix + '0';
    return function id() {
        let idNumStr = _id.substr(_prefix.length, _id.length - _prefix.length)
        let newIdNum = parseInt(idNumStr, 10) + 1
        _id = _prefix + newIdNum.toString()
        return _id
    }
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

export const deepObjectStrictEqual = (object1: JSONSerializable, object2: JSONSerializable) => {
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

export function reverseColor(oldColor: string) {
    let oldColorTemp = '0x' + oldColor.replace(/#/g, '');
    let str = '000000' + (0xFFFFFF - Number(oldColorTemp)).toString(16);
    return '#' + str.substring(str.length - 6, str.length);
}

export const isSameStructure = (objA: unknown, objB: unknown) => {
    let objATraversable = objA as JSONSerializable;
    let objBTraversable = objB as JSONSerializable;
    const objAKeys = Object.keys(objATraversable)
    const objBKeys = Object.keys(objBTraversable)
    let isSame = true
    if (objAKeys.length !== objBKeys.length) {
        return isSame = false
    } else {
        objAKeys.forEach((i) => {
            if (!objBKeys.includes(i)) {
                return isSame = false
            }
        })
        return isSame;
    }
}

export const isLeafParent = (obj: object) => {
    let isLeaf: boolean = true
    Object.values(obj).forEach(value => {
        if (typeof value === 'object' && value instanceof Array) {
            value.forEach(item => {
                if (typeof item === 'object') {
                    return false;
                }
            })
            return isLeaf = true
        }
        if (!['string', 'boolean', 'number', 'undefined', 'function'].includes(typeof value) && (value !== null)) {
            return isLeaf = false
        }
    })
    return isLeaf;
}

export const addDays = (date: Date, days: number): Date => {
    date.setDate(date.getDate() + days);
    return date;
}

export const wait = async (ms: number, resolveValue?: any) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const finalResolveValue = resolveValue || true;
            resolve(finalResolveValue)
        }, ms)
    })
}

export class AuthAPIError extends Error {
    protected serverErrorStack;
    protected serverErrorCode;

    constructor(serverErrorMessage: string, serverErrorCode?: string, serverErrorStack?: string) {
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
}

export class BunnyAPIError extends Error {
    protected serverErrorStack;
    protected serverErrorCode;

    constructor(serverErrorMessage: string, serverErrorCode?: string, serverErrorStack?: string) {
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
}

export class NomicsAPIError extends Error {
    protected serverErrorStack;
    protected serverErrorCode;

    constructor(serverErrorMessage: string, serverErrorCode?: string, serverErrorStack?: string) {
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
}
