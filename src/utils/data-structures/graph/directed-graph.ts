import {arrayRemove} from "../../utils";
import {AbstractEdge, AbstractGraph, AbstractVertex, VertexId} from "./abstract-graph";

export class DirectedVertex extends AbstractVertex {
    constructor(id: VertexId) {
        super(id);
    }
}

export class DirectedEdge extends AbstractEdge {
    constructor(src: VertexId, dest: VertexId, weight?: number) {
        super(weight);
        this._src = src;
        this._dest = dest;
    }

    private _src: VertexId;
    get src(): VertexId {
        return this._src;
    }

    set src(v: VertexId) {
        this._src = v;
    }


    private _dest: VertexId;
    get dest(): VertexId {
        return this._dest;
    }

    set dest(v: VertexId) {
        this._dest = v;
    }
}

export interface I_DirectedGraph<V, E> {
    incomingEdgesOf(vertex: V): E[];

    outgoingEdgesOf(vertex: V): E[];

    inDegreeOf(vertexOrId: V | VertexId): number;

    outDegreeOf(vertexOrId: V | VertexId): number;

    getEdgeSrc(e: E): V | null;

    getEdgeDest(e: E): V | null;
}

// 0 means unknown, 1 means visiting, 2 means visited;
export type TopologicalStatus = 0 | 1 | 2;

export class DirectedGraph<V extends DirectedVertex, E extends DirectedEdge> extends AbstractGraph<V, E> implements I_DirectedGraph<V, E> {

    constructor() {
        super();
    }

    getAllEdges(srcOrId: V | null | VertexId, destOrId: V | null | VertexId): E[] {
        let edges: E[] = [];

        if (srcOrId !== null && destOrId !== null) {
            const src: DirectedVertex | null = this.getVertex(srcOrId);
            const dest: DirectedVertex | null = this.getVertex(destOrId);

            if (src && dest) {
                edges = this._edges.filter(edge => edge.src === src.id && edge.dest === dest.id);
            }
        }

        return edges;
    }

    addEdge(edge: E): boolean {
        if (!(this.containsVertex(edge.src) && this.containsVertex(edge.dest))) {
            return false;
        }

        this._edges.push(edge);
        return true;
    }

    removeEdgeByEnds(srcOrId: V | VertexId, destOrId: V | VertexId): E | null {

        const src: V | null = this.getVertex(srcOrId);
        const dest: V | null = this.getVertex(destOrId);

        if (!src || !dest) {
            return null;
        }
        return arrayRemove<E>(this._edges, edge => edge.dest === dest.id && edge.src === src.id)[0] || null;
    }

    removeEdge(edge: E): E | null {
        const removed = arrayRemove<E>(this._edges, e => e.hashCode === edge.hashCode);
        return removed[0] || null;
    }

    removeAllEdges(src: VertexId | V, dest: VertexId | V): E[] {
        return [];
    }

    incomingEdgesOf(vertexOrId: V | VertexId): E[] {
        const target = this.getVertex(vertexOrId);
        let incomingEdges: E[] = [];
        if (target) {
            incomingEdges = this._edges.filter(edge => edge.dest === target.id)
        }
        return incomingEdges;
    }

    outgoingEdgesOf(vertexOrId: V | VertexId): E[] {
        const target = this.getVertex(vertexOrId);
        let incomingEdges: E[] = [];
        if (target) {
            incomingEdges = this._edges.filter(edge => edge.src === target.id)
        }
        return incomingEdges;
    }

    degreeOf(vertexOrId: VertexId | V): number {
        const vertexId = this.getVertexId(vertexOrId);
        return this._edges.filter(edge => edge.src === vertexId || edge.dest === vertexId).length;
    }

    inDegreeOf(vertexOrId: VertexId | V): number {
        return this.incomingEdgesOf(vertexOrId).length;
    }

    outDegreeOf(vertexOrId: VertexId | V): number {
        return this.outgoingEdgesOf(vertexOrId).length;
    }

    edgesOf(vertexOrId: VertexId | V): E[] {
        const vertexId = this.getVertexId(vertexOrId);
        return this._edges.filter(edge => edge.src === vertexId || edge.dest === vertexId);
    }

    getEdgeSrc(e: E): V | null {
        return this.getVertex(e.src);
    }

    getEdgeDest(e: E): V | null {
        return this.getVertex(e.dest);
    }

    getDestinations(vertex: V | null): V[] {
        if (vertex === null) {
            return [];
        }
        const destinations: V[] = [];
        const outgoingEdges = this.outgoingEdgesOf(vertex);
        for (let outEdge of outgoingEdges) {
            const child = this.getEdgeDest(outEdge);
            if (child) {
                destinations.push(child);
            }
        }
        return destinations;
    }

    topologicalSort(): V[] | null {

        const statusMap: Map<V, TopologicalStatus> = new Map<V, TopologicalStatus>();
        for (let entry of this._vertices) {
            statusMap.set(entry[1], 0);
        }

        const sorted: V[] = [];
        let hasCycle = false;
        const dfs = (cur: V) => {
            statusMap.set(cur, 1);
            const children = this.getDestinations(cur);
            for (let child of children) {
                const childStatus = statusMap.get(child);
                if (childStatus === 0) {
                    dfs(child);
                } else if (childStatus === 1) {
                    hasCycle = true;
                }
            }
            statusMap.set(cur, 2);
            sorted.push(cur);
        }

        for (let entry of this._vertices) {
            if (statusMap.get(entry[1]) === 0) {
                dfs(entry[1]);
            }
        }

        if (hasCycle) {
            return null;
        }
        return sorted.reverse();
    }
}
