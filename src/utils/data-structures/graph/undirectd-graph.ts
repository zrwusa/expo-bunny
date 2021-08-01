import {arrayRemove} from "../../utils";
import {AbstractEdge, AbstractGraph, AbstractVertex, VertexId} from "./abstract-graph";

export class UndirectedVertex extends AbstractVertex {
    constructor(id: VertexId) {
        super(id);
    }
}

export class UndirectedEdge extends AbstractEdge {
    private _vertices: [VertexId, VertexId];

    public get vertices() {
        return this._vertices;
    }

    public set vertices(v: [VertexId, VertexId]) {
        this._vertices = v;
    }

    constructor(v1: VertexId, v2: VertexId, weight?: number) {
        super(weight);
        this._vertices = [v1, v2];
    }
}

export class UndirectedGraph<V extends UndirectedVertex, E extends UndirectedEdge> extends AbstractGraph<V, E> {
    constructor() {
        super();
    }

    protected _edges: E[] = [];

    getAllEdges(v1: V | null | VertexId, v2: V | null | VertexId): E[] {
        let edges: E[] = [];

        if (v1 !== null && v2 !== null) {
            const vertex1: V | null = this.getVertex(v1);
            const vertex2: V | null = this.getVertex(v2);

            if (vertex1 && vertex2) {
                edges = this._edges.filter(edge => edge.vertices.includes(vertex1.id) && edge.vertices.includes(vertex2.id));
            }
        }

        return edges;
    }

    addEdge(edge: E): boolean {
        for (let v of edge.vertices) {
            if (!this.containsVertex(v)) return false;
        }
        this._edges.push(edge);
        return true;
    }

    removeEdgeBetween(v1: V | VertexId, v2: V | VertexId): E | null {

        const vertex1: V | null = this.getVertex(v1);
        const vertex2: V | null = this.getVertex(v2);

        if (!vertex1 || !vertex2) {
            return null;
        }

        return arrayRemove<E>(this._edges, edge => edge.vertices.includes(vertex1.id) && edge.vertices.includes(vertex2.id))[0] || null;
    }


    removeEdge(edge: E): E | null {
        const removed = arrayRemove<E>(this._edges, e => e.hashCode === edge.hashCode);
        return removed[0] || null;
    }

    degreeOf(vertexOrId: VertexId | V): number {
        const vertexId = this.getVertexId(vertexOrId);
        return this._edges.filter(edge => edge.vertices.includes(vertexId)).length;
    }

    edgesOf(vertexOrId: VertexId | V): E[] {
        const vertexId = this.getVertexId(vertexOrId);
        return this._edges.filter(edge => edge.vertices.includes(vertexId))
    }

    getEdgeEnds(edge: E): V[] {
        const ends: V[] = [];
        this._vertices.forEach(v => {
            if (edge.vertices.includes(v.id)) {
                ends.push(v);
            }
        });
        return ends;
    }

    edgeSet(): E[] {
        return this._edges;
    }

    getEdgesOf(vertexOrId: V | VertexId): E[] {
        const vertex = this.getVertex(vertexOrId);
        const ret: E[] = [];
        if (!vertex) {
            return ret;
        }
        return this._edges.filter(e => e.vertices.includes(vertex.id))
    }

    getNeighbors(vertexOrId: V | VertexId): V[] {
        const neighbors: V[] = [];
        const vertex = this.getVertex(vertexOrId);
        if (vertex) {
            const neighborEdges = this.getEdgesOf(vertex);
            for (let edge of neighborEdges) {
                const neighbor = this.getVertex(edge.vertices.filter(e => e !== vertex.id)[0])!;
                neighbors.push(neighbor);
            }
        }
        return neighbors;
    }
}
