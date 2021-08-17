/* --- start tree --- */


// 94 Binary Tree Inorder Traversal	★ 144 145 429 589 590 987 1302 traversal
import {OrderType, TreeNode} from '../../../types';
import {TProxyHandler} from '@qiwi/deep-proxy/typings/interface';
import {DeepProxy} from '@qiwi/deep-proxy';
import {wait} from '../../utils';
import {BinaryTreeNode, Queue, Stack} from '../../data-structures';
import {
    Coordinate,
    Direction,
    fourthQuadrantMove,
    fourthQuadrantMoveByIndex,
    getRouteByParentsHash,
    isOneDiffOrdered,
    isOneDiffOrderedPieced,
    MatrixCell,
    runAlgorithm
} from '../helpers';
import {
    cutOffTreeCase1,
    cutOffTreeCase2,
    cutOffTreeCase3,
    cutOffTreeCase4,
    cutOffTreeCase5,
    cutOffTreeCase6,
    cutOffTreeCase7,
    ladderLengthCase1,
    ladderLengthCase2,
    ladderLengthCase3,
    ladderLengthCase4,
    ladderLengthCase5,
    ladderLengthCase6,
    ladderLengthCase7,
    updateMatrixCase1,
    updateMatrixCase2,
    updateMatrixCase3,
    updateMatrixCase4
} from './cases';

export async function binaryTreeInorderTraversal(root: BinaryTreeNode<number> | undefined, proxyHandler: TProxyHandler): Promise<number[]> {
    type Variables = {
        node: BinaryTreeNode<number> | null
    }

    let proxyVariables = new DeepProxy<Variables>({node: null}, proxyHandler);

    if (!root) {
        return []
    }

    let leftResult = root.left && await binaryTreeInorderTraversal(root.left, proxyHandler);
    await wait(500);
    proxyVariables.node = root.left;

    await wait(500);
    proxyVariables.node = root;

    const rightResult = root.right && await binaryTreeInorderTraversal(root.right, proxyHandler);
    await wait(500);
    proxyVariables.node = root.right;


    if (leftResult && rightResult) {
        return [
            ...leftResult,
            root.id,
            ...rightResult
        ]
    } else if (leftResult) {
        return [
            ...leftResult,
            root.id]
    } else if (rightResult) {
        return [
            root.id,
            ...rightResult
        ]
    } else {
        return [root.id]
    }

}

export const DFS = async (node: TreeNode<number>, type: OrderType, proxyHandler: TProxyHandler) => {
    type Variables = { current: TreeNode<number>, nodeNeedPrint: TreeNode<number> | undefined }

    let variablesProxy = new DeepProxy<Variables>({
        current: node,
        nodeNeedPrint: node
    }, proxyHandler);

    if (!variablesProxy.current) {
        return;
    }

    const {children} = variablesProxy.current;
    if (children && children.length > 0) {
        const left = children[0];
        const right = children[1];
        switch (type) {
            case 'InOrder':
                await DFS(left, type, proxyHandler);
                // console.log(node.id);
                variablesProxy.nodeNeedPrint = node;
                await wait(500)

                await DFS(right, type, proxyHandler);
                break;
            case 'PreOrder':
                // console.log(node.id);
                variablesProxy.nodeNeedPrint = node;
                await wait(500)

                await DFS(left, type, proxyHandler);
                await DFS(right, type, proxyHandler);
                break;
            case 'PostOrder':
                await DFS(left, type, proxyHandler);
                await DFS(right, type, proxyHandler);
                // console.log(node.id);
                variablesProxy.nodeNeedPrint = node;
                await wait(500)

                break;
        }
    }
}

// 102	Binary Tree Level Order Traversal	★★	107	429	872			collecting nodes
export const BFS = async (node: TreeNode<number>, proxyHandler: TProxyHandler) => {
    type Variables = { node: TreeNode<number> }

    let nodes: TreeNode<number>[] = [];

    let variablesProxy = new DeepProxy<Variables>({node: node,}, proxyHandler);

    if (node) {
        let queue = new Queue<TreeNode<number>>();
        queue.enqueue(node);
        while (!queue.isEmpty()) {
            let item = queue.dequeue() as TreeNode<number>;
            nodes.push(item);
            variablesProxy.node = item;
            await wait(500);
            const {children} = item;
            if (children) {
                for (let i = 0; i < children.length; i++) {
                    queue.enqueue(children[i]);
                }
            }
        }
    }
    return nodes;
}

