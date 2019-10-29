const factos= document.querySelectorAll(".factories")


class Partie {
  constructor(nbOfPlayers) {
    this.nbOfPlayers = nbOfPlayers;
    this.nbOfFactories = 0;
    this.factories = [];
    this.tilesNbByColor = 20;
    this.redTiles = [];
    this.blueTiles = [];
    this.yellowTiles = [];
    this.darkBlueTiles = [];
    this.brownTiles = [];
    this.nbOfTiles = this.tilesNbByColor * 5;
    this.tilesStack = [];
  }

  definesTilesStack() {
    for (let i = 0; i < this.tilesNbByColor; i++) {
      this.redTiles.push("r");
      this.blueTiles.push("b");
      this.yellowTiles.push("y");
      this.darkBlueTiles.push("dkb");
      this.brownTiles.push("br");
    }
    this.tilesStack = this.redTiles.concat(
      this.blueTiles,
      this.yellowTiles,
      this.darkBlueTiles,
      this.brownTiles
    );

    return this.tilesStack;
  }

  shufflesStack() {
    this.definesTilesStack();
    for (let i = this.tilesStack.length - 1; i >= 0; i--) {
      var randomInt = Math.floor(Math.random() * this.tilesStack.length);
      var x = this.tilesStack[randomInt];
      this.tilesStack[randomInt] = this.tilesStack[i];
      this.tilesStack[i] = x;
    }
    return this.tilesStack;
  }
  definesFactoryNb() {
    if (this.nbOfPlayers === 2) {
      return (this.nbOfFactories = 5);
    } else if (this.nbOfPlayers === 3) {
      return (this.nbOfFactories = 7);
    } else if (this.nbOfPlayers === 4) {
      return (this.nbOfFactories = 9);
    }
  }

  definesFactories() {
    this.definesFactoryNb();
    var factory = [];
    for (let i = 0; i < this.nbOfFactories; i++) {
      this.factories.push(factory);
    }
    return this.factories;
  }

  startGame() {
    this.shufflesStack();
    this.definesFactories();
  }

  startTour() {
    for (let i = 0; i < this.nbOfFactories; i++) {
      this.factories[i] = this.tilesStack.splice(0, 4);
      for(let j=0;j<this.factories[i];j++){
        factos[i].innerHTML=``;
      }
    }
    
    console.log(this.factories); //ajouter le check dtu tilesstack vide
    return this.factories;
  }
}

class Player {
  constructor() {
    this.preparation = [
      [{ color: "", value: 0 }],
      [
        { color: "", value: 0 },
        { color: "", value: 0 },
        { color: "", value: 0 }
      ],
      [
        { color: "", value: 0 },
        { color: "", value: 0 },
        { color: "", value: 0 },
        { color: "", value: 0 },
        { color: "", value: 0 }
      ],
      [
        { color: "", value: 0 },
        { color: "", value: 0 },
        { color: "", value: 0 },
        { color: "", value: 0 }
      ],
      [{ color: "", value: 0 }, { color: "", value: 0 }]
    ];

    this.grid = [
      [
        { color: "dkb", value: 0, point: 0 },
        { color: "y", value: 0, point: 0 },
        { color: "r", value: 0, point: 0 },
        { color: "br", value: 0, point: 0 },
        { color: "b", value: 0, point: 0 }
      ],
      [
        { color: "b", value: 0, point: 0 },
        { color: "dkb", value: 0, point: 0 },
        { color: "y", value: 0, point: 0 },
        { color: "r", value: 0, point: 0 },
        { color: "br", value: 0, point: 0 }
      ],
      [
        { color: "br", value: 0, point: 0 },
        { color: "b", value: 0, point: 0 },
        { color: "dkb", value: 0, point: 0 },
        { color: "y", value: 0, point: 0 },
        { color: "r", value: 0, point: 0 }
      ],
      [
        { color: "r", value: 0, point: 0 },
        { color: "br", value: 0, point: 0 },
        { color: "b", value: 0, point: 0 },
        { color: "dkb", value: 0, point: 0 },
        { color: "y", value: 0, point: 0 }
      ],
      [
        { color: "y", value: 0, point: 0 },
        { color: "r", value: 0, point: 0 },
        { color: "br", value: 0, point: 0 },
        { color: "b", value: 0, point: 0 },
        { color: "dkb", value: 0, point: 0 }
      ]
    ];
    this.totalPoints = 0;
    this.malusPoints = 0;
  }

