export type TreeLeafDeep<T, U> = T extends Function
    ? U
    : T extends object
        ? { [P in keyof T]: TreeLeafDeep<T[P], U> }
        : U;

export type ForkDeep<T, U> = T extends Function
    ? U
    : T extends object
        ? { [P in keyof T]: ForkDeep<T[P], U> }
        : { [M in keyof U]: T extends boolean ? boolean : T };
