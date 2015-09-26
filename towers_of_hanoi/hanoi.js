var readline = require('readline');
var reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// function myLog(str) {
//   console.log(str);
//   return '';
// }

function HanoiGame (numDisks) {
  this.numDisks = parseInt(numDisks) || 3;
  this.towers = [];
  for (var i = 0; i < numDisks; i++) {
    this.towers.push([]);
  }
  for (var j = 0; j < numDisks; j++) {
    this.towers[0].push(j + 1);
  }
}

//Don't blow up prototype
HanoiGame.prototype = {
  isWon: function() {
    if (this.towers[0].length) {
      return false;
    }
    var diskSeen = false;
    for (var i = 1; i < this.numDisks; i++) {
      if (diskSeen && this.towers[i].length !== 0) {
        return false;
      } else if (this.towers[i].length !== 0) {
        diskSeen = true;
      }
    }
    return true;
  },
  isValidMove: function(startTowerIdx, endTowerIdx) {
    if (startTowerIdx < 0 || (startTowerIdx >= this.numDisks) ||
       (endTowerIdx < 0 || endTowerIdx >= this.numDisks) ||
       (startTowerIdx === endTowerIdx)) {
         return false;
    }
    var startTower = this.towers[startTowerIdx];
    var endTower = this.towers[endTowerIdx];
    var startDisc = startTower[startTower.length - 1];
    var endDisc = endTower[endTower.length - 1];
    return (startTower.length) &&
           (!endTower.length ||
            startDisc < endDisc
           );
  },
  move: function(startTowerIdx, endTowerIdx) {
    if (this.isValidMove(startTowerIdx, endTowerIdx)) {
      var startTower = this.towers[startTowerIdx];
      var endTower = this.towers[endTowerIdx];
      var startDisc = startTower.pop();
      endTower.push(startDisc);
      return true;
    } else {
      return false;
    }
  },
  print: function() {
    var str = '';
    for (var i = 0; i < this.numDisks; i++) {
      str += "tower" + (i + 1) + ": " + JSON.stringify(this.towers[i]) + "\n";
    }
    console.log(str);
  },
  promptMove: function(callback) {
    this.print();
    reader.question("Pick tower to move FROM: ", function(startTowerIdx) {
      reader.question("Pick tower to move TO: ", function(endTowerIdx) {
        callback(startTowerIdx, endTowerIdx);
      });
    });
  },
  run: function(completionCallback) {
    this.promptMove(function(startTowerIdx, endTowerIdx) {
      if (this.isValidMove(startTowerIdx - 1, endTowerIdx - 1)) {
        this.move(startTowerIdx - 1, endTowerIdx - 1);
      } else {
        console.log("Not a valid move!");
      }
      if (this.isWon()) {
        this.print();
        completionCallback();
      } else {
        this.run(completionCallback);
      }
    }.bind(this));
  }
};

var game = new HanoiGame(2);
game.run(function() {
  console.log("You won!");
  reader.close();
});
