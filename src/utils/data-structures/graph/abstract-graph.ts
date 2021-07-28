import {arrayRemove, uuidV4} from "../../utils";

export type VertexId = string | number;

export interface I_Graph<V, E> {

    containsVertex(vertexOrId: V | VertexId): boolean;

    getVertex(vertexOrId: VertexId | V): V | null;

    getVertexId(vertexOrId: V | VertexId): VertexId;

    vertexSet(): V[];

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

    removeEdgeByEnds(srcOrId: V | VertexId, destOrId: V | VertexId): E | null;

    removeEdge(edge: E): E | null;

    removeAllEdges(v1: VertexId | V, v2: VertexId | V): (E | null)[];

    // removeAllEdges(edges: E[] | [VertexId, VertexId]): boolean;

    setEdgeWeight(srcOrId: V | VertexId, destOrId: V | VertexId, weight: number): boolean;

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

    protected _vertices: V[] = [];
    protected _edges: E[] = [];

    abstract removeEdgeByEnds(srcOrId: V | VertexId, destOrId: V | VertexId): E | null;

    abstract removeEdge(edge: E): E | null;

    getVertex(vertexOrId: VertexId | V): V | null {
        const vertexId = this.getVertexId(vertexOrId);
        return this._vertices.find(vertex => vertex.id === vertexId) || null
    }

    getVertexId(vertexOrId: V | VertexId): VertexId {
        return vertexOrId instanceof AbstractVertex ? vertexOrId.id : vertexOrId;
    }

    containsVertex(vertexOrId: V | VertexId): boolean {
        return !!this.getVertex(vertexOrId);
    }

    vertexSet(): V[] {
        return this._vertices;
    }

    abstract getAllEdges(srcOrId: V | null | VertexId, destOrId: V | null | VertexId): E[];

    getEdge(srcOrId: V | null | VertexId, destOrId: V | null | VertexId): E | null {
        return this.getAllEdges(srcOrId, destOrId)[0] || null;
    }

    addVertex(newVertex: V): boolean {
        if (!this.containsVertex(newVertex)) {
            this._vertices.push(newVertex);
            return true;
        } else {
            return false;
        }
    }

    removeVertex(vertexOrId: V | VertexId): boolean {
        const vertexId = this.getVertexId(vertexOrId);
        const removed = arrayRemove<V>(this._vertices, v => v.id === vertexId);
        return removed.length > 0;
    }

    removeAllVertices(vertices: V[] | VertexId[]): boolean {
        let removed: boolean[] = [];
        for (let v of vertices) {
            removed.push(this.removeVertex(v));
        }
        return removed.length > 0;
    }

    abstract degreeOf(vertexOrId: V | VertexId): number;

    edgeSet(): E[] {
        return this._edges;
    }

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
}
