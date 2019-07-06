# @nkjmsss/stateful

This is a vuex-like state manager.

## usage

NOTE: You must define `state` and `mutations`.

```typescript
import Stateful from '@nkjmsss/stateful'

export default class Store extends Stateful<
  Store['state'],
  Store['mutations']
> {
  protected state = {
    foo: 1,
    bar: 'bar',
  }

  protected mutations = {
    incrementFoo: () => {
      this.state.foo++
    },

    setBar: (payload: Store['state']['bar']) => {
      this.state.bar = payload
    },
  }
}
```
