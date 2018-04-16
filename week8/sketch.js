// code 2
// spring 2018
// sarah mcnutt
// API homework
// var nounUrl1 = "http://api.wordnik.com:80/v4/word.json/";
// var word = "great";
// var nounUrl2 = "/relatedWords?useCanonical=false&limitPerRelationshipType=10&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5"; 

var noun1Url = "http://api.wordnik.com:80/v4/words.json/randomWord?hasDictionaryDef=true&includePartOfSpeech=noun&minCorpusCount=0&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=-1&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5";
var noun2Url = "http://api.wordnik.com:80/v4/words.json/randomWord?hasDictionaryDef=true&includePartOfSpeech=noun&minCorpusCount=0&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=-1&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5";
var verbUrl = "http://api.wordnik.com:80/v4/words.json/randomWord?hasDictionaryDef=false&includePartOfSpeech=verb&minCorpusCount=0&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=-1&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5";
var adjUrl = "http://api.wordnik.com:80/v4/words.json/randomWord?hasDictionaryDef=false&includePartOfSpeech=adjective&minCorpusCount=0&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=-1&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5";

var noun1;
var verb; 
var adj;
var noun2;

function preload() {

   askWordnik(); 
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  background(0);
  drawText();
}

function draw() {
}

function askWordnik() {
  loadJSON(noun1Url, gotNoun1);
  loadJSON(verbUrl, gotVerb); 
  loadJSON(adjUrl, gotAdj);
  loadJSON(noun2Url, gotNoun2);
  background(0);
  drawText();
}

function gotNoun1 (data) {
  

  var upperNoun = capitalizeFirstLetter(data.word);
  noun1 = upperNoun;

}

function gotVerb(data) {
  verb = data.word;
}

function gotAdj (data) {
  adj = data.word;
}

function gotNoun2 (data) {
  noun2 = data.word;
}

function drawText() {
  
  var theSentence = noun1 + " " + verb + " " + adj + " " + noun2 + ".";
  fill(255);
  rectMode(CENTER);
  textAlign(CENTER);
  textSize(50);
  text(theSentence, window.innerWidth/2, window.innerHeight/2);

  textSize(15);
  text("click for more sentences", window.innerWidth/2, 5 * (window.innerHeight/6));
}

function mousePressed() {
  askWordnik();
}

function capitalizeFirstLetter(theWord) {
  return theWord.charAt(0).toUpperCase() + theWord.slice(1);
}









