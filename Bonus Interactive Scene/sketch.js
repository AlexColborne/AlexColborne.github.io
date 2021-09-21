// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let bulletArray = [];
let enemyArray = [];
let charX, charY, charW, charH, theta, side;
let lastSpawn = 500;
let spawnTimer = 500;

function setup() {
  createCanvas(windowWidth, windowHeight);
  charX = width/2;
  charY = height/2;
  charW = 75;
  side = 1;
}

function draw() {
  background(220);
  displayChar();
  displayBullet();
  enemySpawner();
  displayEnemy();
}

function enemySpawner() {
  if(lastSpawn + spawnTimer <= millis()) {
    side = int(random(1, 5));
    if(side === 1) {
      spawnEnemy(random(width), 0); //Top
    }
    else if(side === 2) {
      spawnEnemy(width, random(height));  //Right
    }
    else if(side === 3) {
      spawnEnemy(random(width), height);  //Height
    }
    else if(side === 4) {
      spawnEnemy(0, random(height));  //Left
    }
    lastSpawn += spawnTimer;
  }
  
}

function displayEnemy() {
  for (let enemies of enemyArray) {
    rectMode(CORNER);
    rect(enemies.x, enemies.y, enemies.w);
    enemies.x -= cos(atan2(enemies.y - charY, enemies.x - charX));
    enemies.y -= sin(atan2(enemies.y - charY, enemies.x - charX));
    for(let bullets of bulletArray) {
      if(collideRectRect(enemies.x, enemies.y, enemies.w, enemies.w, bullets.x, bullets.y, bullets.w, bullets.h)) {
        enemyArray.splice(enemies, 1);
        bulletArray.splice(bullets, 1);
      }
    }
    
  }
}

function spawnEnemy(xSpawn, ySpawn) {
  let enemy = {
    x: xSpawn,
    y: ySpawn,
    w: 80,
    speed: 5,
  };
  enemyArray.push(enemy);
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