  hasEmptySpots(line) {
    var emptySpots = 0;
    for (let j = 0; j < this.preparation[line].length; j++) {
      if (this.preparation[line][j].value === 0) {
        emptySpots += 1;
      }
    }
    return emptySpots;
  }

  checksLineColor(line, chosenColor) {
    for (let j = 0; j < this.preparation[line].length; j++) {
      if (
        this.preparation[line][j].color != chosenColor &&
        this.preparation[line][j].color != ""
      ) {
        console.log(
          "You cannot place your tile here coquinou, choose another line"
        );
        return false;
      } else {
        return true;
      }
    }
  }

  checksTileIsFree(line, chosenColor) {
    for (let j = 0; j < this.grid[line].length; j++) {
      if (this.grid[line][j].color === chosenColor) {
        if (this.grid[line][j].value === 1) {
          console.log(
            "You cannot place your tile here dummy,choose another line"
          );
          return false;
        } else {
          return true;
        }
      }
    }
  }
  plays(factory, chosenColor, chosenLine) {
    var colorCounter = 0;
    var emptySpots = this.hasEmptySpots(chosenLine);
    var tilesToPlace = 0;
    for (let i = 0; i < factory.length; i++) {
      if (factory[i] === chosenColor) {
        colorCounter += 1;
      }
    }

    if (
      this.checksLineColor(chosenLine, chosenColor) &&
      this.checksTileIsFree(chosenLine, chosenColor)
    ) {
      //ajouter le delete de la factory choisie si on ne peut pas le gérer avec le DOM
      if (emptySpots <= colorCounter) {
        this.malusPoints += colorCounter - emptySpots;
        tilesToPlace = emptySpots;
      } else {
        tilesToPlace = colorCounter;
      }
      for (let j = 0; j < tilesToPlace; j++) {
        if (this.preparation[chosenLine][j].value === 0) {
          this.preparation[chosenLine][j].value = 1;
          this.preparation[chosenLine][j].color = chosenColor;
        } else {
          tilesToPlace += 1;
        }
      }
      console.log(this.preparation);
    }
  }
  makesWall() {
    for (let i = 0; i < this.preparation.length; i++) {
      var ligneTot = 0;
      for (let j = 0; j < this.preparation[i].length; j++) {
        if (this.preparation[i][j].value === 1) {
          ligneTot += 1;
        }
      }
      if (ligneTot == this.preparation[i].length) {
        for (let j = 0; j < this.grid[i].length; j++) {
          if (this.grid[i][j].color === this.preparation[i][0].color) {
            this.grid[i][j].value = 1;
          }
        }
      }
    }
  }

  calculatePoints() {
    for (let i = 0; i < this.grid.length; i++) {
      var lineTotal =0
      for (let j = 0; j < this.grid[i].length; j++) {
        if (this.grid[i][j].value === 1) {
          lineTotal+=1
          if (this.grid[i][j].point === 0) {
            this.grid[i][j].point = 1;
            this.totalPoints += 1;
            if (i > 0 && this.grid[i - 1][j].value === 1) {
              this.grid[i][j].point += 1;
              this.totalPoints += 1;
            }
            if (i < this.grid.length - 1 && this.grid[i + 1][j].value === 1) {
              this.grid[i][j].point += 1;
              this.totalPoints += 1;
            }
            if (j > 0 && this.grid[i][j - 1].value === 1) {
              this.grid[i][j].point += 1;
              this.totalPoints += 1;
            }
            if (
              j < this.grid[i].length - 1 &&
              this.grid[i][j + 1].value === 1
            ) {
              this.grid[i][j].point += 1;
              this.totalPoints += 1;
            }
          }
        }
      } if (lineTotal===5){
          console.log(`the player finished the game`)

      }
    }
    console.log(this.grid);
    console.log(this.totalPoints);
    return this.totalPoints - this.malusPoints;
  }
}



var partie1 = new Partie(2);
var player1 = new Player();
var player2 = new Player();

partie1.startGame();
partie1.startTour();

console.log("---------------");
player1.plays(partie1.factories[1], "r", 1);
console.log(partie1.factories);
player2.plays(partie1.factories[2], "b", 2);
