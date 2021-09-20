// Interactive Scene
// Alex Colborne
// Sept 24, 2021
//
// Extra for Experts:
// - I explored what happened when the window was resized while the program was running, making sure that everything in the project will adjust to look and function normally regardless of the window size.


let x, y, w, h, wallWidth, ballX, ballY, theta, speed, ballSpeedX, ballSpeedY, catchBuffer, lossTime,
  lost, score, caught, bouncing, resetWidth, resetX, resetY, diameter, winW;

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
    resetWidth = height * 0.2;
    winW = true;
  }
  else {
    w = width * 0.1;
    h = width * 0.13;
    wallWidth = width * 0.075;
    diameter = width * 0.03;
    speed = width * 0.0125;
    resetWidth = width * 0.2;
    winW = false;
  }
  resetY = height * 0.75;
  ballSpeedX = width * 0.05;
  ballSpeedY = height * 0.05;
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
  if(winW) {
    textSize(height/6);
  }
  else {
    textSize(width/6);
  }
  text("You Lost, but had a score of: " + score, 0, height/3, width);
  fill(255);
  stroke(0);
  fill(255);
  rect(resetX, resetY, resetWidth);
  fill(100);
  ellipse(width/2, resetY + resetWidth/2, resetWidth - resetWidth/8);
  fill(255);
  ellipse(width/2, resetY + resetWidth/2, resetWidth - resetWidth*0.6);
  fill(100);
  triangle(resetX + 0.6*resetWidth, resetY + resetWidth * 0.5, resetX + resetWidth*0.8, resetY + resetWidth*0.9, resetX + resetWidth, resetY + resetWidth * 0.5);
  noStroke();
  rect(resetX + resetWidth*0.7, resetY + resetWidth * 0.4, resetWidth* 0.22);
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
  stroke(0);
  x = width/2;
  y = height/2;
  if(width > height) {
    w = height * 0.1;
    h = height * 0.13;
    wallWidth = height * 0.075;
    diameter = height * 0.03;
    speed = height * 0.0125;
    resetWidth = height * 0.2;
    winW = true;
  }
  else {
    w = width * 0.1;
    h = width * 0.13;
    wallWidth = width * 0.075;
    diameter = width * 0.03;
    speed = width * 0.0125;
    resetWidth = width * 0.2;
    winW = false;
  }
  resetY = height * 0.75;
  ballSpeedX = width * 0.05;
  ballSpeedY = height * 0.05;
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
