// script.js

// Array with pairs of cards (can be emojis or numbers)
//const cardsArray = ['🍎', '🍌', '🍇', '🍓', '🍎', '🍌', '🍇', '🍓'];
const baseCardsArray = ['🍎', '🍌', '🍇', '🍓', '🍉', '🍒', '🥝', '🍍', '🥥', '🍐', '🍑', '🍊'];

// Board element
const gameBoard = document.getElementById('game-board');
const numCardsInput = document.getElementById('num-cards');
const startGameButton = document.getElementById('start-game');
const difficultySelect = document.getElementById('difficulty');

// Global variable for cards in play
let currentCardsArray = [];
// Variable to count flipped cards
let flippedCards = [];
// Variable to count user attempts
let attempts = 0;

// Shuffle the cards
function shuffle(array) {
  return array.sort(() => 0.5 - Math.random());
}

// Generates the board
function createBoard(cards) {
  gameBoard.innerHTML = ''; // Clean the board
  const shuffledCards = shuffle(cards);
  shuffledCards.forEach((card) => {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.dataset.cardValue = card; // Saves the value of the card
    cardElement.addEventListener('click', flipCard); // Click event
    gameBoard.appendChild(cardElement);
  });
}

// Handler for flipping cards
function flipCard(event) {
  const clickedCard = event.target;

  // Ignore clicks if already flipped or if there are 2 flipped cards
  if (clickedCard.classList.contains('flipped') || flippedCards.length >= 2) {
    //console.log("ERROR: 2 cards are already flipped over");
    return;
  }
    // Flip the card
    clickedCard.classList.add('flipped');
    
    // The data-card-value will be updated every time a card is flipped, showing the emoji on the back with the animation applied
    clickedCard.setAttribute('data-card-value', clickedCard.dataset.cardValue); // Show the value of the card (on the back)

  // Add the flipped card to the array
  flippedCards.push(clickedCard);

  // Add attempt to counter
  attempts++;
  //console.log(`Number of attempts: ${attempts}`);

  // If two cards are flipped over, check for a match
  if (flippedCards.length === 2) {
    setTimeout(checkForMatch, 1000); // Wait a second before checking
  }
}

// Verify if the cards match
function checkForMatch() {
  const [card1, card2] = flippedCards;

  // If they match, leave them upside down and clean the array
  if (card1.dataset.cardValue === card2.dataset.cardValue) {
    //console.log(`You have obtained the pair ${card1.dataset.cardValue}`);
  } else {
    // If they do not match, flip them over again
    card1.classList.remove('flipped');
    card2.classList.remove('flipped');
  }

  // Clean the array
  flippedCards = [];
}

// Configure the game according to the number of cards
function setupGame(numCards) {
  const totalPairs = Math.floor(numCards / 2);
  currentCardsArray = baseCardsArray.slice(0, totalPairs).concat(baseCardsArray.slice(0, totalPairs));
  createBoard(currentCardsArray);
}

// Handles start events
startGameButton.addEventListener('click', () => {
  const numCards = parseInt(numCardsInput.value) || 8; // Default value: 8 cards
  setupGame(numCards);
});

// Manage difficulty levels
difficultySelect.addEventListener('change', (event) => {
  const difficulty = event.target.value;
  let numCards;
  switch (difficulty) {
    case 'easy':
      numCards = 8;
      break;
    case 'medium':
      numCards = 16;
      break;
    case 'hard':
      numCards = 24;
      break;
    default:
      numCards = 8;
  }
  setupGame(numCards);
});