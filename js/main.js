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
var choiceWollknaeul= new Choice('./video/wollknäuel.mp4','Wollknäuel',false);
var choiceWasser= new Choice('./video/wasser.mp4','Wasser',true);
var choiceSchaf= new Choice('./video/schaf.mp4','Schaf',false);
var choiceHuepfen= new Choice('./video/hüpfen.mp4','hüpfen',true);






var frosch = new Animal('./img/frosch.png', './video/frosch.mp4', 'Frosch', [
  choiceGreen,choiceWollknaeul,choiceWasser,choiceSchaf,choiceHuepfen
]);
var currentAnimal;
var currentChoice;
var currentBubbleElement;

function setPlayField(animal) {
  currentAnimal = animal;

  animalImageElement.src = currentAnimal.animalPicture;
}

setPlayField(frosch);



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
    successElement.style.display = 'block'
    failElement.style.display = 'none'
    currentBubbleElement.classList.add('choiceBubbleSuccess');
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

  currentChoice = currentAnimal.choices[bubbleId];
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
