import {AVLTree} from "../../../data-structures/binary-tree/avl-tree";
import {runAlgorithm} from "../../helpers";

const avlTree = new AVLTree<number>();

const performanceAVLTree = () => {
    for (let i = 0; i < 1e+5; i++) {
        avlTree.insert(i);
    }
}

const performanceAVLTreeIsBST = () => {
    return avlTree.isBST();
}

const runTestAVLTree = async () => {
    // await runAlgorithm(performanceAVLTree);
    await runAlgorithm(performanceAVLTreeIsBST);
}

// runTestAVLTree().then();

