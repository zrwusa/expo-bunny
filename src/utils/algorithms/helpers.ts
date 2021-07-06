import {bunnyConsole, timeEnd, timeStart} from "../utils";

// 1e+7
// for loop map.set(j, true) 2456
// arr = [];arr[i] = 0       611
// obj = {};obj[i] = 0       607
// [...nums]                 448
// sort                      185
// for loop push             124
// for loop =                38
// arr[i] = 0                15
// obj[i] = 0                15
// reverse                   12
// indexOf last              11
// arr.toString()            1765
// JSON.stringify(arr)       316


// const arr = [];
// const obj: {[key in number]: number} = {};
// let x;
// const map = new Map<number,boolean>()
// const time0 = timeStart();
// for (let i = 1e+7; i > 0; i--) {
//     arr.push(i);
// }
// timeEnd(time0, 'for loop push');
//
// const time1 = timeStart();
// x = [...arr]
// timeEnd(time1, '[...nums]');

// const time2 = timeStart();
// const sorted = arr.sort((a, b) => b - a);
// timeEnd(time2, 'sorted')

// const time3 = timeStart();
// const reversed = arr.reverse();
// timeEnd(time3, 'reverse')

// const time4 = timeStart();
// const indexOfHalf = arr.indexOf(5e+6);
// timeEnd(time4, 'indexOf half')
//
// const time5 = timeStart();
// for (let i = 1e+7; i > 0; i--) {
//     map.set(i, false);
// }
// timeEnd(time5, 'map.set(i, true)')
//
// const time6 = timeStart();
// for (let i = 1e+7; i > 0; i--) {
//     arr[i] = 0;
// }
// timeEnd(time6, 'arr[i] = 0')
//
// const time7 = timeStart();
// for (let i = 1e+7; i > 0; i--) {
//     obj[i] = 0;
// }
// timeEnd(time7, 'obj[i] = 0')
//
// const time8 = timeStart();
// x = [...arr];
// timeEnd(time8, '[...arr] ')


// Stack Exceed Size
// Internet Explorer
// IE6: 1130
// IE7: 2553
// IE8: 1475
// IE9: 20678
// IE10: 20677
// Mozilla Firefox
// 3.6: 3000
// 4.0: 9015
// 5.0: 9015
// 6.0: 9015
// 7.0: 65533
// 8b3: 63485
// 17: 50762
// 18: 52596
// 19: 52458
// 42: 281810
// Google Chrome
// 14: 26177
// 15: 26168
// 16: 26166
// 25: 25090
// 47: 20878
// 51: 41753
// Safari
// 4: 52426
// 5: 65534
// 9: 63444
// Opera
// 10.10: 9999
// 10.62: 32631
// 11: 32631
// 12: 32631
// Edge
// 87: 13970

export const runAlgorithm = async (algorithm: Function, isStringify: boolean = false, ...args: any) => {
    const startTime = new Date().getTime();
    const result = await algorithm(...args);
    const timeSpent = new Date().getTime() - startTime;
    bunnyConsole.log(algorithm.name, 'result -> ', isStringify ? JSON.stringify(result) : result, 'time spent -> ', timeSpent + 'ms');
    return result;
}

export const isOneDiffOrdered = (wordA: string, wordB: string) => {
    let diffCount = 0;
    for (let i = 0, len = wordA.length; i < len; i++) {
        if (wordA[i] !== wordB[i]) {
            diffCount++;
            if (diffCount > 1) {
                return false;
            }
        }
    }
    return true;
}

export const isOneDiffOrderedPieced = (wordA: string, wordB: string) => {
    for (let i = 0, len = wordA.length; i < len; i++) {
        for (let j = 0; j < 26; j++) {
            const piecedWord = wordA.substr(0, i) + String.fromCharCode(97 + j) + wordA.substr(i + 1);
            if (piecedWord === wordB) {
                return true;
            }
        }
    }
    return false;
}

// export const genOneDiffOrderedPieced = (wordA: string) => {
//     const result = [];
//     let temp = [wordA];
//
//
//     while (temp.length > 0) {
//         const top = temp.shift();
//         // const indexes = [Math.floor(Math.random() * wordA.length), Math.floor(Math.random() * wordA.length), Math.floor(Math.random() * wordA.length)];
//         let indexes = top!
//         for (let i = 0, len = indexes.length; i < len; i++) {
//             const candidates = [Math.floor(Math.random() * 26), Math.floor(Math.random() * 26), Math.floor(Math.random() * 26)];
//             for (let j of candidates) {
//                 const piecedWord = top!.substr(0, i) + String.fromCharCode(97 + j) + top!.substr(i + 1);
//                 result.push(piecedWord);
//                 if (i === indexes.length - 1 && j === candidates.length - 1) {
//                     temp.push(piecedWord);
//                     break;
//                 }
//                 if (result.length > 99) {
//                     return result;
//                 }
//             }
//         }
//
//     }
//
//     return result;
// }
// runAlgorithm(genOneDiffOrderedPieced,true, 'hit').then()

