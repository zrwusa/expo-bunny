import {arrayRemove, uuidV4} from "../../utils";
import {HeapNode, MinHeap} from "../heap";

export type VertexId = string | number;

export interface I_Graph<V, E> {

    containsVertex(vertexOrId: V | VertexId): boolean;

    getVertex(vertexOrId: VertexId | V): V | null;

    getVertexId(vertexOrId: V | VertexId): VertexId;

    vertexSet(): Map<VertexId, V>;

    addVertex(v: V): boolean;

    removeVertex(vertexOrId: V | VertexId): boolean

    removeAllVertices(vertices: V[] | VertexId[]): boolean;

    degreeOf(vertexOrId: V | VertexId): number;

    edgesOf(vertexOrId: V | VertexId): E[];

    containsEdge(src: V | VertexId, dest: V | VertexId): boolean;

    // containsEdge(e: E): boolean;

    getEdge(srcOrId: V | VertexId, destOrId: V | VertexId): E | null;

    getAllEdges(src: V, dest: V): E[];

    edgeSet(): E[];

    // addEdge(src: V, dest: V): E;

    addEdge(edge: E): boolean;

    removeEdgeBetween(srcOrId: V | VertexId, destOrId: V | VertexId): E | null;

    removeEdge(edge: E): E | null;

    removeAllEdges(v1: VertexId | V, v2: VertexId | V): (E | null)[];

    // removeAllEdges(edges: E[] | [VertexId, VertexId]): boolean;

    setEdgeWeight(srcOrId: V | VertexId, destOrId: V | VertexId, weight: number): boolean;

    getMinPathBetween(v1: V | VertexId, v2: V | VertexId, isWeight?: boolean): V[] | null;

    getNeighbors(vertexOrId: V | VertexId): V[];
}

export class AbstractVertex {
    private _id: VertexId;
    public get id(): VertexId {
        return this._id;
    }

    public set id(v: VertexId) {
        this._id = v;
    }

    constructor(id: VertexId) {
        this._id = id;
    }
}

export abstract class AbstractEdge {

    private _weight: number;
    get weight(): number {
        return this._weight;
    }

    set weight(v: number) {
        this._weight = v;
    }

    private _hashCode: string;

    get hashCode(): string {
        return this._hashCode;
    }

    set hashCode(v: string) {
        this._hashCode = v;
    }

    protected constructor(weight?: number) {
        if (weight === undefined) weight = AbstractEdge.DEFAULT_EDGE_WEIGHT;
        this._weight = weight;
        this._hashCode = uuidV4();
    }

    static DEFAULT_EDGE_WEIGHT: number = 1;
}

export abstract class AbstractGraph<V extends AbstractVertex, E extends AbstractEdge> implements I_Graph<V, E> {

    protected constructor() {
    }


    protected _vertices: Map<VertexId, V> = new Map<VertexId, V>();

    abstract removeEdgeBetween(srcOrId: V | VertexId, destOrId: V | VertexId): E | null;

    abstract removeEdge(edge: E): E | null;

    getVertex(vertexOrId: VertexId | V): V | null {
        const vertexId = this.getVertexId(vertexOrId);
        return this._vertices.get(vertexId) || null
    }

    getVertexId(vertexOrId: V | VertexId): VertexId {
        return vertexOrId instanceof AbstractVertex ? vertexOrId.id : vertexOrId;
    }

    containsVertex(vertexOrId: V | VertexId): boolean {
        return !!this.getVertex(vertexOrId);
    }

    vertexSet(): Map<VertexId, V> {
        return this._vertices;
    }

    abstract getAllEdges(srcOrId: V | null | VertexId, destOrId: V | null | VertexId): E[];

    getEdge(srcOrId: V | null | VertexId, destOrId: V | null | VertexId): E | null {
        return this.getAllEdges(srcOrId, destOrId)[0] || null;
    }

    addVertex(newVertex: V): boolean {
        if (this.containsVertex(newVertex)) {
            return false;
        }
        this._vertices.set(newVertex.id, newVertex);
        return true;
    }

    removeVertex(vertexOrId: V | VertexId): boolean {
        const vertexId = this.getVertexId(vertexOrId);
        return this._vertices.delete(vertexId);
    }

    removeAllVertices(vertices: V[] | VertexId[]): boolean {
        let removed: boolean[] = [];
        for (let v of vertices) {
            removed.push(this.removeVertex(v));
        }
        return removed.length > 0;
    }

    abstract degreeOf(vertexOrId: V | VertexId): number;

