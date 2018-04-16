var year;
var beginDay = "0101";
var endDay = "1230";
var headlines;
var names= [];
var images;
var hits;
var pageNums;
var years = [];
var theData;
var url;
var container;

function setup() {
noCanvas();
drawHeader();
container = createDiv(" ");
container.parent('content');
}

function draw() {
	yearCheck();
}

function drawHeader () {
	for (var i = 1918; i<= 2018; i++) {
		var year = i;
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
	var newYear = this.html();
	console.log(newYear);
	year = newYear;
	container.html(" ");
	url ="https://api.nytimes.com/svc/search/v2/articlesearch.json?begin_date="+year+beginDay+"&end_date="+year+endDay+"&q=Obituary&fl=type_of_material,headline,keywords,multimedia&api-key=fae3271db45140eeb2e5a90769781776"; 
	getTheData(url, gotData);
}

function getTheData() {
	loadJSON(url, gotData);
}


function gotData(data) {
	theData = data;
	var articles = data.response.docs;
	hits = data.response.meta.hits;
	pageNums = hits/10;


//POPULATE NAME ARRAY
	for (var i = 0; i < articles.length; i++) {
		var numKeywords = articles[i].keywords.length;
		// var numPhotos = articles[i].multimedia
		for (var j = 0; j < numKeywords; j++) {
			if (articles[i].keywords[j].name == 'persons') {
			 var name = articles[i].keywords[j].value
			 names.push(name);
			 // name += "\r"
			 container.html((name + "</br>"),  true);
			}
		}
	}
}

//HOW TO DO THIS
//create container div with scrolling thing and then change html when you change the year


//Other things to do when did climate change, enviornment, plastic words like this start being used in the NYT

