$(document).ready(function() {
    //Draw a grid

    const game = new Game('#game')

    game.onPlayerMove = function(){
        $('#player').text(game.player)
    }

    $('#restart').click(function(){
        game.restart();
    })
})