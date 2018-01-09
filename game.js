class Game {
    constructor(selector) {
        this.ROWS = 6;
        this.COLS = 7;
        this.player = 'red';
        this.selector = selector
        this.createGrid();
        this.eventListeners();
        
    }

    createGrid() {
        const game = $(this.selector)
        //console.log(game)
        for (let x = 0; x < this.ROWS; x++) {
            const row = $('<div>').addClass('row');
            game.append(row)
            for (let y = 0; y < this.COLS; y++){
                const col = $('<div>')
                    .addClass('col empty')
                    .attr('data-col', y)
                    .attr('data-row', x);
                row.append(col)
            }
        }
        console.log(game.html)
    }

    eventListeners() {
        const game = $(this.selector);

        const findLastEmptyCell = (col) => {
            const cells = $(`.col[data-col='${col}']`)
            //Loop through the column in revers to find the empty cell
            for(let i = cells.length -1; i >=0; i--){
                const tile = $(cells[i]);
                if (tile.hasClass('empty')) {
                    return tile;
                }
            }
            console.log(cells)
        }

        // Grabs the index of each column.
        game.on('mouseenter', '.col', function(){
            const col = $(this).data('col')
            const getLastCell = findLastEmptyCell(col)
            getLastCell.addClass('next-red');
            console.log(col)
        })

        //Leave hover fill when mouse leaves
        game.on('mouseleave', '.col', function(){
            const col = $(this).data('col')
            const findLastCell = findLastEmptyCell(col)
            findLastCell.removeClass('next-red')
        })
    }
}