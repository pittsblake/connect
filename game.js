class Game {
    constructor(selector) {
        this.ROWS = 6;
        this.COLS = 7;
        this.selector = selector
        this.createGrid();
    }

    createGrid() {
        const game = $(this.selector)
        //console.log(game)
        for (let x = 0; x < this.ROWS; x++) {
            const row = $('<div>').addClass('row');
            game.append(row)
            for (let y = 0; y < this.COLS; y++){
                const col = $('<div>').addClass('col');
                row.append(col)
            }
        }
        console.log(game.html)
    }
}