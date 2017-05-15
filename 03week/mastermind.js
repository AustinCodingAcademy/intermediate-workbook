'use strict';

const assert = require('assert');
//const colors = require('colors/safe');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const board = [];
let solution = 'abcd';
const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

function printBoard() {
  for (let i = 0; i < board.length; i++) {
    console.log(board[i]);
  }
}

function generateSolution() {
  for (let i = 0; i < 4; i++) {
    const randomIndex = getRandomInt(0, letters.length);
    solution += letters[randomIndex];
  }
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function generateHint(solution, guess) {
  let whtPeg = 0;
  let redPeg = 0;
  let splitSol = solution.split("");
  let splitGuess = guess.split("");

  for(let i = 0; i < 4; i++) {
    if (splitSol[i] === splitGuess[i]){
      redPeg++;
    }
    let found = splitSol.indexOf(splitGuess[i]);
    if (found > -1) {
      splitSol[found] = null;
      whtPeg++;
    }
  }
  whtPeg = whtPeg - redPeg;
  return redPeg + "-" + whtPeg;
}

function mastermind(guess) {
  // your code here
  if (guess === solution) {
    return "You guessed it!";
  } else {
    board.push(guess + " " + generateHint(solution, guess));
  }
}





function getPrompt() {
  rl.question('guess: ', (guess) => {
    console.log( mastermind(guess) );
    printBoard();
    getPrompt();
  });
}

// Tests --------------------------------------------

if (typeof describe === 'function') {

  describe('#mastermind()', () => {
    it('should register a guess and generate hints', () => {
      solution = 'abcd';
      mastermind('aabb');
      assert.equal(board.length, 1);
    });
    it('should be able to detect a win', () => {
      assert.equal(mastermind(solution), 'You guessed it!');
    });
  });

  describe('#generateHint()', () => {
    it('should generate hints', () => {
      assert.equal(generateHint('abcd', 'abdc'), '2-2');
    });
    it('should generate hints if solution has duplicates', () => {
      assert.equal(generateHint('abcd', 'aabb'), '1-1');
    });

  });

} else {

  //generateSolution();
  getPrompt();
}


//[b,c,e,g].push(guess)
//if content of arrays match then does solution exist in guess?
//if yes then cross out and try again.
//if guess ==== generateSolution then return true
//push guess and hint to board-- build string and push
