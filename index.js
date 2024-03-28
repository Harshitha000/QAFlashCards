var flashCards = [];
var randomFlashCards = [];
var isAns = 0;
var idx = 0;

var createForm = document.querySelector(".create-form");
var cardContainer = document.querySelector(".card-container");
var cardContent = document.querySelector(".card-content");
var flashCardElement = document.querySelector(".flashcard");
var prevBtn = document.getElementById("prev-btn");
var nextBtn = document.getElementById("next-btn");
var cardNum = document.getElementById("card-num");
var errorMessage = document.getElementById("error-message");

function addFlashCard() {
  var question = document.getElementById("question").value;
  var answer = document.getElementById("answer").value;

  if (!question || !answer) {
    errorMessage.style.display = "block";
  } else {
    errorMessage.style.display = "none";

    flashCards.push([question, answer]);

    document.getElementById("question").value = "";
    document.getElementById("answer").value = "";
  }
}

function createCardForm() {
  cardContainer.style.display = "none";
  createForm.style.display = "block";
  flashCards.length = 0;
}

function hideCreateForm() {
  createForm.style.display = "none";
}
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
function takeQuiz() {
  if (flashCards.length == 0) {
    alert("No questions, please enter!");
  } else {
    setInitialState();
  }
}
function setCardNum() {
  cardNum.innerHTML = `${idx + 1} / ${randomFlashCards.length}`;
}
function setInitialState() {
  createForm.style.display = "none";
  cardContainer.style.display = "block";
  randomFlashCards = shuffle(flashCards);
  setCardNum();
  isAns = 0;
  idx = 0;
  setPrevNextButtonState();
  cardContent.textContent = randomFlashCards[idx][0];
  setCardColor("red");
}

function setPrevNextButtonState() {
  idx <= 0 ? disablePrev() : enablePrev();
  idx >= randomFlashCards.length - 1 ? disableNext() : enableNext();
}

function enablePrev() {
  prevBtn.removeAttribute("disabled");
}

function disablePrev() {
  prevBtn.setAttribute("disabled", "True");
}

function enableNext() {
  nextBtn.removeAttribute("disabled");
}

function disableNext() {
  nextBtn.setAttribute("disabled", "True");
}

function setCardColor(color) {
  cardContent.style.color = color;
}

function nextAction() {
  if (idx < randomFlashCards.length - 1) {
    idx++;
    isAns = 0;
    cardContent.textContent = randomFlashCards[idx][0];
    setCardColor("red");
  }
  setPrevNextButtonState();
  setCardNum();
}
function prevAction() {
  if (idx > 0) {
    isAns = 0;
    idx--;
    cardContent.textContent = randomFlashCards[idx][0];
    setCardColor("red");
  }
  setPrevNextButtonState();
  setCardNum();
}

function toggleCard() {
  isAns = 1 - isAns;
  cardContent.textContent = randomFlashCards[idx][isAns];
  if (isAns == 0) setCardColor("red");
  else setCardColor("green");
}
