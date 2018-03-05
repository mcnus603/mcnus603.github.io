// code 2
// section a
// bfa dt
// spring 2018
// sarah mcnutt

// week 5
// saving/loading paint data
// based on example by Jon Beilin

var paintmarks = [];
var paintDataFile = 'paintData.json';
var time;
var size;

function setup() {
  createCanvas(800, 800);
}

function draw() {
  background(255);
  time = millis();
  time = (time * .02) % 255; 
  size = random(10, 20);
  for (var i = 0; i < paintmarks.length; i++) {
    paintmarks[i].display();
  }


  fill(0);
  textSize(24);
  text("drag the mouse across the canvas to draw.", 50, 570);
  text("press 'S' to save a json file with the current paint data.", 50, 600);
  text("press 'L' to load a json file from your computer.", 50, 630);
}

//paintmark function
function PaintMark(position, time, size) {
  this.position = position;
  this.time = time;
  this.size = size;
  this.display = function() {
    noStroke();
    fill(time, time , 100);
    ellipse(this.position.x, this.position.y, this.size, this.size);
  }

}


function mouseDragged() {
  paintmarks.push(new PaintMark(createVector(mouseX, mouseY), time, size));
}


//all about saving and loading in the data


function keyPressed() {
  if (key === 'S') {
    savePaintData();
  }
  if (key === 'L') {
    loadPaintData();
  }
}


function savePaintData() {
  positionsToSave = [];
  for (var i = 0; i < paintmarks.length; i++) {
    positionsToSave.push(
      { 
        x: paintmarks[i].position.x, 
        y: paintmarks[i].position.y, 
        t: paintmarks[i].time,
        s: paintmarks[i].size
      }
    );
  }
  saveJSON(positionsToSave, 'paintData.json');
}



// creates the new form of the drawing

function parsePaintData(data) {
  paintmarks = [];
  for (var i = 0; i < data.length; i++) {
    paintmarks.push(new PaintMark(createVector(data[i].x, data[i].y),data[i].time, data[i].size));
  }
}

function loadPaintData() {
  loadJSON(paintDataFile, paintmarks);
}
