const btnStart = document.getElementById("start-button");
const factos = document.querySelectorAll(".factory-tile-container");
const pioche = document.querySelector(".factory-tile-container.pioche");
const gridPlayer1 = Array.from(
  document.querySelectorAll("#player1-grid.grid > .tile")
);
const gridPlayer2 = Array.from(
  document.querySelectorAll("#player2-grid.grid > .tile")
);
const pointArea1 = document.getElementById("point-area-player1");
const pointArea2 = document.getElementById("point-area-player2");
const overlay= document.getElementById("overlay")
console.log(pointArea2);
console.log(pointArea1)

var gridP1 = [];
var gridP2 = [];
gridP1.push(
  gridPlayer1.slice(0, 5),
  gridPlayer1.slice(5, 10),
  gridPlayer1.slice(10, 15),
  gridPlayer1.slice(15, 20),
  gridPlayer1.slice(20, 25)
);
gridP2.push(
  gridPlayer2.slice(0, 5),
  gridPlayer2.slice(5, 10),
  gridPlayer2.slice(10, 15),
  gridPlayer2.slice(15, 20),
  gridPlayer2.slice(20, 25)
);

function createsPrepGrid(tempArr) {
  const emptyTilesArr = [];
  emptyTilesArr.push(
    tempArr.slice(0, 1),
    tempArr.slice(1, 4),
    tempArr.slice(4, 9),
    tempArr.slice(9, 13),
    tempArr.slice(13, 15)
  );
  return emptyTilesArr;
}

function letsGetThisPartyStarted() {
  var partie = new Partie(2);
  var player1 = new Player();
  var player2 = new Player();

  const btnTurnP1 = document.getElementById("btn-player1");
  const btnTurnP2 = document.getElementById("btn-player2");
  const tempArr1 = Array.from(
    document.querySelectorAll("#player1 .empty-tiles.visible")
  );
  const tempArr2 = Array.from(
    document.querySelectorAll("#player2 .empty-tiles.visible")
  );

  partie.startGame();
  overlay.classList.remove("is-active")
  
  function newTour(){
    partie.startTour();
    
  }
  newTour()

  function fillFactos() {
    for (let i = 0; i < partie.factories.length; i++) {
      factos[i].innerHTML = "";
      for (let j = 0; j < partie.factories[i].length; j++) {
        factos[
          i
        ].innerHTML += `<span class="tile white ${partie.factories[i][j]}"></span`;
      }
    }
  }
  fillFactos();

  function updatePioche() {
    pioche.innerHTML = "";
    for (let i = 0; i < partie.pioche.length; i++) {
      pioche.innerHTML += `<span class="tile white ${partie.pioche[i]}"></span>`;
    }
  }

  function updateGrid(gridP, player) {
    for (let i = 0; i < gridP.length; i++) {
      for (let j = 0; j < gridP[i].length; j++) {
        if (player.grid[i][j].value === 1) {
          gridP[i][j].classList.remove("inactive");
        }
      }
    }
  }

  function updatePrep(tempArr, player) {
    var emptyTilesArr = createsPrepGrid(tempArr);
    for (let i = 0; i < emptyTilesArr.length; i++) {
      for (let j = 0; j < emptyTilesArr[i].length; j++) {
        if (player.preparation[i][j].value === 0) {
          emptyTilesArr[i][j].className = `empty-tiles visible`;
        }
      }
    }
  }

  function displayPoints() {
    var pointsP1 = player1.calculatePoints();
    console.log(pointsP1);
    var pointsP2 = player2.calculatePoints();
    pointArea1.textContent =`Score : ${pointsP1}`;
    pointArea2.textContent=`Score : ${pointsP2}`;
  }
  function checksEndTour() {
    if (partie.endTour() === true) {
      player1.makesWall();
      player2.makesWall();
      updateGrid(gridP1, player1);
      updateGrid(gridP2, player2);
      updatePrep(tempArr1, player1);
      updatePrep(tempArr2, player2);
      displayPoints();
      if (partie.endGame(player1) || partie.endGame(player2)) {
        overlay.classList.add("is-active")
      } else {
        partie.startTour();
        fillFactos();
      }
    }
  }
  function player1plays(cb) {
    function chooseFacto(e, factory) {
      let currentFactoryNode = e.target;
      const tileElements = e.target.childNodes;
      tileElements.forEach(elem => {
        elem.onclick = e => {
          const chosenTile = e.target.className.split(" ")[2];
          console.log(chosenTile)
          const tiles = document.querySelectorAll("#player1 .empty-tiles");
          const trash = document.querySelector("#bin-player1.bin");
          const emptyTilesArr = createsPrepGrid(tempArr1);
          trash.onclick = function() {
            player1.isInTheShit(chosenTile, partie);
            for (let i = 0; i < partie.pioche.length; i++) {
              if (partie.pioche[i] === chosenTile) {
                partie.pioche.splice(i, 1);
              }
            }
            updatePioche();
          };

          tiles.forEach((t, i) => {
            t.onclick = function() {
              const line = Math.floor(i / 5);
              player1.plays(factory, chosenTile, line, partie);
              for (let j = 0; j < player1.tilesToPlace; j++) {
                emptyTilesArr[line][
                  j
                ].className = `empty-tiles visible white tile ${chosenTile}`;
              }
              tiles.forEach(t => {
                t.onclick = null;
              });
              if (currentFactoryNode !== pioche) {
                currentFactoryNode.innerHTML = "";
                updatePioche();
              } else {
                updatePioche();
                checksEndTour();
              }
              checksEndTour();
            };
          });

          elem.onclick = null;
        };
      });
    }
    factos.forEach((facto, i) => {
      facto.onclick = e => chooseFacto(e, partie.factories[i]);
    });
  }

  function player2plays(cb) {
    function chooseFacto(e, factory) {
      let currentFactoryNode = e.target;
      const tileElements = e.target.childNodes;
      tileElements.forEach(elem => {
        elem.onclick = e => {
          const chosenTile = e.target.className.split(" ")[2];

          const tiles = document.querySelectorAll("#player2 .empty-tiles");
          const trash = document.querySelector("#bin-player2.bin");
          const emptyTilesArr = createsPrepGrid(tempArr2);

          trash.onclick = function() {
            player2.isInTheShit(chosenTile, partie);
            for (let i = 0; i < partie.pioche.length; i++) {
              if (partie.pioche[i] === chosenTile) {
                partie.pioche.splice(i, 1);
              }
            }
            updatePioche();
            checksEndTour();
          };

          tiles.forEach((t, i) => {
            t.onclick = function() {
              const line = Math.floor(i / 5);
              player2.plays(factory, chosenTile, line, partie);
              for (let j = 0; j < player2.tilesToPlace; j++) {
                emptyTilesArr[line][
                  j
                ].className = `empty-tiles visible white tile ${chosenTile}`;
              }
              tiles.forEach(t => {
                t.onclick = null;
              });
              if (currentFactoryNode !== pioche) {
                currentFactoryNode.innerHTML = "";
                updatePioche();
              } else {
                updatePioche();
              }
              checksEndTour();
            };
          });

          elem.onclick = null;
        };
      });
    }
    factos.forEach((facto, i) => {
      facto.onclick = e => chooseFacto(e, partie.factories[i]);
    });
  }

  btnTurnP1.onclick = player1plays;
  btnTurnP2.onclick = player2plays;
}

// partie1.startTour();

// console.log("---------------");
// player1.plays(partie1.factories[1], "r", 1);
// console.log(partie1.factories);
// player2.plays(partie1.factories[2], "b", 2);

btnStart.onclick = letsGetThisPartyStarted;
