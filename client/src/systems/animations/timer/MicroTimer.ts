import { MicroTimerSystem } from "./MicroTimerSystem";

export type MicroTimerAction = () => void;

export class MicroTimer {
    protected _completionActions: Array<MicroTimerAction>;
    protected _updateActions: Array<MicroTimerAction>;
    protected _remainingTime: number;
    protected _duration: number;
    protected _isRunning: boolean;
    protected _isPaused: boolean;
    protected _isComplete: boolean;
    protected _timeScale: number;
    protected _countdown: boolean;

    public constructor(countdown_: boolean = true) {
        this._duration = 1;
        this._timeScale = 1;
        this._isPaused = false;
        this._isRunning = false;
        this._isComplete = false;
        this._countdown = countdown_;

        this.registerSelf();
    }

    public get duration(): number {
        return this._duration;
    }

    public get timeRemaining(): number {
        return this._remainingTime;
    }

    public get isRunning(): boolean {
        return this._isRunning;
    }

    public get isPaused(): boolean {
        return this._isPaused;
    }

    public get isComplete(): boolean {
        return this._isComplete;
    }

    public get timeScale(): number {
        return this._timeScale;
    }
    
    public set timeScale(newTimeScale_: number) {
        this._timeScale = (newTimeScale_ > 0) ? newTimeScale_ : 0;
    }

    public start(duration_?: number): this {
        if (duration_ !== undefined) {
            this._duration = duration_;
        }
        if (!this._isPaused) {
            this._remainingTime = this._duration;
        }

        this._isPaused = false;
        this._isRunning = true;
        this.registerSelf();
        this._isComplete = false;
        return this;
    }

    public add(duration_: number): this {
        this._duration += duration_;
        return this;
    }

    public update(deltaTime_: number): boolean {
        if (!this._isRunning) {
            return false;
        }
        this._remainingTime += (deltaTime_ * this._timeScale) * (this._countdown ? -1 : 1);
        this._updateActions?.forEach((action: MicroTimerAction) => {
            action();
        });
        if (this._remainingTime <= 0) {
            this.complete();
            return false;
        }
        return true;
    }

    public complete(): this {
        this._remainingTime = 0;
        this._isRunning = false;
        this._isComplete = true;
        this._completionActions?.forEach((action: MicroTimerAction) => {
            action();
        });
        return this;
    }

    public pause(): this {
        this._isPaused = true;
        return this.stop();
    }

    public stop(): this {
        this._isRunning = false;
        return this;
    }

    public onComplete(...actions_: MicroTimerAction[]): this {
        if (!this._completionActions) {
            this._completionActions = new Array<MicroTimerAction>();
        }
        this._completionActions.push(...actions_);
        return this;
    }

    public clearCompletionActions(): this {
        this._completionActions = [];
        return this;
    }

    public onUpdate(...actions_: MicroTimerAction[]): this {
        if (!this._updateActions) {
            this._updateActions = new Array<MicroTimerAction>();
        }
        this._updateActions.push(...actions_);
        return this;
    }

    public clearUpdateActions(): this {
        this._updateActions = [];
        return this;
    }

    protected registerSelf(): void {
        MicroTimerSystem.addTimer(this);
    }
}