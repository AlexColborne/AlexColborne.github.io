// Timer OOP Demo

let backgroundTimer;

function setup() {
  createCanvas(windowWidth, windowHeight);
  backgroundTimer = new Timer(3000);
}

function draw() {
  if(backgroundTimer.isDone()) {
    background("red");
  }
  else {
    background("black");
  }
}

function mousePressed() {
  backgroundTimer.reset();
}

class Timer {
  constructor(waitTime) {
    this.waitTime = waitTime;
    this.startTime = millis();
  }

  isDone() {
    return this.waitTime + this.startTime < millis();
  }

  reset() {
    this.startTime = millis();
  }

  setDuration(waitTime) {
    this.waitTime = waitTime;
  }
}