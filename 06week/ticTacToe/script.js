'use strict';

document.addEventListener('DOMContentLoaded', () => {

  let playerTurn = 'X';
  document.querySelectorAll('[data-cell]').forEach(cell => {
    cell.onclick = function(event) {
      event.preventDefault();
      this.innerText = playerTurn;

  // Check to see if there's a winner
      if (checkWin()) {
        document.getElementById("announce-winner").innerText = (playerTurn + " wins!");
      }
  // Switches from X to O and visa versa
      playerTurn = (playerTurn === 'X') ? 'O' : 'X';
    }
  });

// Clears the board and fades a clean board back in
  document.querySelectorAll('button').forEach(cell => {
    cell.onclick = function(event) {
      event.preventDefault();
      var elements = document.querySelectorAll('[data-cell]');
        for (var i=0; i < elements.length; i++) {
          elements[i].innerText = "";
        }
      document.getElementById('announce-winner').innerText = "";

      playerTurn = 'X';
    }
  });

// Check to see if there's a winner function
  function checkWin() {

    if((document.querySelector('[data-cell="0"]').innerText === playerTurn &&
       document.querySelector('[data-cell="3"]').innerText === playerTurn &&
       document.querySelector('[data-cell="6"]').innerText === playerTurn
     ) || (document.querySelector('[data-cell="1"]').innerText === playerTurn &&
          document.querySelector('[data-cell="4"]').innerText === playerTurn &&
          document.querySelector('[data-cell="7"]').innerText === playerTurn
        ) || (document.querySelector('[data-cell="2"]').innerText === playerTurn &&
             document.querySelector('[data-cell="5"]').innerText === playerTurn &&
             document.querySelector('[data-cell="8"]').innerText === playerTurn
           ) || (document.querySelector('[data-cell="0"]').innerText === playerTurn &&
                document.querySelector('[data-cell="1"]').innerText === playerTurn &&
                document.querySelector('[data-cell="2"]').innerText === playerTurn
              ) || (document.querySelector('[data-cell="3"]').innerText === playerTurn &&
                   document.querySelector('[data-cell="4"]').innerText === playerTurn &&
                   document.querySelector('[data-cell="5"]').innerText === playerTurn
                 ) || (document.querySelector('[data-cell="6"]').innerText === playerTurn &&
                      document.querySelector('[data-cell="7"]').innerText === playerTurn &&
                      document.querySelector('[data-cell="8"]').innerText === playerTurn
                    ) || (document.querySelector('[data-cell="0"]').innerText === playerTurn &&
                         document.querySelector('[data-cell="4"]').innerText === playerTurn &&
                         document.querySelector('[data-cell="8"]').innerText === playerTurn
                       ) || (document.querySelector('[data-cell="2"]').innerText === playerTurn &&
                            document.querySelector('[data-cell="4"]').innerText === playerTurn &&
                            document.querySelector('[data-cell="6"]').innerText === playerTurn
                          )
      )
        {
        return true;
       } else {
         return false;
       }
     }

});
// https://gdevany.github.io/javascript-workbook/06week/ticTacToe/index.html
