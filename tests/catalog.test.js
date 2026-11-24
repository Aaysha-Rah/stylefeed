const test = require("node:test");
const assert = require("node:assert");
const { products } = require("../products.js");
const { searchProducts } = require("../catalog.js");

function names(list) {
    return list.map(function (p) { return p.name; });
}

// US-04: search the feed
test("search returns products whose name contains the text", function () {
    assert.deepStrictEqual(names(searchProducts(products, "dress")), ["Floral Dress"]);
});

test("search ignores upper/lower case", function () {
    assert.deepStrictEqual(names(searchProducts(products, "DENIM")), ["Denim Jacket"]);
});

test("search ignores extra spaces around the text", function () {
    assert.deepStrictEqual(names(searchProducts(products, "   tee  ")), ["Graphic Tee"]);
});

test("empty search shows every product", function () {
    assert.strictEqual(searchProducts(products, "").length, 6);
    assert.strictEqual(searchProducts(products, "   ").length, 6);
    assert.strictEqual(searchProducts(products, undefined).length, 6);
});

test("search with no match returns an empty list", function () {
    assert.deepStrictEqual(searchProducts(products, "tuxedo"), []);
});

test("search does not change the original product list", function () {
    searchProducts(products, "dress");
    assert.strictEqual(products.length, 6);
});
