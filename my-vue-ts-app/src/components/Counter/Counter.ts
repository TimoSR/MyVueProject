import {reactive, watch} from 'vue';

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

export class Counter implements ICounter {

    //private _something: number = ref(0);
    private _value: Value = reactive<Value>({
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
        },{
            immediate: false,
            flush: "post"
        });
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