/* --- start Search (BFS/DFS) ---*/

// 17	Letter Combinations of a Phone Number	★★	39	40	77	78	90	216
export async function letterCombinations(digits: string, proxyHandler: TProxyHandler): Promise<string[]> {
    // corner case
    if (digits.length === 0) return [];

    type PhoneKeys = '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';

    let proxyVariables = new DeepProxy<{ accumulated: string, result: string[] }>({
        accumulated: '',
        result: []
    }, proxyHandler)

    const digitsMap: { [key in PhoneKeys]: string } = {
        '2': 'abc',
        '3': 'def',
        '4': 'ghi',
        '5': 'jkl',
        '6': 'mno',
        '7': 'pqrs',
        '8': 'tuv',
        '9': 'wxyz'
    };

    const dfs = async (level: number, accumulated: Stack<string>) => {
        // base case
        if (digits.length === level) {
            proxyVariables.result.push(accumulated.toArray().join('').toString());
            return;
        }

        for (const char of digitsMap[digits[level] as PhoneKeys]) {
            // recursive rule
            accumulated.push(char);
            await dfs(level + 1, accumulated);
            await wait(500);
            accumulated.pop();
        }
    }

    await dfs(0, new Stack<string>());

    return proxyVariables.result;
}


// 46	Permutations	★★	47	784	943	996				Permutation
const permute = function <T>(nums: T[]) {
    if (nums.length === 1) {
        return [nums];
    }

    let result: T[][] = [];

    const dfs = (accumulated: T[], rest: T[]) => {
        if (accumulated.length === nums.length) {
            result.push([...accumulated]);
            return;
        }

        for (let i = 0, len = rest.length; i < len; i++) {
            accumulated.push(rest[i]);
            const restBacktrack = [...rest];
            rest.splice(i, 1); // delete ith element to generate rest,then pass in next recursion
            dfs(accumulated, rest);
            rest = restBacktrack;
            accumulated.pop();
        }
    }

    dfs([], [...nums]);

    return result;
};

const permuteMN = function <T>(nums: T[], n: number, excludeSelf: boolean = true) {
    if (n > nums.length) {
        return [];
    }
    if (nums.length === 1 && n === 1) {
        return [nums];
    }

    let result: T[][] = [];

    const dfs = (accumulated: T[], rest: T[], level: number) => {
        if (level === n) {
            result.push([...accumulated]);
            return;
        }

        for (let i = 0, len = rest.length; i < len; i++) {
            accumulated.push(rest[i]);

            let restBackTrack: T[] = [];
            if (excludeSelf) {
                restBackTrack = [...rest];
                rest.splice(i, 1);
            }

            dfs(accumulated, rest, level + 1);

            accumulated.pop();
            if (excludeSelf) {
                rest = restBackTrack;
            }
        }
    }
    dfs([], nums, 0);
    return result;
};


// Combination
const combineMN = function <T>(nums: T[], n: number, excludeSelf: boolean = true) {
    if (n > nums.length) {
        return [];
    }
    if (nums.length === 1 && n === 1) {
        return [nums];
    }

    let result: T[][] = [];
    let hash: { [key in string]: 'exist' } = {};
    const dfs = (accumulated: T[], rest: T[], level: number) => {
        if (level === n) {
            const key = [...accumulated].sort().join('');
            if (!hash[key]) {
                hash[key] = 'exist';
                result.push([...accumulated]);
            }
            return;
        }

        for (let i = 0, len = rest.length; i < len; i++) {
            accumulated.push(rest[i]);

            let restBackTrack: T[] = [];
            if (excludeSelf) {
                restBackTrack = [...rest];
                rest.splice(i, 1);
            }

            dfs(accumulated, rest, level + 1);
            accumulated.pop();

            if (excludeSelf) {
                rest = restBackTrack;
            }
        }
    }
    dfs([], nums, 0);
    return result;
};

// console.log(combineMN(['(','(',')',')'], 4, false))

// 22	Generate Parentheses	★★★	301							DFS
function generateParenthesis(n: number): string[] {
    // corner case
    if (n === 1) {
        return ['()']
    }

    let result: string[] = [];

    let openCount = 0, closeCount = 0;

    const dfs = (accumulated: string, level: number) => {
        // base case
        if (level === 2 * n) {
            result.push(accumulated);
            return;
        }

        // recursion rule
        if (openCount < n) {
            accumulated += '(';
            openCount++;
            dfs(accumulated, level + 1);
            openCount--;
            accumulated = accumulated.substr(0, accumulated.length - 1);
        }

        if (level != 0) {
            if (openCount > closeCount) {
                accumulated += ')';
                closeCount++;
                dfs(accumulated, level + 1);
                closeCount--;
                accumulated = accumulated.substr(0, accumulated.length - 1);
            }
        }
    }

    dfs('', 0);

    return result;
}

