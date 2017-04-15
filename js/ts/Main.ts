import {Test} from "./Test";

export class Main {
    private canvasIdName: string;
    constructor(canvasIdName: string) {
        this.canvasIdName = canvasIdName;

        new Test(2);
    }
}

let main = new Main("");