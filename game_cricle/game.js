class CircleGame {

    constructor(canvasId, scoreId, duration = 30) {
        this.canvas = document.getElementById(canvasId);
        this.scoreDisplay = document.getElementById(scoreId);
        this.timerDisplay = null;

        this.score = 0;
        this.timeLeft = duration;
        this.duration = duration;
        this.timerInterval = null;

        this.circle = new Circle(this.canvas);
        this.clickHandler = this.clickHandler.bind(this);
    }
    // xóa toàn bộ thông tin Ui trước khi vẽ
    start() {
        this.resetUI();
        this.circle.getRandomPosition();
        this.circle.draw();
        this.canvas.addEventListener('click', this.clickHandler);
        this.startTimer();
    }
    // đặt về thông tin mặc định khi bắt đầu
    resetUI() {
        this.score = 0;
        this.timeLeft = this.duration;
        this.scoreDisplay.textContent = this.score;

        if (!this.timerDisplay) {
            this.timerDisplay = document.createElement('p');
            this.timerDisplay.id = 'timer';
            this.timerDisplay.style.fontSize = '1.5rem';
            this.timerDisplay.style.margin = '10px 0';
            document.body.insertBefore(this.timerDisplay, this.canvas);
        }

    }
    // kiểm tra xem đã click trúng cricle chưa
    clickHandler(event) {
        if (this.timeLeft <= 0) return;
        const rect = this.canvas.getBoundingClientRect();
        const clickX = event.clientX - rect.left;
        const clickY = event.clientY - rect.top;
    // nếu trúng thì tăng điểm và vẽ lại cricle ngẫu nhiên
        if (this.circle.isClicked(clickX, clickY)) {
            this.score++;
            this.scoreDisplay.textContent = this.score;
            this.circle.getRandomPosition();
            this.circle.draw();
        }
    }
    //  bộ đếm giờ
    startTimer() {
        this.timerInterval = setInterval(() => {
            if (this.timeLeft <= 0) {
                clearInterval(this.timerInterval);
                this.timerDisplay.textContent = ` Hết giờ! Điểm: ${this.score}`;
                this.canvas.removeEventListener('click', this.clickHandler);
                this.showRestartButton();
                return;
            }
            this.timerDisplay.textContent = ` Thời gian còn lại: ${this.timeLeft}s`;
            this.timeLeft--;
        }, 1000);
    }
    // thêm nút chơi lại khi hết bộ đếm
    showRestartButton() {
        const btn = document.createElement('button');
        btn.id = 'restartBtn';
        btn.textContent = ' Chơi lại';
        btn.style.fontSize = '1rem';
        btn.style.marginTop = '10px';
        btn.onclick = () => this.start();
        document.body.appendChild(btn);
    }
}
const game = new CircleGame('gameCanvas', 'score');
game.start();