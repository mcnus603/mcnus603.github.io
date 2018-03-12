// code 2
// spring 2018
// sarah mcnutt

// midterm

var contentData;
var currentScene = 0;
var scenes = [];
var rectArray = [];
var rectMoving; 

function preload() {
  contentData = loadJSON('content.json');
}

function setup() {
  var cnv = createCanvas(innerWidth *.9 , innerHeight *.9);
  cnv.class('cnv')

  for (var i = 0; i < 10; i++) {
    var x = random(width);
    var y = random(height);
    rectArray.push(new Rectangle(x, y));
  }
  rectMoving = false;
}

function draw() {
  background(240);

  for (var i = 0; i < rectArray.length; i++) {
    rectArray[i].display();
  }
}


function Rectangle(x, y) {
  this.x = x;
  this.y = y;
  this.r = 200; 
  this.g = 100; 
  this.b = 200;
  this.s = 100;
  
  this.create

  this.display = function () {
    noStroke();
    fill(this.r, this.g, this.b, 150);
    rectMode(CENTER);
    rect(this.x, this.y, this.s, this.s);
  }

  this.dragged = function(x, y) {
    var d = dist(x, y, this.x, this.y);

    if (d < this.s/2) {
      this.x = mouseX;
      this.y = mouseY;
    }
  }

  this.clicked = function(x, y) {
    var d = dist(x, y, this.x, this.y);
    if (d < this.s/2) {
      this.s = 300; 
      this.x = width/2;
      this.y = height/2;
    }
  }
}





function mouseDragged() {
  console.log("dragged");
  for (var i = 0; i < rectArray.length; i++) {
    rectArray[i].dragged(mouseX, mouseY);
  }
}
//can't figure out a way to use mouseClicked or mousePressed without this being trigered when I drag
function doubleClicked() {
  for (var i = 0; i < rectArray.length; i++) {
    rectArray[i].clicked(mouseX, mouseY);
  }
}


//loading content into an array

// function content() {

// }

// //scene state manager

// function scene() {

// }

//if mouse pressed on an object change scenes to xyz 


// function windowResized() {

//   resizeCanvas(innerWidth *.9 , innerHeight *.9);
// }
