function Clock () {
}

Clock.TICK = 5000;


Clock.prototype.printTime = function () {
  // Format the time in HH:MM:SS
  console.log(this.hours + ":" + this.minutes + ":" + this.seconds);
};

Clock.prototype.run = function () {
  // 1. Set the currentTime.
  // 2. Call printTime.
  // 3. Schedule the tick interval.
  this.currentTime = new Date();
  this.hours = this.currentTime.getHours();
  this.minutes = this.currentTime.getMinutes();
  this.seconds = this.currentTime.getSeconds();
  setInterval(this._tick.bind(this), Clock.TICK);
};

Clock.prototype._tick = function () {
  // 1. Increment the currentTime.
  // 2. Call printTime.
    var totalSeconds = this.seconds + this.minutes * 60 + this.hours * 3600 + 5;
    this.seconds = Math.floor(totalSeconds % 60);
    this.hours = Math.floor(totalSeconds / 3600);
    this.minutes = Math.floor((totalSeconds - this.hours * 3600) / 60);

    this.printTime();
};

var clock = new Clock();
clock.run();
