// code 2
// spring 2018
// sarah mcnutt

// midterm

var contentData;
var colorData;
var rectArray = [];

var sections = ["relationships", "weddings", "marriage", "romance", "sex", "gender", "lgbt", "about"];
var toolbarArray = [];

var previousSection; 

var aCurrentDrag = false;
var numDragged; 

var expandImage;

function preload() {
  contentData = loadJSON('content.json');
  colorData = loadJSON('colors.json');
  goudy = loadFont('fonts/webfonts/36058A_0_0.ttf'); 
  slateReg = loadFont('fonts/webfonts/36058A_2_0.ttf'); 
  slateBold = loadFont('fonts/webfonts/36058A_1_0.ttf'); 
  monospaceBold = loadFont('fonts/webfonts/36067E_1_0.ttf'); 
  monospaceReg = loadFont('fonts/webfonts/36067E_0_0.ttf'); 

  expandImage = loadImage('images/expand.png')
}

function setup() {

  numDragged = 0;

  for (var i = 0; i < sections.length; i++) {
    var str = sections[i].toUpperCase();
    var div = createDiv(str);
    div.addClass('toolbar');
    toolbarArray.push(div);
  }

  var canvasHeight = innerHeight - 100;
  var cnv = createCanvas(innerWidth *.9, canvasHeight);
  cnv.class('cnv');
  noStroke();
}

function draw() {
  background(255);
  startPage();
  toolbarCheck();
  checkDrag();
  // console.log(numDragged);

  for (var i = 0; i < rectArray.length; i++) {
    drawOpinionBlockStates(rectArray[i]);
  } 
}

//START PAGE FUNCTION 
function sectionClicked () {
  var newSection = (this.html()).toLowerCase();

//change styles for new section
  for(var i = 0; i < sections.length; i++) {
    if(sections[i] == newSection) {
      this.style('background-color', 'rgb('+colorData.colors[newSection][0].r + ',' + colorData.colors[newSection][0].g + ',' + colorData.colors[newSection][0].b)+ ')';
    }
  }
   
//remove styles for the old section
  for(var i = 0; i < toolbarArray.length; i++) {
    if((toolbarArray[i].html()).toLowerCase() == previousSection) {
      var thePreviousOne = toolbarArray[i];
      thePreviousOne.style('background-color', 'white');
    }
  }
    previousSection = newSection;

//fill array with new opinionBlocks for that section 
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
  //fill with opinionButton Objects

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
  this.r = r; 
  this.g = g; 
  this.b = b;
  this.w = 250;
  this.h = 150;

  this.currentState = 'regular';
  this.x = x;
  this.y = y;

  this.theTitle = theTitle;
  this.theText = theText;
  this.theType = theType;

  this.removeX;
  this.removeY;
  this.removeW;
  this.removeH;

  this.expandX; 
  this.expandY;
  this.expandW; 
  this.expandH;

  this.minX;
  this.minY;
  this.minW; 
  this.minH;

  this.display = function(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    fill(this.r, this.g, this.b);
    rect(this.x, this.y, this.w, this.h);
  }

  this.dragged = function() {
      this.currentState = 'dragging';
  }

  this.draggingStopped = function() {
    if(this.currentState == 'dragging') {
      this.currentState = 'regular';
      aCurrentDrag = false;
      numDragged = 0;
    } 

    this.currentState = 'regular';
  }

  this.expand = function() {
    this.currentState = 'expanded';
  
  }

  this.reset = function() {
    this.aCurrentState = 'reset';
  }

  this.hide = function() {
    this.currentState = 'hidden';
  }

  this.removalButton = function(removeX, removeY) {
    this.removeX = removeX;
    this.removeY = removeY;
    this.removeW = 14;
    this.removeH = 14;

    textSize(12);
    textFont(monospaceBold);
    text("x", this.removeX, this.removeY);
  }

  this.expandButton = function(expandX, expandY) {
    this.expandX = expandX; 
    this.expandY = expandY;
    this.expandW = 12; 
    this.expandH = 12;
    image(expandImage, this.expandX, this.expandY, 8, 8);
  }

  this.minimizeButton = function(minX, minY) {
    this.minX = minX;
    this.minY = minY;
    this.minW = 12; 
    this.minH = 12;

    textSize(12);
    textFont(monospaceBold);
    text("_", this.minX, this.minY);
  }
}


