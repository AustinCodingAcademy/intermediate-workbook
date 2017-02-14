'use strict';

var assert = require('assert');
var colors = require('colors/safe');
var readline = require('readline');
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var board = [];
var solution = '';
var letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
var colors = require('colors/safe');

function printBoard() {
  for (var i = 0; i < board.length; i++) {
    console.log(board[i]);
  }
}

function generateSolution() {
  for (var i = 0; i < 4; i++) {
    var randomIndex = getRandomInt(0, letters.length);
    solution += letters[randomIndex];
  }
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function generateHint(solution, guess) {
  // split the string into individual letters for indexing later
  var solutionArray = solution.split("");
  var guessArray = guess.split("");
  // declare a variable to record the number of correct positions in the string
  var correctLetterLocations = 0;
  // loop around the solution array to see if there is a match 
  for (var i = 0; i < solutionArray.length; i++) {
    //detect a match
    if (solutionArray[i] === guessArray[i]) {
      //increment the counter
      correctLetterLocations ++;
      //set the list item at index i to null so there is no duplicate 
      solutionArray[i] = null;
    }
  }
  // declare a variable to record the number of correct letters in the string
  var correctLetters = 0;
  for (var j = 0; j < solutionArray.length; j++) {
    //detect if the target index item exists in the solution array 
    var targetIndex = solutionArray.indexOf(guessArray[j]);
    if (targetIndex !== -1) {
      correctLetters ++;
      solutionArray[targetIndex] = null;
    }
  }
  //return the hint as a string
   return correctLetterLocations + "-" + correctLetters;
}

function endGame() {
  if (board.length === 10) {
    console.log("You ran out of turns! The solution was " + solution);
  } else {
    console.log("Guess again!");
  }
}

function mastermind(guess) {
  //collect the hint value 
  var hint = generateHint(solution, guess);
  board.push(hint + guess);
  //detect a win 
  if (solution === guess) {
    return "You guessed it!";
  }
  endGame();
}


function getPrompt() {
  rl.question('guess: ', (guess) => {
    console.log( mastermind(guess) );
    printBoard();
    getPrompt();
  });
}

// Tests

if (typeof describe === 'function') {

  describe('#mastermind()', function () {
    it('should register a guess and generate hints', function () {
      solution = 'abcd';
      mastermind('aabb');
      assert.equal(board.length, 1);
    });
    it('should be able to detect a win', function () {
      assert.equal(mastermind(solution), 'You guessed it!');
    });
  });

  describe('#generateHint()', function () {
    it('should generate hints', function () {
      assert.equal(generateHint('abcd', 'abdc'), '2-2');
    });
    it('should generate hints if solution has duplicates', function () {
      assert.equal(generateHint('abcd', 'aabb'), '1-1');
    });

  });

} else {

  generateSolution();
  getPrompt();
}
