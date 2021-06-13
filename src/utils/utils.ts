import {JSONObject, JSONSerializable} from "../types";
import {firebase} from "../firebase/firebase";
import _ from "lodash";

export function randomText(length: number) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

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

export function extractValue<Item>(data: { key: string, value: Item }[]) {
    let result: Item[] = []
    if (data && data.length > 0) {
        result = data.map(item => item.value)
    }
    return result
}

export function keyValueToArray<Item>(data: { [key: string]: Item }) {
    const itemArray: Array<Item> = []
    const keys = Object.keys(data)
    for (let i of keys) {
        itemArray.push({...data[i], _id: i})
    }
    return itemArray;
}

export function minuted(time: number) {
    const minutes = Math.floor(time / 60000).toString();
    const seconds = Math.floor((time % 60000) / 1000).toString().padStart(2, '0');
    return `${minutes}:${seconds}`
}

export function randomDate(start?: Date, end?: Date, specificProbabilityStart?: Date, specificProbability?: number) {
    if (!start) start = new Date('1970-1-1')
    if (!end) end = new Date()

    if (specificProbabilityStart) {
        if (!specificProbability) specificProbability = 0.5;
        if (Math.random() <= specificProbability) {
            return new Date(specificProbabilityStart.getTime() + Math.random() * (end.getTime() - specificProbabilityStart.getTime()));
        }
    }

    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

export function firestoreTimestampToDate(timeStamp: Date | number | firebase.firestore.Timestamp) {
    let date: Date = new Date('1970-01-01');
    switch (typeof timeStamp) {
        case 'number':
            date = new Date(timeStamp)
            break;
        case 'object':
            if (timeStamp instanceof Date) {
                date = timeStamp;
            } else {
                if (!timeStamp) {
                    // When use firestore.FieldValue.serverTimestamp(),
                    // the redux-firestore will not wait for addOnCompleteListener,
                    // just update data immediately,the timestamp will be null
                    date = new Date();
                } else {
                    const dateStamp = timeStamp as unknown as firebase.firestore.Timestamp
                    date = dateStamp.toDate();
                }
            }
            break;
        default:

            break;

    }
    return date
}

export const capitalizeWords = (str: string) => {
    return str.replace(/(?:^|\s)\S/g, (a: string) => a.toUpperCase());
}

export const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export const comparerArray = <T extends any>(otherArray: T[], limitKeys?: string[]) => {
    return function (current: T) {
        return otherArray.filter(function (other: T) {
            if (!limitKeys) {
                return _.isEqual(current, other)
            } else {
                // TODO
            }
        }).length == 0;
    }
}

export const onlyInA = <T extends any>(a: T[], b: T[]) => {
    return a.filter(comparerArray(b));
}

export const onlyInB = <T extends any>(a: T[], b: T[]) => {
    return b.filter(comparerArray(a));
}

export const diffAB = <T extends any>(a: T[], b: T[]) => {
    return onlyInA(a, b).concat(onlyInB(a, b));
}

export const deepKeysConvert = (obj: any, toType?: 'camel' | 'snake'): any => {
    const _toType = toType || 'snake';
    if (Array.isArray(obj)) {
        return obj.map(v => deepKeysConvert(v, _toType));
    } else if (obj != null && obj.constructor === Object) {
        return Object.keys(obj).reduce(
            (result, key) => {
                const newKey = _toType === 'camel' ? _.camelCase(key) : _.snakeCase(key)
                return {
                    ...result,
                    [newKey]: deepKeysConvert(obj[key], _toType),
                }
            },
            {},
        );
    }
    return obj;
}


export const deepRemoveByKey = (obj: any, keysToBeRemoved: string[]) => {
    const result = _.transform(obj, function (result: JSONSerializable, value, key: string) {
        if (_.isObject(value)) {
            value = deepRemoveByKey(value, keysToBeRemoved);
        }
        if (!keysToBeRemoved.includes(key)) {
            _.isArray(obj) ? result.push(value) : result[key] = value;
        }
    });
    return result as typeof obj
}

export const deepRenameKeys = (obj: JSONSerializable, keysMap: { [key in string]: string }) => {
    return _.transform(obj, function (result: JSONSerializable, value, key) {
        let currentKey = keysMap[key] || key;
        result[currentKey] = _.isObject(value) ? deepRenameKeys(value, keysMap) : value;
    });
}

export const deepReplaceValues = (obj: JSONSerializable, keyReducerMap: { [key in string]: (item: JSONSerializable) => any }) => {
    const newObject = _.clone(obj) as JSONSerializable;
    _.each(obj, (val, key) => {
        for (const item in keyReducerMap) {
            if (key === item) {
                newObject[key] = keyReducerMap[item](newObject);
            } else if (typeof (val) === 'object' || val instanceof Array) {
                newObject[key] = deepReplaceValues(val, keyReducerMap);
            }
        }
    });
    return newObject;
}

// function getCallStackSize() {
//     let count = 0, fn = arguments.callee;
//     while ( (fn = fn.caller) ) {
//         count++;
//     }
//     return count;
// }
// TODO determine depth and pass root node as a param through callback
export const deepAdd = (obj: JSONSerializable, keyReducerMap: { [key in string]: (item: JSONSerializable) => any }, isItemRootParent?: boolean) => {
    const newObject = _.clone(obj) as JSONObject | [];
    if (_.isObject(newObject) && !_.isArray(newObject)) {
        for (const item in keyReducerMap) {
            newObject[item] = keyReducerMap[item](newObject);
        }
    }
    _.each(obj, (val, key) => {
        if (_.isObject(val)) {
            for (const item in keyReducerMap) {
                // @ts-ignore
                newObject[key] = deepAdd(val, keyReducerMap, isItemRootParent);
            }
        }
    });
    return newObject;
}



