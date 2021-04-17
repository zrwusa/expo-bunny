// export type DeepLeavesWrap<T, U> = T extends { [key: string]: any } ? { [P in keyof T]: DeepLeavesWrap<T[P], U> }
//     : T extends { [key: string]: any } | undefined ? { [P in keyof T]: DeepLeavesWrap<T[P], U> }
//         : T extends boolean ? { [M in keyof U]: boolean }
//             : T extends string ? { [M in keyof U]: string }
//                 // Todo : T extends (infer F) ? { [M in keyof U]: F}
//                 : { [M in keyof U]: T };
type AnyFunction = (...args: any[]) => any;
type Primitive =
    | number
    | string
    | boolean
    | symbol
    | undefined
    | null
    | void
    | AnyFunction
    | Date;

export type Cast<T, TComplex> = { [M in keyof TComplex]: T };
// export type DeepLeavesWrap<T, TComplex> = {
//     [K in keyof T]: T[K] extends object ? DeepLeavesWrap<T[K], TComplex>
//         : { [M in keyof TComplex]: T[K] }
// };

export type DeepLeavesWrap<T, TComplex> =
    T extends string ? Cast<string, TComplex>
        : T extends number ? Cast<number, TComplex>
        : T extends boolean ? Cast<boolean, TComplex>
            : T extends undefined ? Cast<undefined, TComplex>
                : T extends null ? Cast<null, TComplex>
                    : T extends void ? Cast<void, TComplex>
                        : T extends symbol ? Cast<symbol, TComplex>
                            : T extends AnyFunction ? Cast<AnyFunction, TComplex>
                                : T extends Date ? Cast<Date, TComplex>
                                    : {
                                        [K in keyof T]:
                                        T[K] extends (infer U)[] ? DeepLeavesWrap<U, TComplex>[]
                                            : DeepLeavesWrap<T[K], TComplex>;
                                    }


// export type JSONSerializable = {
//     [ket: string]: JSONSerializable | boolean | number | string | Array<JSONSerializable | boolean | number | string>
// }

type Json = null | string | number | boolean | Json [] | { [name: string]: Json }

export type JSONSerializable = {
    [key: string]: any
}

export type JSONValue = string | number | boolean | undefined | JSONObject | JSONArray;

interface JSONObject {
    [x: string]: JSONValue;
}

interface JSONArray extends Array<JSONValue> {
}

export type TypeName<T> = T extends string
    ? "string"
    : T extends number
        ? "number"
        : T extends boolean
            ? "boolean"
            : T extends undefined
                ? "undefined"
                : T extends Function
                    ? "function"
                    : "object";

export type JsonKeys<T> = keyof {
    [P in keyof T]: number
}

const arr = ["1", 2, 4, 5, 6] as const;
type Range = typeof arr[number];
const a: Range = 2;


/**
 * A function that emits a side effect and does not return anything.
 */
export type Procedure = (...args: any[]) => void;

export type DebounceOptions = {
    isImmediate?: boolean;
    maxWait?: number;
};

export interface DebouncedFunction<F extends Procedure> {
    (this: ThisParameterType<F>, ...args: Parameters<F>): void;

    cancel: () => void;
}

export type MonthKey =
    'January' |
    'February' |
    'March' |
    'April' |
    'May' |
    'June' |
    'July' |
    'August' |
    'September' |
    'October' |
    'November' |
    'December';

export type Month = { [key in MonthKey]: string }


