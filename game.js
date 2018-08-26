// Game Configs
var boardSize = 600;
var boardPosX = 0;
var boardPosY = 0;
var totalBlocks = 16;
var blockCornerSize = (boardSize * 0.2);
// var tileSize = (boardSize - (blockCornerSize * 2)) / ((totalBlocks / 4) - 1);
var tileSize = (boardSize - blockCornerSize) / ((totalBlocks / 4));

var dice = {
    sides: 6,
    roll: function () {
        var randomNumber = Math.floor(Math.random() * this.sides) + 1;
        return randomNumber;
    }
}