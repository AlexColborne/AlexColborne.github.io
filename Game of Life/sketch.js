// Grid Neigbours

let grid;
let gridSize = 15;
let cellSize;
let autoPlay = false;

function setup() {
  if(windowWidth >= windowHeight) {
    createCanvas(windowHeight, windowHeight);
  }
  else if(windowWidth <= windowHeight) {
    createCanvas(windowWidth, windowWidth);
  }
  grid = createRandomArray(gridSize);
  cellSize = width/gridSize;
}

function draw() {
  background(220);
  drawGrid();
  if(autoPlay && frameCount % 10 === 0) {
    update();
  }
}

function keyPressed() {
  if(key === "e") {
    grid = createEmptyArray(gridSize);
  }
  if(key === "r") {
    grid = createRandomArray(gridSize);
  }
  if(key === " ") {
    update();
  }
  if(key === "p") {
    autoPlay = !autoPlay;
  }
}

function update() {
  let nextTurn = createEmptyArray(gridSize);

  for(let y = 0; y < gridSize; y++) {
    for(let x = 0; x < gridSize; x++) {
      let neighbours = 0;

      //searches cells in 3x3
      for(let i = -1; i <= 1; i++) {
        for(let j = -1; j<= 1; j++) {
          if(y+i>= 0 && x+j >= 0 && y+1<gridSize && x+j<gridSize) {
            neighbours += grid[y+i][x+j];
          }
        }
      }
      //removes number you are looking at
      neighbours -= grid[y][x];

      //applying rules
      if(grid[y][x] === 0) {
        if(neighbours === 3) {
          nextTurn[y][x] = 1;
        }
        else {
          nextTurn[y][x] = 0;
        }
      }
      else if(grid[y][x]) {
        if(neighbours === 2 || neighbours === 3) {
          nextTurn[y][x] = 1;
        }
        else {
          nextTurn[y][x] = 0;
        }
      }
    }
  }
  grid = nextTurn;
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
  for(let y = 0; y < grid.length; y++) {
    for(let x = 0; x < grid[y].length; x++) {
      if(grid[y][x] === 0) {
        fill("white");
      }
      if(grid[y][x] === 1) {
        fill("black");
      }
      rect(x*cellSize, y*cellSize, cellSize);
    }
  }
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

function createEmptyArray(size) {
  let randomArray = [];
  for(let y = 0; y<size; y++) {
    randomArray.push([]);
    for(let x = 0; x<size; x++) {
      randomArray[y].push(0);
    }
  }
  return randomArray;
}