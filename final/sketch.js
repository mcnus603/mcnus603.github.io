//Sarah McNutt
//Code 2 Final
var allTheData;
var images = [];
var titles = [];
var geometries = [];
var materials = [];
var textGeo;
var textArray = [];
var hello = ["H", "E", "L", "L", "O"];
var randomNums = [0.004, 0.001, 0.006, 0.002, 0.005];


//GET FROM DOM
var pg1 = document.getElementById('pg1');
var pg1W = pg1.offsetWidth;
var pg1H = pg1.offsetHeight;

var pg2 = document.getElementById('pg2');
var pg2W = pg2.offsetWidth;
var pg2H = pg2.offsetHeight;

//Position Calculations
function posCalc(){
  var width = document.innerWidth;
  var colLength = width/3;
  pg2.appendChild()
}


//XMLHTTPRequest
var request;
request = new XMLHttpRequest();

request.open('GET', 'portfolio.json', true);

//LOAD JSON AND IMAGES
request.onload = function(event) {
  allTheData = JSON.parse(event.target.responseText);
  for (var i =0; i< allTheData.content.work.length; i++) {
    var theImage = allTheData.content.work[i].mainImage;
    var theTitle = allTheData.content.wotk[i].title;
    images.push(theImage);
    titles.push(theTitle);

  }
}
request.send();


//THREE JS 

//HELLO ANIMATION INIT
var HelloScene = new THREE.Scene();
var HelloCamera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
var HelloRenderer = new THREE.WebGLRenderer(); 
HelloRenderer.setSize(pg1W, pg1H);
pg1.appendChild(HelloRenderer.domElement);

//WORK ANIMATION INIT
var WorkScene = new THREE.Scene();
WorkScene.background = new THREE.Color(0xffffff);
var WorkCamera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000)
var WorkRenderer = new THREE.WebGLRenderer();
WorkRenderer.setSize(pg2W, pg2H);
pg2.appendChild(WorkRenderer.domElement);

//create the shapes
// function createS
//   for(var i = 0; i < images.length; i++) {
//     var geometry = new THREE.PlaneGeometry(1, 1, 1);
//     var material = new THREE.MeshBasicMaterial({color:0xffffff}, wireFrame = true);
//     // var material = new THREE.TextureLoader().load(images[i]);
//     // var cube = new THREE.Mesh(geometry, material);
//     // WorkScene.add(cube);
//     var x = i;
//     geometries.push(x);
//     materials.push(material);
//   }
function loadFont() {
 var loader = new THREE.FontLoader();
 loader.load('franklinGothic.json', function (res) {
   font = res;
   for (var i = 0; i < hello.length; i++) {
    var theText = hello[i];
    createText(theText, i); 
   }
   
 });
}

var textMaterial = new THREE.MeshBasicMaterial({color: 0xfef2f6});
var ambientLight = new THREE.AmbientLight(0xfef2f6, 1.0);
HelloScene.add(ambientLight);

  function createText(theText, i) {
    textGeo = new THREE.TextGeometry( theText, {
      font: font,
      size: 60,
      height: 20,
      curveSegments:4,
      weight: "normal",
      bevelThickness:.2,
      bevelSize:1.5,
      bevelSegments:20,
      bevelEnabled:true
    });
    textGeo.computeBoundingBox();
    textGeo.computeVertexNormals();
    var text = new THREE.Mesh(textGeo, material)

    text.position.x = (i *100);
    text.position.x -= window.innerWidth/7;

    // text.position.x = -textGeo.boundingBox.max.x/2;
    text.position.x += Math.random(0, 100);
    text.castShadow = true;
    HelloScene.add(text);
    textArray.push(text);
  }



var geometry = new THREE.PlaneGeometry(214.8, 150.0, 1);
var material = new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('images/frankenstien.jpg'), side:THREE.DoubleSide})
var cube = new THREE.Mesh(geometry, material);
cube.position.x = 20;

WorkScene.add(cube);


WorkCamera.position.z = 300;
HelloCamera.position.z = 200;

//GAME LOGIC
var update = function (){
  for (var i =0; i < textArray.length; i++) {
    var r =  randomNums[i];
    var theText = textArray[i];
    theText.rotation.y += r;
     theText.rotation.z += r;


  }

  cube.rotation.y += 0.004;
};

//DRAW SCENE
var render = function() {
  HelloRenderer.render(HelloScene, HelloCamera);
  WorkRenderer.render(WorkScene, WorkCamera);
}

//RUN GAME LOOP (update, render, repeat)
var GameLoop = function() {
  requestAnimationFrame(GameLoop);
    update();
    render();
};
loadFont();
GameLoop();

//CANVAS RESIZE








