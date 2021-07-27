type VertexId = string;

interface I_Graph<V, E> {

    // containsVertex(id: VertexId): boolean;
    //
    // containsVertex(v: V): boolean;

    getVertex(vertexOrId: V | VertexId): V | null;

    // vertexSet(): V[];
    //
    // addVertex(): V;
    //
    // addVertex(v: V): boolean;
    //
    // removeVertex(v: V): boolean;
    //
    // removeAllVertices(vertices: V[] | VertexId[]): boolean;
    //
    // degreeOf(vertex: V): number;
    //
    // inDegreeOf(vertex: V): number;
    //
    // outDegreeOf(vertex: V): number;
    //
    // edgesOf(vertex: V): E[];

    incomingEdgesOf(vertex: V): E[];

    outgoingEdgesOf(vertex: V): E[];


    // containsEdge(src: V, dest: V): boolean;
    //
    // containsEdge(e: E): boolean;

    getEdge(srcOrId: V | VertexId, destOrId: V | VertexId): E | null;

    getAllEdges(src: V, dest: V): E[];

    //
    // edgeSet(): E[];
    //
    // addEdge(src: V, dest: V): E;
    //
    // addEdge(src: V, dest: V, e: E): boolean;

    removeEdge(srcOrId: VertexId | V, destOrId: VertexId | V): [E | null, E | null]

    // removeEdge(e: E): boolean;
    //
    // removeAllEdges(src: V | VertexId, dest: V | VertexId): E[];
    //
    // removeAllEdges(edges: E[] | [VertexId, VertexId]): boolean;
    //
    // getEdgeSource(e: E): V;
    //
    // getEdgeTarget(e: E): V;
    //
    // getEdgeWeight(e: E): number;
    //
    // setEdgeWeight(e: E, weight: number): void;
    //
    // setEdgeWeight(src: V, dest: V, weight: number): void;
    //
    // // GraphType getType(): GraphType;
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


export class Vertex extends AbstractVertex {

    constructor(id: VertexId) {
        super(id);
    }
}

export class DirectedVertex extends AbstractVertex {
    private _inDegrees: DirectedEdge<DirectedVertex>[] = [];
    private _outDegrees: DirectedEdge<DirectedVertex>[] = [];

    constructor(id: VertexId) {
        super(id);
    }
}

export abstract class AbstractEdge<V extends AbstractVertex> {

    private _weight: number;
    get weight(): number {
        return this._weight;
    }

    set weight(v: number) {
        this._weight = v;
    }

    private _src: V;
    get src(): V {
        return this._src;
    }

    set src(v: V) {
        this._src = v;
    }


    private _dest: V;
    get dest(): V {
        return this._dest;
    }

    set dest(v: V) {
        this._dest = v;
    }

    protected constructor(src: V, dest: V, weight?: number) {
        if (weight === undefined) weight = AbstractEdge.DEFAULT_EDGE_WEIGHT;
        this._src = src;
        this._dest = dest;
        this._weight = weight;
    }

    static DEFAULT_EDGE_WEIGHT: number = 1;
}

export class Edge<V extends Vertex> extends AbstractEdge<V> {

    constructor(src: V, dest: V, weight?: number) {
        super(src, dest, weight);
    }
}

export class DirectedEdge<V extends DirectedVertex> extends AbstractEdge<V> {
    constructor(src: V, dest: V, weight?: number) {
        super(src, dest, weight);
    }
}

// export type StorageType = 'adj-list' | 'adj-matrix';

export abstract class AbstractGraph<V extends AbstractVertex, E extends AbstractEdge<V>> implements I_Graph<V, E> {

    protected _vertices: V[] = [];
    protected readonly _adjList: Map<V, E[]> = new Map();

    protected constructor() {
    }

    protected abstract createVertex(id: VertexId): V;

    protected abstract createEdge(src: V, dest: V): E;

    getVertex(id: VertexId): V | null {
        return this._vertices.find(vertex => vertex.id === id) || null
    }