    abstract edgeSet(): E[];

    abstract edgesOf(vertexOrId: V | VertexId): E[];

    containsEdge(v1: VertexId | V, v2: VertexId | V): boolean {
        const edge = this.getEdge(v1, v2);
        return !!edge;
    }

    abstract addEdge(edge: E): boolean;

    removeAllEdges(v1: VertexId | V, v2: VertexId | V): (E | null)[] {
        let allEdges = this.getAllEdges(v1, v2);
        const removed: (E | null)[] = [];
        for (let edge of allEdges) {
            removed.push(this.removeEdge(edge));
        }
        return removed;
    }

    setEdgeWeight(srcOrId: VertexId | V, destOrId: VertexId | V, weight: number): boolean {
        const edge = this.getEdge(srcOrId, destOrId);
        if (edge) {
            edge.weight = weight;
            return true;
        } else {
            return false;
        }
    }

    // abstract getMinPathBetween(v1: V | VertexId, v2: V | VertexId, isWeight?: boolean): V[] | null;

    abstract getNeighbors(vertexOrId: V | VertexId): V[];

    getAllPathsBetween(v1: V | VertexId, v2: V | VertexId): V[][] {
        let paths: V[][] = [];
        const vertex1 = this.getVertex(v1);
        const vertex2 = this.getVertex(v2);
        if (!(vertex1 && vertex2)) {
            return [];
        }

        const dfs = (cur: V, dest: V, visiting: Map<V, boolean>, path: V[]) => {
            visiting.set(cur, true);

            if (cur === dest) {
                paths.push([vertex1, ...path]);
            }

            const neighbors = this.getNeighbors(cur);
            for (let neighbor of neighbors) {
                if (!visiting.get(neighbor)) {
                    path.push(neighbor);
                    dfs(neighbor, dest, visiting, path);
                    arrayRemove(path, vertex => vertex === neighbor);
                }
            }

            visiting.set(cur, false);
        }

        dfs(vertex1, vertex2, new Map<V, boolean>(), []);
        return paths;
    }


    getPathSumWeight(path: V[]): number {
        let sum = 0;
        for (let i = 0; i < path.length; i++) {
            sum += this.getEdge(path[i], path[i + 1])?.weight || 0;
        }
        return sum;
    }

    getMinCostBetween(v1: V | VertexId, v2: V | VertexId, isWeight?: boolean): number | null {
        if (isWeight === undefined) isWeight = false;

        if (isWeight) {
            const allPaths = this.getAllPathsBetween(v1, v2);
            let min = Infinity;
            for (let path of allPaths) {
                min = Math.min(this.getPathSumWeight(path), min);
            }
            return min;
        } else {
            // BFS
            const vertex2 = this.getVertex(v2);
            const vertex1 = this.getVertex(v1);
            if (!(vertex1 && vertex2)) {
                return null;
            }

            const visited: Map<V, boolean> = new Map();
            const queue: V[] = [vertex1];
            visited.set(vertex1, true);
            let cost = 0;
            while (queue.length > 0) {
                for (let i = 0; i < queue.length; i++) {
                    const cur = queue.shift();
                    if (cur === vertex2) {
                        return cost;
                    }

                    // TODO consider optimizing to AbstractGraph
                    const neighbors = this.getNeighbors(cur!);
                    for (let neighbor of neighbors) {
                        if (!visited.has(neighbor)) {
                            visited.set(neighbor, true);
                            queue.push(neighbor);
                        }
                    }
                }
                cost++;
            }
            return null;
        }
    }

    getMinPathBetween(v1: V | VertexId, v2: V | VertexId, isWeight?: boolean): V[] | null {
        if (isWeight === undefined) isWeight = false;

        if (isWeight) {
            const allPaths = this.getAllPathsBetween(v1, v2);
            let min = Infinity;
            let minIndex = -1;
            let index = 0;
            for (let path of allPaths) {
                const pathSumWeight = this.getPathSumWeight(path);
                if (pathSumWeight < min) {
                    min = pathSumWeight;
                    minIndex = index;
                }
                index++;
            }
            return allPaths[minIndex] || null;
        } else {
            // BFS
            let minPath: V[] = [];
            const vertex1 = this.getVertex(v1);
            const vertex2 = this.getVertex(v2);
            if (!(vertex1 && vertex2)) {
                return [];
            }

            const dfs = (cur: V, dest: V, visiting: Map<V, boolean>, path: V[]) => {
                visiting.set(cur, true);

                if (cur === dest) {
                    minPath = [vertex1, ...path];
                    return;
                }

                const neighbors = this.getNeighbors(cur);
                for (let neighbor of neighbors) {
                    if (!visiting.get(neighbor)) {
                        path.push(neighbor);
                        dfs(neighbor, dest, visiting, path);
                        arrayRemove(path, vertex => vertex === neighbor);
                    }
                }

                visiting.set(cur, false);
            }

            dfs(vertex1, vertex2, new Map<V, boolean>(), []);
            return minPath;
        }
    }