// 37	Sudoku Solver	★★★	51	52						DFS
// 79	Word Search	★★★	212							DFS
// 127	Word Ladder	★★★★	126	752	818					BFS

export function ladderLengthDFS(beginWord: string, endWord: string, wordList: string[], proxyHandler: TProxyHandler): number {

    let proxyVariables = new DeepProxy<{ tree: TreeNode<string> }>({tree: new TreeNode(beginWord, beginWord, beginWord)}, proxyHandler)

    const wordListLength = wordList.length;
    // corner case
    if (wordListLength < 1) {
        return 0;
    }
    if (!wordList.includes(endWord)) {
        return 0;
    }

    let shortest = 0;

    const dfs = (accumulated: string[], rest: string[], level: number, parentNode: TreeNode<string>) => {
        // base case
        if (accumulated[accumulated.length - 1] === endWord) {
            if (shortest === 0 || accumulated.length < shortest) {
                shortest = accumulated.length;
            }
            return;
        }

        if (level === wordListLength) {
            return;
        }

        if (level === 0) {
            accumulated.push(beginWord);
        }

        for (let i = 0, len = rest.length; i < len; i++) {
            if (isOneDiffOrdered(rest[i], accumulated[accumulated.length - 1])) {
                accumulated.push(rest[i]);
                let newNode = new TreeNode(accumulated.join(), accumulated.join(), accumulated.join());
                parentNode.addChildren(newNode);
                const backTrackRest = [...rest];
                rest.splice(i, 1);
                dfs(accumulated, rest, level + 1, newNode);
                accumulated.pop();
                rest = backTrackRest;
            }
        }
    }

    dfs([], wordList, 0, proxyVariables.tree);

    return shortest;
}

// Plagiarized 3440 ms
export const ladderLengthPlagiarized = function (beginWord: string, endWord: string, wordList: string[], proxyHandler: TProxyHandler) {
    let queue = [beginWord]
    let level = 1
    if (!wordList.includes(endWord)) {
        return 0
    }
    let map: { [key in string]: boolean } = {}
    while (queue.length) {
        let diffByOne = []
        while (queue.length) {
            // console.log(queue)
            let ele = queue.shift()
            map[ele!] = true
            let eleChar = ele!.split('')
            for (let i = 0; i < wordList.length; i++) {
                let count = 0
                let wordChar = wordList[i].split('')
                for (let j = 0; j < eleChar.length; j++) {
                    if (wordChar[j] !== eleChar[j]) {
                        count++
                        if (count == 2) {
                            break
                        }
                    }
                }
                if (count == 1) {
                    if (wordList[i] == endWord) {
                        return level + 1
                    }
                    if (!map[wordList[i]]) {
                        diffByOne.push(wordList[i])
                        map[wordList[i]] = true
                    }
                }
            }
        }
        if (diffByOne.length) {
            queue = [...queue, ...diffByOne]
        }
        level++
    }
    return 0
};

export const ladderLengthBFS = function (beginWord: string, endWord: string, wordList: string[]) {
    if (wordList.length < 1 || !wordList.includes(endWord)) {
        return 0;
    }

    let wordListSet = new Set();

    let queue: string[] = [beginWord];
    let level = 1;
    let tempQueue: string[] = [];
    while (queue.length > 0) {
        const top = queue.shift();

        for (let word of wordList) {
            if (isOneDiffOrdered(word, top!) && !wordListSet.has(word)) {
                if (word === endWord) {
                    return level + 1;
                }
                wordListSet.add(word);
                tempQueue.push(word);
            }
        }

        if (queue.length === 0) {
            queue = tempQueue;
            tempQueue = [];
            level++;
        }
    }
    return 0;
}

