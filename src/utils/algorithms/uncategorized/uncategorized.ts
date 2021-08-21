// 699. Falling Squares
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

// 36 Valid Sudoku
// 0  0,0 ~ 2,2
// 1  0,3 ~ 2,5
// 2  0,6 ~ 2,8
// 3  3,0 ~ 5,2
// 4  3,3 ~ 5,5
// 5  3,6 ~ 5,8
// 6  6,0 ~ 8,2
// 7  6,3 ~ 8,5
// 8  6,6 ~ 8,8
export const isValidSudoku = function (board: string[][]): boolean {
    const subValid = (dotNums: number, size: number) => {
        return dotNums === 9 || dotNums === 1 && size === 9 || 10 - dotNums === size;
    }

    const areBoxesValid = () => {
        for (let s = 0; s < 9; s++) {
            let row1 = Math.floor(s / 3) * 3, row2 = row1 + 2, col1 = (s % 3) * 3, col2 = col1 + 2;
            const box = [];
            let dotNums = 0;
            for (let row = row1; row <= row2; row++) {
                for (let col = col1; col <= col2; col++) {
                    box.push(board[row][col]);
                    if (board[row][col] === '.') {
                        dotNums++;
                    }
                }
            }
            const set = new Set(box);
            if (!subValid(dotNums, set.size)) return false;
        }
        return true;
    }

    const areRowsValid = () => {
        for (let r = 0; r < 9; r++) {
            const row = board[r];
            const set = new Set(row);
            let dotNums = 0;
            for (let i = 0; i < row.length; i++) {
                if (row[i] === '.') {
                    dotNums++;
                }
            }
            if (!subValid(dotNums, set.size)) return false;
        }
        return true;
    }

    const areColsValid = () => {
        for (let c = 0; c < 9; c++) {
            const col = [];
            let dotNums = 0;
            for (let i = 0; i < board.length; i++) {
                if (board[i][c] === '.') {
                    dotNums++;
                }
                col.push(board[i][c]);
            }
            const set = new Set(col);


            if (!subValid(dotNums, set.size)) return false;

        }
        return true;
    }
    return areRowsValid() && areColsValid() && areBoxesValid();
}

// 37. Sudoku Solver
function solveSudokuBruteForceFailed(board: string[][]): void {
    const getRowValidSet = (r: number) => {
        const set = new Set();
        for (let i = 0; i < 9; i++) {
            set.add(board[r][i]);
        }
        return set;
    }

    const getColValidSet = (c: number) => {
        const set = new Set();
        for (let i = 0; i < 9; i++) {
            set.add(board[i][c]);
        }
        return set;
    }

    const getBoxValidSet = (r: number, c: number) => {
        let row1 = Math.floor(r / 3) * 3, row2 = row1 + 3, col1 = Math.floor(c / 3) * 3, col2 = col1 + 3;
        const set = new Set();
        for (let row = row1; row < row2; row++) {
            for (let col = col1; col < col2; col++) {
                set.add(board[row][col]);
            }
        }
        return set;
    }

    const getPossible = (exists: Set<any>) => {
        const possible = [];
        for (let i = 1; i <= 9; i++) {
            const char = i.toString();
            if (!exists.has(char)) {
                possible.push(char);
            }
        }
        return possible;

    }
    const fill = () => {
        for (let a = 0; a < 81; a++) {
            for (let i = 0; i < 9; i++) {
                for (let j = 0; j < 9; j++) {
                    if (board[i][j] === '.') {
                        const exists = new Set([...getRowValidSet(i),...getColValidSet(j),...getBoxValidSet(i, j)]);
                        const possible = getPossible(exists);
                        if (possible.length === 1) {
                            board[i][j] = getPossible(exists)[0];
                        }
                    }
                }
            }
        }
    }
    fill();

}
