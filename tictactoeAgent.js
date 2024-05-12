// Tic Tac Toe
class Agent {
    constructor() { }


    selectMove(board) {
        const maxing = this.xTurn(board);
        const empty = this.emptyCells(board)
        let move = -1;
        let moveScore = maxing ? -Infinity : Infinity;
        for (const emptyCell of empty) {
            const newScore = this.minimax(board, emptyCell) 
            if (maxing && newScore > moveScore) {
                move = emptyCell;
                moveScore = newScore;
            }
            if (!maxing && newScore < moveScore) {
                move = emptyCell;
                moveScore = newScore;
            }
        }
        return move;
    }

    minimax(oldBoard, move) {
        const board = oldBoard.clone();
        board.move(move);

        // Base case
        switch (board.gameOver()) {
            case 1: return 1;
            case 2: return -1;
            case 3: return 0;
        }

        const scores = this.emptyCells(board).map((emptyCell) => this.minimax(board, emptyCell));

        return this.xTurn(board) ? Math.max(...scores) : Math.min(...scores);
    }

    xTurn(board) {
        return board.X.length == board.O.length;
    }

    emptyCells(board) {
        return [1, 2, 3, 4, 5, 6, 7, 8, 9].filter((cell) => board.cellFree(cell));
    }

}