export const ladderLengthTwoWayBFS = function (beginWord: string, endWord: string, wordList: string[]) {
    if (wordList.length < 1 || !wordList.includes(endWord)) {
        return 0;
    }

    let queue1: string[] = [beginWord];
    let queue2: string[] = [endWord];

    let set1: Set<string> = new Set(queue1);
    let set2: Set<string> = new Set(queue2);

    let level = 1;
    let tempQueue: string[] = [];
    while (queue1.length > 0 && queue2.length > 0) {
        if (queue1.length > queue2.length) {
            let tempQ = queue2;
            queue2 = queue1;
            queue1 = tempQ;
            let tempSet = set2;
            set2 = set1;
            set1 = tempSet;
        }

        const top = queue1.shift();

        for (let word of wordList) {
            if (isOneDiffOrderedPieced(word, top!) && !set1.has(word)) {
                if (set2.has(word)) {
                    return level + 1;
                }
                set1.add(word);
                tempQueue.push(word);
            }
        }

        if (queue1.length === 0) {
            queue1 = tempQueue;
            tempQueue = [];
            level++;
        }
    }
    return 0;
}

const runAllLadderLength = async () => {
    await runAlgorithm(ladderLengthTwoWayBFS, false, ...ladderLengthCase1);
    await runAlgorithm(ladderLengthTwoWayBFS, false, ...ladderLengthCase2);
    await runAlgorithm(ladderLengthTwoWayBFS, false, ...ladderLengthCase3);
    await runAlgorithm(ladderLengthTwoWayBFS, false, ...ladderLengthCase4);
    await runAlgorithm(ladderLengthTwoWayBFS, false, ...ladderLengthCase5);
    await runAlgorithm(ladderLengthTwoWayBFS, false, ...ladderLengthCase6);
    await runAlgorithm(ladderLengthTwoWayBFS, false, ...ladderLengthCase7);
}
// runAllLadderLength().then()

// 542	01 Matrix	★★★	675	934						BFS
export const updateMatrix = (mat: number[][]): number[][] => {
    const rowCount = mat.length, colCount = mat[0].length;

    let departureQueue: Coordinate[] = [];
    let costMat: number[][] = [];

    for (let y = 0; y < rowCount; y++) {
        let costMatRow = new Array(colCount);
        costMatRow.fill(Infinity);
        costMat.push(costMatRow);
        for (let x = 0; x < colCount; x++) {
            if (mat[y][x] === 0) {
                costMat[y][x] = 0;
                departureQueue.push({y, x});
            }
        }
    }

    let cost = 0;
    let tempQueue: Coordinate[] = [];

    while (departureQueue.length > 0) {
        let top = departureQueue.shift();

        let directions: Direction[] = ['up', 'down', 'left', 'right'];
        for (let direction of directions) {
            const destination = fourthQuadrantMove(top!, direction, mat);
            if (destination) {
                if (costMat[destination.y][destination.x] === Infinity) {
                    costMat[destination.y][destination.x] = cost + 1;
                    tempQueue.push(destination);
                }
            }
        }

        if (departureQueue.length === 0) {
            cost++;
            departureQueue = tempQueue;
            tempQueue = [];
        }
    }
    return costMat;
}

export const updateMatrixByIndex = (mat: number[][]): number[][] => {
    const rowCount = mat.length, colCount = mat[0].length;

    let departureQueue: MatrixCell[] = [];
    let costMat: number[][] = [];

    for (let y = 0; y < rowCount; y++) {
        let costMatRow = new Array(colCount);
        costMatRow.fill(Infinity);
        costMat.push(costMatRow);
        for (let x = 0; x < colCount; x++) {
            if (mat[y][x] === 0) {
                costMat[y][x] = 0;
                departureQueue.push([y, x]);
            }
        }
    }

    let cost = 0;
    let tempQueue: MatrixCell[] = [];

    while (departureQueue.length > 0) {
        let top = departureQueue.shift();

        let directions: Direction[] = ['up', 'down', 'left', 'right'];
        for (let direction of directions) {
            const destination = fourthQuadrantMoveByIndex(top!, direction, mat);
            if (destination) {
                if (costMat[destination[0]][destination[1]] === Infinity) {
                    costMat[destination[0]][destination[1]] = cost + 1;
                    tempQueue.push(destination);
                }
            }
        }

        if (departureQueue.length === 0) {
            cost++;
            departureQueue = tempQueue;
            tempQueue = [];
        }
    }
    return costMat;
}