    getAllEdges(srcOrId: V | null | VertexId, destOrId: V | null | VertexId): E[] {
        let edges: E[] = [];

        if (srcOrId !== null && destOrId !== null) {
            const src: V | null = srcOrId instanceof AbstractVertex ? srcOrId : this.getVertex(srcOrId);
            const dest: V | null = destOrId instanceof AbstractVertex ? destOrId : this.getVertex(destOrId);

            let srcEdges: E[] | null = null;
            if (src && dest) {
                srcEdges = this._adjList.get(src) || null;
                if (srcEdges && srcEdges.length > 0) {
                    edges = srcEdges.filter(edge => edge.dest === dest);
                }
            }
        }

        return edges;
    }

    getEdge(srcOrId: V | null | VertexId, destOrId: V | null | VertexId): E | null {
        return this.getAllEdges(srcOrId, destOrId)[0] || null;
    }

    incomingEdgesOf(vertexOrId: V | VertexId): E[] {
        const target = vertexOrId instanceof AbstractVertex ? vertexOrId : this.getVertex(vertexOrId);
        let incomingEdges: E[] = [];
        if (!target) return incomingEdges;
        this._adjList.forEach(edges => {
            incomingEdges = [...incomingEdges, ...edges.filter(edge => edge.dest.id === target.id)];
        })
        return incomingEdges;
    }

    outgoingEdgesOf(vertex: V): E[] {
        return this._adjList.get(vertex) || [];
    }

    addVertex(newVertexOrId: V | VertexId): V {
        let exist: V | null = this._vertices.find(vertex => vertex.id === (newVertexOrId instanceof Vertex ? newVertexOrId.id : newVertexOrId)) || null;
        if (exist) {
            throw new Error(`${newVertexOrId} already exist`);
        } else {
            let _newVertex = newVertexOrId instanceof AbstractVertex ? newVertexOrId : this.createVertex(newVertexOrId);
            this._vertices.push(_newVertex);
            return _newVertex;
        }
    }

    removeEdge(srcOrId: VertexId | V, destOrId: VertexId | V): [E | null, E | null] {

        const srcToDestEdge = this.getEdge(srcOrId, destOrId);
        const destToSrcEdge = this.getEdge(destOrId, srcOrId);

        const src: V | null = srcOrId instanceof AbstractVertex ? srcOrId : this.getVertex(srcOrId);
        const dest: V | null = destOrId instanceof AbstractVertex ? destOrId : this.getVertex(destOrId);

        if (!src || !dest) {
            throw new Error('src or dest does not exist');
        }

        const srcEdges = this.outgoingEdgesOf(src);
        if (srcToDestEdge && srcEdges) {
            this._adjList.set(src, srcEdges.filter(edge => edge.dest !== srcToDestEdge.dest));
        }

        const destEdges = this.outgoingEdgesOf(dest);
        if (destToSrcEdge && destEdges) {
            this._adjList.set(src, destEdges.filter(edge => edge.dest !== destToSrcEdge.dest));
        }

        return [srcToDestEdge, destToSrcEdge];
    }

    dfsRecursive(startVertexId: VertexId): V[] {
        let result: V[] = [];
        // let visited: any = {}; //
        // let startVertex = this._adjList.find(v => v.id === startVertexId);
        // let adjacencyList = this._adjList;
        //
        // if (startVertex)
        //     (function dfs(vertex: Vertex): void {
        //         // Return if vertex has no edges - This is our base case
        //         if (vertex === null || vertex === undefined) return undefined;
        //
        //         // Add vertex dest result list
        //         result.push(vertex.id);
        //
        //         // Add vertex dest visited list
        //         visited[vertex.id] = true;
        //
        //         // For each edge of the vertex, traverse through the neighbors
        //         adjacencyList.find(v => v.id === vertex.id)?.edges?.forEach(neighbor => {
        //             // If not visited, recurse of the neighbor edges
        //             if (visited[neighbor] !== true) {
        //                 const adjNeighbor = adjacencyList.find(e => e.id === neighbor)
        //                 if (adjNeighbor) dfs(adjNeighbor);
        //             }
        //         });
        //
        //     })(startVertex);

        return result;
    }

