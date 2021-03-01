import {TFunction} from "i18next";

export const shortenTFuciontKey = (t: TFunction, prefix: string) => {
    return (key: string) => {
        return t(`${prefix}.${key}`)
    }
}
