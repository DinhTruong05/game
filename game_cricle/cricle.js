class Circle {
    constructor(canvas, minRadius = 20, maxRadius = 50) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.minRadius = minRadius;
        this.maxRadius = maxRadius;
        this.x = 0;
        this.y = 0;
        this.radius = 30;
    }
    // vẽ hình tròn có radius và vị trí ngẫu nhiên
    getRandomPosition() {
        this.radius = Math.random() * (this.maxRadius - this.minRadius) + this.minRadius;
        this.x = Math.random() * (this.canvas.width - 2 * this.radius) + this.radius;
        this.y = Math.random() * (this.canvas.height - 2 * this.radius) + this.radius;
    }
    // vẽ hình tròn trong canvas
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        const randomColor = `#${Math.floor(Math.random()*16777215).toString(16)}`
        this.ctx.fillStyle =randomColor;
        this.ctx.fill();
        this.ctx.closePath();
    }
    // kiểm tra xem đã click vào trong bán kính hình tròn hay chưa
    isClicked(clickX, clickY) {
        const dx = clickX - this.x;
        const dy = clickY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance <= this.radius;
    }
}