    // single source all destinations shortest path
    // Dijkstra,Bellman-Ford,SPFA
    // ???A* search algorithm
    // ???Johnson
    // Floyd-warshall O(n^3)
    getNearest(v1: V | VertexId, isWeight?: boolean): V[] {
        if (isWeight === undefined) isWeight = false;

        if (isWeight) {
            // Bellman-Ford can find negative weight cycle O(EV)
            const nearest: V[] = [];
            return nearest;

        } else {
            return this.getNeighbors(v1);
        }
    }

    /**
     * Dijkstra algorithm time: O(VE) space: O(V + E)
     * @param src
     * @param dest
     */
    dijkstraWithoutHeap(src: V | VertexId, dest?: V | VertexId | null) {
        if (dest === undefined) dest = null;
        const vertices = this._vertices;
        const distMap: Map<V, number> = new Map();
        const set: Set<V> = new Set();
        const preMap: Map<V, V | null> = new Map(); // predecessor
        const srcVertex = this.getVertex(src);

        const destVertex = dest ? this.getVertex(dest) : null

        if (!srcVertex) {
            return null;
        }

        // const heap = new MinHeap<HeapNode<V>, V>();
        for (let [id, v] of vertices) {
            distMap.set(v, Infinity);
            // const dist = v === srcVertex ? 0 : Infinity;
            // heap.insert(new HeapNode(dist, srcVertex));
        }
        distMap.set(srcVertex, 0);
        preMap.set(srcVertex, null);

        const getMin = () => {
            let min = Infinity;
            let minV: V | null = null;
            for (let [key, val] of distMap) {
                if (!set.has(key)) {
                    if (val < min) {
                        min = val;
                        minV = key;
                    }
                }
            }
            return minV;
        }


        for (let i = 1; i < vertices.size; i++) {
            const cur = getMin();
            if (cur) {
                set.add(cur);
                if (destVertex && destVertex === cur) {
                    return {distMap, preMap, set};
                }
                const neighbors = this.getNeighbors(cur);
                for (let neighbor of neighbors) {
                    if (!set.has(neighbor)) {
                        const edge = this.getEdge(cur, neighbor);
                        if (edge) {
                            if (edge.weight + distMap.get(cur)! < distMap.get(neighbor)!) {
                                distMap.set(neighbor, edge.weight + distMap.get(cur)!);
                                preMap.set(neighbor, cur);
                            }
                        }
                    }
                }
            }
        }
        return {distMap, preMap, set};

    }


