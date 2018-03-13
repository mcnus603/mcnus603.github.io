// code 2
// spring 2018
// sarah mcnutt

// midterm

var contentData;
var colorData;
var currentScene = 0;
var scenes = [];
var rectArray = [];
var rectMoving; 
var sections = ["Relationships", "Weddings", "Marriage", "Romance", "Sex", "Gender", "LGBT", "About"];
var toolbarArray = [];

function preload() {
  contentData = loadJSON('content.json');
  colorData = loadJSON('colors.json');
  goudy = loadFont('fonts/webfonts/36058A_0_0.ttf'); 
  slateReg = loadFont('fonts/webfonts/36058A_2_0.ttf'); 
  slateBold = loadFont('fonts/webfonts/36058A_1_0.ttf'); 
  monospaceBold = loadFont('fonts/webfonts/36067E_1_0.ttf'); 
  monospaceReg = loadFont('fonts/webfonts/36067E_0_0.ttf'); 
}

function setup() {
  //TOOLBAR
  for (var i = 0; i < sections.length; i++) {
    var str = sections[i].toUpperCase();
    var div = createDiv(str);
    div.addClass('toolbar');
    toolbarArray.push(div);
  }


  var canvasHeight = innerHeight - 100;
  var cnv = createCanvas(innerWidth *.9, canvasHeight);
  cnv.class('cnv')

  for (var i = 0; i < contentData.content.relationships.length; i++) {
    var r = colorData.colors.relationships[i%4].r;
    var g = colorData.colors.relationships[i%4].g;
    var b = colorData.colors.relationships[i%4].b;
    var t = contentData.content.relationships[i].title;
    var x = random(width);
    var y = random(height);
    rectArray.push(new opinionBlock(x, y, t, r, g, b));
  
  }
    rectMoving = false;

}

function draw() {
  background(240);
  startPage();
  toolbarCheck();

  for (var i = 0; i < rectArray.length; i++) {
    rectArray[i].display();
  } 
}

//START PAGE FUNCTION 

function sectionClicked (e) {
  this.e = e;
  console.log()

}

function startPage() {
  rectMode(CENTER);
  textSize(60);
  textFont(goudy);
  textAlign(CENTER);
  fill(0);
  text("Out There Mag", width/2, height/2);

  textSize(20);
  textFont(slateReg);
  textAlign(LEFT);
  text("These are relevant, the helpful, the critical, the thoughtful, the serious, the angry, the ugly, the odd, the absurd, the ridiculous, the resentful, the unpopular, the out there love opinions. ", width/2, height/2 + 200, 350, 350);
}

//CHECK SECTIONS

function toolbarCheck() {
  for (var i = 0; i < toolbarArray.length; i++) {
   toolbarArray[i].mousePressed(sectionClicked);

    // // e.offsetLeft();
    // console.log(e.offsetLeft);
  }

}

// OPINIONBLOCK CLASS
function opinionBlock(x, y, title, r, g, b) {

this.x = x;
this.y = y;
this.r = r; 
this.g = g; 
this.b = b;
this.s = 100;
this.w = 200;
this.h = 100;
this.title = title;
this.isBig = false;
this.margin = 5; 
this.rectLeft = this.x - this.w/2;
this.rectTop = this.y - this.h/2;
this.textHeight = 12;
this.ogPos = createVector (this.x, this.y);

  this.display = function () {
    noStroke();
    
    rectMode(CENTER);
    fill(this.r, this.g, this.b);  
    rect(this.x, this.y, this.w, this.h);
   
   //TITLE
    rectMode(CORNER);
    fill(0);
    textFont(monospaceBold);
    textSize(this.textHeight);
    text(this.title.toUpperCase(), this.rectLeft + this.margin, this.rectTop + (this.margin + this.textHeight/2), this.w, this.h);
  }

  this.dragged = function(x, y) {
    var d = dist(x, y, this.x, this.y);

    //FIX THIS TO ACCOUNT FOR WITH AND HEIGHT 

    if (d < this.w/2) {
      this.x = mouseX;
      this.y = mouseY;
    }
     //TITLE
  }
  this.clicked = function(x, y) {
    var d = dist(x, y, this.x, this.y);
    if (d < this.s/2) {
       if (this.isBig == false) {
        this.s = 300; 
        this.x = width/2;
        this.y = height/2;
        this.isBig = true;
       } else {
        this.s = 100; 
        this.isBig = false;
       }    
    } 
  }

  this.reset = function() {
    this.x = this.ogPos.x;
    this.y = this.ogPos.y;
  }
}



//MOUSE DRAG
function mouseDragged() {
  for (var i = 0; i < rectArray.length; i++) {
    rectArray[i].dragged(mouseX, mouseY);
  }
}
//MOUSE DOUBLE CLICK 
//can't figure out a way to use mouseClicked or mousePressed without this being trigered when I drag
function doubleClicked() {
  for (var i = 0; i < rectArray.length; i++) {
    rectArray[i].clicked(mouseX, mouseY);

  }
}

// function mousePressed() {
//   toolbarClick();
// }

//WINDOW RESIZE
function windowResized() {
  var canvasHeight = innerHeight - 100;
  resizeCanvas(innerWidth *.9 , canvasHeight);
}




