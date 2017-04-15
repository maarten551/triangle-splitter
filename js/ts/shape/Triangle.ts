import {Drawable} from "./Drawable";
import {PixelPosition} from "../PixelPosition";
import {Canvas} from "../Canvas";
export class Triangle extends Drawable {
    private size: number;


    constructor(position: PixelPosition, canvas: Canvas, size: number, color: string) {
        super(position, canvas);

        this.size = size;
        this.fillColor = color;
        this.strokeColor = "black";
    }

    draw(): void {
        let context: CanvasRenderingContext2D = this.canvas.context;

        let firstPoint = new PixelPosition(
            this.currentPosition.y - Math.round(this.size/2),
            this.currentPosition.x - Math.round(this.size/4)
        );

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