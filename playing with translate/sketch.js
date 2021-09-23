// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let x, y, w, h, speed, i, gravity, gravityNow, yAcc;

function setup() {
  createCanvas(windowWidth, windowHeight);
  x = width/2;
  y = height/2;
  w = 75;
  h = 130;
  speed = 15;
  i = 0;
  gravity = height * 0.001;
  yAcc = 0;
}

function draw() {
  display();
  wasd();
  scroll();
  forces();
}

function display() {
  background(0);
  push();
  translate(i, 0);
  rect(x, y, w, h);
  rect(300, 450, 400, 100);
  rect(2000, 300, 100);
  pop();
  rect(0, height - 100, width, 100);
}

function forces() {
  yAcc += gravity;
  y += yAcc;
  if(y > height - 100 - h) { //ground
    y = height - 100 - h;
    yAcc = 0;
  }
  if(x > 300 && x < 700 && y >= 400 - h) {
    y = 400;
    yAcc = 0;
  }

  console.log(yAcc);
}

function scroll() {
  if(x > width*0.9 - i) {
    i -= 15;
  }
  else if(x > width*0.6 - i) {
    i -= 5;
  }
  else if(x < width*0.1 - i) {
    i += 15;
  }
  else if(x < width*0.4 - i) {
    i += 5;
  }
}

function keyPressed() {
  if(keyCode === 32) {
    yAcc -= 23;
  }
}

function wasd() {
  if(keyIsDown(65)) { //a
    x -= speed;
  }
  if(keyIsDown(68)) { //d
    x += speed;
  }
}