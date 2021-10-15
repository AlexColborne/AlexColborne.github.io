// Grid-Based Game (Tetris)
// Alex Colborne
// 10/15/2021
//
// Extra for Experts:
// - showed an expert level of understanding of 2D Arrays by using multiple 2D Arrays at the same time that interact with each other.

let staticGrid, cellSize, droppingGrid, block, state, lose, linesCleared, resetColor, tetriminoClick, clearSound, bgSong;
let inControl = false;
let gridHeight = 22;
let gridWidth = 10;

function preload() {
  //loading all sounds used in the game
  tetriminoClick = loadSound("assets/klick11.flac");
  clearSound = loadSound("assets/flaunch.wav");
  bgSong = loadSound("assets/australisfrontier.mp3");
}

function setup() { 
  //setting up canvas and variables
  createCanvas(windowWidth, windowHeight);
  staticGrid = createEmptyGrid();
  droppingGrid = createEmptyGrid();
  state = 1;
  lose = false;
  inControl = false;
  linesCleared = 0;
  resetColor = color(220);
  if(height/gridHeight <= width/12) {
    cellSize = height/gridHeight;
  }
  else {
    cellSize = width/14;
  }
  bgSong.loop();
}

function windowResized() {
  //resizes game when window is resized
  resizeCanvas(windowWidth, windowHeight);
  if(height/gridHeight <= width/12) {
    cellSize = height/gridHeight;
  }
  else {
    cellSize = width/14;
  }
}

function draw() {
  background("white");
  drawGrid();
  loseCheck();
  //does not run game when lost
  if(!lose) {
    blockSpawner();
    if(frameCount % 20 === 0) {
      gridFall();
    }
    drop();
    displayScore();
  }
  //shows loss screen when game lost
  else {
    lossScreen();
  }
}

function displayScore() {
  //displays how many lines have been cleared in the top right
  textSize(cellSize * 1);
  fill("red");
  textAlign(CENTER, CENTER);
  text(linesCleared, width/2 + cellSize * 6, cellSize);
}

function loseCheck() {
  //checks if the game is lost
  for(let x = 0; x < gridWidth; x++) {
    if(staticGrid[1][x] !== 0) {
      lose = true;
      bgSong.stop();
    }
  }
}

function lossScreen() {
  //loss text
  fill("black");
  textSize(cellSize * 3);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  stroke("white");
  strokeWeight(cellSize / 10);
  text("You Lost!", width/2, height/4);
  textSize(cellSize * 1.5);
  text("You Cleared " + linesCleared + " Lines!", width/2, height / 2);

  //reset button
  stroke("black");
  rectMode(CENTER);
  fill(resetColor);
  rect(width/2, height * 3/4, cellSize * 9, cellSize * 3);
  fill("black");
  text("R E S E T", width/2, height * 3/4 + 10);
  rectMode(CORNER);
  strokeWeight(2);

  //hover the button
  if(mouseX >= width/2 - cellSize * 4.5 && mouseX <= width/2 + cellSize * 4.5 && mouseY >= height * 3/4 - cellSize * 3/2 && mouseY <= height * 3/4 + cellSize * 3/2) {
    resetColor = color(220);
  }
  else {
    resetColor = color(180);
  }
}

function mousePressed() {
  //clicks the reset button
  if(lose) {
    if(mouseX >= width/2 - cellSize * 4.5 && mouseX <= width/2 + cellSize * 4.5 && mouseY >= height * 3/4 - cellSize * 3/2 && mouseY <= height * 3/4 + cellSize * 3/2) {
      setup();
    }
  }
}

function clearLineCheck() {
  //checks to see if any line has been completed
  let counter = 0;
  for(let y = 0; y < gridHeight; y++) {
    counter = 0;
    for(let x = 0; x < gridWidth; x++) {
      if(staticGrid[y][x] !== 0) {
        counter++;
      }
      if(counter === 10) {
        clearLine(y);
      }
    }
  }
  inControl = false;
}

