// Ball Scene
// Alex Colborne
// Sept 20, 2021

let ballArray = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  for(let index = 0; index < 30; index++) {
    spawnBall();
  }

  //spawn a ball every 0.5 seconds
  window.setInterval(spawnBall, 500);
}

function draw() {
  background(220);

  checkBall();
  moveBall();
  displayBall();
}

function checkBall() {
  for(let i = ballArray.length-1; i >= 0; i--) {
    let distance = dist(ballArray[i].x, ballArray[i].y, mouseX, mouseY);
    if(distance < ballArray[i].diameter / 2) {
      ballArray.splice(i, 1);
    }
  }
}

function mouseClicked() {
  spawnBall();
  ballArray[ballArray.length - 1].x = mouseX;
  ballArray[ballArray.length - 1].y = mouseY;
}

function spawnBall() {
  let newBall = {
    x: random(width),
    y: random(height),
    diameter: random(20, 60),
    ballColor: color(random(255), random(255), random(255), random(255)),
    dx: random(5, 10),
    dy: random(5, 10),
    xTime: random(1000),
    yTime: random(1000),
    timeChange: random(0.001, 0.01),
  };
  ballArray.push(newBall);
}

function moveBall() {
  for (let theBall of ballArray) {
    // theBall.x += theBall.dx;
    // theBall.y += theBall.dy;
    // theBall.dx = random(-5, 5);
    // theBall.dy = random(-5, 5);
    theBall.x = noise(theBall.xTime) * width;
    theBall.y = noise(theBall.yTime) * height;
    theBall.xTime += theBall.timeChange;
    theBall.yTime += theBall.timeChange;
  }
}

function displayBall() {
  for (let ball of ballArray) {
    noStroke();
    fill(ball.ballColor);
    circle(ball.x, ball.y, ball.diameter);
  }
}
