export declare type CallbackFn<Args extends Array<any>> = (...args: Args) => void;
export default class Emitter<T extends Record<string, Array<any>>> {
    callbacks: {
        [K in keyof T]?: CallbackFn<T[K]>[];
    };
    on<K extends keyof T>(event: K, fn: CallbackFn<T[K]>): this;
    emit<K extends keyof T>(event: K, ...args: T[K]): this;
    off<K extends keyof T>(event?: K, fn?: CallbackFn<T[K]>): this;
}
