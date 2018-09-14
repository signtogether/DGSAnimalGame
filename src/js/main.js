class Animal {
  constructor(animalPicture, gesture, choices) {
    this.animalPicture = animalPicture;
    this.gesture = gesture;
    this.choices = choices;
  }
}

class Choice {
  constructor(gesture, correct) {
    this.gesture = gesture;
    this.correct = correct;
  }
}


var animalImageElement = document.getElementById('animalImage');


var

var frosch = new Animal('img/frosch.png', 'video/frosch.mp4', [
  new Choice('video/frosch.mp4', true)
]);
var currentAnimal;
var currentChoice;

function setPlayField(animal) {
  currentAnimal = animal;

  animalImageElement.src = currentAnimal.animalPicture;
}

setPlayField(frosch);



function resetModal(){
  let choicesElement = document.getElementById('choices');
  let player = document.getElementById('player');
  let feedbackElement = document.getElementById('feedback');

  player.style.display='block'
  choicesElement.style.display='none'
  feedbackElement.style.display='none'
}

function question(torf) {
  let choicesElement = document.getElementById('choices');
  let feedbackElement = document.getElementById('feedback');
  let successElement = document.getElementById('success');
  let failElement = document.getElementById('fail');

  choicesElement.style.display = 'none';
  feedbackElement.style.display = 'block';

  if (currentChoice.correct === torf) {
    successElement.style.display = 'block'
    failElement.style.display = 'none'
  } else {
    failElement.style.display = 'block'
    successElement.style.display = 'none'
  }
}

function animalClick() {
  resetModal();
  document.getElementById('videomodal').style.display = 'block';
  let player = videojs('player');
  player.src(currentAnimal.gesture);
  player.muted(true);
  player.play();
}


function choiceClick(bubbleId) {
  resetModal();
  let playerElement = document.getElementById('player');
  let choicesElement = document.getElementById('choices');
  let player = videojs('player');

  currentChoice = currentAnimal.choices[bubbleId];

  player.src(currentChoice.gesture);
  document.getElementById('videomodal').style.display = 'block';
  player.muted(true);
  player.play();
  player.one('ended', function() {
    playerElement.style.display = 'none';
    choicesElement.style.display = 'block';
  });
}
