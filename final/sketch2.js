//Sarah McNutt
//Code 2 final

//DOM elements
var pg1; 
var pg2;
var header;
var footer;
var title;
var text;
var slideshow;
var entryContainer;
var index = 0;
var home;
var about;
var work;
var aboutPg;
var cameraZ = 300;

var DOMMainImages = [];
var DOMOtherImages = [];
var homeElements = [];
var workElements = [];
var aboutElements = [];

//data varriables
var allTheData;
var images = [];
var titles = [];
var textEntries = [];
var otherImages = [];
var titleDivs;

//THREE.js varriables
var geometries = [];
var materials = [];
var textGeo;
var textArray = [];

var currentSection = "home";


//XML HTTP request
var request;
request = new XMLHttpRequest();
request.open('GET', 'portfolio.json', true);

//load into arrays
request.onload = function(event) {
	allTheData = JSON.parse(event.target.responseText);
	for (var i =0; i< allTheData.content.work.length; i++) {

		var theImage = allTheData.content.work[i].mainImage;
		var theTitle = allTheData.content.work[i].title;
		var theText = allTheData.content.work[i].text;
		var sImages = [];
		sImages = allTheData.content.work[i].otherImages;

		images.push(theImage);
		titles.push(theTitle);
		textEntries.push(theText);		
		otherImages.push(sImages);
	}
	parseDOMElements();
	eventListnersToDOM();
	drawContent();
	displayHello();
}

request.send();


//Get DOM Elements
function parseDOMElements () {
	pg1 = document.getElementById('pg1');
	homeElements.push(pg1);
	pg2 = document.getElementById('pg2');
	homeElements.push(pg2);

	footer = document.getElementById('footer');
	 
	entryContainer = document.getElementById('entryContainer');
	workElements.push(entryContainer);

	title = document.getElementById('title');
	workElements.push(title);

	text = document.getElementById('text');
	workElements.push(text);

	slideshow = document.getElementById('slideshow');
	workElements.push(slideshow); 

	home = document.getElementById('home');
	about = document.getElementById('about');
	work = document.getElementById('work');

	aboutPg = document.getElementById('aboutPg');

	loadMainImages();
	loadOtherImages();
}

function loadMainImages() {  
  for (var i = 0; i < images.length; i++) {
    var anImage = document.createElement('img');
    anImage.setAttribute('src', images[i]);
    anImage.setAttribute('left', window.innerWidth);
    anImage.setAttribute('top', i*200);
    anImage.classList.add('mainImage');
    anImage.id = [i];
    DOMMainImages.push(anImage);
    homeElements.push(anImage);

    var theImageW = anImage.width;
    var theImageH = anImage.height;

    // var theTitle = document.createElement('div');
    // theTitle.innerHTML = titles[i];
    // theTitle.setAttribute('width', theImageW);
    // titleDivs.push(theTitle, theImageH);
  }

 	positionImages();

 	for (var i = 0; i < DOMMainImages.length; i++) {
 		var anImage = DOMMainImages[i];
 		pg2.appendChild(anImage);
 	}
}

function loadOtherImages() {
	//create element
	for (var i = 0; i < otherImages.length; i++) {
		var anArray = [];
		for(var j = 0; j < otherImages[i].length; j++) {
			var anImage = document.createElement('img');
    	anImage.setAttribute('src', otherImages[i][j]);

    	anArray.push(anImage);
    	slideshow.appendChild(anImage);
    	anImage.classList.add('otherImage');


		}
		DOMOtherImages.push(anArray);
	}
	//append
	// for(var i = 0; i < DOMOtherImages.length; i++) {
	// 	for(var j = 0; j < DOMOtherImages[i].length; j++) {
	// 		var anEl = DOMMainImages[i][j]
	// 	}
	// }

}

function hideOtherImages() {
	for(var i = 0; i <otherImages.length; i++) {
		for (var j = 0; j < otherImages[i].length; j++) {
			var anImage = otherImages[i][j];
			hideEl(anImage);
		}
	}
}

//State Machine
function drawContent() {
	switch(currentSection) {
		case 'home': 
		hideImages();
		displayHomepage();
		positionImages();
		aboutPg.style.display = "none";
		entryContainer.style.display = "none";
			break;
		case 'aWork':
		hideImages();
    	displayAWork();
    	pg1.style.display = "none";
			pg2.style.display = "none";
			aboutPg.style.display = "none";
    	break;
    case 'about':
    hideImages();
    	displayAbout();
    	pg1.style.display = "none";
			pg2.style.display = "none";
			entryContainer.style.display = "none";
    	break;
    }
}

function eventListnersToDOM() {
	//Images 
	for (var i = 0; i < DOMMainImages.length; i ++) {
		var anImage = DOMMainImages[i];

		anImage.addEventListener('click', function(){
			currentSection = "aWork";
			index = this.id;
		});
	}
	//Nav bar 
	home.addEventListener('click', function(){
		currentSection = "home";
	});
	work.addEventListener('click', function(){
		currentSection = "home";
	});
	about.addEventListener('click', function(){
		currentSection = "about"
	});
}

document.addEventListener('click', function() {
	drawContent();
});

function hideEl(el) {
	el.style.display = "none";
}

function displayInlineBlock(el){
	el.style.display = "inline-block";
}

function displayBlock(el){
	el.style.display = "block";
}


function displayHomepage() {
	for (var i = 0; i < homeElements.length; i++) {
		var theEl = homeElements[i];
		displayInlineBlock(theEl)
	}
	for (i = 0; i < workElements; i++) {
		var theEl = workElements[i];
		hideEl(theEl);
	}

}

