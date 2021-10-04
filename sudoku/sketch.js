// Sudoku

let initialGrid = [
  [0, 2, 4, 3, 8, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 6, 0, 0, 7],
  [0, 5, 8, 0, 0, 0, 4, 0, 0],
  [4, 0, 0, 0, 1, 0, 0, 0, 0],
  [0, 0, 0, 7, 0, 5, 0, 0, 0],
  [0, 0, 0, 0, 2, 0, 0, 0, 8],
  [0, 0, 1, 0, 0, 0, 6, 7, 0],
  [3, 0, 0, 5, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 4, 9, 2, 1, 0],
];

let gridDimensions = 9;
let cellSize;
let grid;

function setup() {
  if(windowWidth < windowHeight) {
    createCanvas(windowWidth * 0.8, windowWidth * 0.8);
  }
  if(windowWidth > windowHeight) {
    createCanvas(windowHeight * 0.8, windowHeight * 0.8);
  }
  
  grid = initialGrid;
  cellSize = width / gridDimensions;
  textSize(cellSize*0.75);
  textAlign(CENTER, CENTER);
}

function windowResized() {
  setup();
}

function draw() {
  background(220);
  displayGrid();
}

function thickLines() {
  strokeWeight(6);

  for(let location = 0; location <= 9; location += 3) {
    line(0, cellSize*location, width, cellSize*location);
    line(cellSize*location, 0, cellSize*location, height);
  }
}

function displayGrid() {
  for(let y = 0; y < gridDimensions; y++) {
    for(let x = 0; x < gridDimensions; x++) {
      strokeWeight(1);
      fill("white");
      rect(x*cellSize, y*cellSize, cellSize);

      fill("black");
      if(grid[y][x] !== 0) {
        text(grid[y][x], x*cellSize+cellSize/2, y*cellSize + cellSize/2);
      }
    }
  }
  thickLines();
}
