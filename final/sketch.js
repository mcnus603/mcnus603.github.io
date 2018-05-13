//Sarah McNutt
//Code 2 Final
var allTheData;
var images = [];
var DOMMainImages = [];
var titles = [];
var geometries = [];
var materials = [];
var textGeo;
var textArray = [];
var sections = ["home", "aWork", "about"];
var currentSection = "aWork";



window.onload = function() {
 sectionCheck();  
}

window.addEventListener('click', sectionCheck());


function sectionCheck () {
      //WHY IS MY SWITCH CASE NOT WORKING?
  drawContent(currentSection);
  //   if (currentSection == "home") {
  //   displayHomepage();
  //   loadMainImages();

  // }

  // if (currentSection == "aWork") {
  //   displayAPieceOfWork();
  // }
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
    // var theTitle = allTheData.content.wotk[i].title;
    images.push(theImage);

    // titles.push(theTitle);
  }
  loadMainImages();
}
request.send();


//STATE MACHINE
function drawContent() {
  switch(currentSection) {
    case 'home': 
      displayHomepage();
      break;
    case 'aWork':
      break;
    case 'about':
      break;
  }
}

function hideEl(el) {
  el.style.display = 'none';
}

function displayEl(el){
  el.style.display = 'block';
}

function aWorkClicked() {
}

function displayHomepage() {
  //HELLO 
  // displayHello(); 
  //WORK
  loadMainImages();
}

function displayHello() {
  //GET PG 1
  var pg1 = document.getElementById('pg1');
  displayEl(pg1);

  pg1.addEventListener("scroll", function(e) {
    console.log("a scroll");
  } );

  var pg1W = pg1.offsetWidth;
  var pg1H = pg1.offsetHeight;
  var hello = ["H", "E", "L", "L", "O"];
  var randomNums = [0.004, 0.001, 0.006, 0.002, 0.005];

  //Need some type of position calculation here for the hello
  //TKTK

  //HELLO ANIMATION INIT
  var HelloScene = new THREE.Scene();
  // HelloScene.background = new THREE.Color(0x000000);
  var HelloCamera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
  var HelloRenderer = new THREE.WebGLRenderer(); 
  HelloRenderer.setSize(pg1W, pg1H);
  pg1.appendChild(HelloRenderer.domElement);

  //LOAD FONT
  function loadFont() {
    var loader = new THREE.FontLoader();
    loader.load('helvetica.json', function (res) {
      font = res;
      for (var i = 0; i < hello.length; i++) {
        var theText = hello[i];
        createText(theText, i); 
      }
    });
  }
  //TEXT MATERIAL
  var textMaterial = new THREE.MeshPhongMaterial({color: 0xcc669c});
  materials = [
    new  THREE.MeshPhongMaterial ({color:0xf49f9f, flatShading:true}), //front
    new THREE.MeshPhongMaterial({color:0xefbdbd}) //side
  ]
  var ambientLight = new THREE.AmbientLight(0x000000, 5.0);
  var directionalLight = new THREE.DirectionalLight( 0xcc6464, 5 );
  var light = new THREE.DirectionalLight(0xc266cc, 3);
  
  // HelloScene.add(ambientLight);
  // HelloScene.add( directionalLight);
  // HelloScene.add( light);
  
  //CREATE TEXTGEOMETRY
  function createText(theText, i) {
    textGeo = new THREE.TextGeometry( theText, {
      font: font,
      size: 80,
      height: 10,
      curveSegments:20,
      weight: "normal",
      bevelThickness:.2,
      bevelSize:1.5,
      bevelSegments:20,
      bevelEnabled:true
    });
    textGeo.computeBoundingBox();
    // textGeo.computeVertexNormals();
    var text = new THREE.Mesh(textGeo, textMaterial)

    text.position.x = (i *100);
    text.position.x -= window.innerWidth/7;

    text.position.x += Math.random(0, 100);
    HelloScene.add(text);
    textArray.push(text);
  }
  //MOVE CAMERA
  HelloCamera.position.z = 200;

  //GAME LOGIC
  var update = function (){
    for (var i =0; i < textArray.length; i++) {
      var r =  randomNums[i];
      var theText = textArray[i];
      theText.rotation.y += r;
      theText.rotation.z += r;
    }
  };

  var render = function() {
    HelloRenderer.render(HelloScene, HelloCamera);
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

function displayWork() {
  //GET PG 2


  var pg2 = document.getElementById('pg2');
  displayEl(pg2);

  var pg2W = pg2.offsetWidth;
  var pg2H = pg2.offsetHeight;

  //Calculate the Position for the work
  function posCalc(){
    var width = document.innerWidth;
    var colLength = width/3;
  }

  //WORK ANIMATION INIT -- do I want to use THREE.JS here? 
  // var WorkScene = new THREE.Scene();
  // WorkScene.background = new THREE.Color(0xffffff);
  // var WorkCamera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000)
  // var WorkRenderer = new THREE.WebGLRenderer();
  // WorkRenderer.setSize(pg2W, pg2H);
  // pg2.appendChild(WorkRenderer.domElement);


  // WorkCamera.position.z = 300;
}


function displayAPieceOfWork() {
  document.body.style="background-color: blue";
}

function displayAboutPage() {
}


//CREATE MAIN IMAGES
//Why is this function not running
//then add event listners
function loadMainImages() {
var pg2 = document.getElementById('pg2');
  
  for (var i = 0; i < images.length; i++) {
    var anImage = document.createElement('img');
    anImage.setAttribute('src', images[i]);
    anImage.setAttribute('left', window.innerWidth);
    anImage.setAttribute('top', i*200);
    anImage.classList.add('mainImage');

    pg2.appendChild(anImage);
    DOMMainImages.push(anImage);
    anImage.addEventListener('click', function() {
      currentSection = "aWork";
      console.log("clicked");
    });
   
  }
}

// function displayMainImages() {
//   for(var i =0; i < DOMMainImages.length; i++) {
//     displayEl(DOMMainImages[i]);
//   }
// }

// function hideMainImages() {
//   for(var i =0; i < DOMMainImages.length; i++) {
//     hideEl(DOMMainImages[i]);
//   }
// }

