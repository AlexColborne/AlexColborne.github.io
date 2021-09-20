// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let bulletArray = [];
let charX, charY, charW, charH, theta, side;

function setup() {
  createCanvas(windowWidth, windowHeight);
  charX = width/2;
  charY = height/2;
  charW = 75;
}

function draw() {
  background(220);
  displayChar();
  displayBullet();
  spawnEnemy();
}

function spawnEnemy() {
  let enemy = {
    x,
    y,
    w: 80,
    speed: 5,
    directon: atan2(y - charY, x - charX),
  };
  side = random(1, 5);
  if(side = 1) {
    rect(random(width), )
  }
}

function mouseClicked() {
  let bullet = {
    x: charX,
    y: charY,
    w: 30,
    h: 10,
    direction: atan2(charY - mouseY, charX - mouseX),
    speed: 10,
    color: color(255, 0, 0),
  };
  bulletArray.push(bullet);
}

function displayBullet() {
  for (let bullets of bulletArray) {
    push();
    translate(bullets.x, bullets.y);
    rotate(bullets.direction);
    fill(bullets.color);
    rect(0, 0, bullets.w, bullets.h);
    bullets.x -= cos(bullets.direction) * bullets.speed;
    bullets.y -= sin(bullets.direction) * bullets.speed;
    pop();
  }
}

function displayChar() {
  theta = atan2(charY - mouseY, charX - mouseX);
  push();
  translate(charX, charY);
  rotate(theta);
  rectMode(CENTER);
  rect(0, 0, charW);
  pop();
}
