// code 2
// spring 2018
// sarah mcnutt

// midterm

var contentData;
var colorData;
var rectArray = [];
var sections = ["relationships", "weddings", "marriage", "romance", "sex", "gender", "lgbt", "about"];
var toolbarArray = [];
var aCurrentDrag = false;

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
}

function draw() {
  background(255);
  startPage();
  toolbarCheck();
  checkDrag();

  for (var i = 0; i < rectArray.length; i++) {
    drawBlockTreatments(rectArray[i]);
    // rectArray[i].hover(mouseX, mouseY);
  } 
}

//START PAGE FUNCTION 
function sectionClicked () {
  var newSection = (this.html()).toLowerCase();

  for(var i = 0; i < sections.length; i++) {
    if(sections[i] == newSection) {
      this.style('background-color', 'rgb('+colorData.colors[newSection][0].r + ',' + colorData.colors[newSection][0].g + ',' + colorData.colors[newSection][0].b)+ ')';
      // console.log(this);
      this.style('text-decoration', 'underline');
    }
   } 

  rectArray = [];
  for (var i = 0; i < contentData.content[newSection].length; i++) {
    var x = random(150, width-150);
    var y = random(100, height-100);
    var colorArrayLength = colorData.colors[newSection].length;
    var theTitle = contentData.content[newSection][i].title;
    var theText = contentData.content[newSection][i].text;
    var theType = contentData.content[newSection][i].type;
    var r = colorData.colors[newSection][i%colorArrayLength].r;
    var g = colorData.colors[newSection][i%colorArrayLength].g;
    var b = colorData.colors[newSection][i%colorArrayLength].b;
    rectArray.push(new opinionBlock(x, y, theTitle, theText, theType, r, g, b));
  }
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
  }

}

// OPINIONBLOCK CLASS
function opinionBlock(x, y, theTitle, theText, theType, r, g, b) {

  this.x = x;
  this.y = y;
  this.r = r; 
  this.g = g; 
  this.b = b;
  this.a = 255;

  this.isBeingDragged = false;
  this.isExpanded = false;
  this.hidden = false;

  this.theTitle = theTitle;
  this.theText = theText;
  this.theType = theType;

//hopefully will be calculated
  this.s = 100;
  this.w = 250;
  this.h = 150;
  this.margin = 10; 

  this.ogPositions = [this.x, this.y, this.textX, this.textY, this.textW, this.textH, this.removeX, this.removeY];

  this.textX = this.x + this.margin;
  this.textY = this.y + this.margin;
  this.textW = this.w - this.margin;
  this.textH = this.h - this.margin;

  this.removeX = this.x + (this.w/2) - this.margin;
  this.removeY = this.y - (this.h/2) + this.margin;

  this.dragged = function() {
    
        this.isBeingDragged = true;
        this.x = mouseX;
        this.y = mouseY;
        this.textX = mouseX + this.margin;
        this.textY = mouseY + this.margin;
        this.removeX = mouseX + (this.w/2) - this.margin;
        this.removeY = mouseY - (this.h/2) + this.margin;
    //   }
    // }
  }

  this.draggingStopped = function() {
    if(this.isBeingDragged == true) {
      this.isBeingDragged = false;
      aCurrentDrag = false;
    } 

  }
  this.expand = function(x,) {
    this.isExpanded = true;

    //DO I NEED THIS FUNCTION?

    // var d = dist(x, y, this.x, this.y);
    // if (d < this.s/2) {
    //    if (this.isBig == false) {
    //     this.s = 300; 
    //     this.x = width/2;
    //     this.y = height/2;
    //     this.isBig = true;
    //    } else {
    //     this.s = 100; 
    //     this.isBig = false;
    //    }    
    // } 
  }

  this.reset = function() {
    //using all of the position arryays 
    //possibly an array of stings of all the values and then concattinating them 
  // }
  }
  this.hide = function() {
    this.hidden =  true;
  }
}


function drawBlockTreatments (anOpinion) {

  //in the state machine is where I should establish widths and heights 
  switch(anOpinion.theType) {
    case 'post':
      drawPostReg(anOpinion);
        if(anOpinion.isExpanded) {
          consle.log(isExpanded);
        }
      break;
    case 'quote': 
      drawQuoteReg(anOpinion);
      break;
    case 'article':
      drawArticleReg(anOpinion);
      break;
  }
}

