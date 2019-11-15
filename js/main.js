class Animal {
  constructor(animalPicture, gesture, translation, choices) {
    this.animalPicture = animalPicture;
    this.gesture = gesture;
    this.translation = translation;
    this.choices = choices;
  }
}

class Choice {
  constructor(gesture, translation, correct) {
    this.gesture = gesture;
    this.translation = translation;
    this.correct = correct;
    this.solved = false;
  }
}


var animalImageElement = document.getElementById('animalImage');

var choiceGreen = new Choice('./video/grün.mp4','grün',true);
var choiceWollknaeul = new Choice('./video/wollknäuel.mp4','Wollknäuel',false);
var choiceWasser = new Choice('./video/wasser.mp4','Wasser',true);
var choiceSchaf = new Choice('./video/schaf.mp4','Schaf',false);
var choiceHuepfen = new Choice('./video/hüpfen.mp4','hüpfen',true);
var choiceMaus = new Choice('./video/mouse.mp4','Maus',false);
var choiceKrokodil = new Choice('./video/crocodile.mp4','Krokodil',false);






var frosch = new Animal('./img/frosch.png', './video/frosch.mp4', 'Frosch', [
  choiceGreen,choiceWollknaeul,choiceWasser,choiceSchaf,choiceHuepfen,choiceMaus,choiceKrokodil
]);
var currentAnimal;
var currentChoice;
var currentBubbleElement;
var bubbleMapping;
var numSolved;

var numBubbles = 5;

/**
 * Randomize array element order in-place.
 * Using Durstenfeld shuffle algorithm.
 */
function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

function setPlayField(animal) {
  numSolved = 0;

  currentAnimal = animal;
  shuffleArray(currentAnimal.choices);

  animalImageElement.src = currentAnimal.animalPicture;
}

setPlayField(frosch);

function initializeBubbles() {
  // we will need this later on to swap choices in bubbles
  bubbleMapping = [];
  bubbleMapping[0] = 0;
  bubbleMapping[1] = 1;
  bubbleMapping[2] = 2;
  bubbleMapping[3] = 3;
  bubbleMapping[4] = 4;

}

initializeBubbles();

function resetModal(){
  let choicesElement = document.getElementById('choices');
  let player = document.getElementById('player');
  let feedbackElement = document.getElementById('feedback');
  let translationElement = document.getElementById('translation');

  player.style.display='block'
  choicesElement.style.display='none'
  feedbackElement.style.display='none'
  translationElement.innerText = '';
}

function question(torf) {
  let choicesElement = document.getElementById('choices');
  let feedbackElement = document.getElementById('feedback');
  let translationElement = document.getElementById('translation');
  let successElement = document.getElementById('success');
  let failElement = document.getElementById('fail');

  choicesElement.style.display = 'none';
  feedbackElement.style.display = 'block';
  translationElement.textContent = currentChoice.translation;

  currentBubbleElement.classList.remove('choiceBubbleEmpty');
  currentBubbleElement.classList.remove('choiceBubbleSuccess');
  currentBubbleElement.classList.remove('choiceBubbleFailure');

  if (currentChoice.correct === torf) {
    currentChoice.solved = true;
    numSolved += 1;
    successElement.style.display = 'block'
    failElement.style.display = 'none'
    currentBubbleElement.classList.add('choiceBubbleSuccess');

    if (numSolved == numBubbles) {
      alert('Glückwunsch! Alle Blasen sind gelöst!')
    }
  } else {
    failElement.style.display = 'block'
    successElement.style.display = 'none'
    currentBubbleElement.classList.add('choiceBubbleFailure');
  }
}

function animalClick() {
  resetModal();
  let translationElement = document.getElementById('translation');

  document.getElementById('videomodal').style.display = 'block';
  let player = videojs('player');
  player.src(currentAnimal.gesture);
  player.muted(true);
  player.play();
  translationElement.textContent = currentAnimal.translation;
}


function choiceClick(bubbleId, bubbleElement) {
  resetModal();
  let playerElement = document.getElementById('player');
  let choicesElement = document.getElementById('choices');
  let translationElement = document.getElementById('translation');
  let player = videojs('player');

  let choiceId = bubbleMapping[bubbleId];

  currentChoice = currentAnimal.choices[choiceId];
  currentBubbleElement = bubbleElement;

  player.src(currentChoice.gesture);
  document.getElementById('videomodal').style.display = 'block';
  player.muted(true);
  player.play();
  if (currentChoice.solved) {
    translationElement.textContent = currentChoice.translation;
  }
  else {
    player.one('ended', function () {
      playerElement.style.display = 'none';
      choicesElement.style.display = 'block';
    });
  }
}



