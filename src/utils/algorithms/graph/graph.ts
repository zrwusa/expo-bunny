/* --- start Graph --- */
// 133	Clone Graph	★★	138					queue + hashtable
// 200	Number of Islands	★★	547	695	733	827	1162
import {runAlgorithm} from "../helpers";

class Cord {
    y: number;
    x: number;

    constructor(y: number, x: number) {
        this.y = y;
        this.x = x;
    }
}

function numIslands(grid: string[][]): number {
    const boundY = grid.length - 1;
    const boundX = grid[0].length - 1;
    const dirs = [{y: -1, x: 0}, {y: 1, x: 0}, {y: 0, x: -1}, {y: 0, x: 1}];

    const isLand = (cord: Cord) => {
        if (cord.y < 0 || cord.y > boundY || cord.x < 0 || cord.x > boundX) return false;
        return grid[cord.y][cord.x] === '1';
    }

    let ans: number = 0;

    const dfs = (cur: Cord) => {
        if (isLand(cur)) {
            grid[cur.y][cur.x] = '2';
        } else {
            return;
        }
        for (let dir of dirs) {
            dfs(new Cord(cur.y + dir.y, cur.x + dir.x));
        }
    }

    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
            if (grid[row][col] === '1') {
                dfs(new Cord(row, col));
                ans++;
            }
        }
    }
    return ans;
}

// grid + connected components
// 841	Keys and Rooms	★★	1202					DFS, connected components
// 207	Course Schedule	★★★	210	802				topology sorting
class LinkedNode {
    val: number;
    next: LinkedNode | null;

    constructor(val: number, next: LinkedNode | null) {
        this.val = val;
        this.next = next;
    }
}

// 0: initial, 1: visiting ,2: visited
type TopologyStatus = 0 | 1 | 2;

function canFinish(numCourses: number, prerequisites: number[][]): boolean {
    let hash: { [key in number]: number[] } = {};

    for (const [course, preRqt] of prerequisites) {
        if (!hash[preRqt]) hash[preRqt] = [];
        hash[preRqt].push(course);
    }
    let status: TopologyStatus[] = new Array(numCourses).fill(0);

    const isCircle = (index: number) => {
        if (status[index] === 1) return true;
        if (status[index] === 2) return false;
        status[index] = 1;
        if (hash[index]) {
            for (let postCourse of hash[index]) {
                if (isCircle(postCourse)) return true;
            }
        }
        status[index] = 2;
    }

    for (let i = 0; i < numCourses; i++) {
        if (isCircle(i)) return false;
    }

    return true;
}

// runAlgorithm(canFinish, false, 3, [[1, 0], [2, 0], [1, 2]]).then();

// 399	Evaluate Division	★★★	839	952	990	721	737	union find
// 785	Is Graph Bipartite?	★★★	886	1042				bipartition, graph coloring
// 997	Find the Town Judge	★★★						in/out degrees
// 433	Minimum Genetic Mutation	★★★	815	863	1129	1263
// unweighted shortest path / BFS
// 684	Redundant Connection	★★★★	685	1319				cycle, union find
// 743	Network Delay Time	★★★★	787	882	924	1334		weighted shortest path
// 847
// Shortest Path Visiting All Nodes
// ★★★★	864	1298				BFS
// 332	Reconstruct Itinerary	★★★★						Eulerian path
// 1192
// Critical Connections in a Network
// ★★★★						Tarjan
// 943	Find the Shortest Superstring	★★★★★	980	996				Hamiltonian path (DFS / DP)
// 959	Regions Cut By Slashes	★★★★★						union find / grid + CCs
/* --- end Graph --- */
export {}
