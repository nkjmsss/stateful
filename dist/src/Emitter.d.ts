export declare type CallbackFn = (...args: any) => any;
export default class Emitter<T extends string> {
    callbacks: Partial<Record<T, CallbackFn[]>>;
    on(event: T, fn: CallbackFn): this;
    emit(event: T, ...args: any): this;
    off(event?: T, fn?: CallbackFn): this;
}
