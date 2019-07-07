import { cloneDeep, throttle } from 'lodash'
import {
  deepReadOnly, //
  Emitter,
  CallbackFn,
  deepFreeze,
} from '.'

export const StoreEvents = [
  'beforeChange', //
  'updated',
] as const

export type StoreEventsName = (typeof StoreEvents)[any]

// returns first arg type
// if function's first arg doesn't exists, returns never
type FirstArg<T extends (...args: any) => any> = Parameters<T> extends []
  ? never
  : T extends (payload: infer T) => any
  ? T
  : never

export default interface StoreBase<
  State extends object,
  Mutations extends Record<string, (...arg: [any?]) => void>
> extends Emitter<StoreEventsName> {
  emit(event: 'beforeChange', store: StoreBase<State, Mutations>): this
  emit(event: 'updated', store: StoreBase<State, Mutations>): this
  emit(event: StoreEventsName, ...args: any): this

  on(
    event: 'beforeChange',
    fn: (store: StoreBase<State, Mutations>) => void
  ): this
  on(event: 'updated', fn: (store: StoreBase<State, Mutations>) => void): this
  on(event: StoreEventsName, fn: CallbackFn): this
}

export default abstract class StoreBase<
  State extends object,
  Mutations extends Record<string, (...arg: [any?]) => void>
> extends Emitter<StoreEventsName> {
  protected abstract state: State

  // readonly cloned state
  protected cache!: deepReadOnly<StoreBase<State, Mutations>['state']>

  protected abstract mutations: Mutations

  constructor() {
    super()

    this.registerEvents()
  }

  protected init(): void {
    this.setCache(this)
  }

  public commit<T extends keyof StoreBase<State, Mutations>['mutations']>(
    key: T,
    ...payload: FirstArg<
      StoreBase<State, Mutations>['mutations'][T]
    > extends never
      ? [never?]
      : Extract<
          FirstArg<StoreBase<State, Mutations>['mutations'][T]>,
          undefined
        > extends never
      ? [FirstArg<StoreBase<State, Mutations>['mutations'][T]>]
      : [FirstArg<StoreBase<State, Mutations>['mutations'][T]>?]
  ): void {
    this.mutations[key].apply(this, payload)
    this.emit('beforeChange', this)
  }

  // very unsafe method
  // You wouldn't need this as long as you are using this correctly
  public forceUpdate(): void {
    this.cache = this.makeCache()
  }

  get getState(): StoreBase<State, Mutations>['cache'] {
    return this.cache
  }

  private makeCache(): StoreBase<State, Mutations>['cache'] {
    const state = cloneDeep(this.state)
    return deepFreeze(state)
  }

  private setCache = throttle((newState: StoreBase<State, Mutations>) => {
    this.cache = newState.makeCache()
    this.emit('updated', this)
  }, 100)

  private registerEvents(): void {
    this.on('beforeChange', newState => {
      this.setCache(newState)
    })
  }
}
