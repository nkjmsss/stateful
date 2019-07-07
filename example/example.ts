import Stateful from '@nkjmsss/stateful'

class Store extends Stateful<Store['state'], Store['mutations']> {
  protected state = {
    foo: 1,
    bar: 'bar',
    baz: {
      key1: 0,
      key2: true,
    },
  }

  protected mutations = {
    incrementFoo: () => {
      this.state.foo++
    },

    setBar: (payload: Store['state']['bar']) => {
      this.state.bar = payload
    },

    optionalMutation: (payload?: number) => {
      if (payload === void 0) {
        // do some staff
      } else {
        // do other staff
      }
    },
  }
}

const StoreInstance = new Store()

// get params
const bar = StoreInstance.getState.bar // -> string
const foo = StoreInstance.getState.foo // -> number
const baz = StoreInstance.getState.baz
// ->
// DeepReadonlyObject<{
//   key1: number;
//   key2: boolean;
// }

// direct mutation (impossible)
// StoreInstance.getState.bar = 'foo' // Cannot assign to 'bar' because it is a read-only property.ts(2540)
// StoreInstance.getState.baz.key1 = 1 // Cannot assign to 'key1' because it is a read-only property.ts(2540)

// mutating using mutation
StoreInstance.commmit('incrementFoo')
StoreInstance.commmit('setBar', 'qux')
StoreInstance.commmit('optionalMutation')
StoreInstance.commmit('optionalMutation', 12)
