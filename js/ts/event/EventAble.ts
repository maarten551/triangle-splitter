export abstract class EventAble {
    protected currentValue: number;
    protected executeOnNextValue: number;

    public abstract execute(): void;
    public abstract updateConditions(): void;
    public abstract getType(): string;
}