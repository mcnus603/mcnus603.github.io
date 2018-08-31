//EDITED MIDTERM WITTEN W/O p5

// code 2
// spring 2018
// sarah mcnutt
// midterm

//data varriables 
var containerDivArray = [];
var contentArray = [];
var sections = ["relationships", "weddings", "marriage", "romance", "sex", "gender", "lgbt", "about"];
var sectionsArray = [];
var previousSection; 

// var expandImage;
// var resetButton;

var contentData = [];
var colorData = [];
var longest = 0;
var aClick = 0;

//LOAD JSON WITH JQUERY AJAX
$(document).ready(function() {
   function loadContentData() {
    $.getJSON('json/content.json')
    .done(function(data){
      contentData = data;
      calcOpDivs(); //calculate number of divs needed total
      createOpDivs();
    });
   }
    function loadColorData() {
    $.getJSON('json/colors.json')
    .done(function(data){
      colorData = data;
    });
   }
   loadContentData();
   loadColorData();   


});

window.onload = function() {
  //create divs for sections and add them to the toolbar class 
  var tc = document.getElementById('toolbarContainer'); 
  for (var i = 0; i < sections.length; i++) {
    var str = sections[i].toUpperCase();
    var newDiv = document.createElement('div');
    newDiv.innerHTML = str;
    tc.appendChild(newDiv);
    newDiv.classList.add('toolbar');
    sectionsArray.push(newDiv);
  }

  //add event listeners to sections 
  for (var i = 0; i < sectionsArray.length; i++) {
    sectionsArray[i].addEventListener('click', sectionClicked)
  }
  //do the math for creating the reset button
}

//SECTION CLICKING
function sectionClicked() {
  //TOOLBAR_________________________________________
  var newSection = this.innerHTML.toLowerCase();
  var path = contentData.content[newSection];

  //change styles for new Section on the TOOLBAR
  for(var i = 0; i < sections.length; i++) {
     if(sections[i] == newSection) {
      // console.log(newSection);
      $(this).css('background-color', 'rgb('+colorData.colors[newSection][0].r + ',' + colorData.colors[newSection][0].g + ',' + colorData.colors[newSection][0].b);
    }
  }
  
  if(aClick > 0) {
    //remove styles from OLD SECTION on the TOOLBAR
    for (var i = 0; i < sectionsArray.length; i ++) {
      if (sectionsArray[i].innerHTML.toLowerCase() == previousSection) {
        var thePrevOne = sectionsArray[i];
        $(thePrevOne).css('background-color', 'white');
      }
    }
  //________________________________________________________________
  //OPINIONBLOCKS

  //clear styles in the divs
    for (var i = 0; i < contentArray.length; i++) { 
      var cls = contentArray[i].type;
      //also remove draggable class maybe have a draggable and static class and use an if statement to toggle
      $(containerDivArray[i]).removeClass(cls);
    }
  }

  //clear content in the divs
  for (var i = 0; i < containerDivArray.length; i++) { 
    containerDivArray[i].innerHTML = "";
  }
  
  //populate array with new opinionBlocks for that section  
  contentArray = [];  //reset content array
  
  //populate data into the contentArray
  for (var i = 0; i < path.length; i ++) { 
    var entry = path[i];
    contentArray.push(entry);
  }

  //set classes and fill divs with a title 

  for(var i = 0; i < contentArray.length; i++) {
   
    //populate with content
    var title = contentArray[i].title;
    var text = contentArray[i].text;
    var cls = contentArray[i].type;

    if(cls == 'post') {
      containerDivArray[i].innerHTML = title; 
    } else if (cls == 'quote') {
      containerDivArray[i].innerHTML = title;
    } else if(cls == 'article') {
      containerDivArray[i].innerHTML = title;
    }

    $(containerDivArray[i]).addClass(cls);
    
    //Position is this math correct?
 
    var bX = $(document.body.offsetWidth)[0];
    var bY = $(document.body.offsetHeight)[0];

    var cnvMargin = 50;
    var headHeight = $(toolbarContainer).height();
    var objOffW = $(containerDivArray[i]).width();
    var objOffH = $(containerDivArray[i]).height();
 
    var maxX = bX - (cnvMargin + objOffW);
    var minX = cnvMargin;
    var maxY = bY - (cnvMargin + objOffH) ;
    var minY = cnvMargin + headHeight;

    var x = Math.floor(Math.random() * (maxX - minX + 1) + minX);
    var y = Math.floor(Math.random() * (maxY - minY + 1) + minY);

    $(containerDivArray[i]).css('top', y);
    $(containerDivArray[i]).css('left', x);

    //Colors
    var colorArrayLength = colorData.colors[newSection].length;
    var r = colorData.colors[newSection][i%colorArrayLength].r
    var b = colorData.colors[newSection][i%colorArrayLength].b
    var g = colorData.colors[newSection][i%colorArrayLength].g

    $(containerDivArray[i]).css('background-color', 'rgb(' + r + ',' + g + ',' + b + ')');

  }
  //set previous section
  previousSection = newSection;
  aClick ++;
}



//CREATE OPINIONBLOCKS -- create as many divs as necissary based on largest section
function calcOpDivs() {

  for (var i = 0; i < sections.length; i++) {
    var aSection = sections[i];
    var num = contentData.content[aSection].length;
    if (num > longest) {
      longest = num;
    }
  }
}

function createOpDivs () {
  var cnv = document.getElementById('contentContainer');
  for (var i = 0; i < longest; i ++) {
    var newDiv = document.createElement('div');
    cnv.appendChild(newDiv);
    containerDivArray.push(newDiv);

    var innerDiv1 = document.createElement('div');
    var innerDiv2 = document.createElement('div');

    newDiv.appendChild(innerDiv1);
    newDiv.appendChild(innerDiv2);
  }
  addEvntListeners();
}

//INTERACTION WITH STATE MACHINE 7
  //add event listeners to change the state and then use the state machine to dictate the visual effects

//EXAMPLE CODE
// var menu = {
// 　    
//   // Current state
// 　currentState: 'hide',
// 　
// 　// Bind events
// 　initialize: function() {
// 　　　var self = this;
// 　　　self.on("hover", self.transition);
// 　},
// 　
// 　// State transition
// 　transition: function(event){
// 　　　switch(this.currentState) {
// 　　　　case "hide":
// 　　　　　　this.currentState = 'show';
// 　　　　　　doSomething();
// 　　　　　　break;
// 　　　　case "show":
// 　　　　　　this.currentState = 'hide';
// 　　　　　　doSomething();
// 　　　　　　break;

// 　　　　　}
// 　　}
// };
 



function addEvntListeners () {

  for (var i = 0; i < containerDivArray.length; i++) {
    //a click
    containerDivArray[i].addEventListener("drag", function () {
      clicked();
    });
  }
}

function clicked() {
  // console.log(this);
 var h =  this.innerHeight
 var e = window.event;
 var x = e.clientX;
 var y = e.clientY;
 var obj = e.path[0];
 console.log(obj);
 obj.style.top = y +'px';

  $(obj).css('top', '100' );
// }
}


//TO DO LIST
  //add event listeners
    //for draggable 
      //when active you can drag them 
  //state machine -- build it, how each section acts -- mealy state machine
    //can my state machine b controlled by classes and events



//JQuery Notes
//Benefits of JQuery: easy to play with the DOM, add effects and execute AJAX requests
//$ -- allows you to select any CSS Selectors and then do something with them 
//jQuery function ($) has one parameter, a CSS style selector (class, id)

//Thoughts
//show() hide()
//animate()

//interact.js
//konova.js for shadow 







