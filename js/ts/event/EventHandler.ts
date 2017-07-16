import {EventAble} from "./EventAble";
import {EventOnFrame} from "./EventOnFrame";
export class EventHandler {
    private events: Map<String, EventAble[]>;

    constructor() {
        this.events = new Map();
    }

    public addEvent(event: EventAble): void {
        let type: string = event.getType();

        if (!this.events.has(type)) {
            this.events.set(type, [event]);
        } else {
            this.events.get(type).push(event);
        }
    }

    public processActionCounter(actionCounter: number): void {
        let onFrameEvents:EventAble[] = this.events.get(EventOnFrame.TYPE);

        if (onFrameEvents !== null) {
            onFrameEvents.forEach((value: EventOnFrame) => {
                value.handleFrame(actionCounter);
            });
        }
    }
}