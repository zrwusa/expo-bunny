export type DeepLeavesWrap<T, U> = T extends { [key: string]: any } ? { [P in keyof T]: DeepLeavesWrap<T[P], U> }
    : T extends { [key: string]: any } | undefined ? { [P in keyof T]: DeepLeavesWrap<T[P], U> }
        : T extends boolean ? { [M in keyof U]: boolean }
            : T extends string ? { [M in keyof U]: string }
                // Todo : T extends (infer F) ? { [M in keyof U]: F}
                : { [M in keyof U]: T }

export type Traversable = {
    [key: string]: any
}

export type TraversableNested = {
    [key: string]: any
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




