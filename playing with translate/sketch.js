// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let x, y, w, h, speed, i;

function setup() {
  createCanvas(windowWidth, windowHeight);
  x = width/2;
  y = height/2;
  w = 75;
  h = 130;
  speed = 15;
  i = 0;
}

function draw() {
  display();
  wasd();
  scroll();
}

function display() {
  background(0);
  push();
  translate(i, 0);
  rect(x, y, w, h);
  rect(300, 300, 100);
  rect(2000, 300, 100);
  pop();
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

function wasd() {
  if(keyIsDown(87)) { //w
    y -= speed;
  }
  if(keyIsDown(83)) { //s
    y += speed;
  }
  if(keyIsDown(65)) { //a
    x -= speed;
  }
  if(keyIsDown(68)) { //d
    x += speed;
  }
}