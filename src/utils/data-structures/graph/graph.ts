import {uuidV4, wait, WaitManager} from "../../utils";

type VertexId = string;
import _ from "lodash";
import {DeepProxy, TProxyHandler} from "@qiwi/deep-proxy";

interface I_Graph<V, E> {

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

export interface I_DirectedGraph<V, E> {
    incomingEdgesOf(vertex: V): E[];

    outgoingEdgesOf(vertex: V): E[];

    inDegreeOf(vertexOrId: V | VertexId): number;

    outDegreeOf(vertexOrId: V | VertexId): number;

    getEdgeSrc(e: E): V | null;

    getEdgeDest(e: E): V | null;
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
    constructor(id: VertexId) {
        super(id);
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

export class Edge extends AbstractEdge {
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

export abstract class AbstractGraph<V extends AbstractVertex, E extends AbstractEdge> implements I_Graph<V, E> {

    protected constructor() {
    }

    protected _vertices: V[] = [];
    protected readonly _edges: E[] = [];

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
        const removed = _.remove<V>(this._vertices, v => v.id === vertexId);
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
        const removed:(E | null)[] = [];
        for (let edge of allEdges) {
            removed.push(this.removeEdge(edge));
        }
        return removed;
    }

    setEdgeWeight(srcOrId: VertexId | V, destOrId: VertexId | V, weight: number): boolean {
        const edge = this.getEdge(srcOrId, destOrId);
        if (edge) {
            edge.weight = weight;
            return  true;
        } else {
            return false;
        }
    }
}

export class Graph<V extends Vertex, E extends Edge> extends AbstractGraph<V, E> {
    constructor() {
        super();
    }

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
        let hasVertex = true;
        for (let v of edge.vertices) {
            if (!this.containsVertex(v)) hasVertex = false;
        }

        if (hasVertex) {
            this._edges.push(edge);
            return true;
        } else {
            return false;
        }
    }

    removeEdgeByEnds(v1: V | VertexId, v2: V | VertexId): E | null {

        const vertex1: V | null = this.getVertex(v1);
        const vertex2: V | null = this.getVertex(v2);

        if (!vertex1 || !vertex2) {
            return null;
        }

        return _.remove<E>(this._edges, edge => edge.vertices.includes(vertex1.id) && edge.vertices.includes(vertex2.id))[0] || null;
    }



    removeEdge(edge: E): E | null {
        const removed = _.remove<E>(this._edges, e => e.hashCode === edge.hashCode);
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
        return this._vertices.filter(v => edge.vertices.includes(v.id))
    }
}

export class DirectedGraph<V extends DirectedVertex, E extends DirectedEdge> extends AbstractGraph<V, E> implements I_DirectedGraph<V, E>{

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
        let hasVertex = true;

        if (!this.containsVertex(edge.src) || !this.containsVertex(edge.dest)) {
            hasVertex = false;
        }

        if (hasVertex) {
            this._edges.push(edge);
            return true;
        } else {
            return false;
        }
    }

    removeEdgeByEnds(srcOrId: V | VertexId, destOrId: V | VertexId): E | null {

        const src: V | null = this.getVertex(srcOrId);
        const dest: V | null = this.getVertex(destOrId);

        if (!src || !dest) {
            return null;
        }

        return _.remove<E>(this._edges, edge => edge.dest === dest.id && edge.src === src.id)[0] || null;
    }

    removeEdge(edge: E): E | null {
        const removed = _.remove<E>(this._edges, e => e.hashCode === edge.hashCode);
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
}

class MyVertex extends DirectedVertex {
    data: string;

    constructor(id: VertexId, data: string) {
        super(id);
        this.data = data;
    }
}

class MyEdge extends DirectedEdge {
    data: string;

