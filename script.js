let timerInterval;
let elapsedTime = 0;
let running = false;

const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');

function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}

function updateDisplay() {
  timerDisplay.textContent = formatTime(elapsedTime);
}

function startTimer() {
  if (!running) {
    running = true;
    const startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      updateDisplay();
    }, 100);
    startBtn.disabled = true;
    pauseBtn.disabled = false;
  }
}

function pauseTimer() {
  if (running) {
    running = false;
    clearInterval(timerInterval);
    startBtn.disabled = false;
    pauseBtn.disabled = true;
  }
}

function resetTimer() {
  running = false;
  clearInterval(timerInterval);
  elapsedTime = 0;
  updateDisplay();
  startBtn.disabled = false;
  pauseBtn.disabled = true;
}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);

// Init
updateDisplay();
pauseBtn.disabled = true;
