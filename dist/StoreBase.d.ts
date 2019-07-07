import { deepReadOnly, //
Emitter, CallbackFn } from '.';
export declare const StoreEvents: readonly ["change"];
export declare type StoreEventsName = (typeof StoreEvents)[any];
declare type FirstArg<T extends (...args: any) => any> = Parameters<T> extends [] ? never : T extends (payload: infer T) => any ? T : never;
export default interface StoreBase<State extends object, Mutations extends Record<string, (...arg: [any?]) => void>> extends Emitter<StoreEventsName> {
    emit(event: 'change', store: StoreBase<State, Mutations>): this;
    emit(event: StoreEventsName, ...args: any): this;
    on(event: 'change', fn: (store: StoreBase<State, Mutations>) => void): this;
    on(event: StoreEventsName, fn: CallbackFn): this;
}
export default abstract class StoreBase<State extends object, Mutations extends Record<string, (...arg: [any?]) => void>> extends Emitter<StoreEventsName> {
    protected abstract state: State;
    protected cache: deepReadOnly<StoreBase<State, Mutations>['state']>;
    protected abstract mutations: Mutations;
    constructor();
    protected init(): void;
    commmit<T extends keyof StoreBase<State, Mutations>['mutations']>(key: T, ...payload: FirstArg<StoreBase<State, Mutations>['mutations'][T]> extends never ? [never?] : Extract<FirstArg<StoreBase<State, Mutations>['mutations'][T]>, undefined> extends never ? [FirstArg<StoreBase<State, Mutations>['mutations'][T]>] : [FirstArg<StoreBase<State, Mutations>['mutations'][T]>?]): void;
    readonly getState: StoreBase<State, Mutations>['cache'];
    private makeCache;
    private setCache;
    private registerEvents;
}
export {};
