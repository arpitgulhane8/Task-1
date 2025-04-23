let firstCard = null;
let secondCard = null;
let lockBoard = false;

function startGame() {
  const countInput = document.getElementById('cardCount');
  const count = parseInt(countInput.value);
  const grid = document.getElementById('cardGrid');

  if (count % 2 !== 0 || count < 4 || count > 100) {
    alert("Please enter an even number between 4 and 100.");
    return;
  }

  // Generate pairs
  const values = [];
  for (let i = 1; i <= count / 2; i++) {
    const val = Math.floor(Math.random() * 100) + 1;
    values.push(val, val);
  }

  // Shuffle
  values.sort(() => Math.random() - 0.5);

  grid.innerHTML = '';
  values.forEach((value, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.value = value;
    card.dataset.index = index;
    card.addEventListener('click', flipCard);
    grid.appendChild(card);
  });
}

function flipCard() {
  if (lockBoard || this.classList.contains('flipped') || this.classList.contains('matched')) return;

  this.classList.add('flipped');
  this.textContent = this.dataset.value;

  if (!firstCard) {
    firstCard = this;
  } else {
    secondCard = this;
    lockBoard = true;

    if (firstCard.dataset.value === secondCard.dataset.value) {
      firstCard.classList.add('matched');
      secondCard.classList.add('matched');
      resetTurn();
      checkGameEnd();
    } else {
      setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        firstCard.textContent = '';
        secondCard.textContent = '';
        resetTurn();
      }, 1000);
    }
  }
}

function resetTurn() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}

function checkGameEnd() {
  const allCards = document.querySelectorAll('.card');
  const matchedCards = document.querySelectorAll('.card.matched');
  if (allCards.length === matchedCards.length) {
    setTimeout(() => {
      alert("Congratulations! You've matched all the cards!");
    }, 500);
  }
    }
