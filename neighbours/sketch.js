// Grid Neigbours

let grid;
let gridSize = 6;
let cellSize;

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

function mousePressed() {
  let cellX = Math.floor(mouseX/cellSize);
  let cellY = Math.floor(mouseY/cellSize);
  swap(cellX, cellY);
  swap(cellX-1, cellY);
  swap(cellX+1, cellY);
  swap(cellX, cellY-1);
  swap(cellX, cellY+1);
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

// function mouseClicked() {
//   for(let y = 0; y < grid.length; y++) {
//     for(let x = 0; x < grid[y].length; x++) {
//       if(mouseX >= x*cellSize && mouseX <= x*cellSize + cellSize && mouseY >= y*cellSize && mouseY <= y*cellSize + cellSize) {
//         if(grid[y][x] === 0) {
//           grid[y][x] = 1;
//         }
//         else if(grid[y][x] === 1) {
//           grid[y][x] = 0;
//         }
//         if(grid[y+1][x] === 0) {
//           grid[y+1][x] = 1;
//         }
//         else if(grid[y+1][x] === 1) {
//           grid[y+1][x] = 0;
//         }
//         if(grid[y-1][x] === 0) {
//           grid[y-1][x] = 1;
//         }
//         else if(grid[y-1][x] === 1) {
//           grid[y-1][x] = 0;
//         }
//         if(grid[y][x-1] === 0) {
//           grid[y][x-1] = 1;
//         }
//         else if(grid[y][x-1] === 1) {
//           grid[y][x-1] = 0;
//         }
//         if(grid[y][x+1] === 0) {
//           grid[y][x+1] = 1;
//         }
//         else if(grid[y][x+1] === 1) {
//           grid[y][x+1] = 0;
//         }
//       }
//     }
//   }
// }

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