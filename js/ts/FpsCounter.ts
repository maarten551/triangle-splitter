export class FpsCounter {
    public interval: number;
    public lastCheckInTimestamp: number;

    private framesLastSecond: number[];

    constructor(interval = 1000) {
        this.framesLastSecond = [];
        this.interval = interval;

        this.lastCheckInTimestamp = 0;
    }

    public isTimeToCheckFrameCount(currentTimeStamp: number) : boolean {
        return ((this.lastCheckInTimestamp + this.interval) < currentTimeStamp);
    }

    public addFrameTimestamp(timeStamp: number): void {
        this.framesLastSecond.push(timeStamp);
    }

    public getAmountOfFrames(currentTimeStamp: number): number {
        this.lastCheckInTimestamp = currentTimeStamp;
        let validAfterTimeStamp = currentTimeStamp - this.interval;

        for (let i = this.framesLastSecond.length; i > 0; i--) {
            if (this.framesLastSecond[0] < validAfterTimeStamp) {
                this.framesLastSecond.shift();
                continue;
            }

            return i;
        }

        return 0;
    }
}