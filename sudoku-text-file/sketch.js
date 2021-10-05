// Sudoku

let initialGrid;

let gridDimensions = 9;
let cellSize;
let grid;

function preload() {
  initialGrid = loadStrings("assets/level2.txt");
}

function setup() {
  if(windowWidth < windowHeight) {
    createCanvas(windowWidth * 0.8, windowWidth * 0.8);
  }
  if(windowWidth > windowHeight) {
    createCanvas(windowHeight * 0.8, windowHeight * 0.8);
  }

  initialGrid = convertedToIntGrid(initialGrid);
  
  grid = initialGrid;
  cellSize = width / gridDimensions;
  textSize(cellSize*0.75);
  textAlign(CENTER, CENTER);
}

function convertedToIntGrid(initialGrid) {
  //assume rectangular array
  let rows = initialGrid.length;
  let cols = initialGrid[0].length;

  let newGrid = [];
  for(let y = 0; y < rows; y++) {
    newGrid.push([]);
    for(let x = 0; x < cols; x++) {
      newGrid[y].push(int(initialGrid[y][x]));
    }
  }
  return newGrid;
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

      if(grid[y][x] !== 0) {
        fill("black");
        text(grid[y][x], x*cellSize+cellSize/2, y*cellSize + cellSize/2);
      }
    }
  }
  thickLines();
}
