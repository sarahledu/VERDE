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
    console.log(this.factories);
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

  hasEmptySpots(line){
    var emptySpots =0
    for (let j=0;j<this.preparation[line].length;j++){
      if (this.preparation[line][j].value===0){
        emptySpots += 1
      }
    } return emptySpots;
  }
  plays(factory, chosenColor, chosenLine) {
    var colorCounter = 0;
    var letsKeepPlaying = true;
    for (let i = 0; i < factory.length; i++) {
      if (factory[i] === chosenColor) {
        colorCounter += 1;
      }
    }
    for (let j = 0; j < this.preparation[chosenLine].length; j++) {
      if (
        this.preparation[chosenLine][j].color != chosenColor &&
        this.preparation[chosenLine][j].color != ""
      ) {
        console.log(
          "You cannot place your tile here coquinou, choose another line"
        );
        letsKeepPlaying = false;
      }
    }
    for (let j = 0; j < this.grid[chosenLine].length; j++) {
      if (this.grid[chosenLine][j].color === chosenColor) {
        if (this.grid[chosenLine][j].value === 1) {
          console.log(
            "You cannot place your tile here dummy,choose another line"
          );
          letsKeepPlaying = false;
        }
      }
    }
    this.hasEmptySpots(chosenLine);
    if (letsKeepPlaying === true) {
      if (this.preparation[chosenLine].length>=colorCounter){
        this.malusPoints += colorCounter-this.preparation[chosenLine].length;
        //colorCounter=
      } else {
        
      }
      for (let j = 0; j < this.preparation[chosenLine].length; j++) {
        if (this.preparation[chosenLine][j].value === 0) {
          this.preparation[chosenLine][j].value = 1;
          this.preparation[chosenLine][j].color =chosenColor
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
      for (let j = 0; j < this.grid[i].length; j++) {
        if (this.grid[i][j].value === 1) {
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
      }
    }
    console.log(this.grid);
    console.log(this.totalPoints);
    return this.totalPoints;
  }
}

var partie1 = new Partie(2);
var player1 = new Player();

partie1.definesFactoryNb();
partie1.definesFactories();
partie1.definesTilesStack();
partie1.shufflesStack();
partie1.startTour();

console.log("---------------");
player1.plays(partie1.factories[1], "r", 1);

player1.makesWall();
player1.calculatePoints();
