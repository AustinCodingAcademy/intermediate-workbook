'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const vowels = "aeiou";




function pigLatin(word) {
//   if(typeof word !== String){
//   return("Please enter a valid word")
// }
function detectVowel(word) {
  for(let i = 0; i < word.length; i++) {
    if(vowels.indexOf(word[i] !== -1)){
      return(i)
    }
  }
}

const firstLetterType = detectVowel(word)
  if(firstLetterType > 0){
  return word.slice(firstLetterType) + word.slice(0, firstLetterType) + "ay"
  }
  return word + "way"
}

// detectVowel(word)


function getPrompt() {
  rl.question('word ', (answer) => {
    console.log( pigLatin(answer) );
    getPrompt();
  });
}

// Tests

if (typeof describe === 'function') {

  describe('#pigLatin()', () => {
    it('should translate a simple word', () => {
      assert.equal(pigLatin('car'), 'arcay');
      assert.equal(pigLatin('dog'), 'ogday');
    });
    it('should translate a complex word', () => {
      assert.equal(pigLatin('create'), 'eatecray');
      assert.equal(pigLatin('valley'), 'alleyvay');
    });
    it('should attach "yay" if word begins with vowel', () => {
      assert.equal(pigLatin('egg'), 'eggyay');
      assert.equal(pigLatin('emission'), 'emissionyay');
    });
    it('should lowercase and trim word before translation', () => {
      assert.equal(pigLatin('HeLlO '), 'ellohay');
      assert.equal(pigLatin(' RoCkEt'), 'ocketray');
    });
  });
} else {

  getPrompt();

}
