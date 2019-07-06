import deepReadOnly from './deepReadOnly';
export default function deepFreeze<T extends any>(obj: T): deepReadOnly<T>;
