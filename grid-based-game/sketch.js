// Grid-Based Game (Tetris)
// Alex Colborne
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let staticGrid;
let cellSize;
let inControl = false;
let gridHeight = 20;
let gridWidth = 10;
let controlCount = 0;
let droppingGrid;

function setup() {
  createCanvas(windowWidth, windowHeight);
  staticGrid = createEmptyGrid();
  droppingGrid = createEmptyGrid();
  cellSize = height/20;
}

function draw() {
  background(220);
  drawGrid();
  blockSpawner();
  if(frameCount % 10 === 0) {
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
    droppingGrid = createEmptyGrid();
    droppingGrid[0][4] = 1;
    droppingGrid[0][5] = 1;
    droppingGrid[0][6] = 1;
    droppingGrid[1][5] = 1;
    inControl = true;
  }
}

function keyPressed() {
  if(keyCode === LEFT_ARROW) {
    for(let y = 0; y < gridHeight; y++) { 
      for(let x = 0; x < gridWidth; x++) {
        if(droppingGrid[y][x] !== 0) {
          if(x >= 1) {
            droppingGrid[y][x-1] = droppingGrid[y][x];
            droppingGrid[y][x] = 0;
          }
          else {
            return;
          }
        }
      }
    }
  }
  if(keyCode === RIGHT_ARROW) {
    for(let y = 0; y < gridHeight; y++) { 
      for(let x = 0; x < gridWidth; x++) {
        if(droppingGrid[y][x] !== 0) {
          if(x <= 9) {
            droppingGrid[y][x+1] = droppingGrid[y][x];
            //droppingGrid[y][x] = 0;
          }
          else {
            return;
          }
        }
      }
    }
  }
}

function gridFall() {
  let gridDropCheck = [...droppingGrid];
  let backupArray = [];
  for(let y = gridHeight-1; y >= 0; y--) {
    backupArray.push[droppingGrid[y]];
    for(let x = gridWidth-1; x >= 0; x--) {
      backupArray.push[droppingGrid[y][x]];
    }
  }



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
            inControl = false;
            return;
          } 
        } 
        else {
          for(let y2 = 0; y2 < gridHeight; y2++) { 
            for(let x2 = 0; x2 < gridWidth; x2++) {
              if(backupArray[y2][x2] !== 0) {
                staticGrid[y2][x2] = backupArray[y2][x2];
              }
            }
          }
          inControl = false;
          return;
        } 
      }
    }
  }
}

function drawGrid() {
  for(let y = 0; y < gridHeight; y++) {
    for(let x = 0; x < gridWidth; x++) {
      if(staticGrid[y][x] === 1 || droppingGrid[y][x] === 1) {
        fill("red");
      }
      else if(staticGrid[y][x] === 0) {
        fill("white");
      }
      rect(x*cellSize + width/2 - cellSize * 5, y*cellSize, cellSize);
    }
  }
}