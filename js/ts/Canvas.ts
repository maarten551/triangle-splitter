import {PixelPosition} from "./PixelPosition";
export class Canvas {
    private _canvasElement: HTMLCanvasElement;
    private _context: CanvasRenderingContext2D;

    constructor(canvasId: string) {
        document.getElementById(canvasId);

        this._canvasElement = <HTMLCanvasElement>document.getElementById(canvasId);
        this._context = this._canvasElement.getContext("2d");

        this.updateScreenSizeToWindow();
    }

    public updateScreenSizeToWindow(): void {
        this._canvasElement.height = window.innerHeight;
        this._canvasElement.width = window.innerWidth;

        this._canvasElement.style.height = window.innerHeight + "px";
        this._canvasElement.style.width = window.innerWidth + "px";
    }

    public getCenterPosition(): PixelPosition {
        return new PixelPosition(
            Math.floor(this._canvasElement.height / 2),
            Math.floor(this._canvasElement.width / 2)
        );
    }

    public reset(): void {
        this._context.clearRect(0, 0, this._canvasElement.width, this._canvasElement.height);
    }

    get context(): CanvasRenderingContext2D {
        return this._context;
    }
}