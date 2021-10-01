// Grid-Based Game (Tetris)
// Alex Colborne
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let grid;
let cellSize;
let inControl = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  grid = createEmptyGrid(20, 10);
  cellSize = height/20;
}

function draw() {
  background(220);
  drawGrid();
  blockSpawner();
  updateGrid();
}

function createEmptyGrid(gridHeight, gridWidth) {
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

function updateGrid() {
  let newArray = createEmptyGrid(20, 10);
  for(let y = 19; y > 0; y--) {
    for(let x = 9; x > 0; x--) {
      if(grid[y][x] !== 0) {
        if(y < 19) {
          if(newArray[y+1][x] === 0) {
            if(y + 1 < 19) {
              newArray[y][x] = 0;
              newArray[y+1][x] = 1;
            }
          }
          else {
            newArray[y][x] = grid[y][x];
          }
        }
      }
    }
  }
  grid = newArray;
}

function drawGrid() {
  for(let y = 0; y < 20; y++) {
    for(let x = 0; x < 10; x++) {
      if(grid[y][x] === 0) {
        fill("white");
      }
      else if(grid[y][x] === 1) {
        fill("yellow");
      }
      rect(x*cellSize + width/2 - cellSize * 5, y*cellSize, cellSize);
    }
  }
}