import {TFunction} from 'i18next';

export const shortenTFunctionKey = (t: TFunction, prefix: string) => {
    return (key: string) => {
        return t(`${prefix}.${key}`)
    }
}
