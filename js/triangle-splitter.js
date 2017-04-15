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
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
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
class Renderer {
    constructor(eventHandler, canvas) {
        this.eventHandler = eventHandler;
        this.canvas = canvas;
        this.frameCounter = 0;
        this.beginTime = new Date();
        this.drawableItems = [];
        this.handleFrame();
    }
    addDrawable(drawable) {
        this.drawableItems.push(drawable);
    }
    handleFrame() {
        this.frameCounter++;
        this.eventHandler.processFrameCounter(this.frameCounter);
        this.canvas.reset();
        for (let drawAble of this.drawableItems) {
            drawAble.draw();
        }
        console.log(this.frameCounter);
        window.setTimeout(() => this.handleFrame(), Math.round(1000 / Renderer.FRAMES_PER_SECOND));
    }
}
Renderer.FRAMES_PER_SECOND = 60;
exports.Renderer = Renderer;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const EventOnFrame_1 = __webpack_require__(7);
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
    processFrameCounter(currentFrame) {
        let onFrameEvents = this.events.get(EventOnFrame_1.EventOnFrame.TYPE);
        if (onFrameEvents != null) {
            onFrameEvents.forEach((value) => {
                value.handleFrame(currentFrame);
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
const Drawable_1 = __webpack_require__(8);
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
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class EventAble {
}
exports.EventAble = EventAble;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const EventAble_1 = __webpack_require__(6);
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
/* 8 */
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZjgyMjA0YjNjNTU4YmZkZjczNTQiLCJ3ZWJwYWNrOi8vLy4vanMvdHMvUGl4ZWxQb3NpdGlvbi50cyIsIndlYnBhY2s6Ly8vLi9qcy90cy9DYW52YXMudHMiLCJ3ZWJwYWNrOi8vLy4vanMvdHMvUmVuZGVyZXIudHMiLCJ3ZWJwYWNrOi8vLy4vanMvdHMvZXZlbnQvRXZlbnRIYW5kbGVyLnRzIiwid2VicGFjazovLy8uL2pzL3RzL3NoYXBlL1RyaWFuZ2xlLnRzIiwid2VicGFjazovLy8uL2pzL3RzL01haW4udHMiLCJ3ZWJwYWNrOi8vLy4vanMvdHMvZXZlbnQvRXZlbnRBYmxlLnRzIiwid2VicGFjazovLy8uL2pzL3RzL2V2ZW50L0V2ZW50T25GcmFtZS50cyIsIndlYnBhY2s6Ly8vLi9qcy90cy9zaGFwZS9EcmF3YWJsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1EQUEyQyxjQUFjOztBQUV6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7QUNoRUE7SUFJSSxZQUFZLENBQVMsRUFBRSxDQUFTO1FBQzVCLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ1gsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDZixDQUFDO0NBQ0o7QUFS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QUFDO1lBQzFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNmLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQzVCLENBQUM7SUFDTCxDQUFDO0lBRU0sZ0JBQWdCO1FBQ25CLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUM7SUFDdEUsQ0FBQztJQUVELElBQUksYUFBYTtRQUNiLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDO0lBQy9CLENBQUM7SUFFRCxJQUFJLGFBQWEsQ0FBQyxLQUFhO1FBQzNCLElBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDO0lBQ2hDLENBQUM7O0FBOUJhLGlCQUFJLEdBQVcsY0FBYyxDQUFDO0FBRGhELG9DQWdDQzs7Ozs7Ozs7OztBQ2hDRDtJQU1JLFlBQVksZUFBOEIsRUFBRSxNQUFjO1FBQ3RELElBQUksQ0FBQyxlQUFlLEdBQUcsZUFBZSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0lBQ3pCLENBQUM7Q0FHSjtBQVpELDRCQVlDIiwiZmlsZSI6Ii4vanMvdHJpYW5nbGUtc3BsaXR0ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDUpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGY4MjIwNGIzYzU1OGJmZGY3MzU0IiwiZXhwb3J0IGNsYXNzIFBpeGVsUG9zaXRpb24ge1xyXG4gICAgcHVibGljIHk6IG51bWJlcjtcclxuICAgIHB1YmxpYyB4OiBudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IoeTogbnVtYmVyLCB4OiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLnkgPSB5O1xyXG4gICAgICAgIHRoaXMueCA9IHg7XHJcbiAgICB9XHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L3NvdXJjZS1tYXAtbG9hZGVyIS4vanMvdHMvUGl4ZWxQb3NpdGlvbi50cyIsImltcG9ydCB7UGl4ZWxQb3NpdGlvbn0gZnJvbSBcIi4vUGl4ZWxQb3NpdGlvblwiO1xyXG5leHBvcnQgY2xhc3MgQ2FudmFzIHtcclxuICAgIHByaXZhdGUgX2NhbnZhc0VsZW1lbnQ6IEhUTUxDYW52YXNFbGVtZW50O1xyXG4gICAgcHJpdmF0ZSBfY29udGV4dDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGNhbnZhc0lkOiBzdHJpbmcpIHtcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjYW52YXNJZCk7XHJcblxyXG4gICAgICAgIHRoaXMuX2NhbnZhc0VsZW1lbnQgPSA8SFRNTENhbnZhc0VsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY2FudmFzSWQpO1xyXG4gICAgICAgIHRoaXMuX2NvbnRleHQgPSB0aGlzLl9jYW52YXNFbGVtZW50LmdldENvbnRleHQoXCIyZFwiKTtcclxuXHJcbiAgICAgICAgdGhpcy51cGRhdGVTY3JlZW5TaXplVG9XaW5kb3coKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlU2NyZWVuU2l6ZVRvV2luZG93KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2NhbnZhc0VsZW1lbnQuaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xyXG4gICAgICAgIHRoaXMuX2NhbnZhc0VsZW1lbnQud2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcclxuXHJcbiAgICAgICAgdGhpcy5fY2FudmFzRWxlbWVudC5zdHlsZS5oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQgKyBcInB4XCI7XHJcbiAgICAgICAgdGhpcy5fY2FudmFzRWxlbWVudC5zdHlsZS53aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoICsgXCJweFwiO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRDZW50ZXJQb3NpdGlvbigpOiBQaXhlbFBvc2l0aW9uIHtcclxuICAgICAgICByZXR1cm4gbmV3IFBpeGVsUG9zaXRpb24oXHJcbiAgICAgICAgICAgIE1hdGguZmxvb3IodGhpcy5fY2FudmFzRWxlbWVudC5oZWlnaHQgLyAyKSxcclxuICAgICAgICAgICAgTWF0aC5mbG9vcih0aGlzLl9jYW52YXNFbGVtZW50LndpZHRoIC8gMilcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZXNldCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9jb250ZXh0LmNsZWFyUmVjdCgwLCAwLCB0aGlzLl9jYW52YXNFbGVtZW50LndpZHRoLCB0aGlzLl9jYW52YXNFbGVtZW50LmhlaWdodCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGNvbnRleHQoKTogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29udGV4dDtcclxuICAgIH1cclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL34vc291cmNlLW1hcC1sb2FkZXIhLi9qcy90cy9DYW52YXMudHMiLCJpbXBvcnQge0NhbnZhc30gZnJvbSBcIi4vQ2FudmFzXCI7XHJcbmltcG9ydCB7RHJhd2FibGV9IGZyb20gXCIuL3NoYXBlL0RyYXdhYmxlXCI7XHJcbmltcG9ydCB7RXZlbnRIYW5kbGVyfSBmcm9tIFwiLi9ldmVudC9FdmVudEhhbmRsZXJcIjtcclxuZXhwb3J0IGNsYXNzIFJlbmRlcmVyIHtcclxuICAgIHB1YmxpYyBzdGF0aWMgRlJBTUVTX1BFUl9TRUNPTkQgPSA2MDtcclxuXHJcbiAgICBwcml2YXRlIGNhbnZhczogQ2FudmFzO1xyXG4gICAgcHJpdmF0ZSBldmVudEhhbmRsZXI6IEV2ZW50SGFuZGxlcjtcclxuXHJcbiAgICBwcml2YXRlIGZyYW1lQ291bnRlcjogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBiZWdpblRpbWU6IERhdGU7XHJcbiAgICBwcml2YXRlIGRyYXdhYmxlSXRlbXM6IERyYXdhYmxlW107XHJcblxyXG4gICAgY29uc3RydWN0b3IoZXZlbnRIYW5kbGVyOiBFdmVudEhhbmRsZXIsIGNhbnZhczogQ2FudmFzKSB7XHJcbiAgICAgICAgdGhpcy5ldmVudEhhbmRsZXIgPSBldmVudEhhbmRsZXI7XHJcbiAgICAgICAgdGhpcy5jYW52YXMgPSBjYW52YXM7XHJcblxyXG4gICAgICAgIHRoaXMuZnJhbWVDb3VudGVyID0gMDtcclxuICAgICAgICB0aGlzLmJlZ2luVGltZSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgdGhpcy5kcmF3YWJsZUl0ZW1zID0gW107XHJcblxyXG4gICAgICAgIHRoaXMuaGFuZGxlRnJhbWUoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWRkRHJhd2FibGUoZHJhd2FibGU6IERyYXdhYmxlKSB7XHJcbiAgICAgICAgdGhpcy5kcmF3YWJsZUl0ZW1zLnB1c2goZHJhd2FibGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaGFuZGxlRnJhbWUoKSB7XHJcbiAgICAgICAgdGhpcy5mcmFtZUNvdW50ZXIrKztcclxuXHJcbiAgICAgICAgdGhpcy5ldmVudEhhbmRsZXIucHJvY2Vzc0ZyYW1lQ291bnRlcih0aGlzLmZyYW1lQ291bnRlcik7XHJcbiAgICAgICAgdGhpcy5jYW52YXMucmVzZXQoKTtcclxuXHJcbiAgICAgICAgZm9yKGxldCBkcmF3QWJsZSBvZiB0aGlzLmRyYXdhYmxlSXRlbXMpIHtcclxuICAgICAgICAgICAgZHJhd0FibGUuZHJhdygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5mcmFtZUNvdW50ZXIpO1xyXG4gICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHRoaXMuaGFuZGxlRnJhbWUoKSwgTWF0aC5yb3VuZCgxMDAwIC8gUmVuZGVyZXIuRlJBTUVTX1BFUl9TRUNPTkQpKTtcclxuICAgIH1cclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL34vc291cmNlLW1hcC1sb2FkZXIhLi9qcy90cy9SZW5kZXJlci50cyIsImltcG9ydCB7RXZlbnRBYmxlfSBmcm9tIFwiLi9FdmVudEFibGVcIjtcclxuaW1wb3J0IHtFdmVudE9uRnJhbWV9IGZyb20gXCIuL0V2ZW50T25GcmFtZVwiO1xyXG5leHBvcnQgY2xhc3MgRXZlbnRIYW5kbGVyIHtcclxuICAgIHByaXZhdGUgZXZlbnRzOiBNYXA8U3RyaW5nLCBFdmVudEFibGVbXT47XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5ldmVudHMgPSBuZXcgTWFwKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFkZEV2ZW50KGV2ZW50OiBFdmVudEFibGUpOiB2b2lkIHtcclxuICAgICAgICBsZXQgdHlwZTogc3RyaW5nID0gZXZlbnQuZ2V0VHlwZSgpO1xyXG5cclxuICAgICAgICBpZiAoIXRoaXMuZXZlbnRzLmhhcyh0eXBlKSkge1xyXG4gICAgICAgICAgICB0aGlzLmV2ZW50cy5zZXQodHlwZSwgW2V2ZW50XSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5ldmVudHMuZ2V0KHR5cGUpLnB1c2goZXZlbnQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcHJvY2Vzc0ZyYW1lQ291bnRlcihjdXJyZW50RnJhbWU6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBvbkZyYW1lRXZlbnRzOkV2ZW50QWJsZVtdID0gdGhpcy5ldmVudHMuZ2V0KEV2ZW50T25GcmFtZS5UWVBFKTtcclxuXHJcbiAgICAgICAgaWYgKG9uRnJhbWVFdmVudHMgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBvbkZyYW1lRXZlbnRzLmZvckVhY2goKHZhbHVlOiBFdmVudE9uRnJhbWUpID0+IHtcclxuICAgICAgICAgICAgICAgIHZhbHVlLmhhbmRsZUZyYW1lKGN1cnJlbnRGcmFtZSlcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi9zb3VyY2UtbWFwLWxvYWRlciEuL2pzL3RzL2V2ZW50L0V2ZW50SGFuZGxlci50cyIsImltcG9ydCB7RHJhd2FibGV9IGZyb20gXCIuL0RyYXdhYmxlXCI7XHJcbmltcG9ydCB7UGl4ZWxQb3NpdGlvbn0gZnJvbSBcIi4uL1BpeGVsUG9zaXRpb25cIjtcclxuaW1wb3J0IHtDYW52YXN9IGZyb20gXCIuLi9DYW52YXNcIjtcclxuZXhwb3J0IGNsYXNzIFRyaWFuZ2xlIGV4dGVuZHMgRHJhd2FibGUge1xyXG4gICAgcHJpdmF0ZSBzaXplOiBudW1iZXI7XHJcblxyXG5cclxuICAgIGNvbnN0cnVjdG9yKHBvc2l0aW9uOiBQaXhlbFBvc2l0aW9uLCBjYW52YXM6IENhbnZhcywgc2l6ZTogbnVtYmVyLCBjb2xvcjogc3RyaW5nKSB7XHJcbiAgICAgICAgc3VwZXIocG9zaXRpb24sIGNhbnZhcyk7XHJcblxyXG4gICAgICAgIHRoaXMuc2l6ZSA9IHNpemU7XHJcbiAgICAgICAgdGhpcy5maWxsQ29sb3IgPSBjb2xvcjtcclxuICAgICAgICB0aGlzLnN0cm9rZUNvbG9yID0gXCJibGFja1wiO1xyXG4gICAgfVxyXG5cclxuICAgIGRyYXcoKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IGNvbnRleHQ6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCA9IHRoaXMuY2FudmFzLmNvbnRleHQ7XHJcblxyXG4gICAgICAgIGxldCBmaXJzdFBvaW50ID0gbmV3IFBpeGVsUG9zaXRpb24oXHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFBvc2l0aW9uLnkgLSBNYXRoLnJvdW5kKHRoaXMuc2l6ZS8yKSxcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50UG9zaXRpb24ueCAtIE1hdGgucm91bmQodGhpcy5zaXplLzQpXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgY29udGV4dC5iZWdpblBhdGgoKTtcclxuICAgICAgICBjb250ZXh0Lm1vdmVUbyhmaXJzdFBvaW50LngsIGZpcnN0UG9pbnQueSk7XHJcbiAgICAgICAgY29udGV4dC5saW5lVG8oZmlyc3RQb2ludC54LCBmaXJzdFBvaW50LnkgKyB0aGlzLnNpemUpO1xyXG4gICAgICAgIGNvbnRleHQubGluZVRvKGZpcnN0UG9pbnQueCArIHRoaXMuc2l6ZSwgZmlyc3RQb2ludC55ICsgdGhpcy5zaXplKTtcclxuICAgICAgICBjb250ZXh0LmxpbmVUbyhmaXJzdFBvaW50LngsIGZpcnN0UG9pbnQueSk7XHJcblxyXG4gICAgICAgIGNvbnRleHQubGluZVdpZHRoID0gMztcclxuICAgICAgICBjb250ZXh0LnN0cm9rZVN0eWxlID0gdGhpcy5zdHJva2VDb2xvcjtcclxuICAgICAgICBjb250ZXh0LnN0cm9rZSgpO1xyXG4gICAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gdGhpcy5maWxsQ29sb3I7XHJcbiAgICAgICAgY29udGV4dC5maWxsKCk7XHJcblxyXG4gICAgICAgIHRoaXMuY3VycmVudFBvc2l0aW9uLnktLTtcclxuICAgICAgICB0aGlzLmN1cnJlbnRQb3NpdGlvbi54LS07XHJcbiAgICB9XHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L3NvdXJjZS1tYXAtbG9hZGVyIS4vanMvdHMvc2hhcGUvVHJpYW5nbGUudHMiLCJpbXBvcnQge0NhbnZhc30gZnJvbSBcIi4vQ2FudmFzXCI7XHJcbmltcG9ydCB7RXZlbnRIYW5kbGVyfSBmcm9tIFwiLi9ldmVudC9FdmVudEhhbmRsZXJcIjtcclxuaW1wb3J0IHtSZW5kZXJlcn0gZnJvbSBcIi4vUmVuZGVyZXJcIjtcclxuaW1wb3J0IHtUcmlhbmdsZX0gZnJvbSBcIi4vc2hhcGUvVHJpYW5nbGVcIjtcclxuZXhwb3J0IGNsYXNzIE1haW4ge1xyXG4gICAgcHJpdmF0ZSBjYW52YXM6IENhbnZhcztcclxuICAgIHByaXZhdGUgZXZlbnRIYW5kbGVyOiBFdmVudEhhbmRsZXI7XHJcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihjYW52YXNJZE5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuY2FudmFzID0gbmV3IENhbnZhcyhjYW52YXNJZE5hbWUpO1xyXG4gICAgICAgIHRoaXMuZXZlbnRIYW5kbGVyID0gbmV3IEV2ZW50SGFuZGxlcigpO1xyXG5cclxuICAgICAgICB0aGlzLnJlbmRlcmVyID0gbmV3IFJlbmRlcmVyKHRoaXMuZXZlbnRIYW5kbGVyLCB0aGlzLmNhbnZhcyk7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJlci5hZGREcmF3YWJsZShuZXcgVHJpYW5nbGUoXHJcbiAgICAgICAgICAgIHRoaXMuY2FudmFzLmdldENlbnRlclBvc2l0aW9uKCksXHJcbiAgICAgICAgICAgIHRoaXMuY2FudmFzLFxyXG4gICAgICAgICAgICA2MCxcclxuICAgICAgICAgICAgXCJncmVlblwiXHJcbiAgICAgICAgKSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbm5ldyBNYWluKFwiY2FudmFzXCIpO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL34vc291cmNlLW1hcC1sb2FkZXIhLi9qcy90cy9NYWluLnRzIiwiZXhwb3J0IGFic3RyYWN0IGNsYXNzIEV2ZW50QWJsZSB7XHJcbiAgICBwcm90ZWN0ZWQgY3VycmVudFZhbHVlOiBudW1iZXI7XHJcbiAgICBwcm90ZWN0ZWQgZXhlY3V0ZU9uTmV4dFZhbHVlOiBudW1iZXI7XHJcblxyXG4gICAgcHVibGljIGFic3RyYWN0IGV4ZWN1dGUoKTogdm9pZDtcclxuICAgIHB1YmxpYyBhYnN0cmFjdCB1cGRhdGVDb25kaXRpb25zKCk6IHZvaWQ7XHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgZ2V0VHlwZSgpOiBzdHJpbmc7XHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L3NvdXJjZS1tYXAtbG9hZGVyIS4vanMvdHMvZXZlbnQvRXZlbnRBYmxlLnRzIiwiaW1wb3J0IHtFdmVudEFibGV9IGZyb20gXCIuL0V2ZW50QWJsZVwiO1xyXG5cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEV2ZW50T25GcmFtZSBleHRlbmRzIEV2ZW50QWJsZSB7XHJcbiAgICBwdWJsaWMgc3RhdGljIFRZUEU6IHN0cmluZyA9IFwiZXZlbnRPbkZyYW1lXCI7XHJcblxyXG4gICAgcHJpdmF0ZSBfZnJhbWVJbnRlcnZhbDogbnVtYmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGZyYW1lSW50ZXJ2YWw6IG51bWJlcikge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5fZnJhbWVJbnRlcnZhbCA9IGZyYW1lSW50ZXJ2YWw7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldFR5cGUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gRXZlbnRPbkZyYW1lLlRZUEU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGhhbmRsZUZyYW1lKGN1cnJlbnRGcmFtZTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKGN1cnJlbnRGcmFtZSA+PSB0aGlzLmV4ZWN1dGVPbk5leHRWYWx1ZSkge1xyXG4gICAgICAgICAgICB0aGlzLmV4ZWN1dGUoKTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVDb25kaXRpb25zKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGVDb25kaXRpb25zKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZXhlY3V0ZU9uTmV4dFZhbHVlID0gdGhpcy5jdXJyZW50VmFsdWUgKyB0aGlzLl9mcmFtZUludGVydmFsO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBmcmFtZUludGVydmFsKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZyYW1lSW50ZXJ2YWw7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IGZyYW1lSW50ZXJ2YWwodmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuX2ZyYW1lSW50ZXJ2YWwgPSB2YWx1ZTtcclxuICAgIH1cclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL34vc291cmNlLW1hcC1sb2FkZXIhLi9qcy90cy9ldmVudC9FdmVudE9uRnJhbWUudHMiLCJpbXBvcnQge1BpeGVsUG9zaXRpb259IGZyb20gXCIuLi9QaXhlbFBvc2l0aW9uXCI7XHJcbmltcG9ydCB7Q2FudmFzfSBmcm9tIFwiLi4vQ2FudmFzXCI7XHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBEcmF3YWJsZSB7XHJcbiAgICBwcm90ZWN0ZWQgY3VycmVudFBvc2l0aW9uOiBQaXhlbFBvc2l0aW9uO1xyXG4gICAgcHJvdGVjdGVkIGNhbnZhczogQ2FudmFzO1xyXG4gICAgcHJvdGVjdGVkIGZpbGxDb2xvcjogc3RyaW5nO1xyXG4gICAgcHJvdGVjdGVkIHN0cm9rZUNvbG9yOiBzdHJpbmc7XHJcblxyXG4gICAgY29uc3RydWN0b3IoY3VycmVudFBvc2l0aW9uOiBQaXhlbFBvc2l0aW9uLCBjYW52YXM6IENhbnZhcykge1xyXG4gICAgICAgIHRoaXMuY3VycmVudFBvc2l0aW9uID0gY3VycmVudFBvc2l0aW9uO1xyXG4gICAgICAgIHRoaXMuY2FudmFzID0gY2FudmFzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBkcmF3KCk6IHZvaWQ7XHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L3NvdXJjZS1tYXAtbG9hZGVyIS4vanMvdHMvc2hhcGUvRHJhd2FibGUudHMiXSwic291cmNlUm9vdCI6IiJ9