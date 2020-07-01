"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var canvascomponent = /** @class */ (function () {
    function canvascomponent(elementName) {
        // this.mycanvas = document.querySelector(elementName) as HTMLCanvasElement
        this.mycanvas = document.querySelector(elementName);
        this.context = this.mycanvas.getContext("2d");
    }
    return canvascomponent;
}());
var snake = /** @class */ (function (_super) {
    __extends(snake, _super);
    function snake(elementName) {
        var _this = _super.call(this, elementName) || this;
        _this.bodypostion = new Array();
        _this.foodarr = new Array();
        _this.canvasheight = _this.mycanvas.clientHeight;
        _this.canvaswidth = _this.mycanvas.clientWidth;
        _this.bodypostion = [{ x: 6, y: 1 }, { x: 5, y: 1 }, { x: 4, y: 1 }, { x: 3, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 1 }];
        _this.defailtDr = 0;
        _this.timeout = 500;
        _this.createConstfood();
        _this.init();
        // this.rendersnake = this.rendersnake.bind(this)
        _this.rendersnake();
        // this.defailtmove = this.defailtmove.bind(this)
        _this.defailtmove();
        return _this;
    }
    snake.prototype.Func = function (e) {
        this.eat();
        var head = this.bodypostion[0];
        var newHead;
        switch (e.keyCode) {
            case 37:
            case 65:
                newHead = {
                    x: head.x - 1,
                    y: head.y
                };
                this.defailtDr = 65;
                this.movesnake(newHead);
                //left
                break;
            case 38:
            case 87:
                newHead = {
                    x: head.x,
                    y: head.y - 1
                };
                this.defailtDr = 87;
                this.movesnake(newHead);
                //up
                break;
            case 39:
            case 68:
                newHead = {
                    x: head.x + 1,
                    y: head.y
                };
                this.defailtDr = 68;
                this.movesnake(newHead);
                //right
                break;
            case 40:
            case 83:
                newHead = {
                    x: head.x,
                    y: head.y + 1
                };
                this.defailtDr = 83;
                this.movesnake(newHead);
                //down
                break;
        }
        this.rendersnake();
        if (this.touchself()) {
            alert('游戏失败');
            this.restart();
        }
    };
    snake.prototype.init = function () {
        document.addEventListener("keydown", this.Func.bind(this));
    };
    snake.prototype.gotScore = function () {
        return this.bodypostion.length - 3;
    };
    snake.prototype.touchself = function () {
        var head = this.bodypostion[0];
        var snakebody = this.bodypostion.slice(1);
        return snakebody.some(function (data) {
            return (data.x === head.x && data.y === head.y);
        }) || this.bodypostion.some(function (data) {
            return data.x === 160 || data.x === 0 || data.y === 0 || data.y === 120;
        });
    };
    snake.prototype.randomNewFood = function () {
        return {
            x: Math.floor(Math.random() * (this.canvaswidth / 5)),
            y: Math.floor(Math.random() * (this.canvasheight / 5))
        };
    };
    snake.prototype.createConstfood = function () {
        if (this.foodarr.length < 1) {
            var rd_1 = this.randomNewFood();
            if (!this.bodypostion.some(function (data) {
                return data.x === rd_1.x && data.y === rd_1.y;
            })) {
                this.foodarr.push(rd_1);
            }
            else {
                this.createConstfood();
            }
        }
    };
    snake.prototype.eat = function () {
        var head = this.bodypostion[0];
        if (this.foodarr[0].x === head.x && this.foodarr[0].y === head.y) {
            this.foodarr.splice(0, 1);
            this.createConstfood();
            this.growsnake();
            this.gotScore();
        }
    };
    snake.prototype.growsnake = function () {
        var snaketailOne = this.bodypostion[this.bodypostion.length - 1];
        var snaketailTwo = this.bodypostion[this.bodypostion.length - 2];
        var NewTail;
        if (snaketailOne.x - snaketailTwo.x === 0) {
            if (snaketailOne.y - snaketailOne.y === 1) {
                NewTail = {
                    x: snaketailOne.x,
                    y: snaketailOne.y + 1
                };
            }
            else {
                NewTail = {
                    x: snaketailOne.x,
                    y: snaketailTwo.y - 1
                };
            }
        }
        else {
            if (snaketailOne.y - snaketailOne.y === 1) {
                NewTail = {
                    x: snaketailOne.x + 1,
                    y: snaketailOne.y
                };
            }
            else {
                NewTail = {
                    x: snaketailTwo.x - 1,
                    y: snaketailOne.y
                };
            }
        }
        this.bodypostion.push(NewTail);
    };
    snake.prototype.defailtmove = function () {
        this.eat();
        var head = this.bodypostion[0];
        var newHead = {
            x: 0,
            y: 0
        };
        switch (this.defailtDr) {
            case 37:
            case 65:
                newHead = {
                    x: head.x - 1,
                    y: head.y
                };
                //left
                break;
            case 38:
            case 87:
                newHead = {
                    x: head.x,
                    y: head.y - 1
                };
                //up
                break;
            case 39:
            case 68:
                newHead = {
                    x: head.x + 1,
                    y: head.y
                };
                //right
                break;
            case 40:
            case 83:
                newHead = {
                    x: head.x,
                    y: head.y + 1
                };
                //down
                break;
            default:
                newHead = {
                    x: head.x + 1,
                    y: head.y
                };
                //right
                break;
        }
        this.movesnake(newHead);
        this.rendersnake();
        clearTimeout(this.defailtmove.bind(this));
        if (this.touchself()) {
            alert('游戏失败');
            this.restart();
        }
        if (this.gotScore() < 10) {
            setTimeout(this.defailtmove.bind(this), this.timeout - this.gotScore() * 40);
        }
        else {
            setTimeout(this.defailtmove.bind(this), 100);
        }
        // setInterval(this.defailtmove, 500)//500毫秒执行一次
        // window.requestAnimationFrame(this.defailtmove)
    };
    snake.prototype.movesnake = function (newhaed) {
        this.bodypostion.unshift(newhaed);
        this.bodypostion.pop();
    };
    snake.prototype.rendersnake = function () {
        var _this = this;
        this.context.clearRect(0, 0, this.canvaswidth, this.canvasheight);
        this.context.beginPath();
        this.context.fillStyle = "red";
        this.context.fillRect(5 * this.foodarr[0].x - 5, 5 * this.foodarr[0].y - 5, 5, 5);
        this.context.fillStyle = "#000";
        this.bodypostion.map(function (data, index) {
            if (index === 0) {
                _this.context.fillRect(5 * data.x - 5, 5 * data.y - 5, 5, 5);
            }
            else {
                _this.context.fillRect(5 * data.x - 4.5, 5 * data.y - 4.5, 4, 4);
            }
        });
        this.context.stroke();
    };
    snake.prototype.restart = function () {
        this.bodypostion = [{ x: 6, y: 1 }, { x: 5, y: 1 }, { x: 4, y: 1 }, { x: 3, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 1 }];
        this.defailtDr = 0;
        this.timeout = 500;
        this.defailtmove();
    };
    return snake;
}(canvascomponent));
window.onload = function () {
    var truesnake = new snake("#mycanvas");
};
