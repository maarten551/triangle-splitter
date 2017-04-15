import {PixelPosition} from "../PixelPosition";
import {Canvas} from "../Canvas";
export abstract class Drawable {
    protected currentPosition: PixelPosition;
    protected canvas: Canvas;
    protected fillColor: string;
    protected strokeColor: string;

    constructor(currentPosition: PixelPosition, canvas: Canvas) {
        this.currentPosition = currentPosition;
        this.canvas = canvas;
    }

    public abstract draw(): void;
}