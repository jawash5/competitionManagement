export default {
    setItem(key, value) {
        value = JSON.stringify(value);
        window.sessionStorage.setItem(key, value)
    },
    getItem(key, defaultValue) {
        let value = window.sessionStorage.getItem(key)
        try {
            value = JSON.parse(value);
            // eslint-disable-next-line no-empty
        } catch {}
        return value || defaultValue
    },
    // removeItem(key) {
    //     window.localStorage.removeItem(key)
    // },
    clear() {
        window.sessionStorage.clear();
    },
}