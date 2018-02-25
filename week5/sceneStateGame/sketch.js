// code 2
// spring 2018
// sarah mcnutt

// week 5
// pong with all colliders

var sceneState = {
  START: 0,
  LEVEL1: 1,
  REGULAR: 2,
  LEVEL2 : 3,
  TELEPORT: 4,
  LEVEL2: 5,
  VERTICAL: 6,
  FINISH: 7,
};


var currentState = sceneState.START;

var ball;
var p1, p2;
var p1Score = 0;
var p2Score = 0;
var p1Up = false;
var p1Down = false;
var p2Up = false;
var p2Down = false;
var margin = 20;
var cnv;
var paddleBounceSFX, hitColliderSFX;
var colliders = [];

var Timer;
var nextState = false;
var playingGame =  false;




function preload() {
}

function centerCanvas() {
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);
}

function windowResized() {
  centerCanvas();
}

function setup() {
  paddleBounceSFX = loadSound('assets/ballCollide.mp3', function() { console.log("loaded"); });
  hitColliderSFX = loadSound('assets/hitCollider.mp3', function() { console.log("loaded"); });
  cnv = createCanvas(900, 500);
  centerCanvas();
  ball = new Ball();
  p1 = new Paddle(0);
  p2 = new Paddle(1);
}

function draw() {
  // console.log(currentState);

  // Timer = mills();
  Timer =  millis();
  // console.log(Timer);
  console.log(currentState);
  console.log(playingGame);
  changeStates();
  drawScene(currentState);
  checkTransitions(currentState);
  nextState = false;

  if(playingGame == true) {
   background(0);
   drawField();
   p1.move(p1Up, p1Down);
   p2.move(p2Up, p2Down);

   ball.update();
   p1.update();
   p2.update();
   for (var i = 0; i < colliders.length; i++) {
    colliders[i].update();
  }

  p1.display();
  p2.display();

  for (var i = 0; i < colliders.length; i++) {
    colliders[i].display();
  }

  ball.display(); 

  checkCollisionWithBall(ball, p1);
  checkCollisionWithBall(ball, p2);

  for (var i = 0; i < colliders.length; i++) {
    checkCollisionWithBall(ball, colliders[i]);
  }
} 

}


function drawField() {
  stroke(255);
  noFill();
  line(0, margin, width, margin);
  line(0, height - margin, width, height - margin);
  for (var i = margin; i < height - margin - 15; i += 35) {
    var start = i;
    var finish = start + 15;
    line(width/2, start, width/2, finish);
  }

  fill(255);
  noStroke();
  textSize(64);
  textAlign(CENTER, CENTER);
  text(p1Score, width/2-50, 70);
  text(p2Score, width/2+50, 70);
}

function checkCollisionWithBall(ball, other) {
  if (ball.pos.x + ball.width/2 > other.pos.x && 
    ball.pos.x + ball.width/2 < other.pos.x + other.width && 
    ball.pos.y + ball.height/2 > other.pos.y &&
    ball.pos.y + ball.height/2 < other.pos.y + other.height) {
    ball.collided(other);
  other.collided(ball);
}
}

function Ball() {
  this.pos = createVector(width/2, height/2);
  this.vel = createVector(0, 0);
  this.angle = random(TWO_PI);
  this.speed = 7;
  this.vel.x = cos(this.angle) * this.speed;
  this.vel.y = sin(this.angle) * this.speed;
  this.width = 15;
  this.height = 15;

  this.update = function() {
    if (this.pos.x < -this.width) {
      p2Score++;
      this.resetAfterPoint(0);
    } else if (this.pos.x > width) {
      p1Score++;
      this.resetAfterPoint(1);
    }

    if (this.pos.y < margin || 
      this.pos.y > height - margin - this.height) {
      this.vel.y *= -1;
  }

  this.pos.add(this.vel);
};

this.display = function() {
  noStroke();
  fill(255);
  rectMode(CORNER);
  rect(this.pos.x, this.pos.y, this.width, this.height);
}

this.resetAfterPoint = function(whichPlayer) {
  this.pos = createVector(width/2, height/2);
  this.vel = createVector(0, 0);
  this.speed = 7;
  if (whichPlayer === 1) {
    this.getStartingAngle(4 * PI/6, 8 * PI/6);
  } else if (whichPlayer === 0) {
    this.getStartingAngle(-PI/3, PI/3);
  }
}

this.getStartingAngle = function(angleLow, angleHigh) {  
  var angle = random(angleLow, angleHigh);
  this.vel.x = cos(angle) * this.speed;
  this.vel.y = sin(angle) * this.speed;
}

this.collided = function(other) {

}
};

function Paddle(num) {
  this.num = num;
  this.width = 15;
  this.height = 80;
  if (num == 0) {
    this.pos = createVector(margin, height/2);
  } else {
    this.pos = createVector(width-this.width-margin, height/2);
  }
  this.vel = createVector(0, 0);

  this.update = function() {
    this.pos.add(this.vel);
  }

  this.display = function() {
    noStroke();
    fill(255);
    rectMode(CORNER);
    rect(this.pos.x, this.pos.y, this.width, this.height);
  }

  this.move = function(up, down) {
    this.vel.y = 0;
    if (up) {
      if (this.pos.y > margin) {
        this.vel.y = -5;
      } else {
        this.pos.y = margin;
      } 
    }
    if (down) {
      if (this.pos.y + this.height < height - margin) {
        this.vel.y = 5;
      } else {
        this.pos.y = height - this.height - margin;
      }
    } 
  }

  this.collided = function(other) {
    var diff = (other.pos.y + other.height/2) - this.pos.y;
    if (this.num === 0) {
      angle = map(diff, 0, this.height, -PI/3, PI/3);
    }
    if (this.num === 1) {
      angle = map(diff, this.height, 0, 4*PI/6, 8*PI/6);
    }
    other.speed += 1;
    other.vel.x = cos(angle) * other.speed;
    other.vel.y = sin(angle) * other.speed;
    paddleBounceSFX.play();
  }
}

