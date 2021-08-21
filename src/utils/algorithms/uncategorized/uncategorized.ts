export const fallingSquaresMy = function (positions: number[][]): number[] {
    const h = [];

    for (let i = 0; i < 1e+6; i++) {
        h.push(0);
    }

    let max = 0;
    const ans = [];

    for (let [left, sl] of positions) {
        let maxInRange = 0;
        for (let i = left; i < left + sl; i++) {
            maxInRange = Math.max(h[i], maxInRange);
        }
        const newHeight = maxInRange + sl;

        for (let i = 0; i < sl; i++) {
            h[i + left] = newHeight;
        }

        ans.push(max = Math.max(newHeight, max));
    }

    return ans;
}