function drawOpinionBlockStates (anOpinion) {
  switch(anOpinion.currentState) {
    case'regular':
      drawRegularOpinionBlocks(anOpinion, anOpinion.x, anOpinion.y);
      break;
    case 'dragging':
      drawRegularOpinionBlocks(anOpinion, mouseX, mouseY);
      break; 
    case 'expanded':
      drawExpandedOpinionBlocks(anOpinion);
      break;
    case 'hidden': 
      //display nothing
      break;
    case 'reset':
      //draw regular opinionBlocks with og positions
      break;
  }
}

//https://creative-coding.decontextualize.com/text-and-type/

function drawRegularOpinionBlocks(anOpinion, x, y) {
  var w;
  var h;
  var x; 
  var y;
  var titleLength; 
  var textLength; 
  var theTextSize;
  var leadingSize;
  var spaceSize;
  var margin = 10;
  var splitStrings = [];

  var textX;
  var textY;
  var textW ;
  var textH;

  var xOffset = 0;
  var yOffset = 0;
  var splitArray;



  if(anOpinion.theType == "post") {
    w = 250;
    textFont(monospaceBold);
    theTextSize = 12;
    leadingSize = 14;
    spaceSize = 5;
    textSize(theTextSize);
    textLeading(leadingSize);

    //CALCULATING THE HEIGHT OF THE RECT
    var h = calcHeight(anOpinion.theTitle, spaceSize, leadingSize, textSize, w, margin);
    rectMode(CENTER);
    anOpinion.display(x, y, w, h);

    rectMode(CORNER);
    textX = (anOpinion.x - w/2) + margin;
    textY = (anOpinion.y - h/2) + (margin * 1.5);
    textW = w - (2 * margin);
    textH = anOpinion.h - (2 * margin);

    //SPLIT ARRAY
    splitArray = splitString(anOpinion.theTitle);
    fill(0);

    //DISPLAY TEXT    
    for(var j = 0; j < splitArray.length; j++) {
      var wordWidth = textWidth(splitArray[j]);

      if (xOffset >= (w - wordWidth - (2 * margin))) {
        xOffset = 0;
        yOffset += leadingSize; 
      }

      text(splitArray[j], (textX + xOffset), (textY + yOffset));

      if (xOffset >= (w - wordWidth - (2 * margin))) {
        xOffset = 0;
        yOffset += leadingSize; 
      } else {
        xOffset += wordWidth + spaceSize;
      }  
    }  
  } 

  if (anOpinion.theType == "quote") {
    w = 350;
    textFont(goudy);
    theTextSize = 42;
    leadingSize = 46;
    spaceSize = 10;
    textSize(theTextSize);
    textLeading(leadingSize);

    //CALCULATING THE HEIGHT OF THE RECT
    var h = calcHeight(anOpinion.theTitle, spaceSize, leadingSize, textSize, w, margin);

    rectMode(CENTER);
    anOpinion.display(x, y, w, h);

    rectMode(CORNER);
    textX = (x - w/2) + margin;
    textY = (y - h/2) + (1.5 * margin) + leadingSize/2;

    //SPLIT ARRAY
    splitArray = splitString(anOpinion.theTitle);
    fill(0);
    
    for(var j = 0; j < splitArray.length; j++) {
      var wordWidth = textWidth(splitArray[j]);

      if (xOffset >= (w - wordWidth - (2 * margin))) {
        xOffset = 0;
        yOffset += leadingSize; 
      }

      text(splitArray[j], (textX + xOffset), (textY + yOffset));

      if (xOffset >= (w - wordWidth - (2 * margin))) {
        xOffset = 0;
        yOffset += leadingSize; 
      } else {
        xOffset += wordWidth + spaceSize;
      }  
    } 
  }

  if (anOpinion.theType == "article") {
    w = 300;
    textFont(slateBold);
    theTextSize = 24;
    leadingSize = 26;
    spaceSize = 6;
    textSize(theTextSize);
    textLeading(leadingSize);

//CALCULATING THE HEIGHT OF THE RECT
    var h = calcHeight(anOpinion.theTitle, spaceSize, leadingSize, textSize, w, margin);

    rectMode(CENTER);
    anOpinion.display(x, y, w, h);

    rectMode(CORNER);

    textX = (x - w/2) + margin;
    textY = (y - h/2) + (1.5 * margin) + leadingSize/2;

    //SPLIT ARRAY
    splitArray = splitString(anOpinion.theTitle);
    fill(0);
    
    // TEXT DISPLAY
    for(var j = 0; j < splitArray.length; j++) {
      var wordWidth = textWidth(splitArray[j]);

      if (xOffset >= (w - wordWidth - (2 * margin))) {
        xOffset = 0;
        yOffset += leadingSize; 
      }

      text(splitArray[j], (textX + xOffset), (textY + yOffset));

      if (xOffset >= (w - wordWidth - (2 * margin))) {
        xOffset = 0;
        yOffset += leadingSize; 
      } else {
        xOffset += wordWidth + spaceSize;
      }  
    } 
  }
  
  var removeX = x + (anOpinion.w/2) - margin;
  var removeY = y - (anOpinion.h/2) + margin;
  var expandX = x + (anOpinion.w/2) - margin;
  var expandY = y + (anOpinion.h/2) - margin;
    
  anOpinion.removalButton(removeX, removeY);
  if(anOpinion.theType !== "quote") {
    anOpinion.expandButton(expandX, expandY); 
  }
}