const runAllUpdateMatrix = async () => {
    await runAlgorithm(updateMatrix, false, ...updateMatrixCase1);
    await runAlgorithm(updateMatrixByIndex, false, ...updateMatrixCase1);
    await runAlgorithm(updateMatrix, false, ...updateMatrixCase2);
    await runAlgorithm(updateMatrixByIndex, false, ...updateMatrixCase2);
    await runAlgorithm(updateMatrix, false, ...updateMatrixCase3);
    await runAlgorithm(updateMatrixByIndex, false, ...updateMatrixCase3);
    await runAlgorithm(updateMatrix, false, ...updateMatrixCase4);
    await runAlgorithm(updateMatrixByIndex, false, ...updateMatrixCase4);
}
// runAllUpdateMatrix().then()


// 675. Cut Off Trees for Golf Event                BFS  ,A star is a kind of advanced BFS
export async function cutOffTree(forest: number[][], proxyHandler?: TProxyHandler): Promise<number> {
    let proxyVariables = proxyHandler ? new DeepProxy<{ forest: number[][], cur: Coordinate, route: Coordinate[][] }>({
        forest,
        cur: {y: 0, x: 0},
        route: []
    }, proxyHandler) : undefined;

    const rowCount = forest.length;
    if (rowCount < 1) return -1;

    const colCount = forest[0].length;
    if (colCount < 1) return -1;

    const treeCoordinates: Array<Coordinate> = [];
    for (let rowIndex = 0; rowIndex < forest.length; rowIndex++) {
        for (let colIndex = 0; colIndex < forest[rowIndex].length; colIndex++) {
            if (forest[rowIndex][colIndex] > 1) {
                treeCoordinates.push({y: rowIndex, x: colIndex})
            }
        }
    }

    if (treeCoordinates.length < 1) return -1;

    const sortedTreeCoordinates: Coordinate[] = treeCoordinates.sort((a, b) => forest[a.y][a.x] - forest[b.y][b.x]);

    let cost = 0;
    let directions: Direction[] = ['up', 'down', 'left', 'right'];

    const hashFunction = (cell: Coordinate) => cell.y + ',' + cell.x;

    // const isChildrenHash = false;
    // const cellWithChildrenHash: { [key in string]: Coordinate | undefined } = {};
    // const cellWithChildrenHashFunction = (cell: Coordinate, direction: Direction) => cell.y + ',' + cell.x + '-' + direction;

    const bfs = async (from: Coordinate, to: Coordinate): Promise<number> => {
        let queue: Coordinate[] = [from];
        let level = 0;
        let tempQueue: Coordinate[] = [];
        let visited: { [key in string]: boolean } = {};
        visited[hashFunction(from!)] = true;
        let parents: { [key in string]: Coordinate } = {};

        while (queue.length > 0) {
            const front = queue.shift();
            // if (proxyVariables) proxyVariables.cur = front!;


            for (let direction of directions) {
                let destination;

                destination = fourthQuadrantMove(front!, direction, forest, (d) => {
                    return forest[d.y][d.x] === 0;
                });

                if (destination && !visited[hashFunction(destination)]) {
                    visited[hashFunction(destination!)] = true;
                    parents[hashFunction(destination)] = front!;
                    if (destination.y === to.y && destination.x === to.x) {
                        if (proxyVariables) proxyVariables.cur = destination;
                        await wait(100);

                        const route = getRouteByParentsHash(parents, to, hashFunction);
                        proxyVariables!.route.push(route);

                        return level + 1;
                    } else {
                        tempQueue.push(destination);
                    }
                }
            }

            if (queue.length === 0) {
                queue = tempQueue;
                tempQueue = [];
                level++
            }
        }
        return -1;
    }

    let begin: Coordinate = {y: 0, x: 0};

    if (!(sortedTreeCoordinates[0].y === 0 && sortedTreeCoordinates[0].x === 0)) {
        sortedTreeCoordinates.unshift(begin);
    }

    while (sortedTreeCoordinates.length > 0) {
        const front = sortedTreeCoordinates.shift();
        const second = sortedTreeCoordinates[0];
        if (front && second) {
            const bfsResult = await bfs(front, second);
            if (bfsResult === -1) {
                return -1;
            } else {
                cost += bfsResult;
            }
        }
        if (sortedTreeCoordinates.length === 0) {
            return cost;
        }
    }
    return -1;
}

