'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


function rockPaperScissors(hand1, hand2) {

  //hand1 winners
   if(hand1 == 'rock' && hand2 == 'scissors'){
     return = "Hand one wins!";
   }
   else if(hand1 == 'paper' && hand2 == 'rock'){
     return = "Hand one wins!";
   }
   else if(hand1 == 'scissors' && hand2 == 'paper'){
     return = "Hand one wins!";
   }
    //hand2 winners
   else if(hand1 == 'rock' && hand2 == 'paper'){
     return = "Hand two wins!";
   }
   else if(hand1 == 'paper' && hand2 == 'scissors'){
     return = "Hand two wins!";
   }
   else if(hand1 == 'scissors' && hand2 == 'rock'){
     return = "Hand two wins!";
   }
  } //hand1 and hand2 ties
  else if(hand1 === 'rock' && hand2 === 'rock'){
    return "It's a tie!";
  }
  else if(hand1 === 'paper' && hand2 === 'paper'){
    return "It's a tie!";
  }
  else if(hand1 === 'scissors' && hand2 === 'scissors'){
    return "It's a tie!";
  }

}

function getPrompt() {
  rl.question('hand1: ', (answer1) => {
    rl.question('hand2: ', (answer2) => {
      console.log( rockPaperScissors(answer1, answer2) );
      getPrompt();
    });
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