function drawExpandedOpinionBlocks(anOpinion) {
  var w; 
  var h; 
  var x = innerWidth/2;
  var y = innerHeight/2;
  var margin = 10;

  if(anOpinion.theType == "post") {



  }
  if(anOpinion.theType == "article") {
    w = innerWidth;
    h = innerHeight;
  }

  anOpinion.display(x, y, w, h);

  var minX = x + (w/2) - margin;
  var minY = y - (h/2) + margin;

  anOpinion.minimizeButton(minX, minY);

}

function drawDraggingOpinionBlocks(anOpinion) {
  var x = mouseX;
  var y = mouseY; 

  var margin = 10;
  var textX = mouseX + margin;
  var textY = mouseY + margin;

  var textW = anOpinion.w - margin;
  var textH = anOpinion.h - margin;

  var removeX = x + (anOpinion.w/2) - margin;
  var removeY = y - (anOpinion.h/2) + margin;
  var expandX = x + (anOpinion.w/2) - margin;
  var expandY = y + (anOpinion.h/2) - margin;







   anOpinion.display(x, y, anOpinion.w, anOpinion.h);

    fill(0);
  if(anOpinion.theType == "post") {
    textSize(12);
    textFont(monospaceBold);


  } else if (anOpinion.theType == "quote") {
    textFont(goudy);
    textSize(42);
  } else if (anOpinion.theType == "article") {
    textFont(slateBold);
    textSize(24);
  }

  text(anOpinion.theTitle, textX, textY, textW, textH);
  textSize(12);
  textFont(monospaceReg);

  anOpinion.removalButton(removeX, removeY);
  
  if(anOpinion.theType !== "quote") {
    anOpinion.expandButton(expandX, expandY); 
  }
}


