export // Class definition to save the vertex and its edges.
class Vertex {
    // Name of the vertex.
    private _name: string;
    public get name(): string {
        return this._name;
    }

    public set name(v: string) {
        this._name = v;
    }

    // Edges associated with the vertex
    private _edges: string[] | undefined;
    public get edges(): string[] | undefined {
        return this._edges;
    }

    public set edges(v: string[] | undefined) {
        this._edges = v;
    }

    /**
     * Creates a new vertex with empty edges.
     * @param vName Name of the vertex
     */
    constructor(vName: string) {
        this._name = vName;
        this._edges = [];
    }

}

/**
 * A class that represents an undirected graph with very simple implementation.
 */
class Graph {
    // An adjacency list to hold our graph data
    private readonly _adjList: Vertex[];

    constructor() {
        this._adjList = [];
    }

    /**
     * A method to add a new vertex to the graph.
     * @param newVertex Name of the vertex to be added to the graph
     */
    addVertex(newVertex: Vertex): boolean {
        // We will keep the implementation simple and focus on the concepts

        // If the vertex already exists, do nothing.
        if (this._adjList.find(e => e.name === newVertex.name)) {
            return true;
        }

        this._adjList.push(newVertex);
        return true;
    }

    /**
     * Adds an edge to the graph.
     * @param vertex1 One of the vertices between an edge
     * @param vertex2 Another vertex of an edge
     */
    addAnEdge(vertex1: string, vertex2: string): boolean {
        // We will keep the implementation simple and focus on the concepts
        // Do not worry about handling invalid indexes or any other error cases.
        // We will assume all vertices are valid and already exist.

        // Add an vertex2 to vertex1 edges.
        this._adjList.find(e => e.name == vertex1)?.edges?.push(vertex2);

        // Add an vertex1 to vertex2 edges.
        this._adjList.find(e => e.name == vertex2)?.edges?.push(vertex1);
        return true;

    }

    /**
     * Removes an edge between two vertices.
     * @param vertex1 One of the vertex of an edge to be removed
     * @param vertex2 ANother vertex of an edge to be removed
     */
    removeAnEdge(vertex1: string, vertex2: string): boolean {
        // We will keep the implementation simple and focus on the concepts
        // Do not worry about handling invalid indexes or any other error cases.
        // We will assume all vertices are valid and already exist.

        // Remove vertex2 from the edges of vertex1
        const vertex1Found = this._adjList.find(e => e.name === vertex1)
        if (vertex1Found) vertex1Found.edges
            = this._adjList.find(e => e.name === vertex1)?.edges?.filter(v => v !== vertex2);

        // Remove vertex1 from the edges of vertex2
        const vertex2Found = this._adjList.find(e => e.name === vertex2);
        if (vertex2Found) vertex2Found.edges
            = this._adjList.find(e => e.name === vertex2)?.edges?.filter(v => v !== vertex1);

        return true;
    }

    /**
     * Recursively traverse the graph and return an array of vertex names
     * @param startVertexName Name for the starting vertex from where the traversal should start.
     */
    dfsTraversalRecursive(startVertexName: string): string[] {
        let result: string[] = [];
        let visited: any = {}; //
        let startVertex = this._adjList.find(v => v.name === startVertexName);

        // We are saving into a variable due to the fact that the scope of "this" keyword will change in the dfs inner function.
        // We will not be able to access this._adjList within the dfs inner function
        let adjList = this._adjList;

        if (startVertex)
            (function dfs(vertex: Vertex): void {
                // Return if vertex has no edges - This is our base case
                if (vertex === null || vertex === undefined) return undefined;

                // Add vertex to result list
                result.push(vertex.name);

                // Add vertex to visited list
                visited[vertex.name] = true;

                // For each edge of the vertex, traverse through the neighbors
                adjList.find(v => v.name === vertex.name)?.edges?.forEach(neighbor => {
                    // If not visited, recurse of the neighbor edges
                    if (visited[neighbor] !== true) {
                        const adjNeighbor = adjList.find(e => e.name === neighbor)
                        if (adjNeighbor) dfs(adjNeighbor);
                    }
                });

            })(startVertex);

        // Return all the vertices
        return result;
    }

    dfsTraversalIterative(startVertexName: string): string[] {
        let result: string[] = [];
        let visited: any = {};
        let stack: string[] = [];
        stack.push(startVertexName);

        while (stack.length > 0) {
            let name = stack.pop();
            let currentVertex = this._adjList.find(e => e.name === name);
            if (currentVertex) {
                if (!visited[currentVertex.name]) {
                    // Mark the current vertex as visited
                    visited[currentVertex.name] = true;

                    // Add the current vertex to result list
                    result.push(currentVertex.name);

                    // Visit the neighbors of the current vertex one by on, if they are not already visited
                    currentVertex.edges?.forEach(neighbor => {
                        if (!visited[neighbor])
                            stack.push(neighbor);
                    });
                }
            }

        }

        return result;
    }

    bfsTraversalIterative(startVertexName: string): string[] {
        let result: string[] = [];
        let visited: any = {};
        let queue: string[] = [];
        queue.push(startVertexName);

        while (queue.length > 0) {
            let name = queue.shift();
            let currentVertex = this._adjList.find(e => e.name === name);
            if (currentVertex) {
                if (!visited[currentVertex.name]) {
                    // Mark the current vertex as visited
                    visited[currentVertex.name] = true;

                    // Add the current vertex to result list
                    result.push(currentVertex.name);

                    // Visit the neighbors of the current vertex one by on, if they are not already visited
                    currentVertex.edges?.forEach(neighbor => {
                        if (!visited[neighbor])
                            queue.push(neighbor);
                    });

                }
            }

        }

        return result;
    }
}


// // Undirected Graph
// /**
//  *                  Chicago
//  *                  |     \
//  *                  |      \
//  *              Dallas    Atlanta
//  *                  |         \
//  *                  |          \
//  *           San Francisco----Orlando
//  *                   \        /
//  *                    \     /
//  *                   Las Vegas
//  * **/
// let udGraph = new Graph();
// udGraph.addVertex(new Vertex("Chicago"));
// udGraph.addVertex(new Vertex("Dallas"));
// udGraph.addVertex(new Vertex("Atlanta"));
// udGraph.addVertex(new Vertex("San Francisco"));
// udGraph.addVertex(new Vertex("Orlando"));
// udGraph.addVertex(new Vertex("Las Vegas"));
//
// udGraph.addAnEdge("Chicago", "Dallas");
// udGraph.addAnEdge("Chicago", "Atlanta");
// udGraph.addAnEdge("Dallas", "San Francisco");
// udGraph.addAnEdge("Atlanta", "Orlando");
// udGraph.addAnEdge("San Francisco", "Orlando");
// udGraph.addAnEdge("San Francisco", "Las Vegas");
// udGraph.addAnEdge("Orlando", "Las Vegas");
//
// console.log(udGraph.dfsTraversalRecursive("Chicago"));
// console.log(udGraph.dfsTraversalIterative("Chicago"));
// console.log(udGraph.bfsTraversalIterative("Chicago"));
