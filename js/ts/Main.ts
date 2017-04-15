import {Canvas} from "./Canvas";
export class Main {
    private canvas: Canvas;

    constructor(canvasIdName: string) {
        this.canvas = new Canvas(canvasIdName);
    }
}

new Main("canvas");