function cutOffTreeByIndex(forest: number[][]): number {
    const rowCount = forest.length;
    if (rowCount < 1) return -1;

    const colCount = forest[0].length;
    if (colCount < 1) return -1;

    const treeCoordinates: Array<MatrixCell> = [];
    for (let rowIndex = 0; rowIndex < forest.length; rowIndex++) {
        for (let colIndex = 0; colIndex < forest[rowIndex].length; colIndex++) {
            if (forest[rowIndex][colIndex] > 1) {
                treeCoordinates.push([rowIndex, colIndex])
            }
        }
    }

    if (treeCoordinates.length < 1) return -1;

    const sortedTreeCoordinates: MatrixCell[] = treeCoordinates.sort((a, b) => forest[a[0]][a[1]] - forest[b[0]][b[1]]);

    let cost = 0;
    let directions: Direction[] = ['up', 'down', 'left', 'right'];
    const hashFunction = (cell: MatrixCell) => cell[0] + ',' + cell[1];

    const bfs = (from: MatrixCell, to: MatrixCell): number => {
        let queue: MatrixCell[] = [from];
        let level = 0;
        let tempQueue: MatrixCell[] = [];
        let visited: { [key in string]: boolean } = {};
        visited[hashFunction(from)] = true;
        while (queue.length > 0) {
            const front = queue.shift();
            for (let direction of directions) {
                const destination = fourthQuadrantMoveByIndex(front!, direction, forest, (d) => {
                    return forest[d[0]][d[1]] === 0;
                });
                if (destination && !visited[destination[0].toString() + ',' + destination[1].toString()]) {
                    if (forest[destination[0]][destination[1]] === forest[to[0]][to[1]]) {
                        return level + 1;
                    } else {
                        visited[destination[0].toString() + ',' + destination[1].toString()] = true;
                        tempQueue.push(destination);
                    }
                }
            }

            if (queue.length === 0) {
                queue = tempQueue;
                tempQueue = [];
                level++
            }
        }
        return -1;
    }

    let begin: MatrixCell = [0, 0];

    if (!(sortedTreeCoordinates[0][0] === 0 && sortedTreeCoordinates[0][1] === 0)) {
        sortedTreeCoordinates.unshift(begin);
    }

    while (sortedTreeCoordinates.length > 0) {
        const front = sortedTreeCoordinates.shift();
        const second = sortedTreeCoordinates[0];
        if (front && second) {
            const bfsResult = bfs(front, second);
            if (bfsResult === -1) {
                return -1;
            }
            cost += bfsResult;
        }
        if (sortedTreeCoordinates.length === 0) {
            return cost;
        }
    }
    return -1;
}

const runAllCutOffTree = async () => {
    await runAlgorithm(cutOffTree, false, ...cutOffTreeCase1);
    await runAlgorithm(cutOffTreeByIndex, false, ...cutOffTreeCase1);

    await runAlgorithm(cutOffTree, false, ...cutOffTreeCase2);
    await runAlgorithm(cutOffTreeByIndex, false, ...cutOffTreeCase2);

    await runAlgorithm(cutOffTree, false, ...cutOffTreeCase3);
    await runAlgorithm(cutOffTreeByIndex, false, ...cutOffTreeCase3);

    await runAlgorithm(cutOffTree, false, ...cutOffTreeCase4);
    await runAlgorithm(cutOffTreeByIndex, false, ...cutOffTreeCase4);

    await runAlgorithm(cutOffTree, false, ...cutOffTreeCase5);
    await runAlgorithm(cutOffTreeByIndex, false, ...cutOffTreeCase5);

    await runAlgorithm(cutOffTree, false, ...cutOffTreeCase6);
    await runAlgorithm(cutOffTreeByIndex, false, ...cutOffTreeCase6);

    await runAlgorithm(cutOffTree, false, ...cutOffTreeCase7);
    await runAlgorithm(cutOffTreeByIndex, false, ...cutOffTreeCase7);
}
// runAllCutOffTree().then()


// 698	Partition to K Equal Sum Subsets	★★★	93	131	241	282	842			Partition
/* --- end Search (BFS/DFS) ---*/

// 100	Same Tree ★★	101	104	110	111	572	965
// 814	Binary Tree Pruning	★★★	669	1325
// 112	Path Sum	★★★	113	437
// 129	Sum Root to Leaf Numbers	★★★	257
// 236 Lowest Common Ancestor of a Binary Tree ★★★	235
// 297	Serialize and Deserialize Binary Tree	★★★	449
// 508	Most Frequent Subtree Sum	★★★
// 124	Binary Tree Maximum Path Sum	★★★	543	687	Use both children, return one
// 968	Binary Tree Cameras	★★★★	337	979


export const treeMaxDepth = (node: TreeNode<number>): number => {
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
/* --- end tree ---*/
