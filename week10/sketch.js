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

console.log(years);

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

function getTheWords(year) {
	
}

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

//CREATE GEOMETRY

var geometry = new THREE.BoxGeometry(1, 1, 2);
var cubeMaterials = 
[
	new THREE.MeshLambertMaterial({color:0xdaa49a, side:THREE.DoubleSide}),
	new THREE.MeshPhongMaterial({color:0x373f51, side:THREE.DoubleSide}),
	new THREE.MeshLambertMaterial({color:0x58A4B0, side:THREE.DoubleSide}),
	new THREE.MeshPhongMaterial({color:0xD8DBE2, side:THREE.DoubleSide}),
	new THREE.MeshLambertMaterial({color:0xA9BCD0, side:THREE.DoubleSide}),
	new THREE.MeshPhongMaterial({color:0xffffff, side:THREE.DoubleSide})

];
var material = new THREE.MeshFaceMaterial(cubeMaterials);
var cube = new THREE.Mesh(geometry, material);

scene.add(cube);
cubes.push(cube);

//move camera out a bit so its not on top of the cube
camera.position.z = 5;
var ambientLight = new THREE.AmbientLight(0xffffff, 1.0);

scene.add(ambientLight);

//render or animate loop
var animate = function () {
	check();
	requestAnimationFrame(animate);
	for (var i = 0; i < cubes.length; i ++) {
		cubes[i].rotation.x += 0.01;
		cubes[i].rotation.y += 0.01;
	}
	renderer.render(scene, camera);
}


animate();


