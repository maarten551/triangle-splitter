import {EventAble} from "./EventAble";

export abstract class EventOnFrame extends EventAble {
    public static TYPE: string = "eventOnFrame";

    private _frameInterval: number;

    constructor(frameInterval: number) {
        super();
        this._frameInterval = frameInterval;
    }

    public getType(): string {
        return EventOnFrame.TYPE;
    }

    public handleFrame(currentFrame: number): void {
        if (currentFrame >= this.executeOnNextValue) {
            this.execute();
            this.updateConditions();
        }
    }

    public updateConditions(): void {
        this.executeOnNextValue = this.currentValue + this._frameInterval;
    }

    get frameInterval(): number {
        return this._frameInterval;
    }

    set frameInterval(value: number) {
        this._frameInterval = value;
    }
}