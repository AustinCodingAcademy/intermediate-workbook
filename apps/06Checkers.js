'use strict';

var assert = require('assert');
var prompt = require('prompt');
prompt.start();

function Checker(color) {
    if (color === "white"){
        this.symbol = String.fromCharCode(0x125CB);
    } else {
        this.symbol = String.fromCharCode(0x125CF);
    }
}

function Board() {
    
    this.grid = [];
    
    // creates an 8x8 array, filled with null values
    this.createGrid = function() {
        // loop to create the 8 rows
        for (var row = 0; row < 8; row++) {
            this.grid[row] = [];
            // push in 8 columns of nulls
            for (var column = 0; column < 8; column++) {
                this.grid[row].push(null);
            }
        }
    }

    // prints out the board
    this.viewGrid = function() {
        // add our column numbers
        var string = "  0 1 2 3 4 5 6 7\n";
        for (var row = 0; row < 8; row++) {
            // we start with our row number in our array
            var rowOfCheckers = [row];
            // a loop within a loop
            for (var column = 0; column < 8; column++) {
                // if the location is "truthy" (contains a checker piece, in this case)
                if (this.grid[row][column]) {
                    // push the symbol of the check in that location into the array
                    rowOfCheckers.push(this.grid[row][column].symbol);
                } else {
                    // just push in a blank space
                    rowOfCheckers.push(' ');
                }
            }
            // join the rowOfCheckers array to a string, separated by a space
            string += rowOfCheckers.join(' ');
            // add a 'new line'
            string += "\n";
        }
        console.log(string);
    }

    this.checkers = [];

    this.createCheckers = function(){

        // NORMAL GAME
        var whitePositions = [
            [0, 1], [0, 3], [0, 5], [0, 7],
            [1, 0], [1, 2], [1, 4], [1, 6],
            [2, 1], [2, 3], [2, 5], [2, 7]
        ];

        var blackPositions = [
            [5, 0], [5, 2], [5, 4], [5, 6],
            [6, 1], [6, 3], [6, 5], [6, 7],
            [7, 0], [7, 2], [7, 4], [7, 6]
        ];

        // JUMPING PLAYER SCENARIO
        // var whitePositions = [
        //     [0, 1], [0, 3], [0, 5], [0, 7],
        //     [1, 0], [1, 2], [1, 4], [1, 6],
        //     [3, 2], [2, 3], [2, 5], [2, 7]
        // ];

        // var blackPositions = [
        //     [5, 0], [5, 2], [4, 3], [5, 6],
        //     [6, 1], [6, 3], [6, 5], [6, 7],
        //     [7, 0], [7, 2], [7, 4], [7, 6]
        // ];

        for (var i = 0; i < 12; i++){  
            this.grid[whitePositions[i][0]][whitePositions[i][1]] = new Checker('white');
            this.grid[blackPositions[i][0]][blackPositions[i][1]] = new Checker('black');
            this.checkers.push(this.grid[whitePositions[i][0]][whitePositions[i][1]]);
            this.checkers.push(this.grid[blackPositions[i][0]][blackPositions[i][1]]);
        }

    }

    this.selectChecker = function(row, column){
        return this.grid[row][column];
    }

    this.killChecker = function(position){

        var rowPosition = parseInt(position[0]);
        var colPosition = parseInt(position[1]);
        
        this.grid[rowPosition][colPosition] = null;
        this.checkers.pop();
    }
}

function Game() {

    this.board = new Board();

    this.start = function() {
        this.board.createGrid();
        this.board.createCheckers();
    }

    this.moveChecker = function(start, end){

        var startRow = parseInt(start[0]);
        var startCol = parseInt(start[1]);
        
        var endRow = parseInt(end[0]);
        var endCol = parseInt(end[1]);

        var checker = this.board.selectChecker(startRow, startCol);

        if (this.board.grid[endRow][endCol] === null){

            this.board.grid[startRow][startCol] = null;
            this.board.grid[endRow][endCol] = checker;

            var moveDistance = Math.abs(startRow - endRow);

            if (moveDistance === 2){

                var killPositionX = (startRow + endRow) / 2;
                var killPositionY = (startCol + endCol) / 2;
                var killPosition = killPositionX + "" + killPositionY;

                this.board.killChecker(killPosition);
            }
        }

    }
}

var whosTurn = "White";

function getPrompt() {
    
    console.log("It's " + whosTurn + " turn");
    whosTurn = (whosTurn === 'White') ? 'Black':'White';

    game.board.viewGrid();
    prompt.get(['which piece?', 'to where?'], function (error, result) {
        game.moveChecker(result['which piece?'], result['to where?']);
        getPrompt();
    });
}

var game = new Game();
game.start();

// Tests

if (typeof describe !== 'undefined') {
    describe('Game', function() {
        it('should have a board', function() {
            assert.equal(game.board.constructor.name, 'Board');
        });
        it('board should have 24 checkers', function() {
            assert.equal(game.board.checkers.length, 24);
        });
    });

    describe('Game.moveChecker()', function () {
        it('should move a checker', function () {
            assert(!game.board.grid[4][1])
            game.moveChecker('50', '41');
            assert(game.board.grid[4][1]);
            game.moveChecker('21', '30');
            assert(game.board.grid[3][0]);
            game.moveChecker('52', '43');
            assert(game.board.grid[4][3]);
        });
        it('should be able to jump over and kill another checker', function() {
            game.moveChecker('30', '52');
            assert(game.board.grid[5][2]);
            assert(!game.board.grid[4][1]);
            assert.equal(game.board.checkers.length, 23);
        });
    });
} else {
    getPrompt();
}
