var year;
var beginDay = "0101";
var endDay = "1230";
var headlines;
var names= [];
var hits;
var pageNums;
var years = [];
var theData;
var url;
var container;
var counter = 0;
var articles;

function setup() {
noCanvas();
drawHeader();
container = createDiv(" ");
container.parent('content');
}

function draw() {
}

function drawHeader () {
	for (var i = 1958; i<= 2018; i++) {
		year = i;
		var el = createDiv(year); 
		years.push(el);
		el.parent('header');
		el.class('years');
	}
}

function yearCheck () {
	for (var i = 0; i < years.length; i++) {
		years[i].mousePressed(aYearWasClicked);
	}
}

function aYearWasClicked() {
	year = this.html();
	container.html(" ");
	url ="https://api.nytimes.com/svc/search/v2/articlesearch.json?begin_date="+year+beginDay+"&end_date="+year+endDay+"&q=Obituary&p="+counter"fl=type_of_material,headline,keywords,multimedia&api-key=fae3271db45140eeb2e5a90769781776"; 
	getTheData(url, gotData);
	console.log(url);
}

function getTheData() {
	loadJSON(url, populateArray);
}

function populateArray (data) {
	if (counter < 1) {
		theData = data;
		pageNums = hits/10;
		articles = data.response.docs;
	}


	for (var i = 0; i < articles.length; i++) {
		var numKeywords = articles[i].keywords.length;
		if(articles[i].type_of_material == 'Obituary' || articles[i].type_of_material == 'Obituary; Biography') {
			var head = articles[i].headline.main;
			container.html((head + "</br> <br/>"),  true);
		}
	}
}

function continueToLoad() {
	setTimeout (1000, gotData);
}

function gotData(data) {
	theData = data;

	if(counter < 1) {
		hits = data.response.meta.hits;
		pageNums = hits/10;
		articles = data.response.docs;
	} else {

	}
	for (var i = 0; i < articles.length; i++) {
		var numKeywords = articles[i].keywords.length;
		if(articles[i].type_of_material == 'Obituary' || articles[i].type_of_material == 'Obituary; Biography') {
			var head = articles[i].headline.main;
			container.html((head + "</br> <br/>"),  true);
		}
	}
}

function mousePressed () {
		yearCheck();
}

//IN CLASS NOTES

//loadJSON does 2 things: 
// - if you give it a web address, it does an HTML request
//if you give it a directoty addres, it gets something from the file system 


//HTML Request
//XMLHTTPRequest - js objects handles HTTP request

// - GET --> 
	// 404 - not found
	// 200 - success 

// - POST
// - PUT

//XML req --- events 

//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

//GAME
//low abstraction vs high abstraction 

//canvas -> p5 canvas -> canvas game library 
	// - collisions (what's hitting what? what's the response behavior)
	// - physical simulation (box2D)
	// - sprite (2D image that can be moved/scaled/rotated)
	// - frame-animation control/behavior (save animation information and give animation instructions)
	// (animation API) -  aplication programing interface (p5 tools)
		//anim.play()
		//anim.stop()
		//anim.go()
	//layers/tags 	











