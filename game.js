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
    }

    eventListeners() {
        const game = $(this.selector);
        const is = this

        const findLastEmptyCell = (col) => {
            const cells = $(`.col[data-col='${col}']`)

            //Loop through the column in revers to find the empty cell
            for(let i = cells.length -1; i >=0; i--){
                const tile = $(cells[i]);
                if (tile.hasClass('empty')) {
                    return tile;
                }
            }
            return null;
        }

        // Grabs the index of each column.
        game.on('mouseenter', '.col.empty', function(){
            const col = $(this).data('col');
            const getLastCell = findLastEmptyCell(col);
            getLastCell.addClass(`next-${is.player}`);
            console.log(col)
        });

        //Leave hover fill when mouse leaves
        game.on('mouseleave', '.col', function(){
            $('.col').removeClass(`next-${is.player}`);
        });

        //Change player on Click
        game.on('click', '.col.empty', function(){
            const col = $(this).data('col');
            const findLastCell = findLastEmptyCell(col);
            findLastCell.removeClass(`empty next-${is.player}`);
            findLastCell.addClass(is.player);
            if(is.player==='red'){
                is.player='black'
                findLastEmptyCell(col)
            } else if (is.player==='black'){
                is.player='red'
                findLastEmptyCell(col)
           }
           $(this).trigger('mouseenter')
        });
    }
}