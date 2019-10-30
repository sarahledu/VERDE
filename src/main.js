const btnStart = document.getElementById("start-button");
const factos = document.querySelectorAll(".factory-tile-container");
const pioche = document.querySelector(".factory-tile-container.pioche");

function letsGetThisPartyStarted() {
  var partie = new Partie(2);
  var player1 = new Player();
  var player2 = new Player();

  const btnTurnP1 = document.getElementById("btn-player1");
  const btnTurnP2 = document.getElementById("btn-player2");

  partie.startGame();
  partie.startTour();

  for (let i = 0; i < partie.factories.length; i++) {
    factos[i].innerHTML = "";
    for (let j = 0; j < partie.factories[i].length; j++) {
      factos[
        i
      ].innerHTML += `<span class="tile white ${partie.factories[i][j]}"></span`;
    }
  }

  function updatePioche() {
    pioche.innerHTML = "";
    for (let i = 0; i < partie.pioche.length; i++) {
      pioche.innerHTML += `<span class="tile white ${partie.pioche[i]}"></span>`;
    }
  }

  function player1plays(cb) {
    function chooseFacto(e, factory) {
      let currentFactoryNode = e.target;
      const tileElements = e.target.childNodes;
      tileElements.forEach(elem => {
        elem.onclick = e => {
          const chosenTile = e.target.className.split(" ")[2];
          const tempArr = Array.from(
            document.querySelectorAll("#player1 .empty-tiles.visible")
          );
          const emptyTilesArr = [];
          emptyTilesArr.push(
            tempArr.slice(0, 1),
            tempArr.slice(1, 4),
            tempArr.slice(4, 9),
            tempArr.slice(9, 13),
            tempArr.slice(13, 15)
          );
          console.log(emptyTilesArr);
          const tiles = document.querySelectorAll("#player1 .empty-tiles");
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
                currentFactoryNode.remove();
                updatePioche();
              } else {
                for (let i = 0; i < partie.pioche.length; i++) {
                  if (partie.pioche[i] === chosenTile) {
                    console.log(partie.pioche);
                    partie.pioche.splice(i, 1);
                    console.log(partie.pioche);
                    updatePioche();
                  }
                }
              }
              if (partie.endTour() === true) {
                player1.makesWall();
                player1.calculatePoints();
              }
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
          const tempArr = Array.from(
            document.querySelectorAll("#player2 .empty-tiles.visible")
          );
          const emptyTilesArr = [];
          emptyTilesArr.push(
            tempArr.slice(0, 1),
            tempArr.slice(1, 4),
            tempArr.slice(4, 9),
            tempArr.slice(9, 13),
            tempArr.slice(13, 15)
          );
          const tiles = document.querySelectorAll("#player2 .empty-tiles");
          tiles.forEach((t, i) => {
            t.onclick = function() {
              const line = Math.floor(i / 5);
              player2.plays(factory, chosenTile, line, partie);
              for (let j = 0; j < player2.tilesToPlace; j++) {
                emptyTilesArr[line][j].className += ` white tile ${chosenTile}`;
              }
              tiles.forEach(t => {
                t.onclick = null;
              });
              if (currentFactoryNode !== pioche) {
                currentFactoryNode.remove();
                updatePioche();
              } else {
                for (let i = 0; i < partie.pioche.length; i++) {
                  if (partie.pioche[i] === chosenTile) {
                    console.log(partie.pioche);
                    partie.pioche.splice(i, 1);
                    console.log(partie.pioche);
                    updatePioche();
                  }
                }
              }

              if (partie.endTour() === true) {
                player2.makesWall();
                player2.calculatePoints();
              }
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