    /**
     * Dijkstra algorithm time: O(logVE) space: O(V + E)
     * @param src
     * @param dest
     */
    dijkstra(src: V | VertexId, dest?: V | VertexId | null) {
        if (dest === undefined) dest = null;
        const vertices = this._vertices;
        const distMap: Map<V, number> = new Map();
        const seen: Set<V> = new Set();
        const preMap: Map<V, V | null> = new Map(); // predecessor

        const srcVertex = this.getVertex(src);
        const destVertex = dest ? this.getVertex(dest) : null

        if (!srcVertex) {
            return null;
        }

        for (let [id, v] of vertices) {
            distMap.set(v, Infinity);
        }

        const heap = new MinHeap<HeapNode<V>, V>();
        heap.insert(new HeapNode(0, srcVertex));

        distMap.set(srcVertex, 0);
        preMap.set(srcVertex, null);

        while (heap.size() > 0) {
            const curHeapNode = heap.poll();
            const dist = curHeapNode?.id;
            const cur = curHeapNode?.val;
            if (dist !== undefined && typeof dist === 'number') {
                if (cur) {
                    seen.add(cur);
                    if (cur === destVertex) {
                        return {distMap, preMap, seen};
                    }
                    const neighbors = this.getNeighbors(cur);
                    for (let neighbor of neighbors) {
                        if (!seen.has(neighbor)) {
                            const weight = this.getEdge(cur, neighbor)?.weight;
                            if (typeof weight === 'number') {
                                const distSrcToNeighbor =  distMap.get(neighbor);
                                if (distSrcToNeighbor) {
                                    if (dist + weight < distSrcToNeighbor) {
                                        heap.insert(new HeapNode(dist + weight, neighbor));
                                        preMap.set(neighbor, cur);
                                        distMap.set(neighbor,dist + weight );
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        return {distMap, preMap, seen};
    }

    abstract getEndsOfEdge(edge: E): [V, V] | null;


    /**
     * BellmanFord time:O(VE) space:O(V)
     * one to rest pairs
     * @param src
     * @param scanNegativeCycle
     * @param getMin
     * @param genPath
     */
    bellmanFord(src: V | VertexId, scanNegativeCycle?: boolean, getMin?: boolean, genPath?: boolean) {
        if (getMin === undefined) getMin = false;
        if (genPath === undefined) genPath = false;

        const srcVertex = this.getVertex(src);
        const paths: V[][] = [];
        const distMap: Map<V, number> = new Map();
        const preMap: Map<V, V> = new Map(); // predecessor
        let min = Infinity;
        let minPath: V[] = [];
        // TODO
        let hasNegativeCycle: boolean | undefined = undefined;
        if (scanNegativeCycle) hasNegativeCycle = false;
        if (!srcVertex) return {hasNegativeCycle, distMap, preMap, paths, min, minPath};

        const vertices = this._vertices;
        const numOfVertices = vertices.size;
        const edges = this.edgeSet();
        const numOfEdges = edges.length;

        this._vertices.forEach(vertex => {
            distMap.set(vertex, Infinity);
        });

        distMap.set(srcVertex, 0);

        for (let i = 1; i < numOfVertices; ++i) {
            for (let j = 0; j < numOfEdges; ++j) {
                const ends = this.getEndsOfEdge(edges[j]);
                if (ends) {
                    const [s, d] = ends;
                    const weight = edges[j].weight;
                    const sWeight = distMap.get(s);
                    const dWeight = distMap.get(d);
                    if (sWeight !== undefined && dWeight !== undefined) {
                        if (distMap.get(s) !== Infinity && sWeight + weight < dWeight) {
                            distMap.set(d, sWeight + weight);
                            genPath && preMap.set(d, s);
                        }
                    }
                }
            }
        }

        let minDest: V | null = null;
        if (getMin) {
            distMap.forEach((d, v) => {
                if (v !== srcVertex) {
                    if (d < min) {
                        min = d;
                        if (genPath) minDest = v;
                    }
                }
            })
        }

        if (genPath) {
            for (let [id, v] of vertices) {
                const path: V[] = [v];
                let parent = preMap.get(v);
                while (parent !== undefined) {
                    path.push(parent);
                    parent = preMap.get(parent);
                }
                const reversed = path.reverse()
                if (v === minDest) minPath = reversed;
                paths.push(reversed);
            }
        }

        for (let j = 0; j < numOfEdges; ++j) {
            const ends = this.getEndsOfEdge(edges[j]);
            if (ends) {
                const [s] = ends;
                let weight = edges[j].weight;
                const sWeight = distMap.get(s);
                if (sWeight) {
                    if (sWeight !== Infinity && sWeight + weight < sWeight) hasNegativeCycle = true;
                }
            }
        }

        return {hasNegativeCycle, distMap, preMap, paths, min, minPath};
    }

    /**
     * Floyd algorithm time: O(V^3) space: O(V^2), not support graph with negative weight cycle
     * all pairs
     */
    floyd() {
        const idAndVertices = [...this._vertices];
        const n = idAndVertices.length;

        let costs: number[][] = [];
        let predecessor: (V | null)[][] = [];
        // successors

        for (let i = 0; i < n; i++) {
            costs[i] = [];
            predecessor[i] = [];
            for (let j = 0; j < n; j++) {
                predecessor[i][j] = null;
            }
        }

        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                costs[i][j] = this.getEdge(idAndVertices[i][1], idAndVertices[j][1])?.weight || Infinity;
            }
        }

        for (let k = 0; k < n; k++) {
            for (let i = 0; i < n; i++) {
                for (let j = 0; j < n; j++) {
                    if (costs[i][j] > costs[i][k] + costs[k][j]) {
                        costs[i][j] = costs[i][k] + costs[k][j];
                        predecessor[i][j] = idAndVertices[k][1];
                    }
                }
            }
        }
    }

    // Minimum Spanning Tree
}
