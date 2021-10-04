// Grid-Based Game (Tetris)
// Alex Colborne
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let grid;
let cellSize;
let inControl = false;
let gridHeight = 20;
let gridWidth = 10;

function setup() {
  createCanvas(windowWidth, windowHeight);
  grid = createEmptyGrid();
  cellSize = height/20;
}

function draw() {
  background(220);
  drawGrid();
  blockSpawner();
  if(frameCount % 100 === 0) {
    gridFall();
  }
}

function createEmptyGrid() {
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
  if(!inControl) {
    grid[0][4] = 1;
    grid[0][5] = 1;
    grid[1][4] = 1;
    grid[1][5] = 1;
    inControl = true;
  }
}

function gridFall() {
  let newArray = [];
  newArray = grid;
  for(let y = gridHeight-1; y >= 0; y--) {
    for(let x = gridWidth-1; x >= 0; x--) {
      if(newArray[y][x] !== 0) {    
        if(y < gridHeight-1) {
          if(newArray[y+1][x] === 0) {
            newArray[y+1][x] = newArray[y][x];
            newArray[y][x] = 0;
          }
        }  
      }
    }
  }
  if(newArray === grid) {
    inControl = false;
  }
  grid = newArray;
}

function drawGrid() {
  for(let y = 0; y < gridHeight; y++) {
    for(let x = 0; x < gridWidth; x++) {
      if(grid[y][x] === 0) {
        fill("white");
      }
      else if(grid[y][x] === 1) {
        fill("red");
      }
      rect(x*cellSize + width/2 - cellSize * 5, y*cellSize, cellSize);
    }
  }
}