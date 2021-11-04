type CanFinishCase = [number, [number, number][]];
export const canFinishCase1: CanFinishCase = [3, [[1, 0], [2, 0], [1, 2]]];

let prerequisites: [number, number][] = [];
for (let i = 0; i < 1e+5; i++) {
    let r1 = Math.floor(Math.random() * (1e+5 - 1));
    let r2 = Math.floor(Math.random() * (1e+5 - 1));
    prerequisites.push([r1, r2]);
}
export const canFinishCase3: CanFinishCase = [1e+5, prerequisites];

type NetWorkDelayTimeCase = [[number, number, number][], number, number];
export const networkDelayTimeCase3: NetWorkDelayTimeCase = [[[1, 2, 1], [2, 3, 7], [1, 3, 4], [2, 1, 2]], 4, 1];

type CriticalConnectionsCase = [number, [number, number][]];
export const criticalConnectionsCase1: CriticalConnectionsCase = [4, [[0, 1], [1, 2], [2, 0], [1, 3]]];
