class Bar {
    _x;
    _y;
    _width;
    _height;
    _color;
    _canvas;
    _ctx;
    constructor(x, y, width, height, color) {
        this._x = x;
        this._y = y;
        this._width = width;
        this._height = height;
        this._color = color;
        this._canvas = document.getElementById("canvas");
        this._ctx = this._canvas.getContext("2d");
    }
    draw() {
        this._ctx.beginPath();
        this._ctx.fillRect(this._x, this._y, this._width, this._height);
        this._ctx.fillStyle = this._color;

    }
}