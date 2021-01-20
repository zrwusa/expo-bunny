import {TFunction} from "i18next";

export const stFactory = (t: TFunction, prefix: string) => {
    return (key: string) => {
        return t(`${prefix}.${key}`)
    }
}
