import { deepReadOnly, //
Emitter } from '.';
declare type StoreEvents<State extends object, Mutations extends Record<string, (...arg: [any?]) => void>> = {
    beforeChange: [StoreBase<State, Mutations>];
    updated: [StoreBase<State, Mutations>];
};
export default abstract class StoreBase<State extends object, Mutations extends Record<string, (...arg: [any?]) => void>> extends Emitter<StoreEvents<State, Mutations>> {
    protected abstract readonly state: State;
    protected cache: deepReadOnly<StoreBase<State, Mutations>['state']>;
    protected abstract readonly mutations: Mutations;
    constructor();
    protected init(): void;
    commit<T extends keyof StoreBase<State, Mutations>['mutations']>(key: T, ...payload: Parameters<StoreBase<State, Mutations>['mutations'][T]>): void;
    forceUpdate(): void;
    readonly getState: StoreBase<State, Mutations>['cache'];
    private makeCache;
    private setCache;
    private registerEvents;
}
export {};
