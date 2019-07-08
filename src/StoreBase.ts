import { cloneDeep, throttle } from 'lodash'
import {
  deepReadOnly, //
  Emitter,
  deepFreeze,
} from '.'

type StoreEvents<
  State extends object,
  Mutations extends Record<string, (...arg: [any?]) => void>
> = {
  beforeChange: [StoreBase<State, Mutations>]
  updated: [StoreBase<State, Mutations>]
}

export default abstract class StoreBase<
  State extends object,
  Mutations extends Record<string, (...arg: [any?]) => void>
> extends Emitter<StoreEvents<State, Mutations>> {
  protected abstract readonly state: State

  // readonly cloned state
  protected cache!: deepReadOnly<StoreBase<State, Mutations>['state']>

  protected abstract readonly mutations: Mutations

  constructor() {
    super()

    this.registerEvents()
  }

  protected init(): void {
    this.setCache(this)
  }

  public commit<T extends keyof StoreBase<State, Mutations>['mutations']>(
    key: T,
    ...payload: Parameters<StoreBase<State, Mutations>['mutations'][T]>
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
