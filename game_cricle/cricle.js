const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.getElementById('score');

let score = 0;
let timeLeft = 30; // thời gian chơi 30 giây
let circle = {
    x: 100,
    y: 100,
    radius: 30
};

function getRandomPosition() {
    circle.radius = Math.random() * (50 - 20) + 20;
    circle.x = Math.random() * (canvas.width - 2 * circle.radius) + circle.radius;
    circle.y = Math.random() * (canvas.height - 2 * circle.radius) + circle.radius;
}

function drawCircle() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
}

function updateScore() {
    score++;
    scoreDisplay.textContent = score;
}

function clickHandler(event) {
    if (timeLeft <= 0) return; // hết giờ thì không nhận click

    const rect = canvas.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;

    const dx = clickX - circle.x;
    const dy = clickY - circle.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance <= circle.radius) {
        updateScore();
        getRandomPosition();
        drawCircle();
    }
}

function startTimer() {
    const timerDisplay = document.createElement('p');
    timerDisplay.id = 'timer';
    timerDisplay.style.fontSize = '1.5rem';
    timerDisplay.style.margin = '10px 0';
    document.body.insertBefore(timerDisplay, canvas);

    const timerInterval = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timerDisplay.textContent = `⏰ Time's up! Final score: ${score}`;
            canvas.removeEventListener('click', clickHandler);
            return;
        }
        timerDisplay.textContent = `Time left: ${timeLeft}s`;
        timeLeft--;
    }, 1000);
}

function init() {
    getRandomPosition();
    drawCircle();
    canvas.addEventListener('click', clickHandler);
    startTimer();
}

init();