//MOUSE DRAG
function mouseDragged() {
  for (var i = 0; i < rectArray.length; i++) {

  var anOpinion = rectArray[i];

  if (abs(anOpinion.x - mouseX) < anOpinion.w/2 && abs(anOpinion.y - mouseY) < anOpinion.h/2) {
      if(aCurrentDrag == false || (aCurrentDrag == true && anOpinion.currentState == 'dragging')){
        //if the mouse is also not where the expand and removal and min buttons are
        anOpinion.dragged();
        // var theIndex = i;
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

function mouseClicked () {
  for (var i = 0; i < rectArray.length; i++) {
    var anOpinion = rectArray[i]; 

    if(abs(anOpinion.removeX - mouseX) < anOpinion.removeW/2 && abs(anOpinion.removeY - mouseY) < anOpinion.removeH/2) {
      anOpinion.hide();
    }

    if(abs(anOpinion.expandX - mouseX) < anOpinion.expandW/2 && abs(anOpinion.expandY - mouseY) < anOpinion.expandH/2) {
      anOpinion.expand();
    }

  }
}

//WINDOW RESIZE
function windowResized() {
  var canvasHeight = innerHeight - 100;
  resizeCanvas(innerWidth *.9 , canvasHeight);
}

function mouseReleased() {
  for (var i = 0; i < rectArray.length; i++) {
    if(rectArray[i].currentState == 'dragging') {
      rectArray[i].draggingStopped();
    }
    
  }  
}

function checkDrag() {
  for (var i = 0; i < rectArray.length; i++) {
    if(rectArray[i].currentState == 'dragging') {
      aCurrentDrag = true;
    } 
  } 
}

function checkObjDrag () {
  var onesBeingDragged = []; 
  for (var i = 0; i < rectArray.length; i++) {
    if(rectArray[i].currentState == 'dragging') {
      var aDrag = rectArray[i];
      onesBeingDragged.push(aDrag); 
    }
    numDragged = onesBeingDragged.length;
  }
}

// figuring out how to calculate the height of the box and the idea to split the strings came from the last example in this code titled "text metrics" https://creative-coding.decontextualize.com/text-and-type/

function calcHeight(theText, spaceSize, leading, textSize, w, margin) {
    var xOffset;
    var yOffset;
    var splitArray;

    for(var i = 0; i < theText.length; i++) {
      var theOriginalString = theText;
      splitArray = split(theOriginalString, ' ');  
      xOffset = 0;
      yOffset = 0;
    }  

    for(var j = 0; j < splitArray.length; j++) {
      rectMode(CORNER);
      if (xOffset >= (w - wordWidth - (2 * margin))) {
        xOffset = 0;
        yOffset += leading; 
      } 
      var wordWidth = textWidth(splitArray[j]);
      if (xOffset >= (w - wordWidth - (2 * margin))) {
        xOffset = 0;
        yOffset += leading; 
      } else {
        xOffset += wordWidth + spaceSize;
      }
    }  
    var numLines = (yOffset/leading) + 1;
    if(leading > 20) {
    }
    
    var h = (numLines * leading) + (margin * 2);
    return h;  
}

function splitString(theText) {
  var splitArray; 

  for(var i = 0; i < theText.length; i++) {
    var theOriginalString = theText;
    splitArray = split(theOriginalString, ' ');
  }

  return splitArray;  
}



//THINGS TO WORK ON
//drag boolean
//if I drag an opinion, how do I make sure it goes to the front 
//get the isExpanded boolean to work
//counting number of objects with a current drag bool as true


//HOW TO DEAL WITH MULSIPLE OBJECTS BEING DRAGGED
//a locked array? 
//a counter that tracks the number of objects currently being dragged and allows for only one to be dragged -- some way to tell which one is infront of the other -- i could tell this by the index of the object

//calculating the height/width of the opnionBlock -- have to consider that certain words get returned to the next line 

//TO DO NEXT
//expand button



