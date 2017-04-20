'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


function rockPaperScissors(hand1, hand2) {

  // Write code here


if(hand1 === hand2){
  return "It's a tie!";
}else if((hand1 === 'rock' && hand2 === 'paper') || (hand1 === 'paper' && hand2 === 'scissors') || (hand1 === 'scissors' && hand2 === 'rock')){
  return 'Hand two wins!';
}else if((hand1 === 'paper' && hand2 === 'rock') || (hand1 === 'scissors' && hand2 ==='paper') || (hand1 === 'rock' && hand2 === 'scissors'))
  return 'Hand one wins!';
}

function getPrompt() {
  rl.question('hand1: ', (answer1) => {
    var number = Math.random();
    var computer = null;
    if(number <= 0.33){
      computer = 'rock';
    }else if(number <= 0.66){
      computer = 'paper';
    }else{
      computer = 'scissors';
    }
      console.log('hand2:', (computer));
      console.log( rockPaperScissors(answer1, computer) );

      getPrompt();

  });
}

// Tests

if (typeof describe === 'function') {

  describe('#rockPaperScissors()', () => {
    it('should detect a tie', () => {
      assert.equal(rockPaperScissors('rock', 'rock'), "It's a tie!");
      assert.equal(rockPaperScissors('paper', 'paper'), "It's a tie!");
      assert.equal(rockPaperScissors('scissors', 'scissors'), "It's a tie!");
    });
    it('should detect which hand won', () => {
      assert.equal(rockPaperScissors('rock', 'paper'), "Hand two wins!");
      assert.equal(rockPaperScissors('paper', 'scissors'), "Hand two wins!");
      assert.equal(rockPaperScissors('rock', 'scissors'), "Hand one wins!");
    });
  });
} else {

  getPrompt();

}
