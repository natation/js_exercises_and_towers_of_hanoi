var readline = require('readline');
var reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function addNumbers(sum, numsLeft, completionCallback) {
  if (numsLeft > 0) {
    reader.question("Enter a number: ", function(numStr) {
      var num = parseInt(numStr);
      sum += num;
      console.log(sum);
      addNumbers(sum, numsLeft - 1, completionCallback);
    });
  } else {
    completionCallback(sum);
  }
}

addNumbers(0, 3, function (sum) {
  console.log("Total Sum: " + sum);
  reader.close();
});

// var thing = "thang"
// var Fun = new Function ("console.log(thing)");
// var Fun = function () {
//   console.log(thing);
// }
// Fun();