function clearLine(destroyY) {
  //clears lines that have been completed
  for(let x = 0; x < gridWidth; x++) {
    staticGrid[destroyY].splice(x, 1, 0);
  }
  for(let y = destroyY; y > 0; y--) {
    for(let x = 0; x < gridWidth; x++) {
      staticGrid[y][x] = staticGrid[y-1][x];
    }
  }
  clearSound.play();
  linesCleared ++;
}

function createEmptyGrid() {
  //creates an empty grid
  let gridArray = [];
  for(let y = 0; y < gridHeight; y++) {
    gridArray.push([]);
    for(let x = 0; x<gridWidth; x++) {
      gridArray[y].push(0);
    }
  }
  return gridArray;
}

function blockSpawner() {
  //if no tetrimino are dropping, randomly picks a block and inserts it into the top of the grid
  if(!inControl) {
    block = int(random(1, 8));
    droppingGrid = createEmptyGrid();
    if(block === 1) { //T Block
      droppingGrid[0][4] = 1;
      droppingGrid[0][5] = 1;
      droppingGrid[0][6] = 1;
      droppingGrid[1][5] = 1;
      state = 1;
    }
    if(block === 2) { //O Block
      droppingGrid[0][4] = 2;
      droppingGrid[0][5] = 2;
      droppingGrid[1][4] = 2;
      droppingGrid[1][5] = 2;
    }
    if(block === 3) { //I Block
      droppingGrid[0][3] = 3;
      droppingGrid[0][4] = 3;
      droppingGrid[0][5] = 3;
      droppingGrid[0][6] = 3;
      state = 1;
    }
    if(block === 4) { //J Block
      droppingGrid[0][4] = 4;
      droppingGrid[0][5] = 4;
      droppingGrid[0][6] = 4;
      droppingGrid[1][6] = 4;
      state = 1;
    }
    if(block === 5) { //L Block
      droppingGrid[0][4] = 5;
      droppingGrid[0][5] = 5;
      droppingGrid[0][6] = 5;
      droppingGrid[1][4] = 5;
      state = 1;
    }
    if(block === 6) { //S Block
      droppingGrid[0][5] = 6;
      droppingGrid[0][6] = 6;
      droppingGrid[1][5] = 6;
      droppingGrid[1][4] = 6;
      state = 1;
    }
    if(block === 7) { //S Block
      droppingGrid[0][4] = 7;
      droppingGrid[0][5] = 7;
      droppingGrid[1][5] = 7;
      droppingGrid[1][6] = 7;
      state = 1;
    }
    inControl = true;
  }
}

function drop() {
  //accelerates the block when the down arrow is held down
  if(keyIsDown(40)) {
    if(frameCount % 3 === 0) {
      gridFall();
    }
  }
}

function keyPressed() {
  //calls functions using arrow keys

  if(keyCode === LEFT_ARROW) {
    movement(-1);
  }

  if(keyCode === RIGHT_ARROW) {
    movement(1);
  }

  if(keyCode === UP_ARROW) {
    rotations();
  }
}

function gridFall() {
  //creates new grid identical the one dropping a piece
  let gridDropCheck = [];
  for(let y = 0; y < gridHeight; y++) {
    gridDropCheck.push([]);
    for(let x = 0; x < gridWidth; x++) {
      gridDropCheck[y].push(droppingGrid[y][x]);
    }
  }

  //checks if block can fall
  for(let y = gridHeight-1; y >= 0; y--) {
    for(let x = gridWidth-1; x >= 0; x--) {
      if(gridDropCheck[y][x] !== 0) {    
        if(y < gridHeight-1) {
          if(staticGrid[y+1][x] === 0) {
            gridDropCheck[y+1][x] = gridDropCheck[y][x];
            gridDropCheck[y][x] = 0;
          }
          else {
            for(let y2 = 0; y2 < gridHeight; y2++) { 
              for(let x2 = 0; x2 < gridWidth; x2++) {
                if(droppingGrid[y2][x2] !== 0) {
                  staticGrid[y2][x2] = droppingGrid[y2][x2];
                }
              }
            }
            tetriminoClick.play();
            clearLineCheck();
            return;
          } 
        } 
        else {
          for(let y2 = 0; y2 < gridHeight; y2++) { 
            for(let x2 = 0; x2 < gridWidth; x2++) {
              if(droppingGrid[y2][x2] !== 0) {
                staticGrid[y2][x2] = droppingGrid[y2][x2];
              }
            }
          }
          tetriminoClick.play();
          clearLineCheck();
          return;
        } 
      }
    }
  }
  droppingGrid = gridDropCheck;
}

