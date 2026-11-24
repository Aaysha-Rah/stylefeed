// A stand-in for the browser's localStorage, so tests run in Node.
// Works only because cart.js and saved.js receive their storage (Dependency Inversion).
function createFakeStorage(initial) {
    const data = Object.assign({}, initial);
    return {
        getItem: function (key) {
            return Object.prototype.hasOwnProperty.call(data, key) ? data[key] : null;
        },
        setItem: function (key, value) {
            data[key] = String(value);
        }
    };
}

module.exports = { createFakeStorage: createFakeStorage };
