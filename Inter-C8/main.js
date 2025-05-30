let secretNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;
const maxAttempts = 10;
const guessHistory = [];
const guessInput = document.getElementById('guessInput');
const guessButton = document.getElementById('guessButton');
const message = document.getElementById('message');
const attemptsDisplay = document.getElementById('attempts');
const historyList = document.getElementById('historyList');
const resetButton = document.getElementById('resetButton');

function resetGame() {
  secretNumber = Math.floor(Math.random() * 100) + 1;
  attempts = 0;
  guessHistory.length = 0;
  message.textContent = '';
  attemptsDisplay.textContent = `Intentos: ${attempts}`;
  guessInput.disabled = false;
  guessButton.disabled = false;
  historyList.innerHTML = '';
  guessInput.focus();
  message.style.color = 'inherit';
}

function updateHistory(guess) {
  guessHistory.push(guess);
  const li = document.createElement('li');
  li.textContent = `Intento ${attempts}: ${guess}`;
  historyList.appendChild(li);
}

function checkGuess() {
  const userGuess = parseInt(guessInput.value);
  if (isNaN(userGuess)) {
    message.textContent = 'Por favor, introduce un número válido.';
    return;
  }
  if (userGuess < 1 || userGuess > 100) {
    message.textContent = 'El número debe estar entre 1 y 100.';
    return;
  }
  attempts++;
  attemptsDisplay.textContent = `Intentos: ${attempts}`;
  updateHistory(userGuess);
  if (userGuess === secretNumber) {
    message.textContent = `¡Felicidades! Adivinaste el número en ${attempts} intentos.`;
    message.style.color = 'green';
    guessInput.disabled = true;
    guessButton.disabled = true;
  } else if (attempts >= maxAttempts) {
    message.textContent = `¡Game Over! El número era ${secretNumber}.`;
    message.style.color = 'red';
    guessInput.disabled = true;
    guessButton.disabled = true;
  } else if (userGuess < secretNumber) {
    message.textContent = 'El número es mayor. ¡Intenta de nuevo!';
    message.style.color = 'red';
  } else {
    message.textContent = 'El número es menor. ¡Intenta de nuevo!';
    message.style.color = 'red';
  }
  guessInput.value = '';
  guessInput.focus();
}

guessButton.addEventListener('click', checkGuess);
guessInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    checkGuess();
  }
});
resetButton.addEventListener('click', resetGame);
resetGame();