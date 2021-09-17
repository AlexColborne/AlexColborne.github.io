// Interactive Scene
// Alex Colborne
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let x, y, w, h, wallWidth, ballX, ballY, theta, speed, ballSpeedX, ballSpeedY, catchBuffer, lossTime,
  lost, score, caught, bouncing, resetWidth, resetX, resetY, diameter;

function setup() {
  resetGame();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  if(width > height) {
    w = height * 0.1;
    h = height * 0.13;
    wallWidth = height * 0.075;
    diameter = height * 0.03;
    speed = height * 0.0125;
    ballSpeedX = height * 0.05;
    ballSpeedY = height * 0.05;
    resetWidth = height * 0.2;
    resetY = height * 0.75;
  }
  else {
    w = width * 0.1;
    h = width * 0.13;
    wallWidth = width * 0.075;
    diameter = width * 0.03;
    speed = width * 0.0125;
    ballSpeedX = width * 0.05;
    ballSpeedY = width * 0.05;
    resetWidth = width * 0.2;
    resetY = width * 0.75;
  }
  resetX = width/2 - resetWidth/2;
  textSize(wallWidth * 1.25);
}

function draw() {
  background(220);
  if(!lost) {
    displayGame();
    wasd();
    walls();
    ballMovement();
    caughtBall();
    loss();
  }
  else {
    lossScreen();
  }
}

function lossScreen() {
  background(0);
  textAlign(CENTER, BOTTOM);
  textSize(100);
  text("You Lost, but had a score of: " + score, 0, height/3, width);
  fill(255);
  rect(resetX, resetY, resetWidth);
  if(mouseX >= resetX && mouseX <= resetX+resetWidth && mouseY >= resetY && mouseY <=           resetY+resetWidth && mouseIsPressed) {
    resetGame();
  }
}

function displayGame() {
  //char
  fill(255);
  rect(x, y, w, h);
  
  //walls
  fill(0);
  rect(0, 0, width, wallWidth);
  rect(0, height-wallWidth, width, wallWidth);
  rect(0, 0, wallWidth, height);
  rect(width-wallWidth, 0, wallWidth, height);
  
  //ball
  fill(255, 0, 0);
  ellipse(ballX, ballY, diameter);
  
  //score
  fill("orange");
  text(score, 0, 0);
  
  if(bouncing) {
    text(round((lossTime - millis())/1000, 2), width*0.8, 0);
  }
}

function loss() {
  if(millis() > lossTime) {
    lost = true;
  }
}

function mouseClicked() {
  if(!bouncing) {
    theta = atan2(mouseY - ballY , mouseX - ballX);
    bouncing = true; 
    caught = false;
    catchBuffer = millis() + 100;
    ballSpeedX = Math.abs(ballSpeedX);
    ballSpeedY = Math.abs(ballSpeedY);
  }
}

function caughtBall() {
  if(millis() > catchBuffer) {
    if(bouncing) {
      caught = collideRectCircle(x, y, w, h, ballX, ballY, diameter);
      if(caught) {
        score++;
      }
    }
  }
  if(caught) {
    bouncing = false;
    ballX = x + w;
    ballY = y + 1/2 * h;
    lossTime = millis() + 3000;
  }
}

function ballMovement() {
  if(bouncing) {
    ballX += cos(theta) * ballSpeedX;
    ballY += sin(theta) * ballSpeedY;
  }
}

function walls() {
  //blocking char
  if(x < wallWidth - 5) {
    x+=speed;
  }
  if(x > width - w - wallWidth + 5) {
    x-=speed;
  }
  if(y < wallWidth - 5) {
    y+=speed;
  }
  if(y > height - wallWidth - h + 5) {
    y-=speed;
  }
  
  //bouncing ball
  if(ballX < wallWidth + diameter) {
    ballSpeedX = -ballSpeedX;
  }
  if(ballX > width - wallWidth - diameter) {
    ballSpeedX = -ballSpeedX;
  }
  if(ballY < wallWidth + diameter) {
    ballSpeedY = -ballSpeedY;
  }
  if(ballY > height - wallWidth - diameter) {
    ballSpeedY = -ballSpeedY;
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

function resetGame() {
  createCanvas(windowWidth, windowHeight);
  x = width/2;
  y = height/2;
  if(width > height) {
    w = height * 0.1;
    h = height * 0.13;
    wallWidth = height * 0.075;
    diameter = height * 0.03;
    speed = height * 0.0125;
    ballSpeedX = height * 0.05;
    ballSpeedY = height * 0.05;
    resetWidth = height * 0.2;
    resetY = height * 0.75;
  }
  else {
    w = width * 0.1;
    h = width * 0.13;
    wallWidth = width * 0.075;
    diameter = width * 0.03;
    speed = width * 0.0125;
    ballSpeedX = width * 0.05;
    ballSpeedY = width * 0.05;
    resetWidth = width * 0.2;
    resetY = width * 0.75;
  }
  ballX = x + w;
  ballY = y + 1/2 * h;
  resetX = width/2 - resetWidth/2;
  
  textSize(wallWidth * 1.25);
  textAlign(LEFT, TOP);
  
  lost = false;
  score = 0;
  caught = true;
  bouncing = false;
}
