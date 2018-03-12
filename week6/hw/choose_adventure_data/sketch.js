// code 2
// section a
// bfa dt
// spring 2018
// sarah mcnutt

// week 5
// choose your own adventure data

// scene data model: 

// {
//   sceneText: '', //the scene text
//   options: [], // the text options to choose
//   nextScenes: []  // the target scene based on the previous options
// }

//assignment 
//build on the given example to include an additional kind of data for every scene
  //color? an object? 
// change the draw behavior of the scene object to graphically represent some aspect of that new data. 
//manually rewrite the scenes in the json file to actually communicate a branching 'story'.



var sceneData;
var x1;
var x2;
var y;
var s1;
var s2;

var currentScene = 0;
var scenes = [];

function preload() {
  sceneData = loadJSON('scenes.json');
}

function setup() {
  createCanvas(800, 800);
  CreateScenesFromData(sceneData.scenes);
  x1 = width/4;
  x2 = (width/4) * 3;
  y = width/2;
  s1 = 100;
  s2 = 200;
  noStroke();
}

function draw() {
  background(255, 230, 255);
  scenes[currentScene].display();

  fill(0);
  textSize(24);
}

function CreateScenesFromData(data) {
  for (var i = 0; i < data.length; i++) {
    scenes.push(new Scene(data[i].sceneText, data[i].options, data[i].nextScenes, data[i].shape1, data[i].shape2, data[i].r1, data[i].g1, data[i].b1, data[i].r2, data[i].g2, data[i].b2, data[i].sceneType))
  }
}

function Scene(sceneText, options, nextScenes, shape1, shape2, r1, g1, b1, r2, g2, b2, sceneType) {

  this.sceneText = sceneText;
  this.shape1 = shape1;
  this.shape2 = shape2;
  this.nextScenes = nextScenes;
  this.r1 = r1;
  this.r2 = r2;
  this.g1 = g1; 
  this.b1 = b1;
  this.b2 = b2;
  this.sceneType = sceneType;
  this.display = function() {


// FOR CHOICE SCENES

    if(sceneType == "choice") {
      textAlign(CENTER);
      textSize(18);
      text("press 1", width/4, 250);
      text("press 2", (width/4)*3, 250);
      fill(0);
      textSize(32);
      textFont("helvetica");
      textAlign(CENTER);
      text(this.sceneText, width/2, 100);
     rectMode(CENTER);
     if(this.shape1 == "smallRect") {
      fill(r1, g1, b1);
      rect(x1, y, s1, s1);
    }
    if(this.shape1 == "bigRect") {
      fill(r1, g1, b1);
      rect(x1, y, s2, s2);
    }
    if(this.shape1 == "smallCircle") {
      fill(r1, g1, b1);
      ellipse(x1, y, s1, s1);
    }
    if(this.shape1 == "bigCircle") {
      fill(r1, g1, b1);
      ellipse(x1, y, s2, s2);
    }
    if(this.shape2 == "smallRect") {
      fill(r2, g2, b2);
      rect(x2, y, s1, s1);
    }
    if(this.shape2 == "bigRect") {
      fill(r2, g2, b2);
      rect(x2, y, s2, s2);
    }
    if(this.shape2 == "smallCircle") {
      fill(r2, g2, b2);
      ellipse(x2, y, s1, s1);
    }
    if(this.shape2 == "bigCircle") {
      fill(r2, g2, b2);
      ellipse(x2, y, s2, s2);
    } 
  }

//FOR FINAL PATTERN SCENES
  if (sceneType == "pattern") {

    if(this.shape1 == "smallCircle") {
      for(var i = s1/2; i < width + s1/2; i+= s1) {
        for( var j = s1/2; j < width + s1/2; j+= s1) {
          var green = map(i, 0, width, this.g1, this.g2);
          console.log(green);
          fill((this.r1 + i/ 5), (this.g1 + i/ 5), (this.b1 +j/5));
          ellipse(i, j, s1, s1);
        }
      }
    }
    if(this.shape1 == "bigCircle") {
      for(var i = s2/2; i < width + s2/2; i+= s2) {
        for( var j = s2/2; j < width + s2/2; j+= s2) {
          fill((this.r1 + i/ 5), (this.g1 + i/ 5), (this.b1 +j/5));
           ellipse(i, j, s2, s2);
        }
      }
    }

    if (this.shape1 == "smallRect") {
      for(var i = s1/2; i < width + s1/2; i+= (s1+2)) {
        for( var j = s1/2; j < width + s1/2; j+= (s1+2)) {
          fill((this.r1 + i/ 5), (this.g1 + i/ 5), (this.b1 +j/5));
           rect(i, j, s1, s1);
        }
      }
    }
    if (this.shape2 == "bigRect") {
      for(var i = s2/2; i < width + s2/2; i+= (s2 + 5)) {
        for( var j = s2/2; j < width + s2/2; j+= (s2 +5)) {
            fill((this.r1 + i/ 5), (this.g1 + i/ 5), (this.b1 +j/5));
           rect(i, j, s2, s2);
        }
      }
    }

    if(mouseX > 300 && mouseX < width-300 && mouseY > 300 & mouseY < height-300) {
      fill(255);
      rect(width/2, height/2 - 5, 320, 40);
      fill(0);
      textSize(32);
      textFont("helvetica");
      textAlign(CENTER);
      text(this.sceneText, width/2, height/2);

    }


  }

}
}
//HOW TO CHANGE SCENES

function keyPressed() {
  var numberPressed = parseInt(key);
  //using an if statement to conintue the scene
  // var numberPressed;
  // if (key == ' ') {
  //   numberPressed = 1;
  // }
  // if (key = 'a') {
  //   numberPressed = 2;
  // }
  //either 1 or 2
  var newScene = scenes[currentScene].nextScenes[numberPressed - 1];
  //subract one from 1 or 2 so its 0 or 1 and use those numbers to call the index in those arrays
  if (newScene !== undefined) {
    currentScene = newScene;
  }
}
