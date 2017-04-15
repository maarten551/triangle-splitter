import {Canvas} from "./Canvas";
import {Drawable} from "./shape/Drawable";
import {EventHandler} from "./event/EventHandler";
export class Renderer {
    public static FRAMES_PER_SECOND = 60;

    private canvas: Canvas;
    private eventHandler: EventHandler;

    private frameCounter: number;
    private beginTime: Date;
    private drawableItems: Drawable[];

    constructor(eventHandler: EventHandler, canvas: Canvas) {
        this.eventHandler = eventHandler;
        this.canvas = canvas;

        this.frameCounter = 0;
        this.beginTime = new Date();
        this.drawableItems = [];

        this.handleFrame();
    }

    public addDrawable(drawable: Drawable) {
        this.drawableItems.push(drawable);
    }

    private handleFrame() {
        this.frameCounter++;

        this.eventHandler.processFrameCounter(this.frameCounter);
        this.canvas.reset();

        for(let drawAble of this.drawableItems) {
            drawAble.draw();
        }

        console.log(this.frameCounter);
        window.setTimeout(() => this.handleFrame(), Math.round(1000 / Renderer.FRAMES_PER_SECOND));
    }
}