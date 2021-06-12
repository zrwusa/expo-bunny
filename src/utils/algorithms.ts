import {Queue, Stack, wait} from "./utils";
import {OrderType, TreeNode} from "../types";
import {DeepProxy} from '@qiwi/deep-proxy'
import {TProxyHandler} from "@qiwi/deep-proxy/typings/interface";

export const treeData: TreeNode = {
    id: '1',
    value: 0,
    children: [
        {
            id: '1-1',
            value: 0,
            children: [
                {
                    id: '1-1-1',
                    value: 0,
                    children: [
                        {
                            id: '1-1-1-1',
                            value: 0,
                            children: []
                        },
                        {
                            id: '1-1-1-2',
                            value: 0,
                            children: []
                        },
                    ]
                },
                {
                    id: '1-1-2',
                    value: 0,
                    children: [
                        {
                            id: '1-1-2-1',
                            value: 0,
                            children: []
                        },
                        {
                            id: '1-1-2-2',
                            value: 0,
                            children: []
                        },
                    ]
                }
            ]
        },
        {
            id: '1-2',
            value: 0,
            children: [
                {
                    id: '1-2-1',
                    value: 0,
                    children: [
                        {
                            id: '1-2-1-1',
                            value: 0,
                            children: []
                        },
                        {
                            id: '1-2-1-2',
                            value: 0,
                            children: []
                        },
                    ]
                },
                {
                    id: '1-2-2',
                    value: 0,
                    children: [
                        {
                            id: '1-2-2-1',
                            value: 0,
                            children: []
                        },
                        {
                            id: '1-2-2-2',
                            value: 0,
                            children: [{
                                id: '1-2-2-2-1',
                                value: 0,
                                children: []
                            }]
                        },
                    ]
                }
            ]
        },
    ]
}

export const DFS = (node: TreeNode, type: OrderType) => {
    if (!node) {
        return;
    }
    const {children} = node;
    if (children && children.length > 0) {
        const left = children[0];
        const right = children[1];
        switch (type) {
            case 'InOrder':
                DFS(left, type);
                console.log(node.id);
                DFS(right, type);
                break;
            case 'PreOrder':
                console.log(node.id);
                DFS(left, type);
                DFS(right, type);
                break;
            case 'PostOrder':
                DFS(left, type);
                DFS(right, type);
                console.log(node.id);
                break;
        }
    }
}


export const BFS = (node: TreeNode) => {
    let nodes: TreeNode[] = [];
    if (node) {
        let queue = new Queue<TreeNode>();
        queue.add(node);
        while (!queue.isEmpty()) {
            let item = queue.pop() as TreeNode;
            nodes.push(item);
            const {children} = item;
            if (children) {
                for (let i = 0; i < children.length; i++) {
                    queue.add(children[i]);
                }
            }
        }
    }
    return nodes;
}

export const treeMaxDepth = (node: TreeNode): number => {
    if (!node) {
        return 0;
    }
    const {children} = node;
    if (children && children.length > 0) {
        const left = children[0];
        const right = children[1];
        const maxLeft = treeMaxDepth(left);
        console.log(node.id);
        const maxRight = treeMaxDepth(right);
        return Math.max(maxLeft, maxRight) + 1;
    } else {
        return 1
    }
}
type HashKey = '(' | '{' | '[';
// Matching Parenthesis problem
// 20. Valid Parentheses
export type IsValidParenthesisVariables = {
    stack: Stack<HashKey>,
    char: string,
}
export const isValidParenthesis = async function (input: string, proxyHandler: TProxyHandler): Promise<boolean> {
    const onlyHashKey = input.match(/[{}\[\]()]/g)?.join('');
    if (!onlyHashKey) {
        return false;
    }

    const variables: IsValidParenthesisVariables = {
        stack: new Stack<HashKey>(),
        char: ''
    };

    let variablesProxy = new DeepProxy<IsValidParenthesisVariables>(variables, proxyHandler)
    // let variablesProxy = new Proxy<IsValidParenthesisVariables>(variables, proxyHandler);

    const hash: { [key in HashKey]: string } = {
        '(': ')',
        '{': '}',
        '[': ']',
    };

    // const stack = new Stack<HashKey>();

    for (const char of onlyHashKey) {
        await wait(500)
        // variablesProxy.char = char
        if (char in hash) {
            variablesProxy.stack.push(char as HashKey);
        } else {
            const top = variablesProxy.stack.pop();
            if (top === undefined || hash[top] !== char) {
                return false;
            }
        }
    }

    return !variablesProxy.stack.size();
};

// Using Hash Tables
// 3. Longest Substring Without Repeating Characters
export type LengthOfLongestSubstringVariables = {
    maxLen: number,
    curr: number,
    map: Map<string, number>
}
export const lengthOfLongestSubstring = async function (input: string, proxyHandler: TProxyHandler) {

    let variables: LengthOfLongestSubstringVariables = {
        maxLen: 0,
        curr: 0,
        map: new Map<string, number>(),
    }
    if (input.length < 2) {
        return input.length;
    }
    let variablesProxy = new DeepProxy<LengthOfLongestSubstringVariables>(variables, proxyHandler)

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



