class Game {
    constructor(selector) {
        this.ROWS = 6;
        this.COLS = 7;
        this.player = 'red';
        this.selector = selector;
        this.isGameOver = false;
        this.onPlayerMove = function (){};
        this.createGrid();
        this.eventListeners();
    }


    createGrid() {
        const game = $(this.selector)
        game.empty();
        this.isGameOver = false;
        this.player = 'red'
        for (let x = 0; x < this.ROWS; x++) {
            const row = $('<div>').addClass('row');
            game.append(row)
            for (let y = 0; y < this.COLS; y++) {
                const col = $('<div>')
                    .addClass('col empty')
                    .attr('data-col', y)
                    .attr('data-row', x);
                row.append(col)
            }
        }
    }

    eventListeners() {
        const game = $(this.selector);
        const is = this

        const findLastEmptyCell = (col) => {
            const cells = $(`.col[data-col='${col}']`)

            //Loop through the column in revers to find the empty cell
            for (let i = cells.length - 1; i >= 0; i--) {
                const tile = $(cells[i]);
                if (tile.hasClass('empty')) {
                    return tile;
                }
            }
            return null;
        }

        // Grabs the index of each column.
        game.on('mouseenter', '.col.empty', function () {
            if (is.isGameOver) return;
            const col = $(this).data('col');
            const getLastCell = findLastEmptyCell(col);
            getLastCell.addClass(`next-${is.player}`);
            console.log(col)
        });

        //Leave hover fill when mouse leaves
        game.on('mouseleave', '.col', function () {
            $('.col').removeClass(`next-${is.player}`);
        });

        //Change player on Click
        game.on('click', '.col.empty', function () {
            if (is.isGameOver) return;

            const col = $(this).data('col');
            //const row = $(this).data('row');
            const findLastCell = findLastEmptyCell(col);
            findLastCell.removeClass(`empty next-${is.player}`);
            findLastCell.addClass(is.player);
            findLastCell.data('player', is.player);

            const winner = is.checkForWinner(findLastCell.data('row'), findLastCell.data('col'))

            if (winner) {
                // do winning things
                is.isGameOver = true
                alert(`Player ${is.player} has won!`);
                $('.col.empty').removeClass('empty')
                return;
            }

            if (is.player === 'red') {
                is.player = 'black'
                findLastEmptyCell(col)
            } else if (is.player === 'black') {
                is.player = 'red'
                findLastEmptyCell(col)
            }
            $(this).trigger('mouseenter')
        });
    }

    checkForWinner(row, col) {
        const that = this;


        function getCell(i, j) {
            return $(`.col[data-row ='${i}'][data-col='${j}']`)
        }

        function checkDirection(direction) {
            let total = 0;
            let i = row + direction.i;
            let j = col + direction.j;
            let next = getCell(i, j);

            while (i >= 0 && i < that.ROWS && j >= 0 && j < that.COLS && next.data('player') === that.player) {
                total++
                i += direction.i;
                j += direction.j;
                next = getCell(i, j);
            }
            return total;
        }

        function checkWin(directionA, directionB) {
            const total = 1 + checkDirection(directionA) + checkDirection(directionB);

            if (total >= 4) {
                return that.player;
            } else {
                return null;
            }
        }

        function checkDiagonalBottomUp() {
            return checkWin({ i: 1, j: -1 }, { i: 1, j: 1 })
        }

        function checkDiagonalUpBottom() {
            return checkWin({ i: 1, j: 1 }, { i: -1, j: -1 })
        }

        function checkForVerticalWin() {
            return checkWin({ i: -1, j: 0 }, { i: 1, j: 0 });
        }

        function checkForHorizontalWin() {
            return checkWin({ i: 0, j: -1 }, { i: 0, j: 1 });
        }

        return checkForVerticalWin() ||
            checkForHorizontalWin() ||
            checkDiagonalBottomUp() ||
            checkDiagonalUpBottom();
    }

    restart() {
        this.createGrid();
    }
}