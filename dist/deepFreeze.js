export default function deepFreeze(obj) {
    Object.getOwnPropertyNames(obj).forEach(name => {
        const v = obj[name];
        obj[name] = v && typeof v === 'object' ? deepFreeze(obj[name]) : v;
    });
    return Object.freeze(obj);
}
//# sourceMappingURL=deepFreeze.js.map