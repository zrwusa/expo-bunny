import dayjs from 'dayjs';

import {IMessage} from './types';

export function isSameDay<TMessage extends IMessage>(
    currentMessage: TMessage,
    diffMessage: TMessage | null | undefined,
) {
    if (!diffMessage || !diffMessage.createdAt) {
        return false;
    }

    const currentCreatedAt = dayjs(currentMessage.createdAt);
    const diffCreatedAt = dayjs(diffMessage.createdAt);

    if (!currentCreatedAt.isValid() || !diffCreatedAt.isValid()) {
        return false;
    }

    return currentCreatedAt.isSame(diffCreatedAt, 'day');
}

export function isSameUser(
    currentMessage: IMessage,
    diffMessage: IMessage | null | undefined,
) {
    return !!(
        diffMessage &&
        diffMessage.user &&
        currentMessage.user &&
        diffMessage.user._id === currentMessage.user._id
    );
}

const styleString = (color: string) => `color: ${color}; font-weight: bold`;

const headerLog = '%c[bunny-chat]';

export const warning = (...args: any) =>
    console.log(headerLog, styleString('orange'), ...args);

export const error = (...args: any) =>
    console.log(headerLog, styleString('red'), ...args);
