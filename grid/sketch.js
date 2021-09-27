// first grid demo

let grid;
let gridSize = 10;

function setup() {
  if(windowWidth > windowHeight) {
    createCanvas(windowHeight, windowHeight);
  }
  else {
    createCanvas(windowWidth, windowWidth);
  }
  grid = createRandomGrid(gridSize);
}

function draw() {
  background(220);
  displayGrid();
}

// function createEmptyGrid(size) {
//   let emptyArray = [];
//   for(let y = 0; y < size; y++) {
//     emptyArray.push([]);
//     for(let x = 0; x < size; x++) {
//       emptyArray[y].push(0);
//     }
//   }
//   return emptyArray;
// }

function createRandomGrid(size) {
  let emptyArray = [];
  for(let y = 0; y < size; y++) {
    emptyArray.push([]);
    for(let x = 0; x < size; x++) {
      if(random(0, 100) < 50) {
        emptyArray[y].push(0);
      }
      else {
        emptyArray[y].push(1);
      }
    }
  }
  return emptyArray;
}

function displayGrid() {
  let cellSize = width/gridSize;
  for(let y = 0; y < grid.length; y++) {
    for(let x = 0; x < grid[y].length; x++) {
      if(grid[y][x] === 0) {
        fill("white");
      }
      else if(grid[y][x] === 1) {
        fill("black");
      }
      rect(x * cellSize, y * cellSize, cellSize, cellSize);
    }
  }
}