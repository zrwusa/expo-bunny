/* --- start stack --- */
import {TProxyHandler} from "@qiwi/deep-proxy/typings/interface";
import {Stack} from "../../data-structures/stack";
import {DeepProxy} from "@qiwi/deep-proxy";
import {wait} from "../../utils";

type HashKey = '(' | '{' | '[';
// Matching Parenthesis problem
// 20. Valid Parentheses

export const isValidParenthesis = async function (input: string, proxyHandler: TProxyHandler): Promise<boolean> {
    type IsValidParenthesisVariables = {
        stack: Stack<HashKey>,
        char: string,
    }
    const onlyHashKey = input.match(/[{}\[\]()]/g)?.join('');

    if (!onlyHashKey) {
        return false;
    }

    let variablesProxy = new DeepProxy<IsValidParenthesisVariables>({
        stack: new Stack<HashKey>(),
        char: ''
    }, proxyHandler)

    const hash: { [key in HashKey]: string } = {
        '(': ')',
        '{': '}',
        '[': ']',
    };

    for (const char of onlyHashKey) {
        await wait(500)
        if (char in hash) {
            variablesProxy.stack.push(char as HashKey);
        } else {
            const top = variablesProxy.stack.pop();
            if (top === null || hash[top] !== char) {
                return false;
            }
        }
    }

    return !variablesProxy.stack.size();
};
/* --- end stack --- */
