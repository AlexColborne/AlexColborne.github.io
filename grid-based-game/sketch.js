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
let lockTime = 500;
let block;
let state = 1;

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
  if(frameCount % 20 === 0) {
    gridFall();
  }
  drop();
}

function clearLineCheck() {
  let counter = 0;
  for(let y = 0; y < gridHeight; y++) {
    counter = 0;
    for(let x = 0; x < gridWidth; x++) {
      if(staticGrid[y][x] !== 0) {
        counter++;
      }
      if(counter === 10) {
        clearLine(y);
      }
    }
  }
  inControl = false;
}

function clearLine(destroyY) {
  for(let x = 0; x < gridWidth; x++) {
    staticGrid[destroyY].splice(x, 1, 0);
  }
  for(let y = destroyY; y > 0; y--) {
    for(let x = 0; x < gridWidth; x++) {
      staticGrid[y][x] = staticGrid[y-1][x];
    }
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
    block = int(random(1, 5));
    droppingGrid = createEmptyGrid();
    if(block === 1) { //T Block
      droppingGrid[0][4] = 1;
      droppingGrid[0][5] = 1;
      droppingGrid[0][6] = 1;
      droppingGrid[1][5] = 1;
    }
    if(block === 2) { //O Block
      droppingGrid[0][4] = 2;
      droppingGrid[0][5] = 2;
      droppingGrid[1][4] = 2;
      droppingGrid[1][5] = 2;
    }
    if(block === 3) { //I Block
      droppingGrid[0][3] = 3;
      droppingGrid[0][4] = 3;
      droppingGrid[0][5] = 3;
      droppingGrid[0][6] = 3;
      state = 1;
    }
    if(block === 4) { //J Block
      droppingGrid[0][4] = 4;
      droppingGrid[0][5] = 4;
      droppingGrid[0][6] = 4;
      droppingGrid[1][6] = 4;
    }
    inControl = true;
  }
}

function drop() {
  if(keyIsDown(32)) {
    if(frameCount % 4 === 0) {
      gridFall();
    }
  }
}

