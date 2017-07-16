import {Canvas} from "./Canvas";
import {Drawable} from "./shape/Drawable";
import {EventHandler} from "./event/EventHandler";
import {FpsCounter} from "./FpsCounter";

export class Renderer {
    public static ACTIONS_PER_SECOND = 60;

    private canvas: Canvas;
    private eventHandler: EventHandler;

    private fpsCounter: FpsCounter;
    private beginTime: Date;
    private drawableItems: Drawable[];

    private actionCounter: number = 0;
    private nextActionTimeStamp: number;

    constructor(eventHandler: EventHandler, canvas: Canvas) {
        this.eventHandler = eventHandler;
        this.canvas = canvas;

        this.fpsCounter = new FpsCounter();
        this.beginTime = new Date();
        this.drawableItems = [];

        this.nextActionTimeStamp = Date.now();

        this.handleFrame();
    }

    public addDrawable(drawable: Drawable) {
        this.drawableItems.push(drawable);
    }

    private handleFrame() {
        window.requestAnimationFrame((timeStamp: number) => {
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
        });


        console.log(this.actionCounter);
        window.setTimeout(() => this.handleFrame(), Math.round(1000 / Renderer.ACTIONS_PER_SECOND));
    }
}