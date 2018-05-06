//Sarah McNutt
//three.js homework 
var allTheData;
var scene = new THREE.Scene();
var cubes = [];
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
var text = "hello";
var years = document.getElementsByTagName("p");
var theWords;
var text = "hello";
var loader = new THREE.FontLoader();

//XMLHTTPRequest
var request;
request = new XMLHttpRequest();
request.open('GET', 'wordOfYear.json', true);
request.onload = function(event) {
	allTheData = JSON.parse(event.target.responseText);
}
request.send();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//on resize
window.addEventListener('resize', function () {
	var width = window.innerWidth;
	var height = window.innerHeight;
	renderer.setSize(width, height);
	camera.aspect= width/height;
	camera.updateProjectionMatrix();
});

var font;

//load font
function loadFont() {
 var loader = new THREE.FontLoader();
 loader.load('franklinGothic.json', function (res) {
   font = res;
   createText();
 });
}

var material = new THREE.MeshBasicMaterial({color: 0xffffff});
var ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
scene.add(ambientLight);
// var text;

//CREATE TEXT
  function createText() {
    textGeo = new THREE.TextGeometry( "text", {
      font: font,
      size: .8,
      height: 1,
      curveSegments:10,
      weight: "normal",
      bevelThickness:.2,
      bevelSize:0.3,
      bevelSegments:10,
      bevelEnabled:false
    });
    textGeo.computeBoundingBox();
    textGeo.computeVertexNormals();
   	var text = new THREE.Mesh(textGeo, material)
    text.position.x = -textGeo.boundingBox.max.x/2;
    text.castShadow = true;
    scene.add(text);

  //    text.rotation.x = 90;
		// text.rotation.y =30;
  }

var yr;  

//CHECK IF YEAR HAS BEEN PRESSED
function check() {
	for (var i = 0; i < years.length; i++) {
	var elem = years[i];
	elem.onclick = function() {
		yr = ("y" + this.innerHTML);
		console.log(yr);
		theWords = allTheData.allTheWords;
		console.log(theWords[yr]);
		}
	}
}

camera.position.z = 5;

//ANIMATION LOOP
var animate = function () {
	check();
	requestAnimationFrame(animate);
	createText();
	renderer.render(scene, camera);
}

loadFont();
animate();


//FINAL NOTEs
//2 topics: software design (decouplig logic and data, state machine, scene transistion, oop ARCHITECTURAL APPROACH, state machines, content, seperating logic and data, smart collision ownership) (higher and lower level abstraction)
//make use of browser DOM
//narrative, beginning, middle, end








