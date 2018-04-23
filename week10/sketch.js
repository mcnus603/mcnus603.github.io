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

//create text

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
    scene.add(text)
  }

function check() {
	for (var i = 0; i < years.length; i++) {
	var elem = years[i];
	elem.onclick = function() {
		var yr = 'y' +this.innerHTML;
		console.log(yr);
		theWords = allTheData.allTheWords.yr;
		console.log(allTheData.allTheWords.yr);
		}
	}
}

camera.position.z = 5;

//render or animate loop
var animate = function () {
	check();
	requestAnimationFrame(animate);
	// textGeo.rotation.x += 0.01;
	// textGeo.rotation.y +=0.01;
	renderer.render(scene, camera);
}

loadFont();
animate();