    constructor(v1: VertexId, v2: VertexId, weight: number, data: string) {
        super(v1, v2, weight);
        this.data = data;
    }
}

// class MyGraph<V extends MyVertex, E extends MyEdge> extends Graph<V, E> {
//     constructor() {
//         super();
//     }
// }

const waitMan = new WaitManager(4)
export const testGraphs = async (proxyHandler: TProxyHandler) => {

    const directedGraph = new DirectedGraph();
    // console.log('directedGraph.addVertex(\'1\')', directedGraph.addVertex(new DirectedVertex('1')));
    // console.log('directedGraph.addVertex(\'2\')', directedGraph.addVertex(new DirectedVertex('2')));
    // console.log('directedGraph.addEdge(\'1\', \'2\')', directedGraph.addEdge(new DirectedEdge('1', '2')));
    // console.log('directedGraph.getAllEdges(\'1\', \'2\')', directedGraph.getAllEdges('1', '2'));
    // console.log('directedGraph.getAllEdges(directedGraph.getVertex(\'1\'), directedGraph.getVertex(\'2\'))', directedGraph.getAllEdges(directedGraph.getVertex('1'), directedGraph.getVertex('2')));
    // console.log('directedGraph.getAllEdges(\'1\',\'100\')', directedGraph.getAllEdges('1', '100'));
    // console.log('directedGraph.removeEdgeByEnds(\'1\',\'2\')', directedGraph.removeEdgeByEnds('1', '2'));
    // console.log('directedGraph.getAllEdges(\'1\', \'2\')', directedGraph.getAllEdges('1', '2'));

    // const graph = new Graph();
    // console.log('graph.addVertex(\'1\')', graph.addVertex(new Vertex('1')));
    // console.log('graph.addVertex(\'2\')', graph.addVertex(new Vertex('2')));
    // console.log('graph.addEdge(\'1\', \'2\')', graph.addEdge(new Edge('1', '2', 100)));
    // console.log('graph.getAllEdges(\'1\', \'2\')', graph.getAllEdges('1', '2'));
    // console.log('graph.getAllEdges(graph.getVertex(\'1\'), graph.getVertex(\'2\'))', graph.getAllEdges(graph.getVertex('1'), graph.getVertex('2')));
    // console.log('graph.getAllEdges(\'1\',\'100\')', graph.getAllEdges('1', '100'));
    // console.log('graph.removeEdgeByEnds(\'1\',\'2\')', graph.removeEdgeByEnds('1', '2'));
    // console.log('graph.getAllEdges(\'1\', \'2\')', graph.getAllEdges('1', '2'));


    let vars: {myGraph : DirectedGraph<MyVertex, MyEdge>} = new DeepProxy({myGraph: new DirectedGraph<MyVertex, MyEdge>()}, proxyHandler);
    await wait(waitMan.time3);
    console.log('vars.myGraph.addVertex(new MyVertex(\'1\', \'data1\'))', vars.myGraph.addVertex(new MyVertex('1', 'data1')));
    await wait(waitMan.time3);
    console.log('vars.myGraph.addVertex(new MyVertex(\'2\', \'data2\'))', vars.myGraph.addVertex(new MyVertex('2', 'data2')));
    await wait(waitMan.time3);
    console.log('vars.myGraph.addVertex(new MyVertex(\'3\', \'data3\'))', vars.myGraph.addVertex(new MyVertex('3', 'data3')));
    await wait(waitMan.time3);
    console.log('vars.myGraph.addVertex(new MyVertex(\'4\', \'data4\'))', vars.myGraph.addVertex(new MyVertex('4', 'data4')));
    await wait(waitMan.time3);
    console.log('vars.myGraph.addVertex(new MyVertex(\'5\', \'data5\'))', vars.myGraph.addVertex(new MyVertex('5', 'data5')));
    await wait(waitMan.time3);
    console.log('vars.myGraph.addVertex(new MyVertex(\'6\', \'data6\'))', vars.myGraph.addVertex(new MyVertex('6', 'data6')));
    await wait(waitMan.time3);
    console.log('vars.myGraph.addVertex(new MyVertex(\'7\', \'data7\'))', vars.myGraph.addVertex(new MyVertex('7', 'data7')));
    await wait(waitMan.time3);
    console.log('vars.myGraph.addVertex(new MyVertex(\'8\', \'data8\'))', vars.myGraph.addVertex(new MyVertex('8', 'data8')));
    await wait(waitMan.time3);
    console.log('vars.myGraph.addVertex(new MyVertex(\'9\', \'data9\'))', vars.myGraph.addVertex(new MyVertex('9', 'data9')));
    // console.log(JSON.stringify(vars.myGraph.edgeSet()), vars.myGraph.vertexSet());
    //
    await wait(waitMan.time3);
    console.log('vars.myGraph.addEdge(new MyEdge(\'1\', \'2\', 10, \'edge-data1-2\'))', vars.myGraph.addEdge(new MyEdge('1', '2', 10, 'edge-data1-2')));
    await wait(waitMan.time3);
    console.log('vars.myGraph.addEdge(new MyEdge(\'2\', \'1\', 20, \'edge-data2-1\'))', vars.myGraph.addEdge(new MyEdge('2', '1', 20, 'edge-data2-1')));
    await wait(waitMan.time3);
    console.log('vars.myGraph.getAllEdges(\'1\', \'2\')', vars.myGraph.getAllEdges('1', '2'));
    await wait(waitMan.time3);
    console.log('vars.myGraph.getAllEdges(vars.myGraph.getVertex(\'1\'), vars.myGraph.getVertex(\'2\'))', vars.myGraph.getAllEdges(vars.myGraph.getVertex('1'), vars.myGraph.getVertex('2')));
    await wait(waitMan.time3);
    console.log('vars.myGraph.getAllEdges(\'1\',\'100\')', vars.myGraph.getAllEdges('1', '100'));
    await wait(waitMan.time3);
    console.log(JSON.stringify(vars.myGraph.edgeSet()), vars.myGraph.vertexSet());
    await wait(waitMan.time3);
    console.log('vars.myGraph.removeEdgeByEnds(\'1\',\'2\')', vars.myGraph.removeEdgeByEnds('1', '2'));
    await wait(waitMan.time3);
    console.log('vars.myGraph.getAllEdges(\'1\', \'2\')', vars.myGraph.getAllEdges('1', '2'));

    // console.log(JSON.stringify(vars.myGraph.edgeSet()), vars.myGraph.vertexSet());
    //
    //
    await wait(waitMan.time3);
    console.log('vars.myGraph.addEdge(new MyEdge(\'3\', \'1\', 3, \'edge-data-3-1\'))', vars.myGraph.addEdge(new MyEdge('3', '1', 3, 'edge-data-3-1')))

    await wait(waitMan.time3);
    console.log('vars.myGraph.addEdge(new MyEdge(\'1\', \'9\', 19, \'edge-data1-9\'))', vars.myGraph.addEdge(new MyEdge('1', '9', 19, 'edge-data1-9')));
    await wait(waitMan.time3);
    console.log('vars.myGraph.addEdge(new MyEdge(\'9\', \'7\', 97, \'edge-data9-7\'))', vars.myGraph.addEdge(new MyEdge('9', '7', 97, 'edge-data9-7')));

    // const myGraphEdge3to1 = vars.myGraph.getEdge('3', '1');
    //
    // console.log('vars.myGraph.getAllEdges(\'3\', \'1\')', vars.myGraph.getAllEdges('3', '1'));
    // myGraphEdge3to1 && console.log('vars.myGraph.removeEdge(myGraphEdge3to1)', vars.myGraph.removeEdge(myGraphEdge3to1));
}

