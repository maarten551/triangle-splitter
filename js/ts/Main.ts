import {Canvas} from "./Canvas";
import {EventHandler} from "./event/EventHandler";
import {Renderer} from "./Renderer";
import {Triangle} from "./shape/Triangle";
export class Main {
    private canvas: Canvas;
    private eventHandler: EventHandler;
    private renderer: Renderer;

    constructor(canvasIdName: string) {
        this.canvas = new Canvas(canvasIdName);
        this.eventHandler = new EventHandler();

        this.renderer = new Renderer(this.eventHandler, this.canvas);
        this.renderer.addDrawable(new Triangle(
            this.canvas.getCenterPosition(),
            this.canvas,
            60,
            "green"
        ));
    }
}

new Main("canvas");