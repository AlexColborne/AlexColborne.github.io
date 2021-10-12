// Button OOP Demo

let buttonOne, buttonTwo;
let backgroundColor = "white";

function setup() {
  createCanvas(windowWidth, windowHeight);
  buttonOne = new Button(width/2 - 250, height/3 - 50, 500, 100);
  buttonTwo = new Button(width/2 - 250, height*2/3 - 50, 500, 100);
}

function draw() {
  background(backgroundColor);
  buttonOne.display();
  buttonTwo.display();
  buttonTwo.defaultColor = "#3A0842";
  buttonTwo.hoverColor = "#391463";
}

function mousePressed() {
  if(buttonOne.checkIfInside(mouseX, mouseY)) {
    backgroundColor = "red";
  }
  if(buttonTwo.checkIfInside(mouseX, mouseY)) {
    backgroundColor = "black";
  }
}

class Button {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.defaultColor = "#89A7A7";
    this.hoverColor = "#72E1D1";
  }
  
  display() {
    if(this.checkIfInside(mouseX, mouseY)) {
      fill(this.hoverColor);
    }
    else {
      fill(this.defaultColor);
    }
    rect(this.x, this.y, this.width, this.height);
  }

  checkIfInside(x, y) {
    return x >= this.x && x <= this.x + this.width &&
           y >= this.y && y <= this.y + this.height;
  }
}