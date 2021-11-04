import {SegmentTree} from '../../../data-structures/binary-tree';
import {runAlgorithm} from '../../helpers';
import {testSegmentTreeCase1} from './cases';

export const testSegmentTree = (values: number[], update1: [number, number], query1: [number, number]) => {
    const sgt = new SegmentTree(values);
    sgt.updateNode(...update1);
    console.info(sgt.querySumByRange(...query1));
    return sgt.root;
};

export const runAllTestSegmentTree = async () => {
    await runAlgorithm(testSegmentTree, false, ...testSegmentTreeCase1);
};


