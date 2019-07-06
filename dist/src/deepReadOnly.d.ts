declare type DeepReadonly<T> = T extends (infer R)[] ? DeepReadonlyArray<R> : T extends Function ? T : T extends object ? DeepReadonlyObject<T> : T;
interface DeepReadonlyArray<T> extends ReadonlyArray<DeepReadonly<T>> {
}
declare type DeepReadonlyObject<T> = {
    readonly [P in keyof T]: DeepReadonly<T[P]>;
};
export default DeepReadonly;
