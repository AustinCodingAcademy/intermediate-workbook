'use strict';

document.addEventListener('DOMContentLoaded', () => {



  let stack = document.querySelectorAll('[data-stack]');
  let rings = document.querySelectorAll('[data-block]');

  console.log(stack);
  console.log(rings);
  let ring = null;

  stack.forEach(pole => {pole.onclick = function(e){
    stack.forEach( stacks => {stacks.onclick = function (e)  {
//remove child, addchild and stacks[0].lastChild.dataset.block or something
      if(this.length !== 0){
        if(ring === null){
        ring = this.removeChild(this.lastElementChild);
        }
        console.log(this.length)
        // ring = this.lastChild;
        console.log(ring);
        }

       else if (this.length === 0 && ring != null){
         this.addchild(ring);

       }
    //|| ($ring.data('block') < $(this).children().last().data('block') ))
      //  {
      //    $(this).append($ring);
      //    $ring = 'null';
      //    checkWin();
      //  }

    }});
  }});


});
