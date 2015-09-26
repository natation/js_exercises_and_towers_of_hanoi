Function.prototype.myBind = function(context) {
  var fn = this;
  return function() {
    fn.apply(context);
  };
};

var Cat = function(name) {
  this.name = name;

  this.likedPeople = ["me", "you", "them"];
};

Cat.prototype.sayHi = function() {
  console.log(this.name + " says hi!");
};

Cat.prototype.talk = function() {
  this.likedPeople.forEach(function(person) {
    console.log(this.name + " likes " + person);
  }.bind(this));
};

var dog = {name: "rufus"};

var c = new Cat("Kitty");
var catHi = c.sayHi;

catHi();

var dogHi = c.sayHi.myBind(dog);

dogHi();

c.talk();

// x.myBind(cat) => should bind x to the cat context.
// So we should save o's context. New function when invoked, should be
