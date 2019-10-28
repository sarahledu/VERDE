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
    var factory = [];
    for (let i = 0; i < this.nbOfFactories; i++) {
      this.factories.push(factory);
    }
    return this.factories;
  }

  startTour() {
    for (let i = 0; i < this.nbOfFactories; i++) {
      this.factories[i] = this.tilesStack.splice(0, 4);
    }
    return this.factories;
  }
}

class Player {
  constructor() {
    this.grid = [
      [
        { color: "dkb", value: 0, point: 0 },
        { color: "y", value: 0, point: 0 },
        { color: "r", value: 1, point: 0 },
        { color: "br", value: 0, point: 0 },
        { color: "b", value: 0, point: 0 }
      ],
      [
        { color: "b", value: 0, point: 0 },
        { color: "dkb", value: 0, point: 0 },
        { color: "y", value: 1, point: 0 },
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
  }

  calculatePoints() {
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[i].length; j++) {
        if (this.grid[i][j].value === 1) {
          if (this.grid[i][j].point === 0) {
            this.grid[i][j].point = 1;
            if (this.grid[i - 1][j].value === 1) {
              this.grid[i][j].point += 1;
            }
            if (this.grid[i + 1][j].value === 1) {
              this.grid[i][j].point += 1;
            }
            if (this.grid[i][j - 1].value === 1) {
              this.grid[i][j].point += 1;
            }
            if (this.grid[i + 1][j + 1].value === 1) {
              this.grid[i][j].point += 1;
            }
          }
        }
      }
    } 
    console.log(this.grid)
    // const totalPoints = this.grid.reduce((acc, element) => {
    //     acc = acc + Number(element.point)
    //     return acc;
    // }, 0)
  }
}

var partie1 = new Partie(2);
var player1 =new Player();

partie1.definesFactoryNb();
partie1.definesFactories();
partie1.definesTilesStack();
partie1.shufflesStack();
partie1.startTour();
Player.calculatePoints()
console.log("---------------");
