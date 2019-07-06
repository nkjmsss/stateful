import deepReadOnly from './deepReadOnly'

export default function deepFreeze<T extends any>(obj: T): deepReadOnly<T> {
  Object.getOwnPropertyNames(obj).forEach(name => {
    const v = obj[name]

    obj[name] = v && typeof v === 'object' ? deepFreeze(obj[name]) : v
  })

  return Object.freeze(obj) as deepReadOnly<T>
}
