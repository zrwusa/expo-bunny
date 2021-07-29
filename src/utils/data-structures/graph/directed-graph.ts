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

    protected _outEdgeMap: Map<V, E[]> = new Map<V, E[]>();

    protected _inEdgeMap: Map<V, E[]> = new Map<V, E[]>();

    constructor() {
        super();
    }

    getAllEdges(srcOrId: V | null | VertexId, destOrId: V | null | VertexId): E[] {
        let edges: E[] = [];

        if (srcOrId !== null && destOrId !== null) {
            const src: V | null = this.getVertex(srcOrId);
            const dest: V | null = this.getVertex(destOrId);

            if (src && dest) {
                const srcOutEdges = this._outEdgeMap.get(src);
                if (srcOutEdges) {
                    edges = srcOutEdges.filter(edge => edge.dest === dest.id);
                }
            }
        }

        return edges;
    }

    addEdge(edge: E): boolean {
        if (!(this.containsVertex(edge.src) && this.containsVertex(edge.dest))) {
            return false;
        }

        const srcVertex = this.getVertex(edge.src)!;
        const srcOutEdges = this._outEdgeMap.get(srcVertex);
        if (srcOutEdges) {
            srcOutEdges.push(edge);
        } else {
            this._outEdgeMap.set(srcVertex, [edge]);
        }

        const destVertex = this.getVertex(edge.dest)!;
        const destInEdges = this._inEdgeMap.get(destVertex);
        if (destInEdges) {
            destInEdges.push(edge);
        } else {
            this._inEdgeMap.set(destVertex, [edge]);
        }

        return true;
    }

    removeEdgeByEnds(srcOrId: V | VertexId, destOrId: V | VertexId): E | null {

        const src: V | null = this.getVertex(srcOrId);
        const dest: V | null = this.getVertex(destOrId);
        let removed: E | null = null;
        if (!src || !dest) {
            return null;
        }

        const srcOutEdges = this._outEdgeMap.get(src);
        if (srcOutEdges) {
            arrayRemove<E>(srcOutEdges, edge => edge.dest === dest.id);
        }

        const destInEdges = this._inEdgeMap.get(dest);
        if (destInEdges) {
           removed = arrayRemove<E>(destInEdges, edge => edge.src === src.id)[0] || null;
        }
        return removed;
    }

    removeEdge(edge: E): E | null {
        let removed: E | null = null;
        const src = this.getVertex(edge.src);
        const dest = this.getVertex(edge.dest);
        if (src && dest) {
            const srcOutEdges = this._outEdgeMap.get(src);
            if (srcOutEdges && srcOutEdges.length > 0) {
                arrayRemove(srcOutEdges, edge => edge.src === src.id);
            }

            const destInEdges = this._inEdgeMap.get(dest);
            if (destInEdges && destInEdges.length > 0) {
                removed = arrayRemove(destInEdges, edge => edge.dest === dest.id)[0];
            }

        }

        return removed;
    }

    removeAllEdges(src: VertexId | V, dest: VertexId | V): E[] {
        return [];
    }

    incomingEdgesOf(vertexOrId: V | VertexId): E[] {
        const target = this.getVertex(vertexOrId);
        if (target) {
            return this._inEdgeMap.get(target) || [];
        }
        return [];
    }

    outgoingEdgesOf(vertexOrId: V | VertexId): E[] {
        const target = this.getVertex(vertexOrId);
        if (target) {
            return this._outEdgeMap.get(target) || [];
        }
        return [];
    }

    degreeOf(vertexOrId: VertexId | V): number {
        return this.outDegreeOf(vertexOrId) + this.inDegreeOf(vertexOrId);
    }

    inDegreeOf(vertexOrId: VertexId | V): number {
        return this.incomingEdgesOf(vertexOrId).length;
    }

    outDegreeOf(vertexOrId: VertexId | V): number {
        return this.outgoingEdgesOf(vertexOrId).length;
    }

    edgesOf(vertexOrId: VertexId | V): E[] {
        return [...this.outgoingEdgesOf(vertexOrId), ...this.incomingEdgesOf(vertexOrId)];
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

    edgeSet(): E[] {
        let edges: E[] = [];
        this._outEdgeMap.forEach(outEdges => {
            edges = [...edges, ...outEdges];
        });
        return edges;
    }
}
