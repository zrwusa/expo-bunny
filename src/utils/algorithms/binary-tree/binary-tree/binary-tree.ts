import {DeepProxy, TProxyHandler} from '@qiwi/deep-proxy';
import {BinaryTree} from '../../../data-structures/binary-tree';
import {wait, WaitManager} from '../../../utils';
import {runAlgorithm} from '../../helpers';
import {testBSTCase1} from '../bst';

const waitManager = new WaitManager(10);
const {time1, time2, time3} = waitManager;

export async function testBinaryTree(arr: number[], proxyHandler?: TProxyHandler) {
    const arrCopy = [...arr];
    const rest = arrCopy.splice(1);
    const proxyVariables: { binaryTree: BinaryTree<number> } = new DeepProxy({binaryTree: new BinaryTree<number>(arrCopy[0], arrCopy[0])}, proxyHandler);

    for (let i of rest) {
        console.log(`insert ${i}`, proxyVariables.binaryTree.insert(i, i));
        await wait(time1);
    }

    const node6 = proxyVariables.binaryTree.getNode(6);
    console.log('getHeight(getNode 6)', node6 && proxyVariables.binaryTree.getHeight(node6));
    console.log('getDepth(getNode 6)', node6 && proxyVariables.binaryTree.getDepth(node6));
    await wait(time2);
    const getNodeById = proxyVariables.binaryTree.getNode(10, 'id');
    console.log('getNode, 10, id', getNodeById);

    await wait(time2);
    const getNodesByCount = proxyVariables.binaryTree.getNodes(1, 'count');
    console.log('getNodes, 1, count', getNodesByCount);

    await wait(time2);
    const getNodesByLeftSum = proxyVariables.binaryTree.getNodes(2, 'allLesserSum');
    console.log('getNodes, 2, allLesserSum', getNodesByLeftSum);

    await wait(time2);
    const node15 = proxyVariables.binaryTree.getNode(15);
    const subTreeSum = node15 && proxyVariables.binaryTree.subTreeSum(node15);
    console.log('subTreeSum, 15', subTreeSum);

    await wait(time3);
    console.log('DFS ,in, node', proxyVariables.binaryTree.DFS('in', 'node'));

    await wait(time1);
    console.log('DFSIterative, in', proxyVariables.binaryTree.DFSIterative('in'));

    await wait(time3);
    console.log('DFS ,pre, node', proxyVariables.binaryTree.DFS('pre', 'node'));

    await wait(time1);
    console.log('DFSIterative, pre', proxyVariables.binaryTree.DFSIterative('pre'));

    await wait(time1);
    console.log('morris, in, node', proxyVariables.binaryTree.morris('in', 'node'));

    await wait(time1);
    console.log('morris, pre', proxyVariables.binaryTree.morris('pre'));

    await wait(time1);
    console.log('morris, post', proxyVariables.binaryTree.morris('post'));

    await wait(time3);
    console.log('DFS ,post, node', proxyVariables.binaryTree.DFS('post', 'node'));

    await wait(time1);
    console.log('DFSIterative, post, node', proxyVariables.binaryTree.DFSIterative('post', 'node'));

    console.log('waiting for balancing');

    await wait(time3);

    await wait(time1);
    console.log('BFS', proxyVariables.binaryTree.BFS());

    await wait(time1);
    console.log('BFS, node', proxyVariables.binaryTree.BFS('node'));

    return proxyVariables.binaryTree;
}

const runTestBinaryTree = async () => {
    await runAlgorithm(testBinaryTree, false, ...testBSTCase1);
};

// runTestBinaryTree().then()