export const isOneDiff = (word1: string, word2: string) => {
    let diffCount = 0;
    for (let c1 of word1) {
        if (!word2.includes(c1)) {
            diffCount++;
            if (diffCount > 1) {
                return false;
            }
        }
    }
    diffCount = 0;
    for (let c2 of word2) {
        if (!word1.includes(c2)) {
            diffCount++;
            if (diffCount > 1) {
                return false;
            }
        }
    }
    return true;
}


const searchInSortedArray = function (nums: number[], target: number) {
    let left = 0, right = nums.length - 1;
    while (left <= right) {
        // const mid = Math.floor(left + right / 2);
        const mid = left + Math.floor((right - left) / 2);
        const midEle = nums[mid];
        const leftEle = nums[left];

        if (target === midEle) return mid;

        if (target < leftEle) {
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    return -1;
}


export type Direction = 'up' | 'down' | 'left' | 'right';
export type Coordinate = { y: number, x: number };
export const fourthQuadrantMove = (departure: Coordinate, direction: Direction, matrix: number[][], judgeDeadOrDeadCells?: ((destination: Coordinate) => boolean) | Coordinate[]) => {
    let destinationX: number = departure.x, destinationY: number = departure.y;
    switch (direction) {
        case "up":
            destinationY = departure.y + 1;
            break;
        case "right":
            destinationX = departure.x + 1;
            break;
        case "down":
            destinationY = departure.y - 1;
            break;
        case "left":
            destinationX = departure.x - 1;
            break;
    }
    const destination = {y: destinationY, x: destinationX};

    if (matrix) {
        if (destinationY < 0 || destinationY > matrix.length - 1 || destinationX < 0 || destinationX > matrix[destinationY].length - 1) {
            return undefined
        }
    }

    if (judgeDeadOrDeadCells) {
        if (judgeDeadOrDeadCells instanceof Function) {
            if (judgeDeadOrDeadCells(destination)) {
                return undefined;
            }
        } else {
            for (let deadCell of judgeDeadOrDeadCells) {
                if (destination.x === deadCell.x && destination.y === deadCell.y) {
                    return undefined
                }
            }
        }
    }

    return destination;
}

export type MatrixCell = [number, number]
export const fourthQuadrantMoveByIndex = (departure: MatrixCell, direction: Direction, matrix?: Array<Array<number>>, judgeDeadOrDeadCells?: ((destination: MatrixCell) => boolean) | Array<MatrixCell>) => {
    const directions = {
        up: [-1, 0],
        right: [0, 1],
        down: [1, 0],
        left: [0, -1]
    }

    let newRow = departure[0] + directions[direction][0]
    let newCol = departure[1] + directions[direction][1]
    const destination: MatrixCell = [newRow, newCol];

    if (matrix) {
        if (newRow < 0 || newRow > matrix.length - 1 || newCol < 0 || newCol > matrix[newRow].length - 1) {
            return undefined
        }
    }


    if (judgeDeadOrDeadCells) {
        if (judgeDeadOrDeadCells instanceof Function) {
            if (judgeDeadOrDeadCells(destination)) {
                return undefined;
            }
        } else {
            for (let deadCell of judgeDeadOrDeadCells) {
                if (newRow === deadCell[0] && newCol === deadCell[1]) {
                    return undefined
                }
            }
        }
    }

    return destination;
}


export const getRouteByParentsHash = (parents: { [key in string]: Coordinate }, leaf: Coordinate, hashFunction: (cell: Coordinate) => string) => {
    const route: Coordinate[] = [leaf];
    const value: Coordinate[] = [leaf];
    while (value.length > 0) {
        const cur = value.shift();
        const curParent = parents[hashFunction(cur!)];
        if (curParent) {
            value.push(curParent);
            route.push(curParent)
        }
    }
    return route.reverse();
}

export type HorizontalDirection = -1 | 1 | 0;
export type VerticalDirection = 1 | -1 | 0;
export const getDirectionVector = (from?: Coordinate, to?: Coordinate): { x: HorizontalDirection, y: VerticalDirection } => {
    if (!from || !to) {
        return {x: 0, y: 0}
    }
    let horizontal: HorizontalDirection;
    let vertical: VerticalDirection;
    horizontal = to.x > from.x ? 1 : -1;
    vertical = to.y > from.y ? 1 : -1;
    if (to.x === from.x) {
        horizontal = 0;
    }
    if (to.y === from.y) {
        vertical = 0;
    }
    return {x: horizontal, y: vertical}
}