    dfsIterative(startVertexId: VertexId): V[] {
        let result: V[] = [];
        // let visited: any = {};
        // let stack: VertexId[] = [];
        // stack.push(startVertexId);
        //
        // while (stack.length > 0) {
        //     let id = stack.pop();
        //     let currentVertex = this._adjList.find(e => e.id === id);
        //     if (currentVertex) {
        //         if (!visited[currentVertex.id]) {
        //             // Mark the current vertex as visited
        //             visited[currentVertex.id] = true;
        //
        //             // Add the current vertex dest result list
        //             result.push(currentVertex.id);
        //
        //             // Visit the neighbors of the current vertex one by on, if they are not already visited
        //             currentVertex.edges?.forEach(neighbor => {
        //                 if (!visited[neighbor])
        //                     stack.push(neighbor);
        //             });
        //         }
        //     }
        //
        // }

        return result;
    }

    bfs(startVertexId: VertexId): V[] {
        let result: V[] = [];
        // let visited: any = {};
        // let queue: VertexId[] = [];
        // queue.push(startVertexId);
        //
        // while (queue.length > 0) {
        //     let id = queue.shift();
        //     let currentVertex = this._adjList.find(e => e.id === id);
        //     if (currentVertex) {
        //         if (!visited[currentVertex.id]) {
        //             // Mark the current vertex as visited
        //             visited[currentVertex.id] = true;
        //
        //             // Add the current vertex dest result list
        //             result.push(currentVertex.id);
        //
        //             // Visit the neighbors of the current vertex one by on, if they are not already visited
        //             currentVertex.edges?.forEach(neighbor => {
        //                 if (!visited[neighbor])
        //                     queue.push(neighbor);
        //             });
        //
        //         }
        //     }
        //
        // }

        return result;
    }
}

export class Graph<V extends Vertex, E extends Edge<V>> extends AbstractGraph<Vertex, Edge<Vertex>> {
    constructor() {
        super();
    }

    protected createVertex(id: VertexId): Vertex {
        return new Vertex(id);
    }

    protected createEdge(src: Vertex, dest: Vertex): Edge<Vertex> {
        return new Edge<Vertex>(src, dest);
    }


    addEdge(srcOrId: VertexId | V, destOrId: VertexId | V): [Edge<Vertex> | null, Edge<Vertex> | null] {
        const src: Vertex | null = srcOrId instanceof Vertex ? srcOrId : this.getVertex(srcOrId);
        const dest: Vertex | null = destOrId instanceof Vertex ? destOrId : this.getVertex(destOrId);

        let edge1to2: Edge<Vertex> | null = null;
        let edge2to1: Edge<Vertex> | null = null;
        if (src && dest) {
            const srcEdges = this._adjList.get(src) || [];
            edge1to2 = this.createEdge(src, dest);
            this._adjList.set(src, [...srcEdges, edge1to2]);

            const destEdges = this._adjList.get(dest) || [];
            edge2to1 = this.createEdge(dest, src);
            this._adjList.set(dest, [...destEdges, edge2to1]);
        } else {
            throw new Error('src or _toVertex does not exist');
        }
        return [edge1to2, edge2to1];
    }
}

export class DirectedGraph<V extends DirectedVertex, E extends DirectedEdge<V>> extends AbstractGraph<DirectedVertex, DirectedEdge<V>> {

    constructor() {
        super();
    }

    protected createVertex(id: VertexId): DirectedVertex {
        return new DirectedVertex(id);
    }

    protected createEdge(src: V, dest: V): DirectedEdge<V> {
        return new DirectedEdge<V>(src, dest);
    }
}

export const testGraphs = () => {
    const graph = new Graph();
    console.log('graph.addVertex(\'1\')', graph.addVertex('1'));
    console.log('graph.addVertex(\'2\')', graph.addVertex('2'));
    console.log('graph.addEdge(\'1\', \'2\')', graph.addEdge('1', '2'));
    console.log('graph.getAllEdges(\'1\', \'2\')', graph.getAllEdges('1', '2'));
    console.log('graph.getAllEdges(graph.getVertex(\'1\'), graph.getVertex(\'2\'))', graph.getAllEdges(graph.getVertex('1'), graph.getVertex('2')));
    console.log('graph.getAllEdges(\'1\',\'100\')', graph.getAllEdges('1', '100'));
    console.log('graph.removeEdge(\'1\',\'2\')', graph.removeEdge('1', '2'));
    console.log('graph.getAllEdges(\'1\', \'2\')', graph.getAllEdges('1', '2'));
}