function displayAWork() {

	for (i = 0; i < homeElements; i++) {
		var theEl = homeElements[i];
		hideEl(theEl);
	}
	for (var i = 0; i < workElements.length; i++) {
		var theEl = workElements[i];
		displayBlock(theEl)
	}

	//change HTML 
	title.innerHTML = titles[index];
	text.innerHTML = textEntries[index]
	for (var i = 0; i < DOMOtherImages[index].length; i++) {
		var theEl = DOMOtherImages[index][i];
		displayBlock(theEl);
	}
}



function displayHello() {
  //GET PG 1
  var pg1W = pg1.offsetWidth;
  var pg1H = pg1.offsetHeight;
  var hello = ["H", "E", "L", "L", "O"];
  var randomNums = [0.004, 0.001, 0.006, 0.002, 0.005];

  //HELLO ANIMATION INIT
  var HelloScene = new THREE.Scene();
  HelloScene.background = new THREE.Color(0xffffff);
  var HelloCamera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
  var HelloRenderer = new THREE.WebGLRenderer(); 
  HelloRenderer.setSize(pg1W, pg1H);
  pg1.appendChild(HelloRenderer.domElement);

  //LOAD FONT
  function loadFont() {
    var loader = new THREE.FontLoader();
    loader.load('helvetiker_regular.typeface.json', function (res) {
      font = res;
      for (var i = 0; i < hello.length; i++) {
        var theText = hello[i];
        createText(theText, i); 
      }
    });
  }
  //TEXT MATERIAL
  // var textMaterial = new THREE.MeshLambertMaterial({color: 0x3694f2});
  var textMaterial = new THREE.MeshNormalMaterial();
 
  var ambientLight = new THREE.AmbientLight(0x000000, 50);
 
  var directionalLight1 = new THREE.DirectionalLight( 0xe7b6f2, 2 );
  directionalLight1.position.set(500, -200, 500);

  var directionalLight2 = new THREE.DirectionalLight(0xc266cc, 2);
  directionalLight2.position.set(-500, 500, 500);

  var directionalLight3 = new THREE.DirectionalLight(0x505ae2, 2);
  directionalLight3.position.set(0, 500, 500);


  HelloScene.add(ambientLight);
  HelloScene.add(directionalLight1);
  HelloScene.add(directionalLight2);
  HelloScene.add(directionalLight3);

  //CREATE TEXTGEOMETRY
  function createText(theText, i) {
    textGeo = new THREE.TextGeometry( theText, {
      font: font,
      size: 60,
      height: 20,
      curveSegments:20,
      weight: "normal",
      bevelThickness:.2,
      bevelSize:3,
      bevelSegments:20,
      bevelEnabled:true

    });
    textGeo.computeBoundingBox();
    // textGeo.computeVertexNormals();
    var text = new THREE.Mesh(textGeo, textMaterial)

    text.position.x = (i *100);
    text.position.x -= window.innerWidth/7;

    text.position.x += Math.random(0, 100);
    text.castShadow = true;
    HelloScene.add(text);
    textArray.push(text);
  }
  //MOVE CAMERA
  HelloCamera.position.z = cameraZ;

  //GAME LOGIC
  var update = function (){
    for (var i =0; i < textArray.length; i++) {
      var r =  randomNums[i];
      var theText = textArray[i];
      theText.rotation.y += r;
      theText.rotation.z += r;
       HelloCamera.position.z = cameraZ;
    }
  };

  var render = function() {
    HelloRenderer.render(HelloScene, HelloCamera);
  // WorkRenderer.render(WorkScene, WorkCamera);
  }

  //GAME LOOP
  var GameLoop = function() {
    requestAnimationFrame(GameLoop);
    update();
    render();
  };

  //CANVAS RESIZE
  window.addEventListener('resize', function () {
    var width = window.innerWidth;
    var height = window.innerHeight;
    HelloRenderer.setSize(width, height);
    HelloCamera.aspect= width/height;
    HelloCamera.updateProjectionMatrix();
  });

  loadFont();
  GameLoop();
}


function positionImages() {
	var xPos; 
	var yPos = -350;

	for(var i = 0; i < DOMMainImages.length; i++) {
		var theEl = DOMMainImages[i];
		var modCalc = i%3; 
		var offset = theEl.width/2;

		if (modCalc == 0) {
			xPos = (innerWidth/4) - offset + "px";
			yPos+=350;
		} else if (modCalc == 1) {
			xPos = ((innerWidth/ 4) * 3) - offset + "px";
		} else {
			xPos = (innerWidth/2) - offset + "px";
			yPos+=350;
		}
		theEl.style.display = "block";
		theEl.style.left = xPos;
		theEl.style.top =  yPos + "px";
	}

	var longestNum = DOMMainImages.length;
	longestHeight = longestNum * 200;
	pg2.style.height = longestHeight + "px";
}

function displayAbout() {
	displayInlineBlock(aboutPg);
}

function hideImages() {
	for (var i = 0; i < otherImages.length; i++) {
		for(var j = 0; j < otherImages[i].length; j++) {
			var anImage = DOMOtherImages[i][j];

				console.log("HHEHEHHE");
				hideEl(anImage);
			
		}
	}
}

window.onscroll = function() {
	var st = document.documentElement.scrollTop;
	cameraZ = 300-st;
	// console.log(document.documentElement.scrollTop);
	var constant = pg1.innerHeight + 200;

	for(var i = 0; i < DOMMainImages.length; i++) {
		var anImage = DOMMainImages[i];
		var offset = anImage.getBoundingClientRect();
		var anImageTop = offset.top;
		// console.log(anImageTop);

		if(st > anImageTop) {
			console.log(i)
	}
	}
}