function changeStates () {
  if (currentState == 2) {
    if(p1Score > 3 || p2Score > 3){
      nextState = true;
    }
  }
}

//ADDING NEW COLLIDERS
//THIS IS HOW I COULD ADD/CREATE THE DIFFERENT LEVELS

function keyPressed() {
 if(currentState == 0 || currentState == 1) {
  nextState = true;
}
if (key === ' ') {
  switch (floor(random(9))) {
    case 0:
    colliders.push(new Bryan());
    break;
    case 1:
    colliders.push(new Yizhou());
    break;
    case 2:
    colliders.push(new Ellie());
    break;
    case 3:
    colliders.push(new Yanwen());
    break;
    case 4:
    colliders.push(new MaddyRed());
    colliders.push(new MaddyGreen());
    colliders.push(new MaddyBlue());
    break;
    case 5:
    colliders.push(new AlyssaForrest());
    break;
    case 6:
    colliders.push(new Sarah());
    break;
    case 7:
    colliders.push(new Jackie());
    break;
    case 8:
    colliders,push(new Cat());
    break;
  }
}

if (key === 'W') {
  p1Up = true;
}
if (key === 'S') {
  p1Down = true;
}

if (keyCode === UP_ARROW) {
  p2Up = true;
}
if (keyCode === DOWN_ARROW) {
  p2Down = true;
}
}

function keyReleased() {
  if (key === 'W') {
    p1Up = false;
  }
  if (key === 'S') {
    p1Down = false;
  }

  if (keyCode === UP_ARROW) {
    p2Up = false;
  }
  if (keyCode === DOWN_ARROW) {
    p2Down = false;
  }
}

//WHAT EACH STATE LOOKS LIKE
function drawScene(whichScene) {
  switch(currentState) {
  //START
  case sceneState.START:
  playingGame = false;
  Timer = 0;
  background(200, 30, 10); 
  textSize(80);
  textAlign(CENTER, CENTER);
  text("START GAME", width/2, height/2);
  textSize(40);
  text("press any key to continue", width/2, height-200);
  break;
//LEVEL 1
case sceneState.LEVEL1: 
playingGame = false;
background(20, 200, 10); 
textSize(80);
textAlign(CENTER, CENTER);
text("LEVEL 1", width/2, height/2);
textSize(40);
text("use up and down arrows and", width/2, height-200);
text("use 'W' and 'S' keys to play", width/2, height-150);
text("press any key to continue", width/2, height-50);
break;

//REGULAR
case sceneState.REGULAR: 
playingGame = true;
break;

//LEVEL2
case sceneState.LEVEL2:
playingGame = false;
background(20, 200, 10); 
textSize(80);
textAlign(CENTER, CENTER);
text("LEVEL 2", width/2, height/2);
textSize(40);
// text("use up and down arrows and", width/2, height-200);
// text("use 'W' and 'S' keys to play", width/2, height-150);
// text("press any key to continue", width/2, height-50);
break;
//TELEPORT
case sceneState.TELEPORT:
playingGame = true;
break;
//LEVEL 3
case sceneState.LEVEL3:
playingGame = false;
break;
//VERTICAL
case  sceneState.VERTICAL:
playingGame = true;
Timer = 0;
background(20, 30, 100); 
textSize(80);
textAlign(CENTER, CENTER);
textAlign("LEVEL 2", width/2, height/2);
break;
//FINISH
case sceneState.FINISH:
playingGame = false;
Timer = 0;
background(10, 100, 100); 
textSize(80);
textAlign(CENTER, CENTER);
textAlign("END GAME", width/2, height/2);
break;
default:
break;
}
}

//DO I NEED TO TRANSITION STATES?
function checkTransitions(whichScene) {
  switch (whichScene) {
    case sceneState.START:
    if (nextState) {
      currentState++;
      setUpScene(currentState);
    }
    break;
    case sceneState.LEVEL1:
    if(nextState) {
      currentState++;
      setUpScene(currentState);
    }
    break;
    case sceneState.REGULAR:
    if (nextState) {
      currentState++;
      setUpScene(currentState);
    }
    break;
    case sceneState.LEVEL2:
    if(nextState) {
      currentState++;
      setUpScene(currentState);
    }
    break;
    case sceneState.TELEPORT: 
    if(nextState) {
      currentState++;
      setUpScene(currentState);
    }
    break;
    case sceneState.LEVEL3:
    if(nextState) {
      currentState++;
      setUpScene(currentState);
    }
    break;
    case sceneState.VERTICAL:
    if (nextState) {
      currentState++;
      setUpScene(currentState);
    }
    break;
    case sceneState.FINISH: 
    currentState = sceneState.FINISH;
    setUpScene(currentState);
    break;
    default:
    break;
  }
}

function setUpScene(whichScene) {
  switch(whichScene){
    case sceneState.START: 
    break;
    case sceneState.LEVEL1:
    break;
    case sceneState.REGULAR:
    break;
    case sceneState.LEVEL2:
    break;
    case sceneState.TELEPORT:
    break;
    case sceneState.LEVEL3:
    break;
    case sceneState.VERTICAL:
    break

    case sceneState.FINISH:
    break;
    default:
    break;
  }
}


//if someone has scored 3 points, transition to level 1; 




