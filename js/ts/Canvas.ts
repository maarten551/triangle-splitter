import {PixelPosition} from "./PixelPosition";
export class Canvas {
    private canvasElement: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;

    constructor(canvasId: string) {
        document.getElementById(canvasId);

        this.canvasElement = <HTMLCanvasElement>document.getElementById(canvasId);
        this.context = this.canvasElement.getContext("2d");

        this.updateScreenSizeToWindow();
        let centerPosition = this.getCenterPosition();

        this.context.fillStyle = 'red';
        this.context.fillRect(centerPosition.width - 100, centerPosition.height - 150, 200, 300);
        this.context.fillRect(100, 100, 100, 100);
    }

    public updateScreenSizeToWindow(): void {
        this.canvasElement.height = window.innerHeight;
        this.canvasElement.width = window.innerWidth;

        this.canvasElement.style.height = window.innerHeight + "px";
        this.canvasElement.style.width = window.innerWidth + "px";
    }

    public getCenterPosition(): PixelPosition {
        return new PixelPosition(
            Math.floor(this.canvasElement.height / 2),
            Math.floor(this.canvasElement.width / 2)
        );
    }
}