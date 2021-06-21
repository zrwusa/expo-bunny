/* --- start hash table --- */

// Using Hash Tables TODO
// 3. Longest Substring Without Repeating Characters
import {TProxyHandler} from "@qiwi/deep-proxy/typings/interface";
import {DeepProxy} from "@qiwi/deep-proxy";
import {wait} from "../../utils";

export const lengthOfLongestSubstring = async function (input: string, proxyHandler: TProxyHandler) {
    type LengthOfLongestSubstringVariables = {
        maxLen: number,
        curr: number,
        map: Map<string, number>
    }

    let variablesProxy = new DeepProxy<LengthOfLongestSubstringVariables>({
        maxLen: 0,
        curr: 0,
        map: new Map<string, number>(),
    }, proxyHandler);

    if (input.length < 2) {
        return input.length;
    }

    for (let i = 0; i < input.length; i++) {
        variablesProxy.curr = i;
        await wait(500);
        const mapped = variablesProxy.map.get(input[i]);
        if (mapped === undefined) {
            variablesProxy.curr++;
        } else {
            variablesProxy.curr = Math.min(i - mapped, variablesProxy.curr + 1);
        }
        variablesProxy.maxLen = Math.max(variablesProxy.maxLen, variablesProxy.curr);
        variablesProxy.map.set(input[i], i);
    }

    return variablesProxy.maxLen;
};
/* --- end hash table --- */
