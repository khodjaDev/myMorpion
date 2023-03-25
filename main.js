
const cells = document.querySelectorAll('[data-cell]');
const gameStatus = document.getElementById('gameStatus');
const endGameStatus = document.getElementById('endGameStatus');
const playerOne = 'X'; const playerTwo = 'O';
let playerTurn = playerOne;

//test ce le qui gagne
const winningPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

cells.forEach(cell => {
   cell.addEventListener('click', playGame, { once: true });
});


function playGame(e) {
   e.target.innerHTML = playerTurn;

   // logique pour qui va gagne!
   if (checkWin(playerTurn)) {
    updateGameStatus("wins" + playerTurn);
    return endGame();
   } else if (checkDraw()) {
    updateGameStatus("draw");
    return endGame();
   }
   

   updateGameStatus(playerTurn);
   playerTurn == playerOne ? playerTurn = playerTwo : playerTurn = playerOne;
   
}

// Logique pour ce qui gagne et autre teste winPatterns chaque combenisons victoire!
function checkWin(playerTurn) {
  return winningPatterns.some(combination => {
    return combination.every(index => {
      return cells[index].innerHTML == playerTurn;
    });
  });

}

// logique pour Egalité
function checkDraw() {
  return [...cells].every(cell => {
    return cell.innerHTML == playerOne || cell.innerHTML == playerTwo;
  });
}

function updateGameStatus(status) {
  let statusText;
  
  switch (status) {
    case 'X':
      statusText = "Au tour du joueur 2 (O)";
      break;
    case 'O':
      statusText = "Au tour du joueur 1 (X)";
      break;
    case 'winsX':
      statusText = "Le joueur 1 (X) a gagné!";
      break;
    case 'winsO':
      statusText = "le joueur 2 (O) a gagné";
      break;
    case 'draw':
      statusText = "Egalité! Personne ne gagne!";
      break;
  }

  gameStatus.innerHTML = statusText;
  endGameStatus.innerHTML = statusText;
}
// pour recommencer
function endGame() { document.getElementById('gameEnd').style.display = "block" }
function reloadGame() { window.location.reload() } 

// Magilan