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
  //split the solution and guess into seperate arrays
  var solutionArray = solution.split('');
  var guessArray = guess.split('');
  //variable to store number of correct locations found 
  var correctLetterLocations = 0;
  //variable to store the number of correct letters found
  var correctLetters = 0;

  //loop through arrays to see if any guessed letters match the location of the letters in the solution 
  for (var i = 0; i < 4; i++) {
    //store both arrays in variables
    var solutionLetter = solutionArray[i];
    var guessLetter = guessArray[i];

    if (solutionLetter === guessLetter) {
      //if letters match, increment correctLetterLocations
      correctLetterLocations++;
      //set that specific letter to null so the loop will not look for it again
      solutionArray[i] = null;
    };
  };
  
  //loop through arrays to see if any guessed letters match the solution letters
  for (i = 0; i < 4; i++) {
    //store letter
    var guessLetter = guessArray[i];
    //store guessLetter to targetIndex if it's found in solutionArray
    var targetIndex = solutionArray.indexOf(guessLetter);
    //if it is, add it to correctLetters and set the position in which it was found to null
    if (targetIndex > -1) {
      correctLetters++;
      solutionArray[targetIndex] = null;
    };
  };
  //print the current correctLetterLocations and correctLetters to the console
  return correctLetterLocations + "-" + correctLetters;
}

function mastermind(guess) {
  var hint = generateHint(solution, guess);
  board.push(guess + " " + hint)
  if (guess === solution) {
    return "You guessed it!"; 
  }
  if (board.length === 10) {
    return "You ran out of turns! The solution was" + " " + solution + ".";
  } else {
    return "Guess again!";
  }
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