//should I make a function for drawing the X? 
function drawPostReg (anOpinion) {
  noStroke();
  fill(anOpinion.r, anOpinion.g, anOpinion.b, anOpinion.a);
  rect(anOpinion.x, anOpinion.y, anOpinion.w, anOpinion.h);
  fill(0);
  textSize(12);
  textFont(monospaceBold);
  text(anOpinion.theTitle, anOpinion.textX, anOpinion.textY, anOpinion.textW, anOpinion.textH);

  textSize(12);
  textFont(monospaceReg);
  text("x", anOpinion.removeX, anOpinion.removeY); 
}

function drawQuoteReg (anOpinion) {
  fill(0);
  fill(anOpinion.r, anOpinion.g, anOpinion.b, anOpinion.a);
  rect(anOpinion.x, anOpinion.y, anOpinion.w, anOpinion.h);
  // console.log(r);
  textFont(goudy);
  fill(0);
  textSize(36);
  text(anOpinion.theTitle, anOpinion.textX, anOpinion.textY, anOpinion.textW, anOpinion.textH);

  textSize(12);
  textFont(monospaceReg);
  text("x", anOpinion.removeX, anOpinion.removeY);
}

function drawArticleReg(anOpinion) {
  var words; 
  // for (var i = 0; i < anOpinion.theTitle.length; i++) {
  //   words = anOpinion.theTitle[i].split(" ");
  //   words
  //   for (var j = 0; j < words.length; j++) {
  //     var wordWidth = textWidth(words[j]);
  //     fill(255);
  //     rect(anOpinion.text)
  //   }
  // }

  var leadingSize = 28;
  var titleWidth = textWidth(anOpinion.theTitle);
  var boxWidth = anOpinion.textW;
  var numLines = floor(titleWidth/boxWidth) + 1;
  var calcHeight = numLines + (anOpinion.margin * 2 ) + (numLines * leadingSize);  

  fill(anOpinion.r, anOpinion.g, anOpinion.b, anOpinion.a);
  rect(anOpinion.x, anOpinion.y, anOpinion.w, calcHeight);
  // rect(anOpinion.textX, anOpinion.textY, titleWidth, 24);
  
  fill(0);
  textFont(slateBold);
  
  textSize(24);
  textLeading(leadingSize);
  text(anOpinion.theTitle, anOpinion.textX, anOpinion.textY, anOpinion.textW, calcHeight);

  rectMode(CENTER);
  textSize(12);
  textFont(monospaceReg);
  text("x", anOpinion.removeX, anOpinion.removeY);


}



//MOUSE DRAG
function mouseDragged() {
  for (var i = 0; i < rectArray.length; i++) {
  var anOpinion = rectArray[i];
  if (abs(anOpinion.x - mouseX) < anOpinion.w/2 && abs(anOpinion.y - mouseY) < anOpinion.h/2) {
      if(aCurrentDrag == false || (aCurrentDrag == true && anOpinion.isBeingDragged ==true)){
        anOpinion.dragged();
        var theIndex = i;
        // console.log(anOpinion);
        // rectArray.splice(rectArray[theIndex]);
        // rectArray.push(rectArray[theIndex]);
    }    
  }      



    // var theOneDragged = rectArray[i]; 
    
    // rectArray[i].dragged(mouseX, mouseY);  
    // rectArray.splice(theOneDragged);
    // rectArray.push(theOneDragged);
    // console.log(i);
  }
}
//MOUSE DOUBLE CLICK 
//can't figure out a way to use mouseClicked or mousePressed without this being trigered when I drag

function doubleClicked() {
  for (var i = 0; i < rectArray.length; i++) {
    rectArray[i].expand();
  }
} 
//WINDOW RESIZE
function windowResized() {
  var canvasHeight = innerHeight - 100;
  resizeCanvas(innerWidth *.9 , canvasHeight);
}

function mouseReleased() {
  for (var i = 0; i < rectArray.length; i++) {
    rectArray[i].draggingStopped();
  }  
}

function checkDrag() {
  for (var i = 0; i < rectArray.length; i++) {
    if(rectArray[i].isBeingDragged == true) {
      aCurrentDrag = true;
    } 
  } 
}




//THINGS TO WORK ON
//drag boolean
//if I drag an opinion, how do I make sure it goes to the front 
//get the isExpanded boolean to work


//HOW TO DEAL WITH MULSIPLE OBJECTS BEING DRAGGED
//a locked array? 
//a counter that tracks the number of objects currently being dragged and allows for only one to be dragged -- some way to tell which one is infront of the other -- i could tell this by the index of the object

//calculating the height/width of the opnionBlock -- have to consider that certain words get returned to the next line 



