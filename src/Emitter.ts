export type CallbackFn<Args extends Array<any>> = (...args: Args) => void

export default class Emitter<T extends Record<string, Array<any>>> {
  callbacks: { [K in keyof T]?: CallbackFn<T[K]>[] } = {}

  // Add an event listener for given event
  on<K extends keyof T>(event: K, fn: CallbackFn<T[K]>): this {
    const callbacks = this.callbacks[event]

    if (callbacks) {
      callbacks.push(fn)
    } else {
      this.callbacks[event] = [fn]
    }

    return this
  }

  emit<K extends keyof T>(event: K, ...args: T[K]): this {
    const callbacks = this.callbacks[event]

    if (callbacks) {
      callbacks.forEach(callback => callback.apply(this, args))
    }

    return this
  }

  // Remove event listener for given event.
  // If fn is not provided, all event listeners for that event will be removed.
  // If neither is provided, all event listeners will be removed.
  off<K extends keyof T>(event?: K, fn?: CallbackFn<T[K]>): this {
    if (!event) {
      this.callbacks = {}
    } else {
      // event listeners for the given event
      const callbacks = this.callbacks ? this.callbacks[event] : null
      if (callbacks) {
        if (fn) {
          this.callbacks[event] = callbacks.filter(cb => cb !== fn) // remove specific handler
        } else {
          delete this.callbacks[event] // remove all handlers
        }
      }
    }

    return this
  }
}
