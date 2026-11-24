const test = require("node:test");
const assert = require("node:assert");
const { products } = require("../products.js");
const { createSavedList } = require("../saved.js");
const { createFakeStorage } = require("./fakeStorage.js");

test("a new customer has no saved items", function () {
    const saved = createSavedList(createFakeStorage());
    assert.deepStrictEqual(saved.getIds(), []);
    assert.deepStrictEqual(saved.getProducts(products), []);
});

test("saving an item adds it to the saved list", function () {
    const saved = createSavedList(createFakeStorage());
    assert.strictEqual(saved.toggle(3), true);
    assert.strictEqual(saved.isSaved(3), true);
    assert.deepStrictEqual(saved.getProducts(products).map(function (p) { return p.name; }), ["Floral Dress"]);
});

test("saving the same item twice does not duplicate it", function () {
    const saved = createSavedList(createFakeStorage());
    saved.add(3);
    saved.add(3);
    assert.deepStrictEqual(saved.getIds(), [3]);
});

test("toggling a saved item removes it", function () {
    const saved = createSavedList(createFakeStorage());
    saved.toggle(3);
    assert.strictEqual(saved.toggle(3), false);
    assert.strictEqual(saved.isSaved(3), false);
});

test("remove takes out only that item", function () {
    const saved = createSavedList(createFakeStorage());
    saved.add(1);
    saved.add(4);
    saved.remove(1);
    assert.deepStrictEqual(saved.getIds(), [4]);
});

test("saved items stay saved (a new list on the same storage sees them)", function () {
    const storage = createFakeStorage();
    createSavedList(storage).add(2);
    assert.strictEqual(createSavedList(storage).isSaved(2), true);
});

test("saved IDs for products that no longer exist are skipped", function () {
    const saved = createSavedList(createFakeStorage({ saved: "[2, 999]" }));
    assert.deepStrictEqual(saved.getProducts(products).map(function (p) { return p.id; }), [2]);
});

test("damaged saved data is treated as an empty list", function () {
    assert.deepStrictEqual(createSavedList(createFakeStorage({ saved: "oops" })).getIds(), []);
    assert.deepStrictEqual(createSavedList(createFakeStorage({ saved: '{"a":1}' })).getIds(), []);
});
