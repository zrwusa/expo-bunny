import {arrayRemove, uuidV4} from "../../utils";

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

    dijkstra(src: V | VertexId) {

    }

    bellmanFord(src: V | VertexId) {
        let min = Infinity;
        const n = this._vertices.size;
        const map: Map<V, number> = new Map();

        for (let i = 0; i < n; i++) {

        }
    }

    floyd() {

    }

    // Floyd not support graph with negative weight cycle O(V^3)
}
