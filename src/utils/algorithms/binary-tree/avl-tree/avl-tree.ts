import {AVLTree} from '../../../data-structures/binary-tree/avl-tree';
import {runAlgorithm} from '../../helpers';
import {DeepProxy, TProxyHandler} from '@qiwi/deep-proxy';
import {wait, WaitManager} from '../../../utils';
import {testBSTCase1} from '../bst';

const avlTree = new AVLTree<number>();

const performanceAVLTree = () => {
    for (let i = 0; i < 1e+5; i++) {
        avlTree.insert(i);
    }
};

const performanceAVLTreeIsBST = () => {
    return avlTree.isBST();
};

const waitManager = new WaitManager(10);
const {time1, time2, time3} = waitManager;

export const testAVLTree = async (arr: number[], proxyHandler?: TProxyHandler) => {
    const arrCopy = [...arr];
    const rest = arrCopy.splice(1);
    const proxyVariables: { avl: AVLTree<number> } = new DeepProxy({avl: new AVLTree<number>(true, arrCopy[0], arrCopy[0])}, proxyHandler);

    for (let i of rest) {
        proxyVariables.avl.insert(i, i);
        await wait(time1);
    }

    const node6 = proxyVariables.avl.getNode(6);
    console.log('getHeight(getNode 6)', node6 && proxyVariables.avl.getHeight(node6));
    console.log('getDepth(getNode 6)', node6 && proxyVariables.avl.getDepth(node6));
    await wait(time2);
    const getNodeById = proxyVariables.avl.getNode(10, 'id');
    console.log('getNode, 10, id', getNodeById);

    await wait(time2);
    const getNodesByCount = proxyVariables.avl.getNodes(1, 'count');
    console.log('getNodes, 1, count', getNodesByCount);

    await wait(time2);
    const getNodesByLeftSum = proxyVariables.avl.getNodes(2, 'allLesserSum');
    console.log('getNodes, 2, allLesserSum', getNodesByLeftSum);

    await wait(time2);
    const getMinNodeByRoot = proxyVariables.avl.getMinNode();
    console.log('getMinNode', getMinNodeByRoot);

    await wait(time2);
    const node15 = proxyVariables.avl.getNode(15);
    const getMinNodeBySpecificNode = node15 && proxyVariables.avl.getMinNode(node15);
    console.log('getMinNode, 15', getMinNodeBySpecificNode);

    await wait(time2);
    const subTreeSum = node15 && proxyVariables.avl.subTreeSum(node15);
    console.log('subTreeSum, 15', subTreeSum);

    await wait(time2);
    const lesserSum = proxyVariables.avl.lesserSum(10);
    console.log('lesserSum, 10', lesserSum);

    await wait(time2);
    const subTreeAdd = node15 && proxyVariables.avl.subTreeAdd(node15, 1, 'count');
    console.log('subTreeAdd, getNode(15)', subTreeAdd);

    await wait(time3);
    const node11 = proxyVariables.avl.getNode(11);
    const allGreaterNodesAdd = node11 && proxyVariables.avl.allGreaterNodesAdd(node11, 2, 'count');
    console.log('allGreaterNodesAdd, getNode(11), 2, count', allGreaterNodesAdd);

    await wait(time3);
    console.log('DFS ,in, node', proxyVariables.avl.DFS('in', 'node'));
    console.log('waiting for balancing');
    await wait(time3);
    proxyVariables.avl.balance();
    console.log('balanced BFS, node', proxyVariables.avl.BFS('node'));

    await wait(time3);
    console.log('remove, 11', proxyVariables.avl.remove(11));
    console.log('isBalance', proxyVariables.avl.isAVLBalanced());
    console.log('getHeight, getNode(15)', node15 && proxyVariables.avl.getHeight(node15));
    await wait(time3);
    console.log('remove, 1', proxyVariables.avl.remove(1));
    console.log('isAVLBalanced', proxyVariables.avl.isAVLBalanced());
    console.log('getHeight', proxyVariables.avl.getHeight());
    await wait(time3);
    console.log('remove, 4', proxyVariables.avl.remove(4));
    console.log('isAVLBalanced', proxyVariables.avl.isAVLBalanced());
    console.log('getHeight', proxyVariables.avl.getHeight());
    await wait(time3);
    console.log('remove, 10', proxyVariables.avl.remove(10));
    console.log('isAVLBalanced', proxyVariables.avl.isAVLBalanced());
    console.log('getHeight', proxyVariables.avl.getHeight());
    await wait(time3);
    console.log('remove, 15', proxyVariables.avl.remove(15));
    console.log('isAVLBalanced', proxyVariables.avl.isAVLBalanced());
    console.log('getHeight', proxyVariables.avl.getHeight());
    await wait(time3);
    console.log('remove, 5', proxyVariables.avl.remove(5));
    console.log('isAVLBalanced', proxyVariables.avl.isAVLBalanced());
    console.log('getHeight', proxyVariables.avl.getHeight());
    await wait(time3);
    console.log('remove, 13', proxyVariables.avl.remove(13));
    console.log('isAVLBalanced', proxyVariables.avl.isAVLBalanced());
    console.log('getHeight', proxyVariables.avl.getHeight());
    await wait(time3);
    console.log('remove, 3', proxyVariables.avl.remove(3));
    console.log('isAVLBalanced', proxyVariables.avl.isAVLBalanced());
    console.log('getHeight', proxyVariables.avl.getHeight());
    await wait(time3);
    console.log('remove, 8', proxyVariables.avl.remove(8));
    console.log('isAVLBalanced', proxyVariables.avl.isAVLBalanced());
    console.log('getHeight', proxyVariables.avl.getHeight());
    await wait(time3);
    console.log('remove, 6', proxyVariables.avl.remove(6));
    console.log('isAVLBalanced', proxyVariables.avl.isAVLBalanced());
    console.log('getHeight', proxyVariables.avl.getHeight());
    await wait(time3);
    console.log('remove, 7', proxyVariables.avl.remove(7));
    console.log('isAVLBalanced', proxyVariables.avl.isAVLBalanced());
    console.log('getHeight', proxyVariables.avl.getHeight());
    await wait(time3);
    console.log('remove, 9', proxyVariables.avl.remove(9));
    console.log('isAVLBalanced', proxyVariables.avl.isAVLBalanced());
    console.log('getHeight', proxyVariables.avl.getHeight());
    await wait(time3);
    console.log('remove, 14', proxyVariables.avl.remove(14));
    console.log('isAVLBalanced', proxyVariables.avl.isAVLBalanced());
    console.log('getHeight', proxyVariables.avl.getHeight());
    await wait(time3);

    await wait(time1);
    console.log('isAVLBalanced()', proxyVariables.avl.isAVLBalanced());
    await wait(time1);
    console.log('BFS', proxyVariables.avl.BFS());

    await wait(time1);
    console.log('BFS, node', proxyVariables.avl.BFS('node'));

    return proxyVariables.avl;

};
const runTestAVLTree = async () => {
    await runAlgorithm(testAVLTree, false, ...testBSTCase1);
};

// runTestAVLTree().then();
