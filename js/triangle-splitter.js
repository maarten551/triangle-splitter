/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class PixelPosition {
    constructor(y, x) {
        this.y = y;
        this.x = x;
    }
}
exports.PixelPosition = PixelPosition;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const PixelPosition_1 = __webpack_require__(0);
class Canvas {
    constructor(canvasId) {
        document.getElementById(canvasId);
        this._canvasElement = document.getElementById(canvasId);
        this._context = this._canvasElement.getContext("2d");
        this.updateScreenSizeToWindow();
    }
    updateScreenSizeToWindow() {
        this._canvasElement.height = window.innerHeight;
        this._canvasElement.width = window.innerWidth;
        this._canvasElement.style.height = window.innerHeight + "px";
        this._canvasElement.style.width = window.innerWidth + "px";
    }
    getCenterPosition() {
        return new PixelPosition_1.PixelPosition(Math.floor(this._canvasElement.height / 2), Math.floor(this._canvasElement.width / 2));
    }
    reset() {
        this._context.clearRect(0, 0, this._canvasElement.width, this._canvasElement.height);
    }
    get context() {
        return this._context;
    }
}
exports.Canvas = Canvas;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const FpsCounter_1 = __webpack_require__(5);
class Renderer {
    constructor(eventHandler, canvas) {
        this.actionCounter = 0;
        this.eventHandler = eventHandler;
        this.canvas = canvas;
        this.fpsCounter = new FpsCounter_1.FpsCounter();
        this.beginTime = new Date();
        this.drawableItems = [];
        this.nextActionTimeStamp = 0;
        this.handleFrame();
    }
    addDrawable(drawable) {
        this.drawableItems.push(drawable);
    }
    handleFrame() {
        window.requestAnimationFrame((timeStamp) => {
            this.fpsCounter.addFrameTimestamp(timeStamp);
            if (this.fpsCounter.isTimeToCheckFrameCount(timeStamp)) {
                console.log(this.fpsCounter.getAmountOfFrames(timeStamp));
            }
            while (this.nextActionTimeStamp <= timeStamp) {
                this.actionCounter++;
                this.nextActionTimeStamp += Math.round(1000 / Renderer.ACTIONS_PER_SECOND);
                this.eventHandler.processActionCounter(this.actionCounter);
                //TODO: Draw function should be behind this while loop (however, move logic is now in draw function)
                this.canvas.reset();
                for (let drawAble of this.drawableItems) {
                    drawAble.draw();
                }
            }
            this.handleFrame();
        });
    }
}
Renderer.ACTIONS_PER_SECOND = 60;
exports.Renderer = Renderer;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const EventOnFrame_1 = __webpack_require__(8);
class EventHandler {
    constructor() {
        this.events = new Map();
    }
    addEvent(event) {
        let type = event.getType();
        if (!this.events.has(type)) {
            this.events.set(type, [event]);
        }
        else {
            this.events.get(type).push(event);
        }
    }
    processActionCounter(actionCounter) {
        let onFrameEvents = this.events.get(EventOnFrame_1.EventOnFrame.TYPE);
        if (onFrameEvents) {
            onFrameEvents.forEach((value) => {
                value.handleFrame(actionCounter);
            });
        }
    }
}
exports.EventHandler = EventHandler;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Drawable_1 = __webpack_require__(9);
const PixelPosition_1 = __webpack_require__(0);
class Triangle extends Drawable_1.Drawable {
    constructor(position, canvas, size, color) {
        super(position, canvas);
        this.size = size;
        this.fillColor = color;
        this.strokeColor = "black";
    }
    draw() {
        let context = this.canvas.context;
        let firstPoint = new PixelPosition_1.PixelPosition(this.currentPosition.y - Math.round(this.size / 2), this.currentPosition.x - Math.round(this.size / 4));
        context.beginPath();
        context.moveTo(firstPoint.x, firstPoint.y);
        context.lineTo(firstPoint.x, firstPoint.y + this.size);
        context.lineTo(firstPoint.x + this.size, firstPoint.y + this.size);
        context.lineTo(firstPoint.x, firstPoint.y);
        context.lineWidth = 3;
        context.strokeStyle = this.strokeColor;
        context.stroke();
        context.fillStyle = this.fillColor;
        context.fill();
        this.currentPosition.y--;
        this.currentPosition.x--;
    }
}
exports.Triangle = Triangle;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class FpsCounter {
    constructor(interval = 1000) {
        this.framesLastSecond = [];
        this.interval = interval;
        this.lastCheckInTimestamp = 0;
    }
    isTimeToCheckFrameCount(currentTimeStamp) {
        return ((this.lastCheckInTimestamp + this.interval) < currentTimeStamp);
    }
    addFrameTimestamp(timeStamp) {
        this.framesLastSecond.push(timeStamp);
    }
    getAmountOfFrames(currentTimeStamp) {
        this.lastCheckInTimestamp = currentTimeStamp;
        let validAfterTimeStamp = currentTimeStamp - this.interval;
        for (let i = this.framesLastSecond.length; i > 0; i--) {
            if (this.framesLastSecond[0] < validAfterTimeStamp) {
                this.framesLastSecond.shift();
                continue;
            }
            return i;
        }
        return 0;
    }
}
exports.FpsCounter = FpsCounter;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Canvas_1 = __webpack_require__(1);
const EventHandler_1 = __webpack_require__(3);
const Renderer_1 = __webpack_require__(2);
const Triangle_1 = __webpack_require__(4);
class Main {
    constructor(canvasIdName) {
        this.canvas = new Canvas_1.Canvas(canvasIdName);
        this.eventHandler = new EventHandler_1.EventHandler();
        this.renderer = new Renderer_1.Renderer(this.eventHandler, this.canvas);
        this.renderer.addDrawable(new Triangle_1.Triangle(this.canvas.getCenterPosition(), this.canvas, 60, "green"));
    }
}
exports.Main = Main;
new Main("canvas");


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class EventAble {
}
exports.EventAble = EventAble;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const EventAble_1 = __webpack_require__(7);
class EventOnFrame extends EventAble_1.EventAble {
    constructor(frameInterval) {
        super();
        this._frameInterval = frameInterval;
    }
    getType() {
        return EventOnFrame.TYPE;
    }
    handleFrame(currentFrame) {
        if (currentFrame >= this.executeOnNextValue) {
            this.execute();
            this.updateConditions();
        }
    }
    updateConditions() {
        this.executeOnNextValue = this.currentValue + this._frameInterval;
    }
    get frameInterval() {
        return this._frameInterval;
    }
    set frameInterval(value) {
        this._frameInterval = value;
    }
}
EventOnFrame.TYPE = "eventOnFrame";
exports.EventOnFrame = EventOnFrame;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Drawable {
    constructor(currentPosition, canvas) {
        this.currentPosition = currentPosition;
        this.canvas = canvas;
    }
}
exports.Drawable = Drawable;


/***/ })
/******/ ]);
//# sourceMappingURL=triangle-splitter.js.map