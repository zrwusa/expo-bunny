export function getValue<T, K extends keyof T>(obj: T, names: K[]): Array<T[K]> {
    return names.map(i => obj[i])
}