function drawGrid() {
  //draws the grid and sets all blocks to the correct color
  for(let y = 0; y < gridHeight; y++) {
    for(let x = 0; x < gridWidth; x++) {
      if(staticGrid[y][x] === 1 || droppingGrid[y][x] === 1) {
        fill(128, 0, 128);
      }
      else if(staticGrid[y][x] === 2 || droppingGrid[y][x] === 2) {
        fill(255, 255, 0);
      }
      else if(staticGrid[y][x] === 3 || droppingGrid[y][x] === 3) {
        fill(0, 255, 255);
      }
      else if(staticGrid[y][x] === 4 || droppingGrid[y][x] === 4) {
        fill(0, 0, 255);
      }
      else if(staticGrid[y][x] === 5 || droppingGrid[y][x] === 5) {
        fill(255, 127, 0);
      }
      else if(staticGrid[y][x] === 6 || droppingGrid[y][x] === 6) {
        fill(0, 255, 0);
      }
      else if(staticGrid[y][x] === 7 || droppingGrid[y][x] === 7) {
        fill(255, 0, 0);
      }
      else if(staticGrid[y][x] === 0) {
        fill(127, 127, 127);
      }
      rect(x*cellSize + width/2 - cellSize * gridWidth/2, y*cellSize, cellSize);
    }
  }
  strokeWeight(10);
  line(width/2 - cellSize * gridWidth/2, cellSize * 2 , width/2 + cellSize * gridWidth/2, cellSize*2);
  strokeWeight(2);
}

function movement(direction) {
  //move left using a 2nd grid to check for valid moves
  if(direction === -1) {
    let gridLSideCheck = [];
    for(let y = 0; y < gridHeight; y++) {
      gridLSideCheck.push([]);
      for(let x = 0; x < gridWidth; x++) {
        gridLSideCheck[y].push(droppingGrid[y][x]);
      }
    }
    for(let y = 0; y < gridHeight; y++) { 
      for(let x = 0; x < gridWidth; x++) {
        if(gridLSideCheck[y][x] !== 0) {
          if(x >= 1) {
            if(staticGrid[y][x-1] === 0) {
              gridLSideCheck[y][x-1] = gridLSideCheck[y][x];
              gridLSideCheck[y][x] = 0;
            }
            else {
              return;
            }
          }
          else {
            return;
          }
        }
      }
    }
    droppingGrid = gridLSideCheck;
  }

  //move right using a second grid to check for valid moves
  if(direction === 1) {
    let gridRSideCheck = [];
    for(let y = 0; y < gridHeight; y++) {
      gridRSideCheck.push([]);
      for(let x = 0; x < gridWidth; x++) {
        gridRSideCheck[y].push(droppingGrid[y][x]);
      }
    }
    for(let y = gridHeight - 1; y >= 0; y--) { 
      for(let x = gridWidth - 1; x >= 0; x--) {
        if(gridRSideCheck[y][x] !== 0) {
          if(x < gridWidth) {
            if(staticGrid[y][x+1] === 0) {
              gridRSideCheck[y][x+1] = gridRSideCheck[y][x];
              gridRSideCheck[y][x] = 0;
            }
            else {
              return;
            }
          }
          else {
            return;
          }
        }
      }
    }
    droppingGrid = gridRSideCheck;
  }
}

