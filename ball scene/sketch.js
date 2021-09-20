// Ball Scene
// Alex Colborne
// Sept 20, 2021

let ballArray = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  // for(let index = 0; index < 30; index++) {
  //   spawnBall(random(width), random(height));
  // }

  //spawn a ball every 0.5 seconds
  window.setInterval(spawnBall, 500);
}

function draw() {
  background(220);
  moveBall();
  displayBall();
}

function mouseClicked() {
  spawnBall(mouseX, mouseY);
}

function spawnBall(xSpawn, ySpawn) {
  let newBall = {
    x: xSpawn,
    y: ySpawn,
    diameter: random(20, 60),
    ballColor: color(random(255), random(255), random(255), random(255)),
    dx: random(5, 10),
    dy: random(5, 10),
  };
  ballArray.push(newBall);
}

function moveBall() {
  for (let theBall of ballArray) {
    theBall.x += theBall.dx;
    theBall.y += theBall.dy;
    theBall.dx = random(-5, 5);
    theBall.dy = random(-5, 5);
  }
}

function displayBall() {
  for (let ball of ballArray) {
    noStroke();
    fill(ball.ballColor);
    circle(ball.x, ball.y, ball.diameter);
  }
}
