Function.prototype.myBind =
  function(context) {
    var fn = this;
    return function() {
      fn.apply(context);
    }
  }

var Cat = function(name) {
  this.name = name;
};

Cat.prototype.sayHi = function() {
  console.log(this.name + " says hi!");
};

var c = new Cat("Kitty");
var catHi = c.sayHi;

console.log(catHi());

catHi = c.sayHi.myBind(c);

console.log(catHi());

// x.myBind(cat) => should bind x to the cat context.
// So we should save o's context. New function when invoked, should be
//
