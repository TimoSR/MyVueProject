import {reactive, watch, computed, ref} from 'vue';
import { defineStore } from 'pinia';

export namespace PiniaCounter {

    type Value = {
        count: number;
        maxLimit: number;
    };

    export interface ICounter {
        increment(): void;
        decrement(): void;
        reset(): void;
        get value(): number;
    }

    class Counter implements ICounter {
        private _value = reactive<Value>({
            count: 0,
            maxLimit: 0
        });

        constructor(initialValue: number = 0, maxLimit: number = 10) {
            this._value.count = initialValue;
            this._value.maxLimit = maxLimit;

            // Watch for count exceeding the limit
            watch(() => this._value.count, (newValue) => {
                if (newValue >= this._value.maxLimit) {
                    console.warn(`Max limit of ${this._value.maxLimit} reached!`);
                }
            }, {
                immediate: false,
                flush: "post"
            });

            // Bind methods to avoid `this` context issues
            this.increment = this.increment.bind(this);
            this.decrement = this.decrement.bind(this);
            this.reset = this.reset.bind(this);
        }

        increment(): void {
            if (this._value.count < this._value.maxLimit) {
                this._value.count++;
            }
        }

        decrement(): void {
            if (this._value.count > 0) {
                this._value.count--;
            }
        }

        reset(): void {
            this._value.count = 0;
        }

        get value(): number {
            return this._value.count;
        }
    }

    export const useCounterStore = defineStore('counter', () => {

        const counterInstance = reactive(new Counter(0, 10));

        return {
            value: computed(() => counterInstance.value),
            increment: () => counterInstance.increment(),
            decrement: () => counterInstance.decrement(),
            reset: () => counterInstance.reset()
        };
    });
}
