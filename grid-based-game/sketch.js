// Grid-Based Game (Tetris)
// Alex Colborne
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let grid;
let cellSize;

function setup() {
  createCanvas(windowWidth, windowHeight);
  grid = createGrid(20, 10);
  cellSize = height/20;
}

function draw() {
  background(220);
  drawGrid();
}

function createGrid(gridHeight, gridWidth) {
  let gridArray = [];
  for(let y = 0; y < gridHeight; y++) {
    gridArray.push([]);
    for(let x = 0; x<gridWidth; x++) {
      gridArray[y].push(0);
    }
  }
  return gridArray;
}

function drawGrid() {
  for(let y = 0; y < 20; y++) {
    for(let x = 0; x < 10; x++) {
      rect(x*cellSize + width/2 - cellSize * 5, y*cellSize, cellSize);
    }
  }
}