function keyPressed() {
  if(keyCode === LEFT_ARROW) {
    let gridLSideCheck = [];
    for(let y = 0; y < gridHeight; y++) {
      gridLSideCheck.push([]);
      for(let x = 0; x < gridWidth; x++) {
        gridLSideCheck[y].push(droppingGrid[y][x]);
      }
    }
    for(let y = 0; y < gridHeight; y++) { 
      for(let x = 0; x < gridWidth; x++) {
        if(gridLSideCheck[y][x] !== 0) {
          if(x >= 1) {
            if(staticGrid[y][x-1] === 0) {
              gridLSideCheck[y][x-1] = gridLSideCheck[y][x];
              gridLSideCheck[y][x] = 0;
            }
            else {
              return;
            }
          }
          else {
            return;
          }
        }
      }
    }
    droppingGrid = gridLSideCheck;
  }

  if(keyCode === RIGHT_ARROW) {
    let gridRSideCheck = [];
    for(let y = 0; y < gridHeight; y++) {
      gridRSideCheck.push([]);
      for(let x = 0; x < gridWidth; x++) {
        gridRSideCheck[y].push(droppingGrid[y][x]);
      }
    }
    for(let y = gridHeight - 1; y >= 0; y--) { 
      for(let x = gridWidth - 1; x >= 0; x--) {
        if(gridRSideCheck[y][x] !== 0) {
          if(x < gridWidth) {
            if(staticGrid[y][x+1] === 0) {
              gridRSideCheck[y][x+1] = gridRSideCheck[y][x];
              gridRSideCheck[y][x] = 0;
            }
            else {
              return;
            }
          }
          else {
            return;
          }
        }
      }
    }
    droppingGrid = gridRSideCheck;
  }

  if(keyCode === UP_ARROW) {
    let gridRotateCheck = [];
    for(let y = 0; y < droppingGrid.length; y++) {
      gridRotateCheck.push([]);
      for(let x = 0; x < droppingGrid[y].length; x++) {
        gridRotateCheck[y].push(droppingGrid[y][x]);
      }
    }
    let count = 0;

    //Rotating T-Block
    if(block === 1) {
      for(let y = 0; y < gridHeight; y++) {
        for(let x = 0; x < gridWidth; x++) {
          if(gridRotateCheck[y][x] === 1) {
            if(x > 0 && x < 9 && y < 19 && y > 0) {
              if(staticGrid[y-1][x] === 0 && staticGrid[y+1][x] === 0 && staticGrid[y][x-1] === 0 && staticGrid[y][x+1] === 0) {
                count += gridRotateCheck[y-1][x];
                count += gridRotateCheck[y+1][x];
                count += gridRotateCheck[y][x-1];
                count += gridRotateCheck[y][x+1];
                if(count === 3) {
                  gridRotateCheck[y-1][x] = droppingGrid[y][x-1];
                  gridRotateCheck[y+1][x] = droppingGrid[y][x+1];
                  gridRotateCheck[y][x-1] = droppingGrid[y+1][x];
                  gridRotateCheck[y][x+1] = droppingGrid[y-1][x];
                }
                else {
                  count = 0;
                }
              }
            }
          }
          else {
            count = 0;
          }
        }
      }
    }
    //Rotating I-Block
    if(block === 3) {
      for(let y = 0; y < gridHeight; y++) {
        for(let x = 0; x < gridWidth; x++) {
          if(gridRotateCheck[y][x] === 3) {
            if(state === 1) {
              if(y > 0 && y < 8) {
                gridRotateCheck[y-1][x+2] = 3;
                gridRotateCheck[y+1][x+2] = 3;
                gridRotateCheck[y+2][x+2] = 3;
  
                gridRotateCheck[y][x] = 0;
                gridRotateCheck[y][x+1] = 0;
                gridRotateCheck[y][x+3] = 0;
                state = 2;
                droppingGrid = gridRotateCheck;
                return;
              }
            }
            else if(state === 2) {
              gridRotateCheck[y+2][x-2] = 3;
              gridRotateCheck[y+2][x-1] = 3;
              gridRotateCheck[y+2][x+1] = 3;

              gridRotateCheck[y][x] = 0;
              gridRotateCheck[y+1][x] = 0;
              gridRotateCheck[y+3][x] = 0;

              state = 3;
              droppingGrid = gridRotateCheck;
              return;
            }
            else if(state === 3) {
              gridRotateCheck[y-2][x+1] = 3;
              gridRotateCheck[y-1][x+1] = 3;
              gridRotateCheck[y+1][x+1] = 3;

              gridRotateCheck[y][x] = 0;
              gridRotateCheck[y][x+2] = 0;
              gridRotateCheck[y][x+3] = 0;

              state = 4;
              droppingGrid = gridRotateCheck;
              return;
            }
            else if(state === 4) {
              gridRotateCheck[y+1][x-1] = 3;
              gridRotateCheck[y+1][x+1] = 3;
              gridRotateCheck[y+1][x+2] = 3;

              gridRotateCheck[y][x] = 0;
              gridRotateCheck[y+2][x] = 0;
              gridRotateCheck[y+3][x] = 0;

              state = 1;
              droppingGrid = gridRotateCheck;
              return;
            }
          }
        }
      }
    }
    if(block === 4) {
      //J
    }
    droppingGrid = gridRotateCheck;
  }
}

function gridFall() {
  let gridDropCheck = [];
  for(let y = 0; y < gridHeight; y++) {
    gridDropCheck.push([]);
    for(let x = 0; x < gridWidth; x++) {
      gridDropCheck[y].push(droppingGrid[y][x]);
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
            clearLineCheck();
            return;
          } 
        } 
        else {
          for(let y2 = 0; y2 < gridHeight; y2++) { 
            for(let x2 = 0; x2 < gridWidth; x2++) {
              if(droppingGrid[y2][x2] !== 0) {
                staticGrid[y2][x2] = droppingGrid[y2][x2];
              }
            }
          }
          clearLineCheck();
          return;
        } 
      }
    }
  }
  droppingGrid = gridDropCheck;
}

function drawGrid() {
  for(let y = 0; y < gridHeight; y++) {
    for(let x = 0; x < gridWidth; x++) {
      if(staticGrid[y][x] === 1 || droppingGrid[y][x] === 1) {
        fill(128, 0, 128);
      }
      else if(staticGrid[y][x] === 2 || droppingGrid[y][x] === 2) {
        fill(255, 255, 0);
      }
      else if(staticGrid[y][x] === 3 || droppingGrid[y][x] === 3) {
        fill(0, 255, 255);
      }
      else if(staticGrid[y][x] === 4 || droppingGrid[y][x] === 4) {
        fill(0, 0, 255);
      }
      else if(staticGrid[y][x] === 0) {
        fill(127, 127, 127);
      }
      rect(x*cellSize + width/2 - cellSize * 5, y*cellSize, cellSize);
    }
  }
}