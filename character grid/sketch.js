// Character Movement in a grid

let grid;
let gridSize = 10;
let cellSize;
let level1;
let playerX = 0;
let playerY = 0;

function preload() {
  level1 = loadJSON("assets/level1.json");
}

function setup() {
  if(windowWidth >= windowHeight) {
    createCanvas(windowHeight, windowHeight);
  }
  else if(windowWidth <= windowHeight) {
    createCanvas(windowWidth, windowWidth);
  }
  // grid = createRandomArray(gridSize);
  grid = level1;
  cellSize = width/gridSize;

  //place player
  grid[playerY][playerX] = 9;
}

function draw() {
  background(220);
  drawGrid();
}

function createRandomArray(size) {
  let randomArray = [];
  for(let y = 0; y<size; y++) {
    randomArray.push([]);
    for(let x = 0; x<size; x++) {
      if(random(0, 100) > 50) {
        randomArray[y].push(1);
      }
      else {
        randomArray[y].push(0);
      }
    }
  }
  return randomArray;
}

function keyPressed() {
  if(key === "s") {
    tryMovingTo(playerX, playerY+1);
  }
  if(key === "w") {
    tryMovingTo(playerX, playerY-1);
  }
  if(key === "d") {
    tryMovingTo(playerX+1, playerY);
  }
  if(key === "a") {
    tryMovingTo(playerX-1, playerY);
  }
}

function tryMovingTo(newX, newY) {
  //check if new spot is on the grid
  if(newX >= 0 && newY >= 0 && newX < gridSize && newY < gridSize) {
    //check if new spot is empty
    if(grid[newY][newX] === 0) {
      //reset current spot to be empty
      grid[playerY][playerX] = 0;

      //move player
      playerX = newX;
      playerY = newY;

      //put player back in the grid
      grid[newY][newX] = 9;
    }
  }
}

function mousePressed() {
  if(mouseX <= width && mouseY <= height) {
    let cellX = Math.floor(mouseX/cellSize);
    let cellY = Math.floor(mouseY/cellSize);
    swap(cellX, cellY);
  }
}

function swap(x, y) {
  if(x >= 0 && x < gridSize && y >= 0 && y < gridSize) {
    if(grid[y][x] === 0) {
      grid[y][x] = 1;
    }
    else if(grid[y][x] === 1) {
      grid[y][x] = 0;
    }
  }
}

function drawGrid() {
  for(let y = 0; y < gridSize; y++) {
    for(let x = 0; x < gridSize; x++) {
      if(grid[y][x] === 0) {
        fill("white");
      }
      else if(grid[y][x] === 1) {
        fill("black");
      }
      else if(grid[y][x] === 9) {
        fill("red");
      }
      rect(x*cellSize, y*cellSize, cellSize);
    }
  }
}