function rotations() {
  //creates a 2nd grid to check for valid rotations
  let gridRotateCheck = [];
  for(let y = 0; y < droppingGrid.length; y++) {
    gridRotateCheck.push([]);
    for(let x = 0; x < droppingGrid[y].length; x++) {
      gridRotateCheck[y].push(droppingGrid[y][x]);
    }
  }
  let count = 0;

  //Rotating T-Block
  if(block === 1) {
    for(let y = 0; y < gridHeight; y++) {
      for(let x = 0; x < gridWidth; x++) {
        if(gridRotateCheck[y][x] === 1) {
          if(state === 1) {
            if(y > 0 && x < gridWidth - 1 && staticGrid[y-1][x+1] === 0) {
              gridRotateCheck[y-1][x+1] = 1;
              gridRotateCheck[y][x+2] = 0;

              state = 2;
              droppingGrid = gridRotateCheck;
              return;
            }
            else {
              return;
            }
          }
          if(state === 2) {
            if(x < gridWidth - 1 && y < gridHeight - 1 && staticGrid[y+1][x+1] === 0) {
              gridRotateCheck[y+1][x+1] = 1;
              gridRotateCheck[y+2][x] = 0;

              state = 3;
              droppingGrid = gridRotateCheck;
              return;
            }
            else {
              return;
            }
          }
          if(state === 3) {
            if(y < gridHeight - 2 && staticGrid[y+2][x] === 0) {
              gridRotateCheck[y+2][x] = 1;
              gridRotateCheck[y+1][x-1] = 0;

              state = 4;
              droppingGrid = gridRotateCheck;
              return;
            }
            else {
              return;
            }
          }
          if(state === 4) {
            if(x > 0 && y < gridHeight - 1 && staticGrid[y+1][x-1] === 0) {
              gridRotateCheck[y+1][x-1] = 1;
              gridRotateCheck[y][x] = 0;

              state = 1;
              droppingGrid = gridRotateCheck;
              return;
            }
            else {
              return;
            }
          }
        }
      }
    }
  }

  //Rotating I-Block
  if(block === 3) {
    for(let y = 0; y < gridHeight; y++) {
      for(let x = 0; x < gridWidth; x++) {
        if(gridRotateCheck[y][x] === 3) {
          if(state === 1) {
            if(y > 0 && y < gridHeight - 2 && staticGrid[y-1][x+2] === 0 && staticGrid[y+1][x+2] === 0 && staticGrid[y+2][x+2] === 0) {
              gridRotateCheck[y-1][x+2] = 3;
              gridRotateCheck[y+1][x+2] = 3;
              gridRotateCheck[y+2][x+2] = 3;

              gridRotateCheck[y][x] = 0;
              gridRotateCheck[y][x+1] = 0;
              gridRotateCheck[y][x+3] = 0;
              state = 2;
              droppingGrid = gridRotateCheck;
              return;
            }
            else {
              return;
            }
          }
          else if(state === 2) {
            if(y < gridHeight - 2 && x > 1 && x < gridWidth - 1 && staticGrid[y+2][x-2] === 0 && staticGrid[y+2][x-1] === 0 && staticGrid[y+2][x+1] === 0) {
              gridRotateCheck[y+2][x-2] = 3;
              gridRotateCheck[y+2][x-1] = 3;
              gridRotateCheck[y+2][x+1] = 3;

              gridRotateCheck[y][x] = 0;
              gridRotateCheck[y+1][x] = 0;
              gridRotateCheck[y+3][x] = 0;

              state = 3;
              droppingGrid = gridRotateCheck;
              return;
            }
            else {
              return;
            }
          }
          else if(state === 3) {
            if(y < gridHeight - 2 && y > 1 && x < gridWidth - 1 && staticGrid[y-2][x+1] === 0 && staticGrid[y-1][x+1] === 0 && staticGrid[y+1][x+1] === 0) {
              gridRotateCheck[y-2][x+1] = 3;
              gridRotateCheck[y-1][x+1] = 3;
              gridRotateCheck[y+1][x+1] = 3;

              gridRotateCheck[y][x] = 0;
              gridRotateCheck[y][x+2] = 0;
              gridRotateCheck[y][x+3] = 0;

              state = 4;
              droppingGrid = gridRotateCheck;
              return;
            }
            else {
              return;
            }
          }
          else if(state === 4) {
            if(y < gridHeight - 1 && x < gridWidth - 2 && x > 0 && staticGrid[y+1][x-1] === 0 && staticGrid[y+1][x+1] === 0 && staticGrid[y+1][x+2] === 0) {
              gridRotateCheck[y+1][x-1] = 3;
              gridRotateCheck[y+1][x+1] = 3;
              gridRotateCheck[y+1][x+2] = 3;

              gridRotateCheck[y][x] = 0;
              gridRotateCheck[y+2][x] = 0;
              gridRotateCheck[y+3][x] = 0;

              state = 1;
              droppingGrid = gridRotateCheck;
              return;
            }
            else {
              return;
            }
          }
        }
      }
    }
  }

  //Rotating J-Block
  if(block === 4) {
    for(let y = 0; y < gridHeight; y++) {
      for(let x = 0; x < gridWidth; x++) {
        if(gridRotateCheck[y][x] === 4) {
          if(state === 1) {
            if(y < gridHeight - 1 && y > 0 && x < gridWidth - 1 && staticGrid[y-1][x+1] === 0 && staticGrid[y+1][x+1] === 0 && staticGrid[y+1][x] === 0) {
              gridRotateCheck[y-1][x+1] = 4;
              gridRotateCheck[y+1][x+1] = 4;
              gridRotateCheck[y+1][x] = 4;

              gridRotateCheck[y][x] = 0;
              gridRotateCheck[y][x+2] = 0;
              gridRotateCheck[y+1][x+2] = 0;
              state = 2;
              droppingGrid = gridRotateCheck;
              return;
            }
            else {
              return;
            }
          }
          if(state === 2) {
            if(y < gridHeight - 1 && x > 0 && x < gridWidth - 1 && staticGrid[y][x-1] === 0 && staticGrid[y+1][x-1] === 0 && staticGrid[y+1][x+1] === 0) {
              gridRotateCheck[y][x-1] = 4;
              gridRotateCheck[y+1][x-1] = 4;
              gridRotateCheck[y+1][x+1] = 4;

              gridRotateCheck[y][x] = 0;
              gridRotateCheck[y+2][x] = 0;
              gridRotateCheck[y+2][x-1] = 0;
              state = 3;
              droppingGrid = gridRotateCheck;
              return;
            }
            else {
              return;
            }
          }
          if(state === 3) {
            if(y < gridHeight - 2 && x < gridWidth - 2 && staticGrid[y][x+1] === 0 && staticGrid[y][x+2] === 0 && staticGrid[y+2][x+1] === 0) {
              gridRotateCheck[y][x+1] = 4;
              gridRotateCheck[y][x+2] = 4;
              gridRotateCheck[y+2][x+1] = 4;

              gridRotateCheck[y][x] = 0;
              gridRotateCheck[y+1][x] = 0;
              gridRotateCheck[y+1][x+2] = 0;
              state = 4;
              droppingGrid = gridRotateCheck;
              return;
            }
            else {
              return;
            }
          }
          if(state === 4) {
            if(y < gridHeight - 1 && y > 0 && x < gridWidth - 1 && staticGrid[y+1][x-1] === 0 && staticGrid[y+1][x+1] === 0 && staticGrid[y+2][x+1] === 0) {
              gridRotateCheck[y+1][x-1] = 4;
              gridRotateCheck[y+1][x+1] = 4;
              gridRotateCheck[y+2][x+1] = 4;

              gridRotateCheck[y][x] = 0;
              gridRotateCheck[y][x+1] = 0;
              gridRotateCheck[y+2][x] = 0;
              state = 1;
              droppingGrid = gridRotateCheck;
              return;
            }
            else {
              return;
            }
          }
        }
      }
    }
  }

  //rotates L-Block
  if(block === 5) {
    for(let y = 0; y < gridHeight; y++) {
      for(let x = 0; x < gridWidth; x++) {
        if(gridRotateCheck[y][x] === 5) {
          if(state === 1) {
            if(y < gridHeight - 1 && y > 0 && x < gridWidth - 1 && staticGrid[y-1][x] === 0 && staticGrid[y-1][x+1] === 0 && staticGrid[y+1][x+1] === 0) {
              gridRotateCheck[y-1][x] = 5;
              gridRotateCheck[y-1][x+1] = 5;
              gridRotateCheck[y+1][x+1] = 5;

              gridRotateCheck[y][x] = 0;
              gridRotateCheck[y+1][x] = 0;
              gridRotateCheck[y][x+2] = 0;
              state = 2;
              droppingGrid = gridRotateCheck;
              return;
            }
            else {
              return;
            }
          }
          if(state === 2) {
            if(y < gridHeight - 1 && x < gridWidth - 2 && staticGrid[y+1][x] === 0 && staticGrid[y][x+2] === 0 && staticGrid[y+1][x+2] === 0) {
              gridRotateCheck[y+1][x] = 5;
              gridRotateCheck[y][x+2] = 5;
              gridRotateCheck[y+1][x+2] = 5;

              gridRotateCheck[y][x] = 0;
              gridRotateCheck[y][x+1] = 0;
              gridRotateCheck[y+2][x+1] = 0;
              state = 3;
              droppingGrid = gridRotateCheck;
              return;
            }
            else {
              return;
            }
          }
          if(state === 3) {
            if(y < gridHeight - 2 && x > 0 && staticGrid[y][x-1] === 0 && staticGrid[y+2][x] === 0 && staticGrid[y+2][x-1] === 0) {
              gridRotateCheck[y][x-1] = 5;
              gridRotateCheck[y+2][x] = 5;
              gridRotateCheck[y+2][x-1] = 5;

              gridRotateCheck[y][x] = 0;
              gridRotateCheck[y+1][x] = 0;
              gridRotateCheck[y+1][x-2] = 0;
              state = 4;
              droppingGrid = gridRotateCheck;
              return;
            }
            else {
              return;
            }
          }
          if(state === 4) {
            if(y < gridHeight - 2 && x > 0 && x < gridWidth - 1 && staticGrid[y+1][x+1] === 0 && staticGrid[y+1][x-1] === 0 && staticGrid[y+2][x-1] === 0) {
              gridRotateCheck[y+1][x+1] = 5;
              gridRotateCheck[y+1][x-1] = 5;
              gridRotateCheck[y+2][x-1] = 5;

              gridRotateCheck[y][x] = 0;
              gridRotateCheck[y+2][x] = 0;
              gridRotateCheck[y+2][x+1] = 0;
              state = 1;
              droppingGrid = gridRotateCheck;
              return;
            }
            else {
              return;
            }
          }
        }
      }
    }
  }

  //rotates S-Block
  if(block === 6) {
    for(let y = 0; y < gridHeight; y++) {
      for(let x = 0; x < gridWidth; x++) {
        if(gridRotateCheck[y][x] === 6) {
          if(state === 1) {
            if(y < gridHeight - 2 && x < gridWidth - 1 && staticGrid[y+1][x+1] === 0 && staticGrid[y+2][x+1] === 0) {
              gridRotateCheck[y+1][x+1] = 6;
              gridRotateCheck[y+2][x+1] = 6;

              gridRotateCheck[y][x+1] = 0;
              gridRotateCheck[y+1][x-1] = 0;
              state = 2;
              droppingGrid = gridRotateCheck;
              return;
            }
            else {
              return;
            }
          }
          if(state === 2) {
            if(y < gridHeight - 2 && x > 0 && staticGrid[y+2][x] === 0 && staticGrid[y+2][x-1] === 0) {
              gridRotateCheck[y+2][x] = 6;
              gridRotateCheck[y+2][x-1] = 6;

              gridRotateCheck[y][x] = 0;
              gridRotateCheck[y+2][x+1] = 0;
              state = 3;
              droppingGrid = gridRotateCheck;
              return;
            }
            else {
              return;
            }
          }
          if(state === 3) {
            if(y > 0 && x > 0 && staticGrid[y-1][x-1] === 0 && staticGrid[y][x-1] === 0) {
              gridRotateCheck[y-1][x-1] = 6;
              gridRotateCheck[y][x-1] = 6;

              gridRotateCheck[y+1][x-1] = 0;
              gridRotateCheck[y][x+1] = 0;
              state = 4;
              droppingGrid = gridRotateCheck;
              return;
            }
            else {
              return;
            }
          }
          if(state === 4) {
            if(x < gridWidth - 2 && staticGrid[y][x+1] === 0 && staticGrid[y][x+2] === 0) {
              gridRotateCheck[y][x+1] = 6;
              gridRotateCheck[y][x+2] = 6;

              gridRotateCheck[y][x] = 0;
              gridRotateCheck[y+2][x+1] = 0;
              state = 1;
              droppingGrid = gridRotateCheck;
              return;
            }
            else {
              return;
            }
          }
        }
      }
    }
  }

  //rotates Z-Block
  if(block === 7) {
    for(let y = 0; y < gridHeight; y++) {
      for(let x = 0; x < gridWidth; x++) {
        if(gridRotateCheck[y][x] === 7) {
          if(state === 1) {
            if(y < gridHeight - 2 && x < gridWidth - 2 && staticGrid[y][x+2] === 0 && staticGrid[y+2][x+1] === 0) {
              gridRotateCheck[y][x+2] = 7;
              gridRotateCheck[y+2][x+1] = 7;

              gridRotateCheck[y][x] = 0;
              gridRotateCheck[y][x+1] = 0;
              state = 2;
              droppingGrid = gridRotateCheck;
              return;
            }
            else {
              return;
            }
          }
          if(state === 2) {
            if(y < gridHeight - 2 && x < gridWidth - 2 && staticGrid[y+1][x-2] === 0 && staticGrid[y+2][x] === 0) {
              gridRotateCheck[y+1][x-2] = 7;
              gridRotateCheck[y+2][x] = 7;

              gridRotateCheck[y][x] = 0;
              gridRotateCheck[y+1][x] = 0;
              state = 3;
              droppingGrid = gridRotateCheck;
              return;
            }
            else {
              return;
            }
          }
          if(state === 3) {
            if(y < gridHeight - 1 && y > 0 && x < gridWidth - 1 && staticGrid[y-1][x+1] === 0 && staticGrid[y+1][x] === 0) {
              gridRotateCheck[y-1][x+1] = 7;
              gridRotateCheck[y+1][x] = 7;

              gridRotateCheck[y+1][x+2] = 0;
              gridRotateCheck[y+1][x+1] = 0;
              state = 4;
              droppingGrid = gridRotateCheck;
              return;
            }
            else {
              return;
            }
          }
          if(state === 4) {
            if(y < gridHeight - 1 && x < gridWidth - 1 && x > 0 && staticGrid[y][x-1] === 0 && staticGrid[y+1][x+1] === 0) {
              gridRotateCheck[y][x-1] = 7;
              gridRotateCheck[y+1][x+1] = 7;

              gridRotateCheck[y+1][x-1] = 0;
              gridRotateCheck[y+2][x-1] = 0;
              state = 1;
              droppingGrid = gridRotateCheck;
              return;
            }
            else {
              return;
            }
          }
        }
      }
    }
  }

  droppingGrid = gridRotateCheck;
}