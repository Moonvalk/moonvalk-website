import { MVSystem } from "../../base/MVSystem";
import { MicroTimer } from "./MicroTimer";

export abstract class MicroTimerSystem extends MVSystem {
    protected static timers: Array<MicroTimer>;

    public init(): void {
        MicroTimerSystem.timers = new Array<MicroTimer>();
    }

    public execute(deltaTime_: number): void {
        for (let index = MicroTimerSystem.timers.length - 1; index > 0; index--) {
            // Remove timers that no longer exist.
            if (!MicroTimerSystem.timers[index]) {
                MicroTimerSystem.timers.splice(index, 1);
            }

            // Remove non-active timers after running.
            if (!MicroTimerSystem.timers[index].update(deltaTime_)) {
                MicroTimerSystem.timers.splice(index, 1);
            }
        }
    }

    public static addTimer(timer_: MicroTimer): void {
        if (MicroTimerSystem.timers.includes(timer_) && !timer_.isComplete) {
            return;
        }
        MicroTimerSystem.timers.push(timer_);
    }
}
