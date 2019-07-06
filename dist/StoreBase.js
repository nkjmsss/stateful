import { cloneDeep, throttle } from 'lodash';
import { //
Emitter, deepFreeze, } from '.';
export const StoreEvents = [
    'change',
];
export default class StoreBase extends Emitter {
    constructor() {
        super();
        this.setCache = throttle((newState) => {
            this.cache = newState.makeCache();
        }, 100); // TODO find good refresh rate
        this.registerEvents();
    }
    init() {
        this.setCache(this);
    }
    commmit(key, payload) {
        this.mutations[key].apply(this, [payload]);
        this.emit('change', this);
    }
    get getState() {
        return this.cache;
    }
    makeCache() {
        const state = cloneDeep(this.state);
        return deepFreeze(state);
    }
    registerEvents() {
        this.on('change', newState => {
            this.setCache(newState);
        });
    }
}
//# sourceMappingURL=StoreBase.js.map